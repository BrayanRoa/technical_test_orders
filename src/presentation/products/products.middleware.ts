import { CreateProductDto } from "../../domain/dtos/products/create-product.dto";
import { UpdateProductDto } from "../../domain/dtos/products/update-product.dto";
import { SharedMiddleware } from "../../utils/middleware/base.middleware";

export class ProductMiddleware extends SharedMiddleware<CreateProductDto, UpdateProductDto> {

    constructor() {
        super(CreateProductDto, UpdateProductDto)
    }
}