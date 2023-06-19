import express from 'express'
import { login } from './handlers/login'
import { userData } from './handlers/userData'
import { Routes, UserRole } from '../../types/enum'
import { logout } from './handlers/logout'
import { authRole } from '../app/middlewares/jwt'

const accoutRouter = express.Router()

accoutRouter.post(Routes.Login, login)
accoutRouter.get(Routes.UserData, authRole(UserRole.User), userData)
accoutRouter.get(Routes.Logout, logout)

export default accoutRouter
