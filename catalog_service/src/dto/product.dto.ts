// Product DTOs for API requests and responses

import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    description: string;
    @IsNumber()
    @Min(1)
    price: number;
    @IsNumber()
    stock: number;
}

export class UpdateProductDto {
    name?: string;
    description?: string;
    @Min(1)
    price?: number;
    stock?: number;
}

export class GetProductsDto {
    @IsNumber()
    @Min(0)
    offset: number;
    @IsNumber()
    @Min(1)
    limit: number;
}

export class GetProductDto {
    @IsNumber()
    @Min(1)
    id: number;
}

export class DeleteProductDto {
    @IsNumber()
    @Min(1)
    id: number;
}