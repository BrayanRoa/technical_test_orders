import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    public readonly name!: string;

    @IsOptional()
    public readonly description?: string;

    @IsNumber()
    @IsNotEmpty()
    public readonly price!: number;

}