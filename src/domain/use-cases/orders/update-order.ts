import { CustomResponse } from "../../../utils/response/custom.response";
import { OrdersRepository } from "../../repositories/orders.repository";
import { ProductsRepository } from "../../repositories/products.repository";
import { UserRepository } from "../../repositories/user.repository";

export interface UpdateOrderUseCase {
    execute(id_order: string, details: IOrderDetail[], user_id: string): Promise<CustomResponse | string>;
}

export interface IOrderDetail {
    productId: string;
    quantity: number;
}

export class UpdateOrder implements UpdateOrderUseCase {

    constructor(
        private repository: OrdersRepository,
        private productRepository: ProductsRepository,
        private userRepository: UserRepository
    ) { }
    async execute(id_order: string, details: IOrderDetail[], user_id: string): Promise<CustomResponse | string> {
        const order = await this.repository.getOrderDetailByOrderId(id_order);
        if (order instanceof CustomResponse) {
            return order
        }
        let total = 0
        for (const detail of details) {
            order.detail!.map(async (a) => {
                if (a.productId === detail.productId && a.quantity !== detail.quantity) {
                    a.quantity = detail.quantity
                    total += a.quantity * a.price
                    // actualizar el quantity de la order
                    await this.repository.updateOrderDetail(a.id, { quantity: detail.quantity }, user_id)
                } else {
                    total += a.quantity * a.price
                }
            })
        }
        // if (total !== order.total) {
        // actualizar el total de la order
        await this.repository.update(id_order, { total }, '')
        // }

        return "Order updated successfully"
    }

}