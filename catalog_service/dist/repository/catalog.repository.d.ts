import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/products.model";
export declare class CatalogRepository implements ICatalogRepository {
    create(data: Product): Promise<Product>;
    update(data: Product): Promise<Product>;
    delete(id: any): void;
    find(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
}
//# sourceMappingURL=catalog.repository.d.ts.map