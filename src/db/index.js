import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(process.env.REACT_APP_DATABASE_URL, {
  logging: false
})

export const testDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('DB connection is ok')
  } catch (error) {
    console.log('DB connection failed')
  }
}

export default sequelize
