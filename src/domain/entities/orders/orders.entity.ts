import { BaseEntity } from "../../../utils/entity/base.entity";
import { OrderDetailEntity } from "./orders-detail.entity";

export class OrdersEntity extends BaseEntity {

    constructor(
        public id: string,
        public userId: string,
        public status: string,
        public total: number,
        public detail: OrderDetailEntity[],
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
            Array.isArray(obj.details) ? obj.details.map((detail: any) => OrderDetailEntity.fromObject(detail)) : [], // Validar que 'details' sea un array
            obj.createdAt,
            obj.updatedAt,
            obj.deletedAt,
        )
    }

}