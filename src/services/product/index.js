import express from 'express'
import models from '../../db/models/index.js'
import { Op } from 'sequelize'

const { Product, Review, Category } = models
const productRouter = express.Router()

productRouter.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        ...(req.query.search && {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${req.query.search}%`
              }
            },
            {
              description: {
                [Op.iLike]: `%${req.query.search}%`
              }
            }
          ]
        }),
        ...(req.query.filter && {
          category: {
            [Op.iLike]: `%${req.query.filter}%`
          }
        })
      }
      // includes
      // limit: req.query.limit,
      // offset: parseInt(req.query.limit * req.query.page)
    })
    res.send(products)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

productRouter.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (!product) {
      res.status(404).send('not found')
    } else {
      res.send(product)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

productRouter.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.send(newProduct)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
productRouter.post('/:id/reviews', async (req, res, next) => {
  try {
    const newProduct = await Review.create({
      ...req.body,
      id: req.params.id
    })
    res.send(newProduct)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
productRouter.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    if (!product) {
      res.status(404).send('not found')
    } else {
      res.send(product)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

productRouter.delete('/:id', async (req, res, next) => {
  try {
    const rows = Product.destroy({
      where: {
        id: req.params.id
      }
    })
    res.send({ rows })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default productRouter
