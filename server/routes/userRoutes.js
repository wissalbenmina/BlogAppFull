const express = require('express');
const router = express.Router();
const Users = require('../controllers/userController');
const auth = require('../middlewares/auth')

router.use(express.json())

// router.use(auth);

router.get('/getUsers', Users.getAllUsers);
router.get('/getUser/:id', Users.getUserById);
router.post('/createUser', Users.createUser);
router.put('/updateUser/:id', auth, Users.updateUser);
router.delete('/deleteUser/:id', auth, Users.deleteUser);

module.exports = router