const express = require('express')
const { ProductController, StockController } = require('../controllers')
const router = express.Router()

router.post('/products', ProductController.createProduct) // Создание товара
router.get('/products', ProductController.getProducts) // Получение товаров

router.post('/stock', StockController.createStock) // Создание остатка
router.patch('/stock/increase/:id', StockController.increaseStock) // Увеличение остатка
router.patch('/stock/decrease/:id', StockController.decreaseStock) // Уменьшение остатка
router.get('/stock', StockController.getStock) // Получение остатка

module.exports = router
