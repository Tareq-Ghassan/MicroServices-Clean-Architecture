import { ICatalogRepository } from "../interface/catalogRepository.interface";
export declare class CatalogService {
    private _repository;
    constructor(repository: ICatalogRepository);
    createProduct(input: any): void;
    updateProduct(input: any): void;
    getProducts(limit: number, offset: number): void;
    getProduct(id: number): void;
}
//# sourceMappingURL=catalog.service.d.ts.map