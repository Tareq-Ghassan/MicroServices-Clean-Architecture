import request from 'supertest'
import express from 'express'

import { faker } from '@faker-js/faker'
import catalogRoutes, { catalogService } from '../catalog.routes'
import { describe, expect, jest, test, } from '@jest/globals';
import { ProductFactory } from '../../utils/fixture';


const app = express()
app.use(express.json())
app.use(catalogRoutes)

const mockRequest = () => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({ min: 10, max: 100 }),
        price: +faker.commerce.price(),
    }
}

describe("Catalog Routes", () => {

    describe("POST /products", () => {

        test('should create product successfully', async () => {
            const body = mockRequest()
            const product = ProductFactory.build()
            jest.spyOn(catalogService, 'createProduct')
                .mockImplementationOnce(() => Promise.resolve(product))
            const response = await request(app)
                .post("/product")
                .send(body)
                .set("Accept", "application/json")
            // console.log("TEST RESPONSE", response)
            expect(response.status).toBe(201)
            expect(response.body).toEqual(product)

        })

        test('should response with validation error 400', async () => {
            const body = mockRequest()

            const response = await request(app)
                .post("/product")
                .send({ ...body, name: "" })
                .set("Accept", "application/json")
            // console.log("TEST RESPONSE", response)
            expect(response.status).toBe(400)
            expect(response.body).toEqual("name should not be empty")

        })

        test('should response with internal error 500', async () => {
            const body = mockRequest()
            jest.spyOn(catalogService, 'createProduct')
                .mockImplementationOnce(() =>
                    Promise.reject(new Error("unable to create product"))
                )
            const response = await request(app)
                .post("/product")
                .send(body)
                .set("Accept", "application/json")
            // console.log("TEST RESPONSE", response)
            expect(response.status).toBe(500)
            expect(response.body).toEqual("unable to create product")

        })
    })

    describe("PATCH /products/:id", () => {
        test('should update product successfully', async () => {
            const product = ProductFactory.build()
            const body = {
                name: product.name,
                price: product.price,
                stock: product.stock
            }
            jest.spyOn(catalogService, 'updateProduct')
                .mockImplementationOnce(() => Promise.resolve(product))
            const response = await request(app)
                .patch(`/products/${product.id}`)
                .send(body)
                .set("Accept", "application/json")
            // console.log("TEST RESPONSE", response)
            expect(response.status).toBe(200)
            expect(response.body).toEqual(product)

        })

        test('should response with validation error 400', async () => {
            const product = ProductFactory.build()
            const body = {
                name: product.name,
                price: -1,
                stock: product.stock
            }
            const response = await request(app)
                .patch(`/products/${product.id}`)
                .send({ ...body })
                .set("Accept", "application/json")
            // console.log("TEST RESPONSE", response)
            expect(response.status).toBe(400)
            expect(response.body).toEqual("price must not be less than 1")

        })

        test('should response with internal error 500', async () => {
            const product = ProductFactory.build()
            const body = mockRequest()
            jest.spyOn(catalogService, 'updateProduct')
                .mockImplementationOnce(() =>
                    Promise.reject(new Error("unable to update product"))
                )
            const response = await request(app)
                .patch(`/products/${product.id}`)
                .send(body)
                .set("Accept", "application/json")
            // console.log("TEST RESPONSE", response)
            expect(response.status).toBe(500)
            expect(response.body).toEqual("unable to update product")

        })
    })

    describe("GET /products?limit=0&offset=0", () => {
        test('should get products by offset and limit successfully', async () => {
            const randomLimit = faker.number.int({ min: 10, max: 50 })
            const products = ProductFactory.buildList(randomLimit)
            jest.spyOn(catalogService, 'getProducts')
                .mockImplementationOnce(() => Promise.resolve(products))
            const response = await request(app)
                .get(`/products?limit=${randomLimit}&offset=0`)
                .set("Accept", "application/json")
            // console.log("TEST RESPONSE", response)
            expect(response.status).toBe(200)
            expect(response.body).toEqual(products)

        })

        test('should response with validation error 400', async () => {
            const response = await request(app)
                .get("/products?limit=0&offset=0")
                .set("Accept", "application/json")
            // console.log("TEST RESPONSE", response)
            expect(response.status).toBe(400)
            expect(response.body).toEqual("limit must not be less than 1")

        })

        test('should response with internal error 500', async () => {
            jest.spyOn(catalogService, 'getProducts')
                .mockImplementationOnce(() =>
                    Promise.reject(new Error("unable to get products"))
                )
            const response = await request(app)
                .get("/products?limit=10&offset=0")
                .set("Accept", "application/json")
            // console.log("TEST RESPONSE", response)
            expect(response.status).toBe(500)
            expect(response.body).toEqual("unable to get products")

        })
    })

    describe("GET /product/:id", () => {
        test('should get a single products by id successfully', async () => {
            const product = ProductFactory.build()
            jest.spyOn(catalogService, 'getProduct')
                .mockImplementationOnce(() => Promise.resolve(product))
            const response = await request(app)
                .get(`/product/${product.id}`)
                .set("Accept", "application/json")
            // console.log("TEST RESPONSE", response)
            expect(response.status).toBe(200)
            expect(response.body).toEqual(product)

        })

        test('should response with validation error 400', async () => {
            const response = await request(app)
                .get(`/product/${-1}`)
                .set("Accept", "application/json")
            // console.log("TEST RESPONSE", response)
            expect(response.status).toBe(400)
            expect(response.body).toEqual("id must not be less than 1")

        })

        test('should response with internal error 500', async () => {
            jest.spyOn(catalogService, 'getProduct')
                .mockImplementationOnce(() =>
                    Promise.reject(new Error("unable to get product"))
                )
            const response = await request(app)
                .get("/product/1")
                .set("Accept", "application/json")
            // console.log("TEST RESPONSE", response)
            expect(response.status).toBe(500)
            expect(response.body).toEqual("unable to get product")

        })
    })

    describe("DELETE /product/:id", () => {
        test('should delete products by id successfully', async () => {
            const product = ProductFactory.build()
            jest.spyOn(catalogService, 'deleteProduct')
                .mockImplementationOnce(() => Promise.resolve())
            const response = await request(app)
                .delete(`/product/${product.id}`)
                .set("Accept", "application/json")
            // console.log("TEST RESPONSE", response)
            expect(response.status).toBe(200)
            expect(response.body).toEqual("")

        })

        test('should response with validation error 400', async () => {
            const response = await request(app)
                .delete(`/product/${-1}`)
                .set("Accept", "application/json")
            // console.log("TEST RESPONSE", response)
            expect(response.status).toBe(400)
            expect(response.body).toEqual("id must not be less than 1")

        })

        test('should response with internal error 500', async () => {
            jest.spyOn(catalogService, 'deleteProduct')
                .mockImplementationOnce(() =>
                    Promise.reject(new Error("unable to delete product"))
                )
            const response = await request(app)
                .delete("/product/1")
                .set("Accept", "application/json")
            // console.log("TEST RESPONSE", response)
            expect(response.status).toBe(500)
            expect(response.body).toEqual("unable to delete product")

        })
    })
})