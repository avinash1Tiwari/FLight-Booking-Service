const {StatusCodes} = require('http-status-codes');
const {BookingServices} = require('../services')
const{ErrorResponse,SuccessResponse} = require('../utils/common')



async function createBooking(req,res){
    
    try{
        
        const response = await BookingServices.createBooking({
            flightId : req.body.flightId,
            userId : req.body.userId,
            noOfseats : req.body.noOfseats
        });
        
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);

    }
    catch(error){
        console.log(error.statusCode)

        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

module.exports = {createBooking}