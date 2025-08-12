import express, { Request, Response, NextFunction } from 'express'
import { CatalogService } from '../services/catalog.service'
import { CatalogRepository } from '../repository/catalog.repository'
import { RequestValidation } from '../utils/validation/requestValidator'
import { CreateProductDto } from '../dto'

const router = express.Router()

export const catalogService = new CatalogService(new CatalogRepository())

router.post('/product', async (req: Request, res: Response, next: NextFunction) => {
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

export default router