import { type RequestHandler } from 'express'
import { hasRole, type UserRoleString, type UserRole } from '../../../types/enum'
import jwt from 'jsonwebtoken'
const secret = process.env['JWT_SECRET']

export const authRole = (role: UserRole) => {
  return ((req, res, next) => {
    const jwtoken = req.cookies.JWT
    if (jwtoken == null) {
      res.status(401).send({ error: 'Unauthorized' })
      return
    }

    const user = jwt.verify(jwtoken, secret!) as { role: UserRoleString }
    const userRole = hasRole(user.role)

    if (userRole == null || userRole < role) {
      res.status(401).send({ error: 'Unauthorized' })
      return
    }
    next()
  }) as RequestHandler
}
