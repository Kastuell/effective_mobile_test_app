const { prisma } = require('../../../libs/db/prisma/prisma-client')

const ProductController = {
  createProduct: async (req, res) => {
    try {
      const { plu, name } = req.body
      const product = await prisma.product.create({
        data: { plu, name },
      })
      res.json(product)
    } catch (error) {
      console.error('Product creation error', error)
      res.status(500).json({ error: 'Не удалось создать товар!' })
    }
  },

  getProducts: async (req, res) => {
    try {
      const { name, plu } = req.query

      const products = await prisma.product.findMany({
        where: {
          ...(name && { name: { contains: name, mode: 'insensitive' } }),
          ...(plu && { plu }),
        },
      })

      res.json(products)
    } catch (error) {
      console.error('Product get error', error)
      res.status(500).json({ error: 'Не удалось получить товары!' })
    }
  },
}

module.exports = ProductController
