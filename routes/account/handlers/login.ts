import { type RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../../prisma/client'
const secret = process.env['JWT_SECRET'] as string

export const login = (async (req, res) => {
  const { username, password } = req.body as { username: string | null, password: string | null }
  if (username == null) {
    res.status(400).send('\'username\' is not a string or is missing in request body')
    return
  }
  if (password == null) {
    res.status(400).send('\'password\' is not a string or is missing in request body')
    return
  }

  const user = await prisma.user.findFirst({
    where: {
      username
    }
  })

  const passwordCorrect = user == null
    ? false
    : await bcrypt.compare(password, user.password)

  if (user == null || !passwordCorrect) {
    res.status(401).send({ error: 'Invalid username or password' })
    return
  }

  const userData = {
    id: user.id,
    username: user.username,
    role: user.role
  }

  const token = jwt.sign(userData, secret)
  console.log({ username, password, token })
  res.status(200).cookie('JWT', token, { httpOnly: true }).send({ message: 'Logged in' })
}) as RequestHandler
