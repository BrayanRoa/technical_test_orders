import { Request, Response } from "express";
import { CustomResponse } from "../../utils/response/custom.response";
import { ProductsRepository } from "../../domain/repositories/products.repository";
import { CreatePruduct } from "../../domain/use-cases/products/create-product";
import { GetProducts } from "../../domain/use-cases/products/get-all-products";
import { GetOneProduct } from "../../domain/use-cases/products/get-one-product";
import { UpdateProduct } from "../../domain/use-cases/products/update-product";
import { DeleteProduct } from "../../domain/use-cases/products/delete-product";
import { CreateProductsByDefault } from "../../domain/use-cases/products/create-by-defafault-product";

export class ProductsController {
    constructor(
        private readonly productRepository: ProductsRepository,
    ) { }


    public get = (req: Request, res: Response) => {
        const { page = 1, per_page = 10 } = req.query;
        new GetProducts(this.productRepository)
            .execute(+page, +per_page)
            .then(users => CustomResponse.handleResponse(res, users, 200))
            .catch(err => CustomResponse.handleResponse(res, err))
    }

    public getOne = (req: Request, res: Response) => {
        const id = req.params.id
        new GetOneProduct(this.productRepository)
            .execute(id)
            .then(user => CustomResponse.handleResponse(res, user, 200))
            .catch(err => CustomResponse.handleResponse(res, err))
    }

    public create = (req: Request, res: Response) => {
        console.log("llegue");
        const { userId, ...rest } = req.body
        new CreatePruduct(this.productRepository)
            .execute(rest, userId)
            .then(user => CustomResponse.handleResponse(res, user, 201))
            .catch(err => CustomResponse.handleResponse(res, err))
    }

    public update = async (req: Request, res: Response) => {
        const id = req.params.id
        const { userId, ...rest } = req.body
        new UpdateProduct(this.productRepository)
            .execute(id, rest, userId)
            .then(user => CustomResponse.handleResponse(res, user, 200))
            .catch(err => CustomResponse.handleResponse(res, err))
    }

    public delete = async (req: Request, res: Response) => {
        const id = req.params.id;
        const { userId } = req.body
        new DeleteProduct(this.productRepository)
            .execute(id, userId)
            .then(user => CustomResponse.handleResponse(res, user, 200))
            .catch(err => CustomResponse.handleResponse(res, err))
    }

    public createByDefault = (req: Request, res: Response) => {
        const { userId } = req.body
        new CreateProductsByDefault(this.productRepository)
            .execute(userId)
            .then(user => CustomResponse.handleResponse(res, user, 200))
            .catch(err => CustomResponse.handleResponse(res, err))
    }
}