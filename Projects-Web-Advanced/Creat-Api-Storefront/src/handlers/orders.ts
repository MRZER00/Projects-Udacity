import { Application, Request, Response } from "express"
import { Order, OrderProduct, OrderStore } from "../models/orders"
import verify_token from "./Auth"


const Store = new OrderStore()
const index = async (req: Request, res: Response) => {
  try {
    const orders: OrderProduct[] = await Store.index()
    res.json(orders)

  } catch (e) {
    res.status(400).json(e)
  }
}

const create = async (req: Request, res: Response) => {
  const newOrder: OrderProduct = {
    products: req.body.products,
    status: req.body.status,
    user_id: req.body.user_id
  }
  try {
    const order: OrderProduct = await Store.create(newOrder)
    res.json(order)

  } catch (error) {
    res.status(400)
    .json(`Some Required Parameters Are Missing!? Check This >> EX: (products, status, user_id): ${error}`)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number

    if (id === undefined) {
      res.status(400)
      res.send("Missing required parameter :user_id.")
      return false
    }

    const order: Order = await Store.show(id)

    res.json(order)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

// const deleteOrder = async (req: Request, res: Response) => {
//   try {
//     const id = req.body.id
//     console.log(id)

//     const deleted = await store.delete(id)
//     res.status(200).json(deleted)
//     console.log(deleted)

//     res.send(`Order with id ${id} successfully deleted.`)
//   } catch (e) {
//     res.status(400)
//     res.json(e)
//   }
// }

export default function orderRoutes(app: Application) {
  app.get("/orders", verify_token, index)
  app.post("/create_orders", verify_token, create)
  app.get("/current_order/:id", verify_token, show)
}