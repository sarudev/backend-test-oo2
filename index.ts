import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import accoutRouter from './routes/account/accoutRouter'
import appRouter from './routes/app/appRouter'

const app = express()

app.use(express.json())
app.use(cors({ origin: ['http://127.0.0.1:5173', 'http://localhost:5173'], credentials: true }))
app.use(cookieParser())

app.use(appRouter)
app.use(accoutRouter)

app.listen(5282, () => {
  console.log('Servidor Express funcionando en el puerto 5282')
})
