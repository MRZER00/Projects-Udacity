import supertest from "supertest"
import { jwtVerify, SignJWT } from 'jose'

import app from "../index"
import { Animals, AnimalsStore } from '../models/Product'
import { users, UserStore } from '../models/user'
import { Order, OrderStore, OrderProduct } from "../models/orders"


const request = supertest(app)
const { createSecretKey } = require('crypto');
const secret = createSecretKey(process.env.TOKEN_SECRET, 'utf-8');


describe("Test all endpoints of a storefront app... Handler", () => {
    let productId: number, token: string, order_id: number, user_id: number


    // product Handler
    const product: Animals = {
        name: "Horse AR",
        price: 999999
    }

    const newUser: users = {
        firstname: "admin",
        lastname: "user",
        password_digest: "123"
    }

    const newOrder: OrderProduct = {
        "user_id": 1,
        "status": "active",
        "products": [
            {
                "product_id": 1,
                "quantity": 28
            }
        ]
    }

    beforeAll(async () => {
        const newUser: users = {
            firstname: "admin",
            lastname: "user",
            password_digest: "123"
        }

        const {body} = await request.post("/users").send(newUser)
        token = body

        // const user = await jwtVerify(token, secret);
    })


    it("gets the create product endpoint", (done) => {
        request
            .post("/Animals")
            .send(product)
            .set("Authorization", token)
            .then((res) => {
                const { body, status } = res
                // console.log({ body, status })

                expect(status).toBe(200)

                productId = body.id
                done()
            })
    })

    it("gets the index product endpoint", (done) => {
        request
            .get("/Animals")
            .then((res) => {
                expect(res.status).toBe(200)
                done()
            })
    })

    it("gets the show product endpoint", (done) => {
        request
            .get(`/Animals/${productId}`)
            .then((res) => {
                expect(res.status).toBe(200)

                done()
            })
    })


    // User Handler
    it("gets the create User endpoint", (done) => {
        request
            .post("/users")
            .send(newUser)
            .then((res) => {
                const { body, status } = res

                expect( status ).toBe(200)
                done()
            })
    })

    it("gets the index User endpoint", (done) => {
        request
            .get("/users")
            .set("Authorization", token)
            .then((res) => {
                expect(res.status).toBe(200)
                done()
            })
    })

    it("gets the show User endpoint", (done) => {
        request
            .get('/users/1')
            .then((res) => {
                expect(res.status).toBe(200)
                done()
            })
    })

    it("gets the delete User endpoint", (done) => {
        request
            .delete('/users/1')
            .set("Authorization", token)
            .then((res) => {
                expect(res.status).toBe(200)
                done()
            })
    })


    // Order Handler
    it("gets the create Order endpoint", (done) => {
        request
            .post("/create_orders")
            .send(newOrder)
            .set("Authorization", token)
            .then((res) => {
                const { body, status } = res
                console.log('create order'+{ body, status })

                expect(status).toBe(200)
                done()
            })
    })

    it("gets the index order endpoint", (done) => {
        request
            .get("/orders")
            .set("Authorization", token)
            .then((res) => {
                expect(res.status).toBe(200)
                done()
            })
    })

    it("gets the show order endpoint", (done) => {
        request
            .get('/current_order/1')
            .set("Authorization", token)
            .then((res) => {
                expect(res.status).toBe(200)
                done()
            })
    })


    afterAll(async () => {
        // delete user
        await request.delete(`/users/1`).set("Authorization", token)

        // delete product
        await request.delete(`/Animals/${productId}`).set("Authorization", token)
    })
})
