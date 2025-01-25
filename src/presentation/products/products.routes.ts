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
         * /users/{id}:
         *  get:
         *    tags: [Users]
         *    summary: Obtiene un usuario por su ID
         *    parameters:
         *      - in: path
         *        name: id
         *        schema:
         *          type: string
         *        required: true
         *        description: ID del usuario
         *    responses:
         *      '200':
         *        description: Operación exitosa
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
         *                data:
         *                  type: object
         *                  properties:
         *                    id:
         *                      type: string
         *                      example: d9df9616-8d10-4992-a20a-8974d30481a8
         *                    created_at:
         *                      type: string
         *                      format: date-time
         *                      example: 2024-04-11T03:44:40.257Z
         *                    updated_at:
         *                      type: string
         *                      format: date-time
         *                      example: 2024-04-11T03:45:02.276Z
         *                    deleted_at:
         *                      type: string
         *                      format: date-time
         *                    name:
         *                      type: string
         *                      example: brayan
         *                    email:
         *                      type: string
         *                      example: brayanandresrl@ufps.edu.co
         *                    email_sent:
         *                      type: boolean
         *                      example: true
         *                    emailValidated:
         *                      type: boolean
         *                      example: true
         */
        // this.router.get(`${prefix}/:id`,
        //     // (req, res, next) => this.middleware.validarJwt(req, res, next), 
        //     [this.middleware.validarJwt],
        //     this.controller.getOne
        // )

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

        // this.router.put(`${prefix}/:id`,
        //     (req, res, next) => this.middleware.validarJwt(req, res, next),
        //     (req, res, next) => this.middleware.validateDto(req, res, next, "update"),
        //     this.controller.update
        // )

        // this.router.delete(`${prefix}/:id`,
        //     (req, res, next) => this.middleware.validarJwt(req, res, next),
        //     this.controller.delete
        // )
    }
}