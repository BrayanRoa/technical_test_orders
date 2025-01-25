import { IProducts } from "../../../utils/interfaces/response-paginate.interface";
import { CustomResponse } from "../../../utils/response/custom.response";
import { ProductEntity } from "../../entities/products/products.entity";
import { ProductsRepository } from "../../repositories/products.repository";

export interface GetProductsUseCase {
    execute(page: number, per_page: number): Promise<IProducts | CustomResponse>;
}

export class GetProducts implements GetProductsUseCase {

    constructor(
        private repository: ProductsRepository
    ) { }
    execute(page: number, per_page: number): Promise<IProducts | CustomResponse> {
        return this.repository.getAll(page, per_page)
    }
}