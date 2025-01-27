import { CustomResponse } from "../../../utils/response/custom.response";
import { OrdersRepository } from "../../repositories/orders.repository";

export interface DeleteOrderUseCase {
    execute(id: string, user_id: string): Promise<string | CustomResponse>;
}


export class DeleteOrder implements DeleteOrderUseCase {

    constructor(
        private repository: OrdersRepository  // inject repository here to use its methods for delete operation.  // replace with actual repository instance.  // example: private repository: OrdersRepository = new OrdersRepository()
    ) { }
    async execute(id: string, user_id: string): Promise<string | CustomResponse> {
        const response = await this.repository.delete(id, user_id)
        if (response instanceof CustomResponse) {
            return response
        }
        return "order deleted successfully"
    }

}