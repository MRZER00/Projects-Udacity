//@ts-ignore
import client from '../database'
import bcrypt from 'bcrypt'

const saltRounds = process.env.SALT_ROUNDS as string
const pepper = process.env.BCRYPT_PASSWORD

export type users = {
    id?: number;
    firstname: string;
    lastname: string;
    password_digest: string;
}

export class UserStore {
    async index(): Promise<users[]> {
        try {
            //@ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`${err}`)
        }
    }

    async show(id: number): Promise<users> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            //@ts-ignore
            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`unable show user ${id}: ${err}`)
        }
    }

    async create(u: users): Promise<users> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'INSERT INTO users (firstName, lastName, password_digest) VALUES($1, $2, $3) RETURNING *'

            const hash: string = bcrypt.hashSync(u.password_digest + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [u.firstname, u.lastname, hash])
            const user = result.rows[0]

            conn.release()

            return user
        } catch (err) {
            throw new Error(`unable create user (${u.firstname}): ${err}`)
        }
    }



    async delete(id: number): Promise<users> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *'

            const result = await conn.query(sql, [id])

            const product = result.rows[0]

            conn.release()

            return product
        } catch (err) {
            throw new Error(`unable delete user (${id}): ${err}`)
        }
    }

    async authenticate(username: string, password: string): Promise<users | null> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT password_digest FROM users WHERE firstName=($1)'

            const result = await conn.query(sql, ['username'])

            console.log(password + pepper)

            if (result.rows.length) {

                const user = result.rows[0]

                console.log(user)

                if (bcrypt.compareSync(password + pepper, user.password_digest)) {
                    console.log(user)
                    return user

                }
            }
            return null
        } catch (error) {
            throw new Error(`NOT Authenticate ..... Access denied: ${error}`)
        }
    }
}
