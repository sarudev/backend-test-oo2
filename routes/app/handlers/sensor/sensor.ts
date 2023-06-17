import { type RequestHandler } from 'express'
import prisma from '../../../../prisma/client'

export const toggleSensor = (async (req, res) => {
  const { sensorId, activo } = req.body as { sensorId: number, activo: boolean }
  if (sensorId == null || isNaN(sensorId)) {
    res.status(400).send({ error: '\'sensorId\' is not a number or is missing in request body' })
    return
  }
  if (activo == null || typeof activo !== 'boolean') {
    res.status(400).send({ error: '\'activo\' is not a boolean or is missing in request body' })
    return
  }

  const sensor = await prisma.sensor.update({
    where: {
      id: sensorId
    },
    data: {
      activo
    }
  })

  res.status(sensor == null ? 404 : 200).send(sensor)
}) as RequestHandler
