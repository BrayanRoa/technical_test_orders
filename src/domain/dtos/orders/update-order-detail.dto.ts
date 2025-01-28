import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class UpdateOrderDetailDto {

    @IsString()
    @IsOptional()
    public readonly orderId?: string;

    @IsString()
    @IsOptional()
    public readonly productId?: string;

    @IsNumber()
    @IsOptional()
    public readonly price?: number;

    @IsNumber()
    @IsOptional()
    @Min(0)  // Permite 0 como valor válido
    public readonly quantity?: number;
}