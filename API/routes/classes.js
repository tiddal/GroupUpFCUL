const express = require('express');
const router = express.Router();
const ClassController = require('./controllers/Class');

router.get('/', ClassController.selectAll);
router.get('/:id', ClassController.selectById);
router.post('/', ClassController.insert);
router.put('/:id', ClassController.edit);
router.delete('/:id', ClassController.delete);

module.exports = router;
