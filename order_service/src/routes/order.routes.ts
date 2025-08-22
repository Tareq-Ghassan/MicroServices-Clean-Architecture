import express, { NextFunction, Response, Request } from "express";

const router = express.Router()

router.post("/order", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: "create order" })
})

router.get("/order", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: "create order" })
})

router.get("/order/:id", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: "create order" })
})


router.delete("/order/:id", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: "create order" })
})

export default router