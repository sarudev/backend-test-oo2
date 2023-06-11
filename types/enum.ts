export enum SensorType {
  Temperatura = 'Temperatura',
  Bascula = 'Bascula',
  Humedad = 'Humedad',
  Camara = 'Camara',
  Tiempo = 'Tiempo'
}

export enum ILugarTipo {
  Aula = 'aula',
  Edificio = 'edificio',
  Parking = 'parking',
  EspacioVerde = 'espacioVerde',
  Estacionamiento = 'estacionamiento'
}

export const LugarDependencia: Record<ILugarTipo, string | null> = {
  edificio: 'aulas',
  parking: 'estacionamientos',
  espacioVerde: null,
  aula: null,
  estacionamiento: null
}
