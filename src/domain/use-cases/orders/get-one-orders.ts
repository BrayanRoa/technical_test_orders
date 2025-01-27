import { CustomResponse } from "../../../utils/response/custom.response";
import { OrdersEntity } from "../../entities/orders/orders.entity";
import { OrdersRepository } from "../../repositories/orders.repository";

export interface GetOneOrderUseCase {
    execute(id: string, user_id: string): Promise<OrdersEntity | CustomResponse>;
}


export class GetOneOrder implements GetOneOrderUseCase {

    constructor(
        private repository: OrdersRepository,
    ) { }
    execute(id: string, user_id: string): Promise<OrdersEntity | CustomResponse> {
        return this.repository.findById(id, user_id)
    }

}