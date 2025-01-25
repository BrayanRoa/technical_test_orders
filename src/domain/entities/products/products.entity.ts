import { BaseEntity } from "../../../utils/entity/base.entity";

export class ProductEntity extends BaseEntity {

    constructor(
        public id: string,
        public name: string,
        public description: string,
        public price: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt?: Date,
    ) {
        super(id, createdAt, updatedAt, deletedAt)
    }

    public static fromObject(obj: { [key: string]: any }): ProductEntity {
        return new ProductEntity(
            obj.id,
            obj.name,
            obj.description,
            obj.price,
            obj.createdAt,
            obj.updatedAt,
            obj.deletedAt,
        )
    }

}