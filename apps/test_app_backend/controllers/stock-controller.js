const { prisma } = require('../../../libs/db/prisma/prisma-client')

const StockController = {
  createStock: async (req, res) => {
    try {
      const { productId, shopId, quantityOnShelf, quantityInOrder } = req.body
      const stock = await prisma.stock.create({
        data: { productId, shopId, quantityOnShelf, quantityInOrder },
      })
      res.json(stock)
    } catch (error) {
      console.error('Stock creation error', error)
      res.status(500).json({ error: 'Не удалось создать остаток!' })
    }
  },

  increaseStock: async (req, res) => {
    try {
      const { id } = req.params
      const { quantity } = req.body
      const stock = await prisma.stock.update({
        where: { id: +id },
        data: {
          quantityOnShelf: {
            increment: quantity,
          },
        },
      })
      res.json(stock)
    } catch (error) {
      console.error('Stock increase error', error)
      res.status(500).json({ error: 'Не удалось увеличить остаток!' })
    }
  },

  decreaseStock: async (req, res) => {
    try {
      const { id } = req.params
      const { quantity } = req.body
      const stock = await prisma.stock.update({
        where: { id: +id },
        data: {
          quantityOnShelf: {
            decrement: quantity,
          },
        },
      })
      res.json(stock)
    } catch (error) {
      console.error('Stock decrease error', error)
      res.status(500).json({ error: 'Не удалось уменьшить остаток!' })
    }
  },

  getStock: async (req, res) => {
    try {
      const {
        plu,
        shopId,
        quantityOnShelfMin,
        quantityOnShelfMax,
        quantityInOrderMin,
        quantityInOrderMax,
      } = req.query

      const stocks = await prisma.stock.findMany({
        where: {
          ...(plu && { Product: { plu } }),
          ...(shopId && { shopId }),
          ...(quantityOnShelfMin && {
            quantityOnShelf: { gte: +quantityOnShelfMin },
          }),
          ...(quantityOnShelfMax && {
            quantityOnShelf: { lte: +quantityOnShelfMax },
          }),
          ...(quantityInOrderMin && {
            quantityInOrder: { gte: +quantityInOrderMin },
          }),
          ...(quantityInOrderMax && {
            quantityInOrder: { lte: +quantityInOrderMax },
          }),
        },
        include: { Product: true },
      })

      res.json(stocks)
    } catch (error) {
      console.error('Stock get error', error)
      res.status(500).json({ error: 'Не удалось получить остаток!' })
    }
  },
}

module.exports = StockController
