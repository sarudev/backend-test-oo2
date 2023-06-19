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

const parkings = [
  '29 de Septiembre',
  'Pablo Nogués',
  'Comedor',
  'Canchas'
]

const espaciosVerdes = [
  'Manuel Ugarte y Arturo Jauretche',
  'Néstor Kirchner y Juana Manso'
]

void (async () => {
  for (const ed of edificios) {
    const edif = await prisma.edificio.create({
      data: {
        nombre: ed,
        tipo: 'edificio',
        luces: Math.random() < 0.33 ? null : Math.random() < 0.5,
        puertas: Math.random() < 0.33 ? null : Math.random() < 0.5
      }
    })
    console.log(edif)
  }

  for (const pa of parkings) {
    const park = await prisma.parking.create({
      data: {
        nombre: pa,
        tipo: 'parking',
        luces: Math.random() < 0.33 ? null : Math.random() < 0.5
      }
    })
    console.log(park)
  }

  for (const es of espaciosVerdes) {
    const espa = await prisma.espacioVerde.create({
      data: {
        nombre: es,
        tipo: 'espacioVerde',
        luces: Math.random() < 0.33 ? null : Math.random() < 0.5,
        pastoRegado: Math.random() < 0.33 ? null : Math.random() < 0.5
      }
    })
    console.log(espa)
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
      cortinas: null,
      luces: true,
      puertas: false,
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
