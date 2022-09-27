import express, { Request, Response } from 'express'
import { Animals, AnimalsStore } from '../models/Product'
import verify_token from './Auth'

const store = new AnimalsStore()

const index = async (_req: Request, res: Response) => {
    try {
        const Animals = await store.index()
        res.json(Animals)
    } catch (error) {
        res.status(400).json(error)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number
        const Animals_id = await store.show(id)
        res.json(Animals_id)
    } catch (error) {
        res.status(400).json(error)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const animals: Animals = {
            name: req.body.name,
            price: req.body.price,
        }
        const newAnimals = await store.create(animals)
        res.json(newAnimals)
    } catch (err) {
        res.status(400).json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const deleted = await store.delete(req.body.id)
        res.status(200).json(deleted)
    } catch (error) {
        res.status(400).json(error)
    }
}

const AnimalsRoutes = (app: express.Application) => {
    app.get('/Animals', index)
    app.get('/Animals/:id', show)
    app.post('/Animals', verify_token, create)
    app.delete('/Animals', verify_token, destroy)
}

export default AnimalsRoutes