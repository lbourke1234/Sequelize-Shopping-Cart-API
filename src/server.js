import express from 'express'
import cors from 'cors'
import sequelize from './db/index.js'
import { testDB } from './db/index.js'
import productRouter from './services/product/index.js'
import reviewRouter from './services/reviews/index.js'
import usersRouter from './services/users/index.js'
import categoryRouter from './services/category/index.js'
import likesRouter from './services/likes/likes.js'
// import { Client } from 'pg'

const server = express()

server.use(cors())
server.use(express.json())
server.use('/products', productRouter)
server.use('/reviews', reviewRouter)
server.use('/users', usersRouter)
server.use('/categories', categoryRouter)
server.use('/likes', likesRouter)
const { PORT } = process.env

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// })

// client.connect()

// client.query(
//   'SELECT table_schema,table_name FROM information_schema.tables;',
//   (err, res) => {
//     if (err) throw err
//     for (let row of res.rows) {
//       console.log(JSON.stringify(row))
//     }
//     client.end()
//   }
// )

const initialize = async () => {
  try {
    server.listen(PORT, async () => {
      console.log(`Server is listening on port ${PORT}`)
      await testDB()
      await sequelize.sync()
    })

    server.on('ERROR: ', (error) => {
      console.log('Server not running due to error: ' + error)
    })
  } catch (error) {
    console.log('Initialize error:', error)
    process.exit(1)
  }
}

initialize()
