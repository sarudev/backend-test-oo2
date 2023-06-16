import { type RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../../../prisma/client'
const secret = process.env['JWT_SECRET'] as string

export const userRole = (async (req, res) => {
  const jwtoken = req.cookies.JWT

  const userToken = jwt.verify(jwtoken, secret) as { userId: number, username: string }

  const user = await prisma.user.findFirst({
    where: {
      id: userToken.userId
    }
  })
  if (user == null) {
    res.status(401).send('Unauthorized')
    return
  }

  res.status(200).send({ role: user.role })
}) as RequestHandler
