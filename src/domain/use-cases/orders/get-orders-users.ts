import { CustomResponse } from "../../../utils/response/custom.response";
import { OrdersEntity } from "../../entities/orders/orders.entity";
import { OrdersRepository } from "../../repositories/orders.repository";

export interface GetOrdersByUserUseCase {
    execute(user_id: string): Promise<OrdersEntity[] | CustomResponse>;
}

export class GetOrdersByUser implements GetOrdersByUserUseCase {

    constructor(
        private repository: OrdersRepository
    ) { }
    execute(user_id: string): Promise<OrdersEntity[] | CustomResponse> {
        return this.repository.getAllOrdersByUser(user_id)
    }
}