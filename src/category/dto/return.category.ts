import { Prisma } from "@prisma/client";


export const returnCategory: Prisma.CategorySelect = {
    id: true,
    name: true,
    slug: true
}