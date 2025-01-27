import { BaseEntity } from "../../../utils/entity/base.entity";

export class OrdersEntity extends BaseEntity {

    constructor(
        public id: string,
        public userId: string,
        public status: string,
        public total: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt?: Date,
    ) {
        super(id, createdAt, updatedAt, deletedAt)
    }

    public static fromObject(obj: { [key: string]: any }): OrdersEntity {
        return new OrdersEntity(
            obj.id,
            obj.userId,
            obj.status,
            obj.total,
            obj.createdAt,
            obj.updatedAt,
            obj.deletedAt,
        )
    }

}