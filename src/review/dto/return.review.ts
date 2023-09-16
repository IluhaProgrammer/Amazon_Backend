import { Prisma } from "@prisma/client";
import { ReturnUser } from "src/user/dto/return.user";

export const returnReview: Prisma.ReviewSelect = {
    user: {
        select: {
            ...ReturnUser
        }
    },
    id : true,
    createdAt: true,
    raiting: true,
    text: true
}