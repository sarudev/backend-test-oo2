import { type RequestHandler } from 'express'
import prisma from '../../../prisma/client'

export const getAula = (async (req, res) => {
  const { buildingName, aulaName } = req.params as { buildingName: string | undefined, aulaName: string | undefined }
  if (buildingName == null) {
    res.status(400).send({ error: '\'buildingName\' is not a string or is missing in request params' })
    return
  }
  if (aulaName == null) {
    res.status(400).send({ error: '\'aulaName\' is not a string or is missing in request params' })
    return
  }

  const edificio = await prisma.edificio.findFirst({
    where: {
      nombre: buildingName.replaceAll('-', ' ')
    }
  })
  if (edificio == null) {
    res.status(400).send({ error: '\'buildingName\' edificio not found' })
    return
  }

  const aula = await prisma.aula.findFirst({
    where: {
      nombre: aulaName
    },
    include: {
      lugar: true,
      sensores: true,
      historial: true
    }
  })
  res.status(aula == null ? 404 : 200).json(aula)
}) as RequestHandler
