import { BaseEntity } from "../../../utils/entity/base.entity";

export class OrderDetailEntity extends BaseEntity {

    constructor(
        public id: string,
        public orderId: string,
        public productId: string,
        public quantity: number,
        public price: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt?: Date,
    ) {
        super(id, createdAt, updatedAt, deletedAt)
    }

    public static fromObject(obj: { [key: string]: any }): OrderDetailEntity {
        return new OrderDetailEntity(
            obj.id,
            obj.orderId,
            obj.productId,
            obj.quantity,
            obj.price,
            obj.createdAt,
            obj.updatedAt,
            obj.deletedAt,
        )
    }

}