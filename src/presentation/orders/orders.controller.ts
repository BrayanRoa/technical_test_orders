import { Request, Response } from "express";
import { OrdersRepository } from "../../domain/repositories/orders.repository";
import { GetOrders } from "../../domain/use-cases/orders/get-all-orders";
import { CustomResponse } from "../../utils/response/custom.response";
import { GetOrdersByUser } from "../../domain/use-cases/orders/get-orders-users";
import { CreateOrder, IOrderDetail } from "../../domain/use-cases/orders/create-order";
import { container } from "../../infraestructure/dependencies/container";
import { UpdateOrder } from "../../domain/use-cases/orders/update-order";

export class OrdersController {
    constructor(
        private readonly ordersRepository: OrdersRepository,
    ) { }

    public get = (req: Request, res: Response) => {
        const { page = 1, per_page = 10 } = req.query;
        new GetOrders(this.ordersRepository)
            .execute(+page, +per_page)
            .then(users => CustomResponse.handleResponse(res, users, 200))
            .catch(err => CustomResponse.handleResponse(res, err))
    }

    public getByUser = (req: Request, res: Response) => {
        const userId = req.params.userId;
        new GetOrdersByUser(this.ordersRepository)
            .execute(userId)
            .then(orders => CustomResponse.handleResponse(res, orders, 200))
            .catch(err => CustomResponse.handleResponse(res, err))
    }

    public create = (req: Request, res: Response) => {
        const { email_user, details } = req.body

        if (!Array.isArray(details) || details.length === 0) {
            throw new Error("Details must be a non-empty array");
        }

        // Validar cada elemento de `details`
        details.forEach((detail, index) => {
            if (typeof detail.productId !== "string" || detail.productId.trim() === "") {
                throw new Error(`Details[${index}]: productId must be a non-empty string`);
            }
            if (typeof detail.quantity !== "number" || detail.quantity <= 0) {
                throw new Error(`Details[${index}]: quantity must be a positive number`);
            }
        });

        // Validar que `userId` sea un string
        if (typeof email_user !== "string" || email_user.trim() === "") {
            throw new Error("userId must be a non-empty string");
        }

        const data: IOrderDetail[] = details
        new CreateOrder(this.ordersRepository, container.cradle.productRepository, container.cradle.userRepository)
            .execute(email_user, data)
            .then(message => CustomResponse.handleResponse(res, message, 200))
            .catch(err => CustomResponse.handleResponse(res, err)
            )
    }


    updateOrder = (req: Request, res: Response) => {
        const { email_user, details } = req.body
        const id = req.params.id
        console.log({id});
        if (!Array.isArray(details) || details.length === 0) {
            throw new Error("Details must be a non-empty array");
        }

        // Validar cada elemento de `details`
        details.forEach((detail, index) => {
            if (typeof detail.productId !== "string" || detail.productId.trim() === "") {
                throw new Error(`Details[${index}]: productId must be a non-empty string`);
            }
            if (typeof detail.quantity !== "number" || detail.quantity <= 0) {
                throw new Error(`Details[${index}]: quantity must be a positive number`);
            }
        });

        // Validar que `userId` sea un string
        if (typeof email_user !== "string" || email_user.trim() === "") {
            throw new Error("userId must be a non-empty string");
        }

        const data: IOrderDetail[] = details
        new UpdateOrder(this.ordersRepository, container.cradle.productRepository, container.cradle.userRepository)
            .execute(id, data, email_user)
            .then(message => CustomResponse.handleResponse(res, message, 200))
            .catch(err => CustomResponse.handleResponse(res, err)
            )
    }

}