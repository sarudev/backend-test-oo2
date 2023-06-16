import express from 'express'
import { login } from './handlers/login'
import { userRole } from './handlers/userRole'
import { Routes } from '../../types/enum'
import { logout } from './handlers/logout'

const accoutRouter = express.Router()

accoutRouter.post(Routes.Login, login)
accoutRouter.get(Routes.UserRole, userRole)
accoutRouter.post(Routes.Logout, logout)

export default accoutRouter
