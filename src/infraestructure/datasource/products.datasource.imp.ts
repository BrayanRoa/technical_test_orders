import { Prisma } from "@prisma/client";
import { ProductsDatasource } from "../../domain/datasources/products-datasource";
import { CreateProductDto } from "../../domain/dtos/products/create-product.dto";
import { UpdateProductDto } from "../../domain/dtos/products/update-product.dto";
import { ProductEntity } from "../../domain/entities/products/products.entity";
import { UserEntity } from "../../domain/entities/users/user.entity";
import { BaseDatasource } from "../../utils/datasource/base.datasource";
import { CustomResponse } from "../../utils/response/custom.response";
import { IProducts } from "../../utils/interfaces/response-paginate.interface";

export class ProductDatasourceImp extends BaseDatasource implements ProductsDatasource {

    constructor() {
        super()
        this.audit_class = "PRODUCT"
    }
    create(createProductDto: CreateProductDto, user_audits: string): Promise<ProductEntity | CustomResponse> {
        return this.handleErrors(async () => {
            const data = await BaseDatasource.prisma.product.create({
                data: createProductDto,
            })
            console.log(data);
            if (!data) {
                throw new CustomResponse("Error creating product", 500)
            }
            this.auditSave(data, "CREATE", user_audits)
            return ProductEntity.fromObject(data)
        })
    }
    getAll(page: number, per_page: number): Promise<IProducts | CustomResponse> {
        return this.handleErrors(async () => {

            const baseWhere = {
                deletedAt: null
            };

            const [totalRecords, data] = await Promise.all([
                BaseDatasource.prisma.product.count({
                    where: baseWhere,
                }),
                BaseDatasource.prisma.product.findMany({
                    where: baseWhere,
                    take: per_page,
                    skip: (page - 1) * per_page,
                    orderBy: {
                        createdAt: 'desc'
                    }
                }),
            ]);

            return {
                products: data.map(product => ProductEntity.fromObject(product)),
                meta: this.calculateMeta(totalRecords, per_page, page)
            }
        })
    }
    findById(id: string): Promise<ProductEntity | CustomResponse> {
        return this.handleErrors(async () => {
            const data = await BaseDatasource.prisma.product.findUnique({
                where: {
                    id: id,
                    deletedAt: null
                }
            })
            if (!data) {
                throw new CustomResponse("Product not found", 404)
            }
            return ProductEntity.fromObject(data)
        })
    }
    update(id: string, updateProductDto: UpdateProductDto, user_audits: string): Promise<ProductEntity | CustomResponse> {
        return this.handleErrors(async () => {
            const data = await BaseDatasource.prisma.product.update({
                where: {
                    id: id,
                    deletedAt: null
                },
                data: updateProductDto
            })

            if (!data) {
                throw new CustomResponse("Product not found", 404)
            }

            this.auditSave(data, "UPDATE", user_audits)

            return ProductEntity.fromObject(data)
        })
    }
    delete(id: string, user_audits: string): Promise<ProductEntity | CustomResponse> {
        return this.handleErrors(async () => {
            const data = await BaseDatasource.prisma.product.update({
                where: {
                    id: id,
                    deletedAt: null
                },
                data: {
                    deletedAt: new Date()
                }
            })

            if (!data) {
                throw new CustomResponse("Product not found", 404)
            }

            this.auditSave(data, "DELETE", user_audits)

            return ProductEntity.fromObject(data)
        })
    }

}