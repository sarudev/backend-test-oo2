import { type RequestHandler } from 'express'
import prisma from '../../../prisma/client'

export const userRole = (async (req, res) => {
  const { username } = req.params as { username: string | undefined }
  if (username == null) {
    res.status(400).send('\'username\' is not a string or is missing in request body')
    return
  }

  const user = await prisma.user.findFirst({
    where: {
      username
    }
  })
  if (user == null) {
    res.status(401).send({ error: 'Invalid username' })
    return
  }

  res.status(200).send({ userRole: user.role })
}) as RequestHandler
