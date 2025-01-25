import { ProductEntity } from "../../domain/entities/products/products.entity";

interface GetAllResponse {
    meta: {
        totalRecords: number;
        totalPages: number;
        currentPage: number;
        next_page: boolean;
    }
    // perPage: number;
}


export interface IProducts extends GetAllResponse {
    products: ProductEntity[]
}