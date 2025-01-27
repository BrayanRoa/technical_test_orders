import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {

    @IsString()
    @IsNotEmpty()
    public readonly userId!: string;

    @IsString()
    @IsNotEmpty()
    public readonly status!: string;

    @IsNumber()
    @IsNotEmpty()
    public readonly total!: number;
}