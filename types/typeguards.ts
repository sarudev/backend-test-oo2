import { SensorType } from './enum'

export const isSensor = (x: SensorType | null | undefined): x is SensorType => x != null && (x === SensorType.Bascula || x === SensorType.Camara || x === SensorType.Humedad || x === SensorType.Temperatura || x === SensorType.Tiempo)
