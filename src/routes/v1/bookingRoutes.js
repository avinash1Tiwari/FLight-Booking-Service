
const express = require('express')

const router = express.Router();
const {BookingController} = require('../../controllers')


// localhost:4000/api/v1/bookings
// body = {flightId : 1234, noOfseats : 5}

router.post('/',
                BookingController.createBooking
)

router.post(
    '/payments',
    BookingController.makePayment
);


module.exports = router