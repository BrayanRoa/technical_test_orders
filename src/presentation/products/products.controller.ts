import { Request, Response } from "express";
import { UserRepository } from "../../domain/repositories/user.repository";
import { GetUsers } from "../../domain/use-cases/users/get-users";
import { GetUser } from "../../domain/use-cases/users/get-user";
import { CreateUser } from "../../domain/use-cases/users/create-user";
import { UpdateUser } from "../../domain/use-cases/users/update-user";
import { DeleteUser } from "../../domain/use-cases/users/delete-user";
import { CustomResponse } from "../../utils/response/custom.response";
import { EmailService } from "../../utils/emails/email.service";
import { envs } from "../../config/envs";
import { ProductsRepository } from "../../domain/repositories/products.repository";
import { CreatePruduct } from "../../domain/use-cases/products/create-product";
import { GetProducts } from "../../domain/use-cases/products/get-all-products";

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

    // public getOne = (req: Request, res: Response) => {
    //     const id = req.params.id
    //     new GetUser(this.userRepository)
    //         .execute(id)
    //         .then(user => CustomResponse.handleResponse(res, user, 200))
    //         .catch(err => CustomResponse.handleResponse(res, err))
    // }

    public create = (req: Request, res: Response) => {
        console.log("llegue");
        const { email_user, ...rest } = req.body
        new CreatePruduct(this.productRepository)
            .execute(rest, email_user)
            .then(user => CustomResponse.handleResponse(res, user, 201))
            .catch(err => CustomResponse.handleResponse(res, err))
    }

    // public update = async (req: Request, res: Response) => {
    //     const id = req.params.id
    //     const { email_user, ...rest } = req.body
    //     new UpdateUser(this.userRepository)
    //         .execute(id, rest, email_user)
    //         .then(user => CustomResponse.handleResponse(res, user, 200))
    //         .catch(err => CustomResponse.handleResponse(res, err))
    // }

    // public delete = async (req: Request, res: Response) => {
    //     const id = req.params.id;
    //     const { email_user } = req.body
    //     new DeleteUser(this.userRepository)
    //         .execute(id, email_user)
    //         .then(user => CustomResponse.handleResponse(res, user, 200))
    //         .catch(err => CustomResponse.handleResponse(res, err))
    // }
}