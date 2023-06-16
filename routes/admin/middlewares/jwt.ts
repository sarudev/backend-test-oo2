import { type RequestHandler } from 'express'

export const JWTCookieExists = ((req, res, next) => {
  const jwtoken = req.cookies.JWT
  if (jwtoken == null) {
    res.status(401).send('Unauthorized')
    return
  }
  next()
}) as RequestHandler
