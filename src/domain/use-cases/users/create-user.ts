import { EmailService } from "../../../utils/emails/email.service";
import { CustomResponse } from "../../../utils/response/custom.response";
import { BaseUseCase } from "../../../utils/use-case/base.use-case";
import { CreateUserDto } from "../../dtos";
import { UserEntity } from "../../entities/users/user.entity";
import { UserRepository } from "../../repositories/user.repository";

export interface CreateUserUseCase {
    execute(dto: CreateUserDto, user_audits: string): Promise<UserEntity | string | CustomResponse>;
}


export class CreateUser implements CreateUserUseCase {

    constructor(
        private repository: UserRepository,
        // private emailService: EmailService
    ) {
    }
    async execute(dto: CreateUserDto, user_audits: string): Promise<UserEntity | string | CustomResponse> {
        const create = await this.repository.create(dto, user_audits)
        if (create instanceof CustomResponse) {
            return create
        }
        return "User created successfully"
    }
}