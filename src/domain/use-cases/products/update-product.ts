import { CustomResponse } from "../../../utils/response/custom.response";
import { UpdateProductDto } from "../../dtos/products/update-product.dto";
import { ProductEntity } from "../../entities/products/products.entity";
import { ProductsRepository } from "../../repositories/products.repository";

export interface UpdateProductUseCase {
    execute(id: string, dto: UpdateProductDto, user_audits: string): Promise<ProductEntity | undefined | CustomResponse>;
}


export class UpdateProduct implements UpdateProductUseCase {

    constructor(
        private repository: ProductsRepository
    ) { }
    execute(id: string, dto: UpdateProductDto, user_audits: string): Promise<ProductEntity | undefined | CustomResponse> {
        console.log(dto, user_audits);
        return this.repository.update(id, dto, user_audits)
    }
}