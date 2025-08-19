import express, { Request, Response, NextFunction } from 'express'
import { CatalogService } from '../services/catalog.service'
import { CatalogRepository } from '../repository/catalog.repository'
import { RequestValidation } from '../utils/validation/requestValidator'
import { CreateProductDto, DeleteProductDto, GetProductDto, GetProductsDto, UpdateProductDto } from '../dto'

const router = express.Router()

export const catalogService = new CatalogService(new CatalogRepository())

router.post('/product',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error, input } = await RequestValidation(CreateProductDto, req.body)
            if (error) return res.status(400).json(error)
            const data = await catalogService.createProduct(input)
            return res.status(201).json(data)
        } catch (error) {
            const err = error as Error
            return res.status(500).json(err.message)

        }
    })

router.patch('/product/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error, input } = await RequestValidation(
                UpdateProductDto,
                req.body
            )
            const id = parseInt(req.params.id || "0")

            if (error) return res.status(400).json(error)
            const data = await catalogService.updateProduct({ id, ...input })
            return res.status(200).json(data)
        } catch (error) {
            const err = error as Error
            return res.status(500).json(err.message)

        }
    })

router.get('/products',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error, input } = await RequestValidation(
                GetProductsDto,
                {
                    limit: Number(req.query['limit']),
                    offset: Number(req.query['offset'])
                }
            )

            if (error) return res.status(400).json(error)
            const data = await catalogService.getProducts(input.limit, input.offset)
            return res.status(200).json(data)
        } catch (error) {
            const err = error as Error
            return res.status(500).json(err.message)

        }
    })

router.get('/product/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error, input } = await RequestValidation(
                GetProductDto,
                {
                    id: Number(req.params.id),
                }
            )

            if (error) return res.status(400).json(error)
            const data = await catalogService.getProduct(input.id)
            return res.status(200).json(data)
        } catch (error) {
            const err = error as Error
            return res.status(500).json(err.message)

        }
    })

router.delete('/product/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error, input } = await RequestValidation(
                DeleteProductDto,
                {
                    id: Number(req.params.id),
                }
            )

            if (error) return res.status(400).json(error)
            const data = await catalogService.deleteProduct(input.id)
            return res.status(200).json(data)
        } catch (error) {
            const err = error as Error
            return res.status(500).json(err.message)

        }
    })

export default router