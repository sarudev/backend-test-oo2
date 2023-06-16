export const enum SensorType {
  Temperatura = 'Temperatura',
  Bascula = 'Bascula',
  Humedad = 'Humedad',
  Camara = 'Camara',
  Tiempo = 'Tiempo'
}

export const enum ILugarTipo {
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

export const enum Routes {
  PostAulaSensor = '/edificio/:buildingName/aula/:aulaName/sensor',
  PostAula = '/edificio/:buildingName/aula',
  GetAula = '/edificio/:buildingName/aula/:aulaName',

  PostEdificioSensor = '/edificio/:buildingName/sensor',
  GetEdificio = '/edificio/:buildingName',

  PutEdificioSensor = '/edificio/:buildingName/sensor',
  PutAulaSensor = '/edificio/:buildingName/aula/:aulaName/sensor',

  Login = '/login',
  UserRole = '/userRole/:username',
  Logout = '/logout'
}
