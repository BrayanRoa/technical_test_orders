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
        try {
            const order = await this.repository.getOrderDetailByOrderId(id_order);
            if (order instanceof CustomResponse) {
                return order;  // Retorna CustomResponse si la orden no existe o hay un error
            }

            let total = 0;

            for (const detail of details) {
                for (const a of order.detail!) {
                    if (a.productId === detail.productId && a.quantity !== detail.quantity) {
                        const product = await this.productRepository.findById(detail.productId);
                        if (product instanceof CustomResponse) {
                            return new CustomResponse("Product not found", 404);
                        }

                        // Calcular la diferencia de cantidad
                        const quantityDifference = detail.quantity - a.quantity;

                        if (quantityDifference > 0) {
                            // Si la nueva cantidad es mayor, aseguramos que haya stock suficiente
                            if (product.stock < quantityDifference) {
                                return new CustomResponse(`Not enough stock for product: ${product.name}`, 400);
                            }
                            // Actualizamos el stock restando la diferencia
                            await this.productRepository.update(detail.productId, { stock: product.stock - quantityDifference }, user_id);
                        } else if (quantityDifference < 0) {
                            // Si la nueva cantidad es menor, sumamos la diferencia al stock
                            await this.productRepository.update(detail.productId, { stock: product.stock + Math.abs(quantityDifference) }, user_id);
                        }

                        // Actualizar el detalle de la orden con la nueva cantidad
                        a.quantity = detail.quantity;
                        total += a.quantity * a.price;

                        // Actualizar el detalle en la base de datos
                        await this.repository.updateOrderDetail(a.id, { quantity: detail.quantity }, user_id);
                    } else {
                        // Si no hay cambio en la cantidad, simplemente sumamos al total
                        total += a.quantity * a.price;
                    }
                }
            }

            // Actualizar el total de la orden
            await this.repository.update(id_order, { total }, user_id);

            return "Order updated successfully";  // Mensaje de éxito

        } catch (error) {
            // Manejo de errores
            if (error instanceof CustomResponse) {
                return error;
            }
            return new CustomResponse("An error occurred while updating the order", 500);
        }
    }
}
