import { type RequestHandler } from 'express'
import { type UserData } from '../../../types/types'
import jwt from 'jsonwebtoken'
const secret = process.env['JWT_SECRET']

export const userData = (async (req, res) => {
  console.log('token')
  const jwtoken = req.cookies.JWT
  const data = jwt.verify(jwtoken, secret!) as UserData
  res.status(200).send(data)
}) as RequestHandler
