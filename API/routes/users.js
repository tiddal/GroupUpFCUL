const express = require('express');
const router = express.Router();
const UserController = require('./controllers/User');

router.get('/', UserController.selectAll);
router.get('/:id', UserController.selectById);
router.post('/', UserController.insert);
router.put('/:id', UserController.edit);

module.exports = router;
