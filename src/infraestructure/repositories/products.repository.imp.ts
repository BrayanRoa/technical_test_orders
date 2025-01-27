import { ProductsDatasource } from "../../domain/datasources/products.datasource";
import { CreateProductDto } from "../../domain/dtos/products/create-product.dto";
import { UpdateProductDto } from "../../domain/dtos/products/update-product.dto";
import { ProductEntity } from "../../domain/entities/products/products.entity";
import { UserEntity } from "../../domain/entities/users/user.entity";
import { ProductsRepository } from "../../domain/repositories/products.repository";
import { IProducts } from "../../utils/interfaces/response-paginate.interface";
import { CustomResponse } from "../../utils/response/custom.response";

export class ProductsRepositoryImpl implements ProductsRepository {

    constructor(
        private readonly productDatasource: ProductsDatasource
    ) { }
    create(createProductDto: CreateProductDto, user_audits: string): Promise<ProductEntity | CustomResponse> {
        return this.productDatasource.create(createProductDto, user_audits)
    }
    getAll(page: number, per_page: number): Promise<IProducts | CustomResponse> {
        return this.productDatasource.getAll(page, per_page)
    }
    findById(id: string): Promise<ProductEntity | CustomResponse> {
        return this.productDatasource.findById(id)
    }
    update(id: string, updateProductDto: UpdateProductDto, user_audits: string): Promise<ProductEntity | CustomResponse> {
        return this.productDatasource.update(id, updateProductDto, user_audits)
    }
    delete(id: string, user_audits: string): Promise<ProductEntity | CustomResponse> {
        return this.productDatasource.delete(id, user_audits)
    }

}