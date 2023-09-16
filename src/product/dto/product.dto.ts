import { Prisma } from "@prisma/client";
import { ArrayMaxSize, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductDto implements Prisma.ProductUpdateInput {
    @IsString()
    name: string 

    @IsNumber()
    price : number

    @IsOptional()
    @IsString()
    description : string

    @IsString({each: true})
    @ArrayMaxSize(1)
    images : string[]

    @IsNumber()
    categoryId : number
}