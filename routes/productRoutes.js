const router = require('express').Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');

router.post('/', authMiddleware, productController.create);
router.get('/', authMiddleware, productController.getAll);
router.get('/:id', authMiddleware, productController.getOne);
router.put('/:id', authMiddleware, productController.update);
router.delete('/:id', authMiddleware, productController.delete);

module.exports = router;