import { type RequestHandler } from 'express'
import { type SensorType } from '../../../../types/enum'
import { isSensor } from '../../../../types/typeguards'
import prisma from '../../../../prisma/client'

export const postAulaSensor = (async (req, res) => {
  const { buildingName, aulaName } = req.params as { buildingName: string | undefined, aulaName: string | undefined }
  if (buildingName == null) {
    res.status(400).send({ error: '\'buildingName\' is not a string or is missing in request params' })
    return
  }
  if (aulaName == null) {
    res.status(400).send({ error: '\'aulaName\' is not a string or is missing in request params' })
    return
  }

  const { sensorTipo } = req.body as { sensorTipo: SensorType | undefined }
  if (!isSensor(sensorTipo)) {
    res.status(400).send({ error: '\'sensorTipo\' property is missing in body request, or is not a sensorType' })
    return
  }

  const edificio = await prisma.edificio.findFirst({
    where: {
      nombre: buildingName.replaceAll('-', ' ')
    }
  })
  if (edificio == null) {
    res.status(400).send({ error: `'${buildingName}' edificio not found` })
    return
  }

  const aula = await prisma.aula.findFirst({
    where: {
      nombre: aulaName
    },
    include: {
      sensores: true
    }
  })
  if (aula == null) {
    res.status(400).send({ error: `'${aulaName}' aula not found` })
    return
  }

  if (aula.sensores.find(s => s.tipo === sensorTipo) != null) {
    res.status(400).send({ error: `'${sensorTipo}' already exists in '${aulaName}' aula` })
    return
  }

  const sensor = await prisma.sensor.create({
    data: {
      tipo: sensorTipo,
      Aula: {
        connect: {
          id: aula.id
        }
      },
      edificioTipo: 'aula'
    }
  })
  res.status(201).json(sensor)
}) as RequestHandler
