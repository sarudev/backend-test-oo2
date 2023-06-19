import { type ILugarTipo, type SensorType } from './enum'

export type Lugares = IEdificio | IAula | IEspacioVerde | IParking | IEstacionamiento
export type Dependencia = IAula[] | IEstacionamiento[] | null
export type DependenciaTipo = 'aula' | 'estacionamiento'

export interface ILugar {
  id: number
  nombre: string
  luces: boolean
  historial: IHistorial[]
  sensores: ISensor[]
}

export interface IEdificio extends ILugar {
  tipo: ILugarTipo.Edificio
  dependencias: IAula[]
  dentro: null
}

export interface IAula extends ILugar {
  tipo: ILugarTipo.Aula
}

export interface IEspacioVerde extends ILugar {
  tipo: ILugarTipo.EspacioVerde
  dentro: null
}

export interface IParking extends ILugar {
  tipo: ILugarTipo.Parking
  estacionamientos: IEstacionamiento[]
  dentro: IEdificio
}

export interface IEstacionamiento extends ILugar {
  tipo: ILugarTipo.Estacionamiento
  dentro: IParking
}

export interface ICampus {
  edificios: IEdificio[]
  espaciosVerdes: IEspacioVerde[]
  parkings: IParking[]
}

export interface ISensor {
  id: number
  tipo: SensorType
  activo: boolean
}

export interface IHistorial {
  tipo: SensorType
  mensaje: string
  fecha: number
}

export interface UserData {
  id: number
  username: string
  role: string
  [Symbol.iterator]: () => unknown
}

export type BuildingType = 'edificio' | 'espacioVerde' | 'parking'
export type DependencyType = 'aula' | 'estacionamiento'

export interface FindBuildingFirst {
  where: {
    nombre: string
  }
  include?: {
    sensores?: boolean
    historial?: boolean
    aulas?: boolean
    estacionamientos?: boolean
  }
}

export type PrismaFindBuildingFirst = (query: FindBuildingFirst) => Promise<unknown>

export interface FindDependencyFirst {
  where: {
    nombre: string
    lugar?: {
      nombre: string
    }
  }
  include?: {
    lugar?: boolean
    sensores?: boolean
    historial?: boolean
  }
}

export type PrismaFindDependencyFirst = (query: FindDependencyFirst) => Promise<unknown>

export interface CreateDependency {
  data: {
    nombre: string
    tipo: DependencyType
    lugar: {
      connect: {
        nombre: string
      }
    }
  }
}

export type PrismaDependencyCreate = (query: CreateDependency) => Promise<unknown>

export interface FindDependencyMany {
  where: {
    lugar: {
      nombre: string
    }
  }
}

export type PrismaFindDependencyMany = (query: FindDependencyMany) => Promise<unknown>
