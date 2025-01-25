import { CustomResponse } from "../../../utils/response/custom.response";
import { ProductEntity } from "../../entities/products/products.entity";
import { ProductsRepository } from "../../repositories/products.repository";

export interface GetOneProductUseCase {
    execute(id: string): Promise<ProductEntity | CustomResponse>;
}

export class GetOneProduct implements GetOneProductUseCase {

    constructor(
        private repository: ProductsRepository
    ) { }
    execute(id: string): Promise<ProductEntity | CustomResponse> {
        return this.repository.findById(id)
    }
}