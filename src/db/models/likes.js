import sequelize from '../index.js'
import { DataTypes } from 'sequelize'

const Likes = sequelize.define(
  'likes',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)

export default Likes
