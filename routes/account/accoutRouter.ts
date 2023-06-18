import express, { type RequestHandler } from 'express'
import { login } from './handlers/login'
import { userRole } from './handlers/userRole'
import { Routes, UserRole } from '../../types/enum'
import { logout } from './handlers/logout'
import { authRole } from '../app/middlewares/jwt'
import jwt from 'jsonwebtoken'
import { type UserData } from '../../types/types'
const secret = process.env['JWT_SECRET']

const accoutRouter = express.Router()

const userData = (async (req, res) => {
  const jwtoken = req.cookies.JWT
  const data = jwt.verify(jwtoken, secret!) as UserData
  res.status(200).send({ id: data.id, username: data.username, role: data.role })
}) as RequestHandler

accoutRouter.post(Routes.Login, login)
accoutRouter.get(Routes.UserRole, userRole)
accoutRouter.get(Routes.UserData, authRole(UserRole.User), userData)
accoutRouter.post(Routes.Logout, logout)

export default accoutRouter
