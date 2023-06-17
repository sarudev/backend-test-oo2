import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import accoutRouter from './routes/account/accoutRouter'
import appRouter from './routes/app/appRouter'

const app = express()

app.use(express.json())
app.use(cors({ origin: ['http://127.0.0.1:5173', 'http://localhost:5173'], credentials: true }))
app.use(cookieParser())

app.use(function (req, res, next) {
  // check if client sent cookie
  const cookie = req.cookies.cookieName
  if (cookie === undefined) {
    // no: set a new cookie
    let randomNumber = Math.random().toString()
    randomNumber = randomNumber.substring(2, randomNumber.length)
    res.cookie('cookieName', randomNumber, { httpOnly: true })
    console.log('cookie created successfully')
  } else {
    // yes, cookie was already present
    console.log('cookie exists', cookie)
  }
  next() // <-- important!
})

app.post('/test', (req, res) => res.cookie('test', 'hello').send({ message: 'Hello World!' }))

app.use(appRouter)
app.use(accoutRouter)

app.get('*', (_, res) => res.status(418).send())

app.listen(5282, () => {
  console.log('Servidor Express funcionando en el puerto 5282')
})
