import { SensorType } from './enum'
import { type BuildingType, type DependencyType } from './types'

export const isSensor = (x: SensorType | null | undefined): x is SensorType => x != null && typeof x === 'string' && (x === SensorType.Bascula || x === SensorType.Camara || x === SensorType.Humedad || x === SensorType.Temperatura || x === SensorType.Tiempo)
export const isBuildingType = (x: string | null | undefined): x is BuildingType => x != null && typeof x === 'string' && (x === 'edificio' || x === 'espacioVerde' || x === 'parking')
export const isDependencyType = (x: string | null | undefined): x is DependencyType => x != null && typeof x === 'string' && (x === 'aula' || x === 'estacionamiento')
export const areCompatible = (buildingType: BuildingType, dependencyType: DependencyType) => (buildingType === 'edificio' && dependencyType === 'aula') || (buildingType === 'parking' && dependencyType === 'estacionamiento')
