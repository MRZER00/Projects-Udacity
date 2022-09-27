// @ts-ignore
import client from "../database"

export interface Order {
  product_id: number,
  quantity: number
}

export interface OrderProduct {
  id?: number,
  user_id: number | string,
  status: boolean | string,
  products: Order[]
}

export class OrderStore {

  async index(): Promise<OrderProduct[]> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = "SELECT * FROM orders"
      const { rows } = await conn.query(sql)
      // const order =rows[0]

      // command Sql order Products
      const Sql_ord_pro = "SELECT product_id, quantity FROM order_products WHERE order_id=($1)"
      const orders = []

      for (const order of rows) {
        const { rows: result_rows } = await conn.query(Sql_ord_pro, [order.id])
        orders.push({
          ...order, products: result_rows
        })
      }

      conn.release()

      return orders
    } catch (error) {
      throw new Error(`Could't Get Orders. ${error}`)
    }
  }

  async create(order: OrderProduct): Promise<OrderProduct> {
    const { user_id, status, products } = order
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *"
      const result = await conn.query(sql, [user_id, status])
      const order = result.rows[0]


      // command Sql order Products
      const Sql_ord_pro = "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity"
      const order_products = []


      for (const product of products) {
        const { product_id, quantity } = product
        const { rows } = await conn.query(Sql_ord_pro, [order.id, product_id, quantity])

        order_products.push(rows[0])
      }

      conn.release()
      // return order && order products together as json
      return { ...order, products: order_products }
    } catch (error) {
      throw new Error(`Sorry.... Could't Add New Order for User ${user_id}. ${error}`)
    }
  }

  async show(id: number): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = "SELECT * FROM orders WHERE user_id=($1)"
      const { rows } = await conn.query(sql, [id])
      const order = rows[0]

      const Sql_ord_pro = "SELECT product_id, quantity FROM order_products WHERE order_id=($1)"
      const { rows: result_rows } = await conn.query(Sql_ord_pro, [id])

      conn.release()

      return { ...order, products: result_rows }
    } catch (err) {
      throw new Error(`Could not find order ${id}. ${err}`)
    }
  }
}