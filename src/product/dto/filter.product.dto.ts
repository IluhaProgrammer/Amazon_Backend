import { IsEnum, IsOptional, IsString } from "class-validator";
import { ProductDto } from "./product.dto";
import { PaginationDto } from "src/pagination/dto/pagination.dto";

export enum EnumProductSort {
    HIGH_PRICE = 'HIGHT_PRICE',
    LOW_PRICE= 'LOW_PRICE',
    NEWEST = 'NEWEST',
    OLDEST ='OLDEST'
}

export class GetAllProductDto extends PaginationDto {
    @IsOptional()
    @IsEnum(EnumProductSort) 
    sort : EnumProductSort

    @IsOptional()
    @IsString()
    searchTerm : string
}