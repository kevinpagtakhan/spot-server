var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users.js');

router.route('/')
  .get(usersController.index)
  .post(usersController.register);

router.route('/authenticate')
  .post(usersController.authenticate);

router.route('/:id')
  .get(usersController.show)
  .patch(usersController.update)
  .delete(usersController.delete);

module.exports = router;
