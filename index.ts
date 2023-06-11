import express, { type RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

// traer todos los edificios
app.get('/edificio', <RequestHandler>(async (req, res) => {
  const edificios = await prisma.edificio.findMany()
  res.json(edificios).status(200)
}))

// traer un edificio por su nombre
app.get('/edificio/:buildingName', <RequestHandler>(async (req, res) => {
  const { buildingName } = req.params as { buildingName: string }
  const edificio = await prisma.edificio.findFirst({
    where: {
      nombre: buildingName.replaceAll('-', ' ')
    },
    include: {
      sensores: true,
      aulas: {
        include: {
          Edificio: false,
          sensores: false
        }
      }
    }
  })
  res.json(edificio).status(edificio == null ? 404 : 200)
}))

// crear un aula en un edificio
app.post('/edificio/:buildingName/aula', <RequestHandler>(async (req, res) => {
  const { buildingName } = req.params as { buildingName: string }
  const edificio = await prisma.edificio.findFirst({
    where: {
      nombre: buildingName.replaceAll('-', ' ')
    }
  })
  if (edificio == null) {
    res.send({ error: `'${buildingName}' edificio not found` }).status(400)
    return
  }

  const { aulaName } = req.body as { aulaName: string | undefined }
  if (aulaName == null) {
    res.send({ error: '`aulaName` propertie not found on request body' }).status(400)
    return
  }

  const aula = await prisma.aula.create({
    data: {
      nombre: aulaName,
      tipo: 'aula',
      Edificio: {
        connect: {
          id: edificio.id
        }
      }
    }
  })
  res.json(aula).status(200)
}))

// traer un aula de un edificio por su nombre
app.get('/edificio/:buildingName/aula/:aulaName', <RequestHandler>(async (req, res) => {
  const { buildingName, aulaName } = req.params as { buildingName: string, aulaName: string }
  const edificio = await prisma.edificio.findFirst({
    where: {
      nombre: buildingName.replaceAll('-', ' ')
    }
  })
  if (edificio == null) {
    res.send({ error: `'${buildingName}' edificio not found` }).status(400)
    return
  }

  const aula = await prisma.aula.findFirst({
    where: {
      nombre: aulaName
    },
    include: {
      Edificio: true,
      sensores: true
    }
  })
  res.json(aula).status(aula == null ? 404 : 200)
}))

app.listen(3000, () => {
  console.log('Servidor Express funcionando en el puerto 3000')
})
