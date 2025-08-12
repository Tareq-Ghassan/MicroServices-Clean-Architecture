import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/products.model";

// Mock implementation of ICatalogRepository
export class MockCatalogRepository implements ICatalogRepository {
    async create(data: Product): Promise<Product> {
        const mockProduct = {
            id: 123,
            ...data
        }
        return Promise.resolve(mockProduct);
    }
    async update(data: Product): Promise<Product> {
        return Promise.resolve(data as unknown as Product);
    }
    async delete(id: any): Promise<number> {
        return Promise.resolve(id);
    }
    async find(limit: number, offset: number): Promise<Product[]> {
        return Promise.resolve([]);
    }
    async findOne(id: number): Promise<Product> {
        return Promise.resolve({} as unknown as Product);
    }
}