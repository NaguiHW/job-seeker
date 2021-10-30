const express = require('express');
const { getUser, getUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/', getUsers);
router.get('/:username', getUser);

module.exports = router;
