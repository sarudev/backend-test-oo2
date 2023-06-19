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

  Login = '/account/login',
  UserRole = '/account/userRole/:username',
  UserData = '/account/userData',
  Logout = '/account/logout',

  PutSensor = '/sensor',
  PostBuildingSensor = '/:buildingType/:buildingName/sensor',
  PostDependencySensor = '/:buildingType/:buildingName/:dependencyType/:dependencyName/sensor',
  PostDependency = '/:buildingType/:buildingName/:dependencyType',
  GetBuildingAll = '/:buildingType',
  GetBuilding = '/:buildingType/:buildingName',
  GetDependencyAll = '/:buildingType/:buildingName/:dependencyType',
  GetDependency = '/:buildingType/:buildingName/:dependencyType/:dependencyName'
}

export type UserRoleString = 'admin' | 'user'

export const enum UserRole {
  User,
  Admin
}

export function hasRole (role: UserRoleString) {
  if (role === 'user') return UserRole.User
  else if (role === 'admin') return UserRole.Admin
  return null
}
