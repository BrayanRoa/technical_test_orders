import { Prisma, PrismaClient } from "@prisma/client";
import { CustomResponse } from "../response/custom.response";
import { ValidationDb } from "../validations-db/validation-db";
import { CreateAuditDTO } from "../../domain/dtos/audits/create-audits.dto";

type actions = "CREATE" | "DELETE" | "UPDATE"

export class BaseDatasource {
    validationDb: ValidationDb;
    static prisma: PrismaClient = new PrismaClient();
    audit_class!: string

    constructor() {
        this.validationDb = new ValidationDb();
    }

    async handleErrors<T>(operation: () => Promise<T>): Promise<T | CustomResponse> {
        try {
            return await operation();
        } catch (error) {
            console.log(error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw this.validationDb.validate(error);
            } else {
                throw error;
            }
        }
    }

    protected async auditSave(data: any, type: actions, user_audits: string) {
        const audit: CreateAuditDTO = {
            class_name: this.audit_class,
            data: JSON.stringify(data),
            id_class: data.id,
            type,
            user: user_audits
        }
        this.handleErrors(async () => {
            await BaseDatasource.prisma.audists.create({
                data: audit
            })
        })
    }

    calculateMeta(totalRecords: number, perPage: number, currentPage: number) {
        return {
            totalRecords,
            totalPages: Math.ceil(totalRecords / perPage),
            currentPage,
            next_page: totalRecords > currentPage * perPage,
        };
    }

}