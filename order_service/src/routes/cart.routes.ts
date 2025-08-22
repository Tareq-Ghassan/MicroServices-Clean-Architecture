import express, { NextFunction, Response, Request } from "express";
import * as service from '../service/cart.service'
import * as repository from '../repository/cart.repository'


const router = express.Router()
const repo = repository.CartRepository

router.post("/cart", async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.createCart(req.body, repo)
    return res.status(200).json(response)
})

router.get("/cart", async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.getCart(req.body, repo)
    return res.status(200).json(response)
})

router.patch("/cart", async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.editCart(req.body, repo)
    return res.status(200).json(response)
})

router.delete("/cart", async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.deleteCart(req.body, repo)
    return res.status(200).json(response)
})

export default router
