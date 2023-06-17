import express from 'express'
import { Routes, UserRole } from '../../types/enum'
import { getEdificio } from './handlers/edificio'
import { getAula, postAula } from './handlers/aula'
import { authRole } from './middlewares/jwt'
import { postAulaSensor } from './handlers/sensor/aula'
import { postEdificioSensor } from './handlers/sensor/edificio'
import { toggleSensor } from './handlers/sensor/sensor'

const appRouter = express.Router()

appRouter.get(Routes.GetEdificio, authRole(UserRole.User), getEdificio)
appRouter.get(Routes.GetAula, authRole(UserRole.User), getAula)

appRouter.post(Routes.PostAulaSensor, authRole(UserRole.Admin), postAulaSensor)
appRouter.post(Routes.PostAula, authRole(UserRole.Admin), postAula)
appRouter.post(Routes.PostEdificioSensor, authRole(UserRole.Admin), postEdificioSensor)
appRouter.put([Routes.PutEdificioSensor, Routes.PutAulaSensor], authRole(UserRole.Admin), toggleSensor)

export default appRouter
