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

            // Primero, agregar o actualizar los detalles de la orden sin calcular el total
            for (const detail of details) {
                let productFound = false;  // Para verificar si el producto ya está en la orden

                for (const a of order.detail!) {
                    if (a.productId === detail.productId) {
                        // Si el producto ya existe, actualizamos la cantidad
                        const quantityDifference = detail.quantity - a.quantity;

                        if (quantityDifference > 0) {
                            // Si la nueva cantidad es mayor, aseguramos que haya stock suficiente
                            const product = await this.productRepository.findById(detail.productId);
                            if (product instanceof CustomResponse) {
                                return new CustomResponse("Product not found", 404);
                            }

                            if (product.stock < quantityDifference) {
                                return new CustomResponse(`Not enough stock for product: ${product.name}`, 400);
                            }

                            // Actualizamos el stock restando la diferencia
                            await this.productRepository.update(detail.productId, { stock: product.stock - quantityDifference }, user_id);
                        } else if (quantityDifference < 0) {
                            // Si la nueva cantidad es menor, sumamos la diferencia al stock
                            const product = await this.productRepository.findById(detail.productId);
                            if (product instanceof CustomResponse) {
                                return new CustomResponse("Product not found", 404);
                            }

                            await this.productRepository.update(detail.productId, { stock: product.stock + Math.abs(quantityDifference) }, user_id);
                        }

                        // Actualizar el detalle de la orden con la nueva cantidad
                        a.quantity = detail.quantity;

                        // Actualizar el detalle en la base de datos
                        await this.repository.updateOrderDetail(a.id, { quantity: detail.quantity }, user_id);
                        productFound = true;
                        break; // Producto encontrado, salimos del ciclo
                    }
                }

                // Si el producto no estaba en la orden, lo agregamos
                if (!productFound) {
                    const product = await this.productRepository.findById(detail.productId);
                    if (product instanceof CustomResponse) {
                        return new CustomResponse("Product not found", 404);
                    }

                    // Agregar el nuevo producto a la base de datos
                    await this.repository.cretaeOrderDetail(order.id, detail.productId, detail.quantity, product.price);
                    await this.productRepository.update(detail.productId, { stock: product.stock - detail.quantity }, user_id);
                }
            }

            // Ahora calculamos el total de la orden sumando todos los detalles
            let total = 0;
            const orderDetails = await this.repository.getOrderDetailByOrderId(id_order);
            if (orderDetails instanceof CustomResponse) {
                return orderDetails;  // Retorna CustomResponse si la orden no existe o hay un error
            }
            for (const detail of orderDetails.detail!) {
                const product = await this.productRepository.findById(detail.productId);
                if (product instanceof CustomResponse) {
                    return new CustomResponse("Product not found", 404);
                }
                total += detail.quantity * product.price;
            }

            // Actualizamos el total de la orden con la suma
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
