import { IsNumber, IsOptional, IsString } from "class-validator";

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
    public readonly quantity?: number;
}