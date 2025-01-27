import { OrdersDatasource } from "../../domain/datasources/orders.datasource";
import { UpdateOrderDetailDto } from "../../domain/dtos/orders/update-order-detail.dto";
import { UpdateOrderDto } from "../../domain/dtos/orders/update-order.dto";
import { OrderDetailEntity } from "../../domain/entities/orders/orders-detail.entity";
import { OrdersEntity } from "../../domain/entities/orders/orders.entity";
import { BaseDatasource } from "../../utils/datasource/base.datasource";
import { IOrders } from "../../utils/interfaces/response-paginate.interface";
import { CustomResponse } from "../../utils/response/custom.response";

export class OrdersDatasourceImp extends BaseDatasource implements OrdersDatasource {

    constructor() {
        super()
        this.audit_class = "ORDERS"
    }
    getAll(page: number, per_page: number, user_id: string): Promise<IOrders | CustomResponse> {
        return this.handleErrors(async () => {
            const baseWhere = {
                deletedAt: null,
                userId: user_id
            };

            const [totalRecords, data] = await Promise.all([
                BaseDatasource.prisma.order.count({
                    where: baseWhere,
                }),
                BaseDatasource.prisma.order.findMany({
                    where: baseWhere,
                    take: per_page,
                    skip: (page - 1) * per_page,
                    orderBy: {
                        createdAt: 'desc'
                    },
                    include: {
                        details: {
                            include: {
                                product: true
                            }
                        },
                    }
                }),
            ]);

            return {
                orders: data.map(product => OrdersEntity.fromObject(product)),
                meta: this.calculateMeta(totalRecords, per_page, page)
            }
        })
    }
    getAllOrdersByUser(user_id: string): Promise<OrdersEntity[] | CustomResponse> {
        return this.handleErrors(async () => {
            const baseWhere = {
                deletedAt: null,
                user_id
            };

            const data = await BaseDatasource.prisma.order.findMany({
                where: baseWhere,
                orderBy: {
                    createdAt: 'desc'
                }
            })

            return data.map(product => OrdersEntity.fromObject(product))

        })
    }
    findById(id: string): Promise<OrdersEntity | CustomResponse> {
        return this.handleErrors(async () => {
            const data = await BaseDatasource.prisma.order.findUnique({
                where: {
                    id: id,
                    deletedAt: null
                }
            })

            if (!data) {
                return new CustomResponse("Order not found", 404)
            }

            return OrdersEntity.fromObject(data)
        })
    }
    delete(id: string, user_audits: string): Promise<OrdersEntity | CustomResponse> {
        return this.handleErrors(async () => {
            const deleted = await BaseDatasource.prisma.order.update({
                where: { id },
                data: { deletedAt: new Date() }
            })

            this.auditSave(deleted, "DELETE", user_audits)

            return OrdersEntity.fromObject(deleted);
        })
    }

    create(user_id: string): Promise<CustomResponse | OrdersEntity> {
        return this.handleErrors(async () => {
            const data = await BaseDatasource.prisma.order.create({
                data: {
                    userId: user_id,
                    status: "pending",
                    total: 0
                }
            })
            return OrdersEntity.fromObject(data)
        })
    }

    update(id: string, dto: UpdateOrderDto, user_id: string): Promise<CustomResponse | OrdersEntity> {
        return this.handleErrors(async () => {
            const data = await BaseDatasource.prisma.order.update({
                where: { id },
                data: dto
            })
            if (!(data instanceof OrdersEntity)) {
                return new CustomResponse("Order not found", 404)
            }
            this.auditSave(dto, "UPDATE", user_id)
            return OrdersEntity.fromObject(data)
        })
    }

    cretaeOrderDetail(orderId: string, product_id: string, quantity: number, price: number): Promise<CustomResponse | boolean> {
        return this.handleErrors(async () => {
            const data = await BaseDatasource.prisma.orderDetail.create({
                data: {
                    orderId: orderId,
                    productId: product_id,
                    quantity,
                    price
                }
            })
            console.log(data);
            if (!(data instanceof OrderDetailEntity)) {
                return false
            }
            return true
        })
    }

    getOrderDetailByOrderId(orderId: string): Promise<CustomResponse | OrdersEntity> {
        console.log(orderId);
        return this.handleErrors(async () => {
            const data = await BaseDatasource.prisma.order.findFirst({
                where: {
                    id: orderId
                },
                include: {
                    details: true
                }
            })

            if (!data) {
                return new CustomResponse("Order not found", 404)
            }
            return OrdersEntity.fromObject(data)
        })
    }

    updateOrderDetail(id: string, data: UpdateOrderDetailDto, user_id: string): Promise<CustomResponse | OrderDetailEntity> {
        return this.handleErrors(async () => {
            const action = await BaseDatasource.prisma.orderDetail.update({
                where: { id },
                data
            })

            if (!(action instanceof OrderDetailEntity)) {
                return new CustomResponse("error", 400)
            }
            this.auditSave(action, "UPDATE", user_id)
            return OrderDetailEntity.fromObject(action)
        })
    }

}