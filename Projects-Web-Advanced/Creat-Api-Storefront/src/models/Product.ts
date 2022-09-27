// @ts-ignore
import Client from '../database'

export type Animals = {
  id?: number ,
  name: string,
  price: number
}

export class AnimalsStore {
  async index(): Promise<Animals[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get Animals. Error: ${err}`)
    }
  }

  async show(id: number): Promise<Animals> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find Animals ${id}. Error: ${err}`)
    }
  }

  async create(A: Animals): Promise<Animals> {
    try {
      const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn
        .query(sql, [A.name, A.price])

      const Animals = result.rows[0]

      conn.release()

      return Animals
    } catch (err) {
      throw new Error(`Could not add new Animals ${A.name}. Error: ${err}`)
    }
  }

  async delete(id: string): Promise<Animals> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      const Animals = result.rows[0]

      conn.release()

      return Animals
    } catch (err) {
      throw new Error(`Could not delete Animals ${id}. Error: ${err}`)
    }
  }
}