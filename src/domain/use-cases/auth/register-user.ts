import { CustomResponse } from "../../../utils/response/custom.response";
import { CreateUserDto } from "../../dtos";
import { AuthRepository } from "../../repositories/auth.repository";
export interface RegisterUserUseCase {
    execute(dto: CreateUserDto): Promise<string | CustomResponse>;
}

export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private authRepository: AuthRepository,
    ) { }
    async execute(dto: CreateUserDto): Promise<string | CustomResponse> {
        const resp = await this.authRepository.registerUser(dto)
        if (resp instanceof CustomResponse) return resp
        return "User registered successfully, please verify your email address"
    }

}