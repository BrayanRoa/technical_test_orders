import { BaseRouter } from "../../utils/router/base.router";
import { ProductsController } from "./products.controller";
import { ProductMiddleware } from "./products.middleware";
import { ProductsRepositoryImpl } from '../../infraestructure/repositories/products.repository.imp';
import { ProductDatasourceImp } from '../../infraestructure/datasource/products.datasource.imp';


export class ProductsRoutes extends BaseRouter<ProductsController, ProductMiddleware, ProductsRepositoryImpl> {

    constructor() {
        super(ProductsController, ProductMiddleware, new ProductsRepositoryImpl(new ProductDatasourceImp));
    }

    routes(): void {
        const prefix = "/products"
        /**
         * @swagger
         * /products:
         *  get:
         *    tags: [Products]
         *    summary: Get all products.
         *    description: Retrieves a list of all products available in the system.
         *    parameters:
         *      - in: query
         *        name: page
         *        schema:
         *          type: integer
         *          default: 1
         *        description: Page number for the results pagination.
         *      - in: query
         *        name: per_page
         *        schema:
         *          type: integer
         *          default: 10
         *        description: Number of results to return per page.
         *    responses:
         *      '200':
         *        description: List of products retrieved successfully.
         *        content:
         *          application/json:
         *            schema:
         *              type: array
         *              items:
         *                type: object
         *                properties:
         *                  id:
         *                    type: string
         *                    example: "abc123"
         *                  name:
         *                    type: string
         *                    example: "Laptop"
         *                  description:
         *                    type: string
         *                    example: "A high-performance laptop for professionals."
         *                  price:
         *                    type: number
         *                    example: 999.99
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
         *                  example: An error occurred while retrieving products.
         */
        this.router.get(`${prefix}`,
            (req, res, next) => this.middleware.validarJwt(req, res, next),
            this.controller.get
        )

        /**
         * @swagger
         * /products:
         *  post:
         *    tags: [Products]
         *    summary: Create a new product.
         *    description: Creates a new product with the provided details.
         *    requestBody:
         *      required: true
         *      content:
         *        application/json:
         *          schema:
         *            type: object
         *            properties:
         *              name:
         *                type: string
         *                example: "Laptop"
         *              description:
         *                type: string
         *                example: "A high-performance laptop for professionals."
         *              price:
         *                type: number
         *                format: float
         *                example: 999.99
         *    responses:
         *      '201':
         *        description: Product created successfully.
         *        content:
         *          application/json:
         *            schema:
         *              type: object
         *              properties:
         *                status:
         *                  type: integer
         *                  example: 201
         *                statusMsg:
         *                  type: string
         *                  example: SUCCESS
         *                msg:
         *                  type: string
         *                  example: Product created successfully.
         *                data:
         *                  type: object
         *                  properties:
         *                    id:
         *                      type: string
         *                      example: "abc123"
         *                    name:
         *                      type: string
         *                      example: "Laptop"
         *                    description:
         *                      type: string
         *                      example: "A high-performance laptop for professionals."
         *                    price:
         *                      type: number
         *                      example: 999.99
         *      '400':
         *        description: Invalid input data.
         *        content:
         *          application/json:
         *            schema:
         *              type: object
         *              properties:
         *                status:
         *                  type: integer
         *                  example: 400
         *                statusMsg:
         *                  type: string
         *                  example: ERROR
         *                msg:
         *                  type: string
         *                  example: Invalid input data.
         */
        this.router.post(`${prefix}`,
            (req, res, next) => this.middleware.validarJwt(req, res, next),
            (req, res, next) => this.middleware.validateDto(req, res, next, "create"),
            this.controller.create
        )

        /**
         * @swagger
         * /products/{id}:
         *  get:
         *    tags: [Products]
         *    summary: Get a single product.
         *    description: Retrieves the details of a product by its ID.
         *    parameters:
         *      - in: path
         *        name: id
         *        required: true
         *        schema:
         *          type: string
         *        description: The ID of the product to retrieve.
         *    responses:
         *      '200':
         *        description: Product retrieved successfully.
         *        content:
         *          application/json:
         *            schema:
         *              type: object
         *              properties:
         *                id:
         *                  type: string
         *                  example: "abc123"
         *                name:
         *                  type: string
         *                  example: "Laptop"
         *                description:
         *                  type: string
         *                  example: "A high-performance laptop for professionals."
         *                price:
         *                  type: number
         *                  example: 999.99
         *      '404':
         *        description: Product not found.
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
         *                  example: ERROR
         *                msg:
         *                  type: string
         *                  example: Product not found.
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
         *                  example: An error occurred while retrieving the product.
         */
        this.router.get(`${prefix}/:id`,
            (req, res, next) => this.middleware.validarJwt(req, res, next),
            this.controller.getOne
        )

        /**
         * @swagger
         * /products/{id}:
         *  patch:
         *    tags: [Products]
         *    summary: Update a product.
         *    description: Updates the details of an existing product by its ID.
         *    parameters:
         *      - in: path
         *        name: id
         *        required: true
         *        schema:
         *          type: string
         *        description: The ID of the product to update.
         *    requestBody:
         *      required: true
         *      content:
         *        application/json:
         *          schema:
         *            type: object
         *            properties:
         *              name:
         *                type: string
         *                example: "Updated Laptop"
         *              description:
         *                type: string
         *                example: "An updated description for the laptop."
         *              price:
         *                type: number
         *                example: 1099.99
         *    responses:
         *      '200':
         *        description: Product updated successfully.
         *        content:
         *          application/json:
         *            schema:
         *              type: object
         *              properties:
         *                status:
         *                  type: integer
         *                  example: 200
         *                statusMsg:
         *                  type: string
         *                  example: SUCCESS
         *                msg:
         *                  type: string
         *                  example: Product updated successfully.
         *                data:
         *                  type: object
         *                  properties:
         *                    id:
         *                      type: string
         *                      example: "abc123"
         *                    name:
         *                      type: string
         *                      example: "Updated Laptop"
         *                    description:
         *                      type: string
         *                      example: "An updated description for the laptop."
         *                    price:
         *                      type: number
         *                      example: 1099.99
         *      '400':
         *        description: Invalid input data.
         *        content:
         *          application/json:
         *            schema:
         *              type: object
         *              properties:
         *                status:
         *                  type: integer
         *                  example: 400
         *                statusMsg:
         *                  type: string
         *                  example: ERROR
         *                msg:
         *                  type: string
         *                  example: Invalid input data.
         *      '404':
         *        description: Product not found.
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
         *                  example: ERROR
         *                msg:
         *                  type: string
         *                  example: Product not found.
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
         *                  example: An error occurred while updating the product.
         */
        this.router.patch(`${prefix}/:id`,
            (req, res, next) => this.middleware.validarJwt(req, res, next),
            (req, res, next) => this.middleware.validateDto(req, res, next, "update"),
            this.controller.update
        )

        /**
         * @swagger
         * /products/{id}:
         *  delete:
         *    tags: [Products]
         *    summary: Delete a product.
         *    description: Deletes a product by its ID.
         *    parameters:
         *      - in: path
         *        name: id
         *        required: true
         *        schema:
         *          type: string
         *        description: The ID of the product to delete.
         *    responses:
         *      '200':
         *        description: Product deleted successfully.
         *        content:
         *          application/json:
         *            schema:
         *              type: object
         *              properties:
         *                status:
         *                  type: integer
         *                  example: 200
         *                statusMsg:
         *                  type: string
         *                  example: SUCCESS
         *                msg:
         *                  type: string
         *                  example: Product deleted successfully.
         *      '404':
         *        description: Product not found.
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
         *                  example: ERROR
         *                msg:
         *                  type: string
         *                  example: Product not found.
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
         *                  example: An error occurred while deleting the product.
         */
        this.router.delete(`${prefix}/:id`,
            (req, res, next) => this.middleware.validarJwt(req, res, next),
            this.controller.delete
        )

    }
}