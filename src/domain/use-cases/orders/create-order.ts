import { CustomResponse } from "../../../utils/response/custom.response";
import { OrdersRepository } from "../../repositories/orders.repository";
import { ProductsRepository } from "../../repositories/products.repository";
import { UserRepository } from "../../repositories/user.repository";

export interface CreateOrderUseCase {
    execute(user_id: string, details: IOrderDetail[]): Promise<CustomResponse | string>;
}

export interface IOrderDetail {
    productId: string;
    quantity: number;
}

export class CreateOrder implements CreateOrderUseCase {

    constructor(
        private repository: OrdersRepository,
        private productRepository: ProductsRepository,
        private userRepository: UserRepository
    ) { }
    async execute(user_id: string, details: IOrderDetail[]): Promise<CustomResponse | string> {
        const user = await this.userRepository.findById(user_id);
        if (user instanceof CustomResponse) {
            return user
        }
        const order = await this.repository.create(user.id)

        let total_order = 0
        if (order instanceof CustomResponse) {
            return order
        }

        for (const detail of details) {
            const product = await this.productRepository.findById(detail.productId);

            if (product instanceof CustomResponse) {
                throw new CustomResponse("Product not found", 404);
            }

            // creo el detalle del pedido
            await this.repository.cretaeOrderDetail(order.id, detail.productId, detail.quantity, product.price);

            // voy actualizando  el total del pedido
            total_order += detail.quantity * product.price;
        }
        await this.repository.update(order.id, { total: total_order }, user_id)
        return "Order created successfully"
    }

}