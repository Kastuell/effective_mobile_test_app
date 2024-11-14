import { Request, Response } from 'express'
import { prisma } from '../../../libs/db/prisma/prisma-client'

export const HistoryController = {
  createHistory: async (req: Request, res: Response) => {
    try {
      const { action, productId, shopId } = req.body
      const history = await prisma.actionHistory.create({
        data: { action, productId, shopId },
      })
      res.send(history)
    } catch (error) {
      console.error('History creation error', error)
      res.status(500).json({ error: 'Не удалось создать запись в историях!' })
    }
  },

  getHistory: async (req: Request, res: Response) => {
    try {
      const {
        shopId,
        plu,
        fromDate,
        toDate,
        action,
        page = 1,
        limit = 10,
      } = req.query

      const actions = await prisma.actionHistory.findMany({
        where: {
          ...(shopId && { shopId: shopId.toString() }),
          ...(plu && { Product: { plu: plu.toString() } }),
          ...(fromDate && { createdAt: { gte: new Date(+fromDate) } }),
          ...(toDate && { createdAt: { lte: new Date(+toDate) } }),
          ...(action && { action: action.toString() }),
        },
        skip: (+page - 1) * +limit,
        take: +limit,
        include: { product: true },
      })

      res.send(actions)
    } catch (error) {
      console.error('History get error', error)
      res.status(500).json({ error: 'Не удалось получить записи в историях!' })
    }
  },
}
