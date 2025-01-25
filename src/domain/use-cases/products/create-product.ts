import { CustomResponse } from "../../../utils/response/custom.response";
import { CreateProductDto } from "../../dtos/products/create-product.dto";
import { ProductEntity } from "../../entities/products/products.entity";
import { ProductsRepository } from "../../repositories/products.repository";

export interface CreateProducUseCase {
    execute(dto: CreateProductDto, user_audits: string): Promise<ProductEntity | undefined | CustomResponse>;
}


export class CreatePruduct implements CreateProducUseCase {

    constructor(
        private repository: ProductsRepository
    ) { }
    execute(dto: CreateProductDto, user_audits: string): Promise<ProductEntity | undefined | CustomResponse> {
        console.log(dto, user_audits);
        return this.repository.create(dto, user_audits)
    }
}