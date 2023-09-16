import { IsString } from "class-validator";

export class CategorySlug {
    @IsString()
    name : string

    @IsString()
    slug : string
}