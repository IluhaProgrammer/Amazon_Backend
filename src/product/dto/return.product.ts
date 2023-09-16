import { Prisma } from "@prisma/client";
import { returnCategory } from "src/category/dto/return.category";
import { returnReview } from "src/review/dto/return.review";

export const returnProduct : Prisma.ProductSelect= {
    name: true,
    slug: true,
    price: true,
    id: true,
    images: true,
    createdAt: true,
    description: true,
    category: {
        select: {
            ...returnCategory
        }
    },
    reviews: {
        select: {
            ...returnReview
        }
    }
}

export const returnProductObjFulliest : Prisma.ProductSelect= {
    ...returnProduct,
    reviews: {
        select: {
            ...returnReview
        }
    },
    category: {
        select: {
            ...returnCategory
        }
    }
}