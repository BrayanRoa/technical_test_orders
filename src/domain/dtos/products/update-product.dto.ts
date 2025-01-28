import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {

    @IsString()
    @IsOptional()
    public readonly name?: string;

    @IsOptional()
    public readonly description?: string;

    @IsNumber()
    @IsOptional()
    public readonly price?: number;

    @IsNumber()
    @IsOptional()
    public readonly stock?: number;

}