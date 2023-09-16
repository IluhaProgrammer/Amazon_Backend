import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class PaginationService {

    constructor(private Prisma : PrismaService) {}

    getPagination(dto : PaginationDto, defaultLimit : number = 30) {
        const page = dto.page ? +dto.page : 1
        const limit = dto.limit ? +dto.limit : defaultLimit

        const skip = (page - 1) * limit

        return {limit, skip}
    }

}
