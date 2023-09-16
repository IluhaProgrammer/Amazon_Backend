import { Prisma } from "@prisma/client"


export const ReturnUser: Prisma.UserSelect = {
    id: true,
    email: true,
    name: true,
    avatarPath: true,
    password: false,
    phone: true
}

export const returnFavorite = {
    id: true,
    name: true,
    price: true,
    images: true,
    slug: true
}