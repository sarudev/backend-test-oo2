import express from 'express'
import { Routes, UserRole } from '../../types/enum'
import { authRole } from './middlewares/jwt'
import { GetLugar, GetLugarAll, GetLugarDependency, GetLugarDependencyAll, PostLugarDependency, PutLugarSensor } from './handlers'

const appRouter = express.Router()

appRouter.get(Routes.GetBuildingAll, authRole(UserRole.User), GetLugarAll)
appRouter.get(Routes.GetBuilding, authRole(UserRole.User), GetLugar)
appRouter.get(Routes.GetDependencyAll, authRole(UserRole.User), GetLugarDependencyAll)
appRouter.get(Routes.GetDependency, authRole(UserRole.User), GetLugarDependency)

appRouter.put([Routes.PutSensor], authRole(UserRole.Admin), PutLugarSensor)
appRouter.post(Routes.PostDependency, authRole(UserRole.Admin), PostLugarDependency)

export default appRouter
