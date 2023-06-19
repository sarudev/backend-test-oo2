import { type RequestHandler } from 'express'
import { hasRole, type UserRoleString, type UserRole } from '../../../types/enum'
import jwt from 'jsonwebtoken'
const secret = process.env['JWT_SECRET']

export const authRole = (role: UserRole) => {
  return ((req, res, next) => {
    console.log('authRole middleware')
    const jwtoken = req.cookies.JWT
    console.log(req.cookies)
    if (jwtoken == null) {
      console.log('JWT is null')
      res.status(401).send({ error: 'Unauthorized' })
      return
    }

    const user = jwt.verify(jwtoken, secret!) as { role: UserRoleString }
    const userRole = hasRole(user.role)
    console.log(role)
    console.log(userRole)

    if (userRole == null || userRole < role) {
      console.log('Role not permitted')
      res.status(401).send({ error: 'Unauthorized' })
      return
    }
    next()
  }) as RequestHandler
}
