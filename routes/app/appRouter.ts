import express from 'express'
import { Routes, UserRole } from '../../types/enum'
import { authRole } from './middlewares/jwt'
import { GetLugar, GetLugarAll, GetLugarDependency, GetLugarDependencyAll, PostLugarDependency, PutLugarSensor } from './handlers'

const appRouter = express.Router()

appRouter.get(Routes.GetLugarAll, authRole(UserRole.User), GetLugarAll)
appRouter.get(Routes.GetLugar, authRole(UserRole.User), GetLugar)
appRouter.get(Routes.GetLugarDependencyAll, authRole(UserRole.User), GetLugarDependencyAll)
appRouter.get(Routes.GetLugarDependency, authRole(UserRole.User), GetLugarDependency)

appRouter.put(Routes.PutLugarSensor, authRole(UserRole.Admin), PutLugarSensor)
appRouter.post(Routes.PostLugarDependency, authRole(UserRole.Admin), PostLugarDependency)

export default appRouter
