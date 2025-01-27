import { IOrders } from "../../../utils/interfaces/response-paginate.interface";
import { CustomResponse } from "../../../utils/response/custom.response";
import { OrdersRepository } from "../../repositories/orders.repository";

export interface GetOrdersUseCase {
    execute(page: number, per_page: number): Promise<IOrders | CustomResponse>;
}

export class GetOrders implements GetOrdersUseCase {

    constructor(
        private repository: OrdersRepository
    ) { }
    execute(page: number, per_page: number): Promise<IOrders | CustomResponse> {
        return this.repository.getAll(page, per_page)
    }
}