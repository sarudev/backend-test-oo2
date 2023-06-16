import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import accoutRouter from './routes/account/accoutRouter'
import appRouter from './routes/app/appRouter'
import adminRouter from './routes/admin/adminRouter'

const app = express()

app.use(express.json())
app.use(cors({ origin: '*' }))
app.use(cookieParser())

app.use(appRouter)
app.use(accoutRouter)
app.use(adminRouter)

app.get('*', (_, res) => res.status(418).send())

app.listen(5282, () => {
  console.log('Servidor Express funcionando en el puerto 5282')
})
