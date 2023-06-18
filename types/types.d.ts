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
  dependencias: null
  dentro: IEdificio
}

export interface IEspacioVerde extends ILugar {
  tipo: ILugarTipo.EspacioVerde
  dependencias: null
  dentro: null
}

export interface IParking extends ILugar {
  tipo: ILugarTipo.Parking
  dependencias: IEstacionamiento[]
  dentro: IEdificio
}

export interface IEstacionamiento extends ILugar {
  tipo: ILugarTipo.Estacionamiento
  dependencias: null
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
}
