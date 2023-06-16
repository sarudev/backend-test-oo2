import express from 'express'
import { Routes } from '../../types/enum'
import { getEdificio } from './handlers/edificio'
import { getAula } from './handlers/aula'

const appRouter = express.Router()

appRouter.get(Routes.GetEdificio, getEdificio)
appRouter.get(Routes.GetAula, getAula)

export default appRouter
