import express, { Request, Response } from 'express'
import { jwtVerify} from 'jose'

const { createSecretKey } = require('crypto');
const secret = createSecretKey(process.env.TOKEN_SECRET, 'utf-8');


const verify_token = async (req: Request, res: Response, next:express.NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string    
    // const decoded = await jwtVerify(authorizationHeader.slice(1, authorizationHeader.length - 1), secret);
    const decoded = await jwtVerify(authorizationHeader, secret);

    // console.log(decoded.payload)
    next()
  } catch (err) {
    res.status(401).send(`Token is invalid .... Access denied: ${err}`)
    return
  }
}


export default verify_token;