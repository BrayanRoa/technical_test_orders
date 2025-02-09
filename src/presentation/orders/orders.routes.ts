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
         *    parameters:
         *      - name: page
         *        in: query
         *        description: Page number for pagination.
         *        required: false
         *        schema:
         *          type: integer
         *          example: 1
         *      - name: per_page
         *        in: query
         *        description: Number of orders per page.
         *        required: false
         *        schema:
         *          type: integer
         *          example: 10
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
        this.router.post(`${prefix}`,
            (req, res, next) => this.middleware.validarJwt(req, res, next),
            this.controller.create)

        /**
         * @swagger
         * /orders/{id}:
         *   put:
         *     tags: [Orders]
         *     summary: Update an existing order.
         *     description: Updates an order with new details and the user email.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         description: The ID of the order to update.
         *         schema:
         *           type: string
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - email_user
         *               - details
         *             properties:
         *               details:
         *                 type: array
         *                 description: Array of product details to update the order.
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
         *                       description: The quantity of the product.
         *                       example: 3
         *     responses:
         *       '200':
         *         description: Order updated successfully.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 status:
         *                   type: integer
         *                   example: 200
         *                 statusMsg:
         *                   type: string
         *                   example: SUCCESS
         *                 msg:
         *                   type: string
         *                   example: Order updated successfully.
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
         *                   example: Invalid input details.
         *       '404':
         *         description: Order or user not found.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 status:
         *                   type: integer
         *                   example: 404
         *                 statusMsg:
         *                   type: string
         *                   example: ERROR
         *                 msg:
         *                   type: string
         *                   example: Order or user not found.
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
         *                   example: Something went wrong.
         */
        this.router.put(`${prefix}/:id`,
            (req, res, next) => this.middleware.validarJwt(req, res, next),
            this.controller.updateOrder)

        /**
         * @swagger
         * /orders/{id}:
         *   delete:
         *     tags:
         *       - Orders
         *     summary: Delete an order by its ID
         *     description: Deletes an existing order by its ID. Requires a valid JWT token for authentication.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The unique identifier of the order to delete.
         *     responses:
         *       200:
         *         description: Order deleted successfully.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 status:
         *                   type: integer
         *                   example: 200
         *                 statusMsg:
         *                   type: string
         *                   example: SUCCESS
         *                 msg:
         *                   type: string
         *                   example: Order deleted successfully
         *       400:
         *         description: Invalid order ID.
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
         *                   example: Invalid order ID
         *       401:
         *         description: Unauthorized. Missing or invalid JWT token.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 status:
         *                   type: integer
         *                   example: 401
         *                 statusMsg:
         *                   type: string
         *                   example: ERROR
         *                 msg:
         *                   type: string
         *                   example: Unauthorized
         *       404:
         *         description: Order not found.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 status:
         *                   type: integer
         *                   example: 404
         *                 statusMsg:
         *                   type: string
         *                   example: ERROR
         *                 msg:
         *                   type: string
         *                   example: Order not found
         *       500:
         *         description: Internal server error.
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
        this.router.delete(`${prefix}/:id`,
            (req, res, next) => this.middleware.validarJwt(req, res, next),
            this.controller.delete)

        /**
         * @swagger
         * /orders/{id}/status:
         *   get:
         *     tags:
         *       - Orders
         *     summary: Get a single order by its ID
         *     description: Retrieves the details of an existing order using its unique identifier. Requires a valid JWT token for authentication.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The unique identifier of the order to retrieve.
         *     responses:
         *       200:
         *         description: Order retrieved successfully.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 status:
         *                   type: integer
         *                   example: 200
         *                 statusMsg:
         *                   type: string
         *                   example: SUCCESS
         *                 data:
         *                   type: object
         *                   properties:
         *                     id:
         *                       type: string
         *                       description: The unique identifier of the order.
         *                       example: "123e4567-e89b-12d3-a456-426614174000"
         *                     userId:
         *                       type: string
         *                       description: The ID of the user who placed the order.
         *                       example: "user-456"
         *                     status:
         *                       type: string
         *                       description: The status of the order.
         *                       example: "COMPLETED"
         *                     total:
         *                       type: number
         *                       description: The total cost of the order.
         *                       example: 150.5
         *                     detail:
         *                       type: array
         *                       items:
         *                         type: object
         *                         properties:
         *                           productId:
         *                             type: string
         *                             description: The unique identifier of the product.
         *                             example: "product-123"
         *                           quantity:
         *                             type: integer
         *                             description: The quantity of the product ordered.
         *                             example: 2
         *                           price:
         *                             type: number
         *                             description: The price of the product.
         *                             example: 75.25
         *       400:
         *         description: Invalid order ID.
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
         *                   example: Invalid order ID
         *       401:
         *         description: Unauthorized. Missing or invalid JWT token.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 status:
         *                   type: integer
         *                   example: 401
         *                 statusMsg:
         *                   type: string
         *                   example: ERROR
         *                 msg:
         *                   type: string
         *                   example: Unauthorized
         *       404:
         *         description: Order not found.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 status:
         *                   type: integer
         *                   example: 404
         *                 statusMsg:
         *                   type: string
         *                   example: ERROR
         *                 msg:
         *                   type: string
         *                   example: Order not found
         *       500:
         *         description: Internal server error.
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
        this.router.get(`${prefix}/:id/status`,
            (req, res, next) => this.middleware.validarJwt(req, res, next),
            this.controller.getStatus)
    }
}