import { BaseRouter } from "../../utils/router/base.router";
import { OrdersController } from "./orders.controller";
import { OrdersMiddleware } from "./orders.middleware";
import { OrdersRepositoryImpl } from "../../infraestructure/repositories/orders.repository.imp";
import { OrdersDatasourceImp } from "../../infraestructure/datasource/orders.datasource.imp";


export class OrdersRoutes extends BaseRouter<OrdersController, OrdersMiddleware, OrdersRepositoryImpl> {

    constructor() {
        super(OrdersController, OrdersMiddleware, new OrdersRepositoryImpl(new OrdersDatasourceImp));
    }

    routes(): void {
        const prefix = "/orders"

        /**
         * @swagger
         * /orders:
         *  get:
         *    tags: [Orders]
         *    summary: Get all orders.
         *    description: Retrieves a list of all orders with details about the user and products.
         *    responses:
         *      '200':
         *        description: List of orders retrieved successfully.
         *        content:
         *          application/json:
         *            schema:
         *              type: array
         *              items:
         *                type: object
         *                properties:
         *                  id:
         *                    type: string
         *                    example: "d65c1e3e-98f2-4b6b-9a8e-123456789abc"
         *                  userId:
         *                    type: string
         *                    example: "a1b2c3d4e5"
         *                  status:
         *                    type: string
         *                    example: "En preparación"
         *                  total:
         *                    type: number
         *                    example: 150.75
         *                  createdAt:
         *                    type: string
         *                    format: date-time
         *                    example: "2025-01-25T10:00:00Z"
         *                  updatedAt:
         *                    type: string
         *                    format: date-time
         *                    example: "2025-01-26T12:00:00Z"
         *                  deletedAt:
         *                    type: string
         *                    format: date-time
         *                    nullable: true
         *                    example: null
         *                  user:
         *                    type: object
         *                    properties:
         *                      id:
         *                        type: string
         *                        example: "a1b2c3d4e5"
         *                      username:
         *                        type: string
         *                        example: "john_doe"
         *                      email:
         *                        type: string
         *                        example: "johndoe@example.com"
         *                  details:
         *                    type: array
         *                    items:
         *                      type: object
         *                      properties:
         *                        id:
         *                          type: string
         *                          example: "od1e3e-98f2-4b6b-123456789abc"
         *                        orderId:
         *                          type: string
         *                          example: "d65c1e3e-98f2-4b6b-9a8e-123456789abc"
         *                        productId:
         *                          type: string
         *                          example: "p1q2r3s4t5"
         *                        quantity:
         *                          type: integer
         *                          example: 2
         *                        price:
         *                          type: number
         *                          example: 50.25
         *                        product:
         *                          type: object
         *                          properties:
         *                            id:
         *                              type: string
         *                              example: "p1q2r3s4t5"
         *                            name:
         *                              type: string
         *                              example: "Laptop"
         *                            description:
         *                              type: string
         *                              example: "A high-end gaming laptop."
         *                            price:
         *                              type: number
         *                              example: 1200.99
         *                            createdAt:
         *                              type: string
         *                              format: date-time
         *                              example: "2025-01-10T09:00:00Z"
         *                            updatedAt:
         *                              type: string
         *                              format: date-time
         *                              example: "2025-01-15T15:00:00Z"
         *      '500':
         *        description: Internal server error.
         *        content:
         *          application/json:
         *            schema:
         *              type: object
         *              properties:
         *                status:
         *                  type: integer
         *                  example: 500
         *                statusMsg:
         *                  type: string
         *                  example: ERROR
         *                msg:
         *                  type: string
         *                  example: An error occurred while retrieving orders.
         */
        this.router.get(`${prefix}`,
            (req, res, next) => this.middleware.validarJwt(req, res, next),
            this.controller.get
        )

        /**
         * @swagger
         * /orders/user/{userId}:
         *  get:
         *    tags: [Orders]
         *    summary: Get orders by user ID.
         *    description: Retrieves a list of all orders for a specific user by their user ID.
         *    parameters:
         *      - name: userId
         *        in: path
         *        required: true
         *        description: The ID of the user to retrieve orders for.
         *        schema:
         *          type: string
         *          example: "a1b2c3d4e5"
         *    responses:
         *      '200':
         *        description: List of orders retrieved successfully for the specified user.
         *        content:
         *          application/json:
         *            schema:
         *              type: array
         *              items:
         *                type: object
         *                properties:
         *                  id:
         *                    type: string
         *                    example: "d65c1e3e-98f2-4b6b-9a8e-123456789abc"
         *                  userId:
         *                    type: string
         *                    example: "a1b2c3d4e5"
         *                  status:
         *                    type: string
         *                    example: "En preparación"
         *                  total:
         *                    type: number
         *                    example: 150.75
         *                  createdAt:
         *                    type: string
         *                    format: date-time
         *                    example: "2025-01-25T10:00:00Z"
         *                  updatedAt:
         *                    type: string
         *                    format: date-time
         *                    example: "2025-01-26T12:00:00Z"
         *                  deletedAt:
         *                    type: string
         *                    format: date-time
         *                    nullable: true
         *                    example: null
         *                  user:
         *                    type: object
         *                    properties:
         *                      id:
         *                        type: string
         *                        example: "a1b2c3d4e5"
         *                      username:
         *                        type: string
         *                        example: "john_doe"
         *                      email:
         *                        type: string
         *                        example: "johndoe@example.com"
         *                  details:
         *                    type: array
         *                    items:
         *                      type: object
         *                      properties:
         *                        id:
         *                          type: string
         *                          example: "od1e3e-98f2-4b6b-123456789abc"
         *                        orderId:
         *                          type: string
         *                          example: "d65c1e3e-98f2-4b6b-9a8e-123456789abc"
         *                        productId:
         *                          type: string
         *                          example: "p1q2r3s4t5"
         *                        quantity:
         *                          type: integer
         *                          example: 2
         *                        price:
         *                          type: number
         *                          example: 50.25
         *                        product:
         *                          type: object
         *                          properties:
         *                            id:
         *                              type: string
         *                              example: "p1q2r3s4t5"
         *                            name:
         *                              type: string
         *                              example: "Laptop"
         *                            description:
         *                              type: string
         *                              example: "A high-end gaming laptop."
         *                            price:
         *                              type: number
         *                              example: 1200.99
         *                            createdAt:
         *                              type: string
         *                              format: date-time
         *                              example: "2025-01-10T09:00:00Z"
         *                            updatedAt:
         *                              type: string
         *                              format: date-time
         *                              example: "2025-01-15T15:00:00Z"
         *      '404':
         *        description: No orders found for the specified user ID.
         *        content:
         *          application/json:
         *            schema:
         *              type: object
         *              properties:
         *                status:
         *                  type: integer
         *                  example: 404
         *                statusMsg:
         *                  type: string
         *                  example: NOT_FOUND
         *                msg:
         *                  type: string
         *                  example: No orders found for the specified user ID.
         *      '500':
         *        description: Internal server error.
         *        content:
         *          application/json:
         *            schema:
         *              type: object
         *              properties:
         *                status:
         *                  type: integer
         *                  example: 500
         *                statusMsg:
         *                  type: string
         *                  example: ERROR
         *                msg:
         *                  type: string
         *                  example: An error occurred while retrieving orders.
         */
        this.router.get(`${prefix}/user/:userId`,
            (req, res, next) => this.middleware.validarJwt(req, res, next),
            this.controller.getByUser
        )

        /**
         * @swagger
         * /orders:
         *   post:
         *     tags: [Orders]
         *     summary: Create a new order for a user.
         *     description: Creates a new order and associates it with the specified user. It includes the products in the order and their quantities.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - userId
         *               - details
         *             properties:
         *               details:
         *                 type: array
         *                 items:
         *                   type: object
         *                   required:
         *                     - productId
         *                     - quantity
         *                   properties:
         *                     productId:
         *                       type: string
         *                       description: The unique identifier for the product being ordered.
         *                       example: "a8f9b824-b041-4b71-84a0-df4609f0193b"
         *                     quantity:
         *                       type: integer
         *                       description: The quantity of the product being ordered.
         *                       example: 2
         *     responses:
         *       '201':
         *         description: Order created successfully.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 status:
         *                   type: integer
         *                   example: 201
         *                 statusMsg:
         *                   type: string
         *                   example: SUCCESS
         *                 msg:
         *                   type: string
         *                   example: Order created successfully
         *       '400':
         *         description: Invalid input data.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 status:
         *                   type: integer
         *                   example: 400
         *                 statusMsg:
         *                   type: string
         *                   example: ERROR
         *                 msg:
         *                   type: string
         *                   example: Invalid detail structure
         *       '500':
         *         description: Server error.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 status:
         *                   type: integer
         *                   example: 500
         *                 statusMsg:
         *                   type: string
         *                   example: ERROR
         *                 msg:
         *                   type: string
         *                   example: Something went wrong
         */

        this.router.post(`${prefix}`, (req, res, next) => this.middleware.validarJwt(req, res, next), this.controller.create)
    }
}