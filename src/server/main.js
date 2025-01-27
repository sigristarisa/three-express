import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv'
import ViteExpress from 'vite-express'
import routes from './routes.js'

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// env vars
dotenv.config({ path: path.resolve(__dirname, '../../.env') })
const env = process.env.ENV
const port = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', routes)

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`),
console.log(env)
)
