import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const edificios = [
  'Néstor Kirchner',
  'Pascual Contursi',
  'Juana Azurduy',
  'Leopoldo Marechal',
  'Ortega Peña',
  'Homero Manzi',
  'Manuel Ugarte',
  'Arturo Jauretche',
  'Raúl Scalabrini Ortiz',
  'Macedonio Fernández',
  'Lisandro de la Torre',
  'Casa del Estudiante',
  'Cine Tita Merello',
  'Héctor Oesterheld',
  'Jardín Maternal A. Villaflor',
  'Oscar Varsavsky',
  'Leonardo Wethein',
  'Irma Laciar de Carrica',
  'Campo de deportes Delfo Cabrera',
  'Inadi',
  'Juana Manso',
  'Quincho Roberto Fontanarrosa',
  'Gimnasio Comunitario Gatica',
  'Hernandez Arregui',
  'Lola Mora',
  'Estudio de Grabación E.S. Discépolo',
  'Comedor Universitario Padre Mujica',
  'José Hernández'
]

void (async () => {
  for (const ed of edificios) {
    const edif = await prisma.edificio.create({
      data: {
        nombre: ed,
        tipo: 'edificio'
      }
    })
    console.log(edif)
  }

  const edif = await prisma.edificio.findFirst({
    where: {
      nombre: 'José Hernández'
    }
  })

  console.log(edif)

  const aula = await prisma.aula.create({
    data: {
      nombre: '11',
      tipo: 'aula',
      lugar: {
        connect: {
          id: edif!.id
        }
      }
    }
  })

  console.log(aula)

  const sensor = await prisma.sensor.create({
    data: {
      tipo: 'Temperatura',
      Aula: {
        connect: {
          id: aula.id
        }
      },
      edificioTipo: 'aula'
    }
  })

  console.log(sensor)

  let hist = await prisma.historial.create({
    data: {
      sensorTipo: 'Temperatura',
      Aula: {
        connect: {
          id: aula.id
        }
      },
      fecha: new Date('2022-06-21T06:30'),
      descripcion: 'Prueba1',
      edificioTipo: 'aula'
    }
  })

  console.log(hist)

  hist = await prisma.historial.create({
    data: {
      sensorTipo: 'Humedad',
      Aula: {
        connect: {
          id: aula.id
        }
      },
      fecha: new Date('2022-07-21T16:30'),
      descripcion: 'Test2',
      edificioTipo: 'aula'
    }
  })

  console.log(hist)

  hist = await prisma.historial.create({
    data: {
      sensorTipo: 'Camara',
      Aula: {
        connect: {
          id: aula.id
        }
      },
      fecha: new Date('2022-08-21T08:30'),
      descripcion: 'Probando3',
      edificioTipo: 'aula'
    }
  })

  console.log(hist)

  hist = await prisma.historial.create({
    data: {
      sensorTipo: 'Bascula',
      Aula: {
        connect: {
          id: aula.id
        }
      },
      fecha: new Date('2022-09-21T18:30'),
      descripcion: 'Testing4',
      edificioTipo: 'aula'
    }
  })

  console.log(hist)

  const user = await prisma.user.create({
    data: {
      username: 'user',
      password: bcrypt.hashSync('user', 8),
      role: 'user'
    }
  })

  console.log(user)

  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      password: bcrypt.hashSync('admin', 8),
      role: 'admin'
    }
  })

  console.log(admin)
})()
