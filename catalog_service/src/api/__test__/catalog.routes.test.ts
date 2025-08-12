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
                    Promise.reject(new Error("error occurred on create product"))
                )
            const response = await request(app)
                .post("/product")
                .send(body)
                .set("Accept", "application/json")
            // console.log("TEST RESPONSE", response)
            expect(response.status).toBe(500)
            expect(response.body).toEqual("error occurred on create product")

        })
    })
})