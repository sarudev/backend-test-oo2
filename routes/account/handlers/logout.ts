import { type RequestHandler } from 'express'

export const logout = (async (req, res) => {
  res.clearCookie('JWT').status(200).send()
}) as RequestHandler
