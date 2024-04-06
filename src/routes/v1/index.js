const express = require('express');

const { InfoController } = require('../../controllers');

const bookingApi = require('./bookingRoutes')

const router = express.Router();


router.get('/info', InfoController.info);

router.use('/bookings',bookingApi)

module.exports = router;