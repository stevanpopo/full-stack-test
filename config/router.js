const router = require('express').Router();
const shares = require('../controllers/shares');

router.route('/shares')
  .get(shares.index);

module.exports = router;
