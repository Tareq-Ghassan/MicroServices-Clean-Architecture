import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { ICatalogRepository } from '../../interface/catalogRepository.interface';
import { MockCatalogRepository } from '../../repository/mockCatalog.repository';
import { CatalogService } from '../catalog.service';
import { faker } from '@faker-js/faker'
import { Product } from '../../models/products.model';
import { Factory } from 'rosie'

const prodcutFactory = new Factory<Product>()
    .attr("id", faker.number.int({ min: 10, max: 50 }))
    .attr("name", faker.commerce.productName())
    .attr("description", faker.commerce.productDescription())
    .attr("stock", faker.number.int({ min: 10, max: 100 }))
    .attr("price", +faker.commerce.price())



const mockProduct = (rest: any) => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({ min: 10, max: 100 }),
        ...rest,
    }
}

describe("catalog service", () => {
    let repo: ICatalogRepository
    let service: CatalogService
    beforeEach(() => {
        repo = new MockCatalogRepository()
        service = new CatalogService(repo)

    })

    afterEach(() => {
        repo = {} as MockCatalogRepository
        service = {} as CatalogService

    })
    describe('createProduct', () => {
        test('should create product', async () => {
            const req = mockProduct({
                price: +faker.commerce.price(),
            })
            const result = await service.createProduct(req)
            expect(result).toMatchObject({
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
                id: expect.any(Number)
            })
        })

        test('should throw error when unable to create product', async () => {
            const req = mockProduct({
                price: +faker.commerce.price(),
            })
            jest.spyOn(repo, 'create').mockImplementationOnce(() => Promise.resolve({} as Product))
            await expect(service.createProduct(req)).rejects.toThrow("unable to create product")
        })

        test('should throw error when product already exist', async () => {
            const req = mockProduct({
                price: +faker.commerce.price(),
            })
            jest.spyOn(repo, 'create').mockImplementationOnce(() => Promise.reject(new Error("product already exsit")))
            await expect(service.createProduct(req)).rejects.toThrow("product already exsit")
        })
    })
    describe('updateProduct', () => {
        test('should update product', async () => {
            const req = mockProduct({
                price: +faker.commerce.price(),
                id: faker.number.int({ min: 10, max: 1000 }),
            })
            const result = await service.updateProduct(req)
            expect(result).toMatchObject(req)
        })

        test("should throw error when product doesn't exist", async () => {
            jest.spyOn(repo, 'update').mockImplementationOnce(() => Promise.reject(new Error("product doesn't exsit")))
            await expect(service.updateProduct({})).rejects.toThrow("product doesn't exsit")
        })
    })

    describe('getProducts', () => {
        test('should get products by offset and limit', async () => {
            const randomLimit = faker.number.int({ min: 10, max: 50 })
            const products = prodcutFactory.buildList(randomLimit)
            jest.spyOn(repo, 'find').mockImplementationOnce(() => Promise.resolve(products))

            const result = await service.getProducts(randomLimit, 0)
            expect(result.length).toEqual(randomLimit)
            expect(result).toEqual(products)

        })

        test("should throw error when products doesn't exist", async () => {
            jest.spyOn(repo, 'find').mockImplementationOnce(() => Promise.reject(new Error("products doesn't exsit")))
            await expect(service.getProducts(0, 0)).rejects.toThrow("products doesn't exsit")
        })
    })

    describe('getProduct', () => {
        test('should get product by id', async () => {
            const product = prodcutFactory.build()
            jest.spyOn(repo, 'findOne').mockImplementationOnce(() => Promise.resolve(product))

            const result = await service.getProduct(product.id!)
            expect(result).toEqual(product)

        })

        test("should throw error when product doesn't exist", async () => {
            const product = prodcutFactory.build()
            jest.spyOn(repo, 'findOne').mockImplementationOnce(() => Promise.reject(new Error("product doesn't exsit")))
            await expect(service.getProduct(product.id!)).rejects.toThrow("product doesn't exsit")
        })
    })

    describe('deleteProduct', () => {
        test('should delete product by id', async () => {
            const product = prodcutFactory.build()
            jest.spyOn(repo, 'delete').mockImplementationOnce(() => Promise.resolve({ id: product.id }))

            const result = await service.deleteProduct(product.id!)
            expect(result).toMatchObject({
                id: product.id
            })

        })

        test("should throw error when product doesn't exist", async () => {
            const product = prodcutFactory.build()
            jest.spyOn(repo, 'delete').mockImplementationOnce(() => Promise.reject(new Error("product doesn't exsit")))
            await expect(service.deleteProduct(product.id!)).rejects.toThrow("product doesn't exsit")
        })
    })
})