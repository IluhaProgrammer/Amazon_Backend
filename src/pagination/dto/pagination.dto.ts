import { IsOptional, IsString } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsString()
    page : number

    @IsOptional()
    @IsString()
    limit : number
}