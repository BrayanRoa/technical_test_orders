import { Request, Response } from "express";
import { OrdersRepository } from "../../domain/repositories/orders.repository";
import { GetOrders } from "../../domain/use-cases/orders/get-all-orders";
import { CustomResponse } from "../../utils/response/custom.response";
import { CreateOrder, IOrderDetail } from "../../domain/use-cases/orders/create-order";
import { container } from "../../infraestructure/dependencies/container";
import { UpdateOrder } from "../../domain/use-cases/orders/update-order";
import { DeleteOrder } from "../../domain/use-cases/orders/delete-order";
import { GetOneOrder } from "../../domain/use-cases/orders/get-one-orders";

export class OrdersController {
    constructor(
        private readonly ordersRepository: OrdersRepository,
    ) { }

    public get = (req: Request, res: Response) => {
        const { page = 1, per_page = 10 } = req.query;
        const { userId } = req.body
        new GetOrders(this.ordersRepository)
            .execute(+page, +per_page, userId)
            .then(users => CustomResponse.handleResponse(res, users, 200))
            .catch(err => CustomResponse.handleResponse(res, err))
    }

    public create = (req: Request, res: Response) => {
        const { userId, details } = req.body;

        try {
            this.validateOrderDetails(details, userId);

            const data: IOrderDetail[] = details;
            new CreateOrder(this.ordersRepository, container.cradle.productRepository)
                .execute(userId, data)
                .then(message => CustomResponse.handleResponse(res, message, 200))
                .catch(err => CustomResponse.handleResponse(res, err));

        } catch (error) {
            if (error instanceof Error) {
                CustomResponse.handleResponse(res, new CustomResponse(error.message, 400), 400);
            } else {
                CustomResponse.handleResponse(res, new CustomResponse("An error occurred while creating the order", 500), 500);
            }
        }
    };

    updateOrder = (req: Request, res: Response) => {
        const { userId, details } = req.body;
        const id = req.params.id;

        try {
            this.validateOrderDetails(details, userId);

            const data: IOrderDetail[] = details;

            new UpdateOrder(this.ordersRepository, container.cradle.productRepository)
                .execute(id, data, userId)
                .then(message => {
                    CustomResponse.handleResponse(res, message, 200);
                })
                .catch(err => {
                    CustomResponse.handleResponse(res, new CustomResponse(err.message, 400), 400);
                });

        } catch (error) {
            if (error instanceof Error) {
                CustomResponse.handleResponse(res, new CustomResponse(error.message, 400), 400);
            } else {
                CustomResponse.handleResponse(res, new CustomResponse("An error occurred while updating the order", 500), 500);
            }
        }
    };

    validateOrderDetails = (details: any[], userId: string) => {
        if (!Array.isArray(details) || details.length === 0) {
            throw new Error("Details must be a non-empty array");
        }

        // Validar cada elemento de `details`
        details.forEach((detail, index) => {
            if (typeof detail.productId !== "string" || detail.productId.trim() === "") {
                throw new Error(`Details[${index}]: productId must be a non-empty string`);
            }
            if (typeof detail.quantity !== "number" || detail.quantity < 0) {
                throw new Error(`Details[${index}]: quantity must be a positive number`);
            }
        });

        // Validar que `userId` sea un string
        if (typeof userId !== "string" || userId.trim() === "") {
            throw new Error("userId must be a non-empty string");
        }
    };


    delete = (req: Request, res: Response) => {
        const id = req.params.id
        const { userId } = req.body

        // Validar que `userId` sea un string
        if (typeof userId !== "string" || userId.trim() === "") {
            throw new Error("userId must be a non-empty string");
        }

        new DeleteOrder(this.ordersRepository)
            .execute(id, userId)
            .then(message => CustomResponse.handleResponse(res, message, 200))
            .catch(err => CustomResponse.handleResponse(res, err)
            )
    }

    getStatus = (req: Request, res: Response) => {
        const id = req.params.id
        const { userId } = req.body
        new GetOneOrder(this.ordersRepository)
            .execute(id, userId)
            .then(message => CustomResponse.handleResponse(res, message, 200))
            .catch(err => CustomResponse.handleResponse(res, err)
            )
    }

}