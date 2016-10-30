var express = require('express');
var router = express.Router();
var reservationsController = require('../controllers/reservations.js');

router.route('/')
  .get(reservationsController.index)
  .post(reservationsController.create);

router.route('/:id')
  .get(reservationsController.show)
  .patch(reservationsController.update)
  .delete(reservationsController.delete);

module.exports = router;
