const router = require('express').Router();
const shares = require('../controllers/shares');

router.route('/shares')
  .get(shares.index);

router.route('/shares/:id')
  .get(shares.show);

module.exports = router;
