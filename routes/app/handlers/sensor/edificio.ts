import { type RequestHandler } from 'express'
import { isSensor } from '../../../../types/typeguards'
import { type SensorType } from '../../../../types/enum'
import prisma from '../../../../prisma/client'

export const postEdificioSensor = (async (req, res) => {
  const { buildingName } = req.params as { buildingName: string | undefined }
  if (buildingName == null) {
    res.status(400).send({ error: '\'buildingName\' is not a string or is missing in request params' })
    return
  }

  const { sensorTipo } = req.body as { sensorTipo: SensorType | undefined }
  if (!isSensor(sensorTipo)) {
    res.status(400).send({ error: '\'sensorTipo\' is not a sensorType or missing in request body' })
    return
  }

  const edificio = await prisma.edificio.findFirst({
    where: {
      nombre: buildingName.replaceAll('-', ' ')
    },
    include: {
      sensores: true
    }
  })
  if (edificio == null) {
    res.status(400).send({ error: `'${buildingName}' edificio not found` })
    return
  }

  if (edificio.sensores.find(s => s.tipo === sensorTipo) != null) {
    res.status(400).send({ error: `'${sensorTipo}' already exists in '${buildingName}' edificio` })
    return
  }

  const sensor = await prisma.sensor.create({
    data: {
      tipo: sensorTipo,
      Edificio: {
        connect: {
          id: edificio.id
        }
      },
      edificioTipo: 'edificio'
    }
  })

  res.status(201).json(sensor)
}) as RequestHandler
