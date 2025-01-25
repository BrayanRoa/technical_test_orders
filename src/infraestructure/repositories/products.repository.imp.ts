import { ProductsDatasource } from "../../domain/datasources/products-datasource";
import { CreateProductDto } from "../../domain/dtos/products/create-product.dto";
import { UpdateProductDto } from "../../domain/dtos/products/update-product.dto";
import { ProductEntity } from "../../domain/entities/products/products.entity";
import { UserEntity } from "../../domain/entities/users/user.entity";
import { ProductsRepository } from "../../domain/repositories/products.repository";
import { IProducts } from "../../utils/interfaces/response-paginate.interface";
import { CustomResponse } from "../../utils/response/custom.response";

export class ProductsRepositoryImpl implements ProductsRepository {

    constructor(
        private readonly datasource: ProductsDatasource
    ) { }
    create(createProductDto: CreateProductDto, user_audits: string): Promise<ProductEntity | CustomResponse> {
        return this.datasource.create(createProductDto, user_audits)
    }
    getAll(page: number, per_page: number): Promise<IProducts | CustomResponse> {
        return this.datasource.getAll(page, per_page)
    }
    findById(id: string): Promise<ProductEntity | CustomResponse> {
        return this.datasource.findById(id)
    }
    update(id: string, updateProductDto: UpdateProductDto, user_audits: string): Promise<ProductEntity | CustomResponse> {
        return this.datasource.update(id, updateProductDto, user_audits)
    }
    delete(id: string, user_audits: string): Promise<ProductEntity | CustomResponse> {
        return this.datasource.delete(id, user_audits)
    }

}