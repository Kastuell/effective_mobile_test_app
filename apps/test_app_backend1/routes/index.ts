import { Router } from 'express'
import { HistoryController } from '../controllers'

const router = Router()

export const historyRoute1 = router.post(
  '/history',
  HistoryController.createHistory,
) // Создание истории
export const historyRoute2 = router.get(
  '/history',
  HistoryController.getHistory,
) // Получение истории
