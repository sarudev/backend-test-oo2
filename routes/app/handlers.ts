import { areCompatible, firstUpper, isBuildingType, isDependencyType, isSensor } from '../../types/typeguards'
import prisma from '../../prisma/client'
import { type PrismaDependencyCreate, type Lugares, type PrismaFindBuildingFirst, type PrismaFindDependencyFirst, type PrismaFindDependencyMany } from '../../types/types'
import { type PrismaClientUnknownRequestError } from '@prisma/client/runtime'
import { type RequestHandler } from 'express'

export const GetBuildingAll = (async (req, res, next) => {
  const { buildingType } = req.params

  if (!isBuildingType(buildingType)) return next()

  const find: () => Promise<unknown> = prisma[buildingType].findMany

  const data = await find() as Lugares[]

  res.send(data)
}) as RequestHandler

export const GetBuilding = (async (req, res, next) => {
  const { buildingType, buildingName } = req.params

  if (!isBuildingType(buildingType)) return next()

  const find = prisma[buildingType].findFirst as unknown as PrismaFindBuildingFirst

  const query = {
    where: {
      nombre: buildingName!.replaceAll('-', ' ')
    },
    include: {
      historial: true,
      sensores: true
    }
  }
  if (buildingType === 'edificio' || buildingType === 'parking') {
    query.include = {
      ...query.include,
      [buildingType === 'edificio' ? 'aulas' : 'estacionamientos']: true
    }
  }

  const building = await find(query) as Lugares[]

  res.status(building == null ? 404 : 200).send(building)
}) as RequestHandler

export const GetDependencyAll = (async (req, res, next) => {
  const { buildingType, buildingName, dependencyType } = req.params

  if (!isBuildingType(buildingType) || !isDependencyType(dependencyType)) return next()
  if (!areCompatible(buildingType, dependencyType)) return next()

  const find = prisma[dependencyType].findMany as unknown as PrismaFindDependencyMany

  const data = await find({
    where: {
      lugar: {
        nombre: buildingName!.replaceAll('-', ' ')
      }
    }
  }) as Lugares[]

  res.send(data)
}) as RequestHandler

export const GetDependency = (async (req, res, next) => {
  const { buildingType, buildingName, dependencyType, dependencyName } = req.params

  if (!isBuildingType(buildingType) || !isDependencyType(dependencyType)) return next()
  if (!areCompatible(buildingType, dependencyType)) return next()

  const findDependency = prisma[dependencyType].findFirst as unknown as PrismaFindDependencyFirst

  const dependency = await findDependency({
    where: {
      nombre: dependencyName!.replaceAll('-', ' '),
      lugar: {
        nombre: buildingName!.replaceAll('-', ' ')
      }
    },
    include: {
      historial: true,
      sensores: true,
      lugar: true
    }
  }) as Lugares[]

  res.status(dependency == null ? 404 : 200).send(dependency)
}) as RequestHandler

export const PutSensor = (async (req, res, next) => {
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

export const PostDependency = (async (req, res, next) => {
  const { buildingType, buildingName, dependencyType } = req.params
  const { dependencyName } = req.body

  if (dependencyName == null || typeof dependencyName !== 'string') return next()

  if (!isBuildingType(buildingType) || !isDependencyType(dependencyType)) return next()
  if (!areCompatible(buildingType, dependencyType)) return next()

  const createDependency = prisma[dependencyType].create as unknown as PrismaDependencyCreate

  try {
    const aula = await createDependency({
      data: {
        nombre: dependencyName.replaceAll('-', ' '),
        tipo: dependencyType,
        lugar: {
          connect: {
            nombre: buildingName!.replaceAll('-', ' ')
          }
        }
      }
    })
    res.status(201).json(aula)
  } catch (e: unknown) {
    res.status(409).json((e as PrismaClientUnknownRequestError))
  }
}) as RequestHandler

export const PostBuildingSensor = (async (req, res, next) => {
  const { buildingType, buildingName } = req.params
  const { sensorType } = req.body

  if (!isBuildingType(buildingType) || !isSensor(sensorType)) return next()

  try {
    const exist = await prisma.sensor.findFirst({
      where: {
        tipo: sensorType,
        [firstUpper(buildingType)]: {
          nombre: buildingName!.replaceAll('-', ' ')
        }
      }
    })
    if (exist != null) throw new Error()

    const sensor = await prisma.sensor.create({
      data: {
        edificioTipo: buildingType,
        tipo: sensorType,
        [firstUpper(buildingType)]: {
          connect: {
            nombre: buildingName!.replaceAll('-', ' ')
          }
        }
      }
    })
    res.send(sensor)
  } catch (e: unknown) {
    res.status(409).send(e as PrismaClientUnknownRequestError)
  }
}) as RequestHandler

export const PostDependencySensor = (async (req, res, next) => {
  const { buildingType, dependencyType, dependencyName } = req.params
  const { sensorType } = req.body

  if (!isBuildingType(buildingType) || !isDependencyType(dependencyType) || !isSensor(sensorType)) return next()
  if (!areCompatible(buildingType, dependencyType)) return next()

  try {
    const exist = await prisma.sensor.findFirst({
      where: {
        tipo: sensorType,
        [firstUpper(dependencyType)]: {
          nombre: dependencyName!.replaceAll('-', ' ')
        }
      }
    })
    if (exist != null) throw new Error()

    const sensor = await prisma.sensor.create({
      data: {
        edificioTipo: dependencyType,
        tipo: sensorType,
        [firstUpper(dependencyType)]: {
          connect: {
            nombre: dependencyName!.replaceAll('-', ' ')
          }
        }
      }
    })
    res.send(sensor)
  } catch (e: unknown) {
    res.status(409).send(e as PrismaClientUnknownRequestError)
  }
}) as RequestHandler
