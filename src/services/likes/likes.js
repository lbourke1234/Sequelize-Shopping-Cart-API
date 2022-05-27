import express from 'express'
import models from '../../db/models/index.js'
const { Product, User } = models

const likesRouter = express.Router()

likesRouter.get('/add/:userId/:productId', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.productId
      }
    })
    const user = await User.findOne({
      where: {
        id: req.params.userId
      }
    })
    product.increment('likeCount', { by: 1 })
    // const likeCount = product.likeCount.toString()
    res.send(`${user.name} ${user.lastName} likes ${product.name}`)
  } catch (error) {
    next(error)
  }
})

likesRouter.get('/total/:productId', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.productId
      }
    })
    console.log('here')
    const likeCount = product.likeCount.toString()
    res.send(likeCount)
  } catch (error) {
    next(error)
  }
})

export default likesRouter
