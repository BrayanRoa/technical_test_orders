import { OrdersEntity } from "../../domain/entities/orders/orders.entity";
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

export interface IOrders extends GetAllResponse {
    orders: OrdersEntity[]
}