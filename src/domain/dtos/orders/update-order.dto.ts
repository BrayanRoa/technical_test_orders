import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto {

    @IsString()
    @IsOptional()
    public readonly userId?: string;

    @IsString()
    @IsOptional()
    public readonly status?: string;

    @IsNumber()
    @IsOptional()
    public readonly total?: number;
}