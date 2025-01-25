import { CustomResponse } from "../../../utils/response/custom.response";
import { ProductEntity } from "../../entities/products/products.entity";
import { ProductsRepository } from "../../repositories/products.repository";

export interface DeleteProductUseCase {
    execute(id: string, user_id: string): Promise<ProductEntity | CustomResponse>;
}

export class DeleteProduct implements DeleteProductUseCase {

    constructor(
        private repository: ProductsRepository
    ) { }
    execute(id: string, user_id: string): Promise<ProductEntity | CustomResponse> {
        return this.repository.delete(id, user_id)
    }
}