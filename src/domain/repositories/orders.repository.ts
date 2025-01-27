import { IOrders } from "../../utils/interfaces/response-paginate.interface";
import { CustomResponse } from "../../utils/response/custom.response";
import { UpdateOrderDto } from "../dtos/orders/update-order.dto";
import { OrdersEntity } from "../entities/orders/orders.entity";

export abstract class OrdersRepository {
    // abstract create(createProductDto: CreateProductDto, user_audits: string): Promise<ProductEntity | CustomResponse>;
    abstract getAll(page: number, per_page: number): Promise<IOrders | CustomResponse>;
    abstract getAllOrdersByUser(user_id: string): Promise<OrdersEntity[] | CustomResponse>
    abstract findById(id: string): Promise<OrdersEntity | CustomResponse>;
    // abstract update(id: string, updateProductDto: UpdateProductDto, user_audits: string): Promise<ProductEntity | CustomResponse>;
    abstract delete(id: string, user_audits: string): Promise<OrdersEntity | CustomResponse>;

    abstract create(user_id: string): Promise<CustomResponse | OrdersEntity>
    abstract update(id: string, dto: UpdateOrderDto, user_id: string): Promise<CustomResponse | OrdersEntity>
    abstract cretaeOrderDetail(orderId: string, product_id: string, quantity: number, price: number): Promise<CustomResponse | boolean>

}