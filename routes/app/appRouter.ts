import express from 'express'
import { Routes, UserRole } from '../../types/enum'
import { authRole } from './middlewares/jwt'
import { GetBuilding, GetBuildingAll, GetDependency, GetDependencyAll, PostDependency, PostBuildingSensor, PutSensor, PostDependencySensor } from './handlers'

const appRouter = express.Router()

appRouter.get(Routes.GetBuildingAll, authRole(UserRole.User), GetBuildingAll)
appRouter.get(Routes.GetBuilding, authRole(UserRole.User), GetBuilding)
appRouter.get(Routes.GetDependencyAll, authRole(UserRole.User), GetDependencyAll)
appRouter.get(Routes.GetDependency, authRole(UserRole.User), GetDependency)

appRouter.put(Routes.PutSensor, authRole(UserRole.Admin), PutSensor)
appRouter.post(Routes.PostDependency, authRole(UserRole.Admin), PostDependency)

appRouter.post(Routes.PostBuildingSensor, authRole(UserRole.Admin), PostBuildingSensor)
appRouter.post(Routes.PostDependencySensor, authRole(UserRole.Admin), PostDependencySensor)

export default appRouter
