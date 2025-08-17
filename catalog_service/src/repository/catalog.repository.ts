import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/products.model";
import { ProductFactory } from "../utils/fixture";

export class CatalogRepository implements ICatalogRepository {

    async create(data: Product): Promise<Product> {
        const product = ProductFactory.build()
        return Promise.resolve(product);
    }
    async update(data: Product): Promise<Product> {
        const product = ProductFactory.build()
        return Promise.resolve(product);
    }
    async delete(id: any): Promise<void> {
        return Promise.resolve();
    }
    async find(limit: number, offset: number): Promise<Product[]> {
        const product = ProductFactory.buildList(limit)
        return Promise.resolve(product);
    }
    findOne(id: number): Promise<Product> {
        const product = ProductFactory.build()
        return Promise.resolve(product);
    }

}