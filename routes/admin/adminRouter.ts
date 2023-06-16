import express from 'express'
import { Routes } from '../../types/enum'
import { postAulaSensor } from './handlers/sensor/aula'
import { postAula } from './handlers/aula'
import { postEdificioSensor } from './handlers/sensor/edificio'
import { toggleSensor } from './handlers/sensor/sensor'
import { JWTCookieExists } from './middlewares/jwt'

const adminRouter = express.Router()

adminRouter.post(Routes.PostAulaSensor, JWTCookieExists, postAulaSensor)
adminRouter.post(Routes.PostAula, JWTCookieExists, postAula)
adminRouter.post(Routes.PostEdificioSensor, JWTCookieExists, postEdificioSensor)
adminRouter.put([Routes.PutEdificioSensor, Routes.PutAulaSensor], JWTCookieExists, toggleSensor)

export default adminRouter
