import { OrdersDatasource } from "../../domain/datasources/orders.datasource";
import { UpdateOrderDetailDto } from "../../domain/dtos/orders/update-order-detail.dto";
import { UpdateOrderDto } from "../../domain/dtos/orders/update-order.dto";
import { OrderDetailEntity } from "../../domain/entities/orders/orders-detail.entity";
import { OrdersEntity } from "../../domain/entities/orders/orders.entity";
import { OrdersRepository } from "../../domain/repositories/orders.repository";
import { IOrders } from "../../utils/interfaces/response-paginate.interface";
import { CustomResponse } from "../../utils/response/custom.response";

export class OrdersRepositoryImpl implements OrdersRepository {

    constructor(
        private readonly datasource: OrdersDatasource
    ) { }
    updateOrderDetail(id: string, data: UpdateOrderDetailDto, user_id: string): Promise<CustomResponse | OrderDetailEntity> {
        return this.datasource.updateOrderDetail(id, data, user_id)
    }
    getOrderDetailByOrderId(orderId: string): Promise<CustomResponse | OrdersEntity> {
        return this.datasource.getOrderDetailByOrderId(orderId)
    }
    update(id: string, dto: UpdateOrderDto, user_id: string): Promise<CustomResponse | OrdersEntity> {
        return this.datasource.update(id, dto, user_id)
    }
    cretaeOrderDetail(orderId: string, product_id: string, quantity: number, price: number): Promise<CustomResponse | boolean> {
        return this.datasource.cretaeOrderDetail(orderId, product_id, quantity, price)
    }
    create(user_id: string): Promise<CustomResponse | OrdersEntity> {
        return this.datasource.create(user_id)
    }
    getAll(page: number, per_page: number): Promise<IOrders | CustomResponse> {
        return this.datasource.getAll(page, per_page)
    }
    getAllOrdersByUser(user_id: string): Promise<OrdersEntity[] | CustomResponse> {
        return this.datasource.getAllOrdersByUser(user_id);
    }
    findById(id: string): Promise<OrdersEntity | CustomResponse> {
        return this.datasource.findById(id);
    }
    delete(id: string, user_audits: string): Promise<OrdersEntity | CustomResponse> {
        return this.datasource.delete(id, user_audits);
    }


}