import { IProducts } from "../../utils/interfaces/response-paginate.interface";
import { CustomResponse } from "../../utils/response/custom.response";
import { CreateProductDto } from "../dtos/products/create-product.dto";
import { UpdateProductDto } from "../dtos/products/update-product.dto";
import { ProductEntity } from "../entities/products/products.entity";
import { UserEntity } from "../entities/users/user.entity";

export abstract class ProductsDatasource {
    abstract create(createProductDto: CreateProductDto, user_audits: string): Promise<ProductEntity | CustomResponse>;
    abstract getAll(page: number, per_page: number): Promise<IProducts | CustomResponse>;
    abstract findById(id: string): Promise<ProductEntity | CustomResponse>;
    abstract update(id: string, updateProductDto: UpdateProductDto, user_audits: string): Promise<ProductEntity | CustomResponse>;
    abstract delete(id: string, user_audits: string): Promise<ProductEntity | CustomResponse>;

}