import { CreateOrderDto } from "../../domain/dtos/orders/create-order.dto";
import { UpdateOrderDto } from "../../domain/dtos/orders/update-order.dto";
import { SharedMiddleware } from "../../utils/middleware/base.middleware";

export class OrdersMiddleware extends SharedMiddleware<CreateOrderDto, UpdateOrderDto> {
    constructor() {
        super(CreateOrderDto, UpdateOrderDto)
    }
}   