import { OrderStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsEnum, IsNumber, IsOptional, ValidateNested } from "class-validator";

export class OrderDto {
    @IsOptional()
    @IsEnum(OrderStatus)
    status: OrderStatus

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => OrderItemDto)
    items: OrderItemDto[]
}


export class OrderItemDto {
    @IsNumber()
    quantity: number

    @IsNumber()
    price: number

    @IsNumber()
    productId: number

}