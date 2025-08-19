import { PrismaClient, Prisma } from "../../generated/prisma";
import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/products.model";

export class CatalogRepository implements ICatalogRepository {

    _prisma: PrismaClient
    constructor() {
        this._prisma = new PrismaClient()
    }

    async create(data: Product): Promise<Product> {
        const createData: Prisma.ProductCreateInput = {
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
        }
        const created = await this._prisma.product.create({ data: createData })
        return created as unknown as Product
    }
    async update(data: Product): Promise<Product> {
        const updateData: Prisma.ProductUpdateInput = {
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
        }
        const updated = await this._prisma.product.update({
            where: { id: data.id! },
            data: updateData,
        })
        return updated as unknown as Product
    }
    async delete(id: any): Promise<void> {
        await this._prisma.product.delete({
            where: { id: id },
        })
    }
    async find(limit: number, offset: number): Promise<Product[]> {
        return await this._prisma.product.findMany({
            skip: offset,
            take: limit,
        })
    }
    async findOne(id: number): Promise<Product> {
        const products = await this._prisma.product.findMany({
            where: { id: id },
        }) as unknown as Product
        if (products) {
            return Promise.resolve(products)
        }
        throw new Error("No data found")
    }

}