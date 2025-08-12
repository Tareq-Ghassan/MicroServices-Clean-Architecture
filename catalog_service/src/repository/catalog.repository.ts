import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/products.model";

export class CatalogRepository implements ICatalogRepository {
    private products: Product[] = [];

    create(data: Product): Promise<Product> {
        this.products.push(data);
        return Promise.resolve(data);
    }
    update(data: Product): Promise<Product> {
        const index = this.products.findIndex(p => p.id === data.id);
        if (index !== -1) {
            this.products[index] = data;
        }
        return Promise.resolve(data);
    }
    delete(id: any): void {
        this.products = this.products.filter(p => p.id !== id);
    }
    find(): Promise<Product[]> {
        return Promise.resolve([...this.products]);
    }
    findOne(id: number): Promise<Product> {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            throw new Error('Product not found');
        }
        return Promise.resolve(product);
    }

}