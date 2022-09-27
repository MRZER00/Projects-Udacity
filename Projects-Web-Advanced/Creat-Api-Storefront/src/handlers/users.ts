import express, { Request, Response } from 'express'
import { users, UserStore } from '../models/user'
import { jwtVerify, SignJWT } from 'jose'
import verify_token from './Auth';
import e from 'express';

const { createSecretKey } = require('crypto');
const secret = createSecretKey(process.env.TOKEN_SECRET, 'utf-8');

const store = new UserStore()
// const secret = process.env.TOKEN_SECRET as Secret

const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
}

const show = async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number
    const user = await store.show(id)
    res.json(user)
    console.log(user)

}
const create = async (req: Request, res: Response) => {
    try {
        const user: users = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password_digest: req.body.password_digest,
        }
        const newUser = await store.create(user)
        const token = await new SignJWT({ newUSer: user })
            .setProtectedHeader({ alg: 'HS256', "typ": 'JWT' }).sign(secret);

        res.json(token)

    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number

        const deleted = await store.delete(id)
        res.json(deleted)
    } catch (error) {
        res.json(error)
    }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', verify_token, index)
    app.get('/users/:id', show)
    app.post('/users', create)
    app.delete('/users/:id', verify_token, destroy)
}

export default userRoutes