import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

// get all three.js files for the nav links in index
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const files = fs.readdirSync(path.resolve(__dirname, '../client/three/'))
const fileList = files.map(item => {
  return {
    path: item,
    counter: item.split(/-|\./)[1],
    name: item.split('.')[0]
  }
})

const router = express.Router()

// define the home page route
router.get('/', (req, res) => {
  // console.log(fileList)
  res.render('index', { fileList })
})

// Get List for navigaiton/index
// todo: exclude swp files
router.get('/three/:id', (req, res) => {
  const l = fileList.length
  const jsPath = `scene-${req.params.id}.js`
  const id = Number(req.params.id)
  const first = (id === 1)
  const last = (id === l)
  // console.log({ jsPath, id, first, last })
  res.render('three-scene', { jsPath, id, first, last })
})

export default router
