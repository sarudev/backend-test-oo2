import { type RequestHandler } from 'express'
import prisma from '../../../prisma/client'

export const getEdificio = (async (req, res) => {
  const { buildingName } = req.params as { buildingName: string | undefined }
  if (buildingName == null) {
    res.status(400).send({ error: '\'buildingName\' is not a string or is missing in request body' })
    return
  }

  const edificio = await prisma.edificio.findFirst({
    where: {
      nombre: buildingName.replaceAll('-', ' ')
    },
    include: {
      sensores: true,
      aulas: true,
      historial: true
    }
  })
  res.json(edificio).status(edificio == null ? 404 : 200)
}) as RequestHandler
