import { BadRequestException, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './auth.dto';
import { faker } from '@faker-js/faker';
import { hash, verify } from 'argon2';
import {User} from '@prisma/client'

@Injectable()
export class AuthService {

    constructor(private readonly prisma: PrismaService, private jwt: JwtService) {}

    async register(data : AuthDto) {
        const oldUser = await this.prisma.user.findUnique({
            where: {
                email: data.email
            }
        })
        if(oldUser) {
            throw new BadRequestException('Пользователь с таким email уже существует')
        }

        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                name: faker.name.firstName(),
                avatarPath: faker.image.avatar(),
                phone: faker.phone.number('+7 (###) ###-##-##'),
                password: await hash(data.password),

            }
        })

        const tokens = await this.issueTokens(user.id)

        return {
            user: this.returnUserFields(user),
            accesToken: tokens.accesToken,
            refreshToken: tokens.refreshToken
        }
    }

    async login(data : AuthDto) {
        const user = await this.validateUser(data)

        const tokens = await this.issueTokens(user.id)

        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }

    async getNewTokens(refreshToken: string) {
        const validToken = await this.jwt.verifyAsync(refreshToken)

        if(!validToken) {
            throw new BadRequestException('Invalid refresh token')  
        }

        const user = await this.prisma.user.findUnique({
            where: {
                id: validToken.id
            }
        })

        if(!user) {
            throw new NotFoundException('User not found')
        }

        const tokens = await this.issueTokens(user.id)

        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }

    private async issueTokens(userId: number) {
        const data = {id: userId}

        const accesToken = this.jwt.sign(data,{expiresIn: '1h'})

        const refreshToken = this.jwt.sign(data, {expiresIn: '15d'})

        return {accesToken, refreshToken}

    }

    private returnUserFields(user: User) {
        return {
            id: user.id,
            email: user.email
        }
    }

    private async validateUser(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        }) 

        if(!user) {
            throw new NotFoundException('User not found')
        }

        const validatePassword = await verify(user.password, dto.password)

        if(!validatePassword) {
            throw new UnauthorizedException('Invalid password')
        }

        return user
    }
}
