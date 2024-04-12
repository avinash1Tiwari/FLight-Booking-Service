
const axios = require('axios')
const db = require('../models')
const { StatusCodes } = require('http-status-codes');
const {BookingRepository} = require('../repositories')

const AppError = require('../utils/errors/app-error')
const {ServerConfig} = require('../config')
const {Enum} = require('../utils/common');
const { BOOKED, CANCELLED } = Enum.BOOKING_STATUS;

// async function createBooking(data){


    // try{

    //     const result = db.sequelize.transaction(async function bookingImplement(t){

    //         console.log("req=>")
            

    //         // 1. way
    //         // console.log(`http://localhost:3000/api/v1/flights/${data.flightId}`)
    //         // const flight = await axios.get(`http://localhost:3000/api/v1/flights/${data.flightId}`);

    //         // 2. way
    //         // console.log(`${ServerConfig.FLIGTH_SERVICE}/api/v1/flights/${data.flightId}`)
    //         const flight = await axios.get(`${ServerConfig.FLIGTH_SERVICE}/api/v1/flights/${data.flightId}`);

    //         console.log(flight.data)
    //         return true;
    //     });

    // }
    // catch{
    //     throw error;
    // }







// 1.way

        // return new Promise((resolve,reject) =>{
        //     const result = db.sequelize.transaction(async function bookingImplementation(t){
        //         const flight = await axios.get(`${ServerConfig.FLIGTH_SERVICE}/api/v1/flights/${data.flightId}`)
        //         const flightData = flight.data.data;

        //         console.log("flightData : ",flightData.TotalSeats)
        //         if(data.noOfSeats > flightData.TotalSeats)
        //         {
        //             reject(new AppError('not enough seats available ',StatusCodes.BAD_REQUEST))
        //         }

        //         resolve(true)
        //     })
        // })






// 2.way

//         return new Promise((resolve, reject) => {
//             db.sequelize.transaction(async function bookingImplement(t) {
//                 try {
//                     const flight = await axios.get(`${ServerConfig.FLIGTH_SERVICE}/api/v1/flights/${data.flightId}`);
//                     console.log(flight.data);
                    
        
//                     const flightData = flight.data; // Assuming flight.data contains the actual flight data
//                     console.log("FlightData : ", flightData.TotalSeats, "noOfseats : ", data.noOfseats);
        
//                     if (data.noOfseats > flightData.TotalSeats) {
//                         reject(new AppError('Not enough seats available', StatusCodes.BAD_REQUEST));
//                     } else {
//                         resolve(true);
//                     }

                

//                     return flight;
                    
//                 } catch (error) {
//                     reject(error); // Forwarding any caught errors to the outer promise
//                 }
//             });
//         });
        
        
// }







const bookingRepository = new BookingRepository();

async function createBooking(data) {
    const transaction = await db.sequelize.transaction();
    try {
        const flight = await axios.get(`${ServerConfig.FLIGTH_SERVICE}/api/v1/flights/${data.flightId}`);
       const flightData = flight.data.data;
        if(data.noOfseats > flightData.totalSeats) {
            throw new AppError('Not enough seats available', StatusCodes.BAD_REQUEST);
        }
        // console.log("flightData =>")
        // console.log(flightData)
        const totalBillingAmount = data.noOfseats * flightData.Price;
        const bookingPayload = {...data, totalCost: totalBillingAmount};
        // console.log("data")
        // console.log(data)
        // console.log("totaldetails = > ")
        // console.log(bookingPayload)
        const booking = await bookingRepository.create(bookingPayload, transaction);
        // console.log("booking body = ")
        // console.log(booking)
        await axios.patch(`${ServerConfig.FLIGTH_SERVICE}/api/v1/flights/${data.flightId}/seats`, {
                seats: data.noOfseats
        });
        // console.log("service axios request " + `${ServerConfig.FLIGTH_SERVICE}/api/v1/flights/${data.flightId}/seats` + " seats  " + data.noOfseats)

        await transaction.commit();
        return booking;
    } catch(error) {
        await transaction.rollback();
        throw error;
    }
    
}



async function makePayment(data) {
        const transaction = await db.sequelize.transaction();
        try {
            const bookingDetails = await bookingRepository.get(data.bookingId, transaction);
            console.log("bookingdetails from service")
            const bookingDetails1 = bookingDetails.dataValues;
        //     console.log(bookingDetails)
        console.log(bookingDetails.status)
        //     console.log(data)
            if(bookingDetails.status == CANCELLED) {
                throw new AppError('The booking has expired', StatusCodes.BAD_REQUEST);
            }
            console.log("cc")
            
        //     console.log("bookingDetails");
        //     console.log(bookingDetails);
            const bookingTime = new Date(bookingDetails1.createdAt);
            const currentTime = new Date();



            if(currentTime - bookingTime > 300000) {
                await cancelBooking(data.bookingId);
                throw new AppError('The booking has expired', StatusCodes.BAD_REQUEST);
            }


        console.log("cc0")
           
            if(bookingDetails.totalCost != data.totalCost) {
                throw new AppError('The amount of the payment doesnt match', StatusCodes.BAD_REQUEST);
            }
            console.log("cc1")
            console.log(bookingDetails)
            console.log(data)
            if(bookingDetails.userId != data.userId) {
                throw new AppError('The user corresponding to the booking doesnt match', StatusCodes.BAD_REQUEST);
            }
            console.log("cc2")
            // we assume here that payment is successful
            
            await bookingRepository.update(data.bookingId, {status: BOOKED}, transaction);
        //     Queue.sendData({
        //         recepientEmail: 'cs191297@gmail.com',
        //         subject: 'Flight booked',
        //         text: `Booking successfully done for the booking ${data.bookingId}`
        //     });
            await transaction.commit();
            
        } catch(error) {
                console.log("service layer error")
            await transaction.rollback();
            throw error;
        }
    }
    
    async function cancelBooking(bookingId) {
        const transaction = await db.sequelize.transaction();
        try {
            const bookingDetails = await bookingRepository.get(bookingId, transaction);
        //     console.log(bookingDetails);
            if(bookingDetails.status == CANCELLED) {
                await transaction.commit();
                return true;
            }
            await axios.patch(`${ServerConfig.FLIGTH_SERVICE}/api/v1/flights/${bookingDetails.flightId}/seats`, {
                seats: bookingDetails.noOfseats,
                dec: 0
            });
            await bookingRepository.update(bookingId, {status: CANCELLED}, transaction);
            await transaction.commit();
    
        } catch(error) {
            await transaction.rollback();
            throw error;
        }
    }
    
    async function cancelOldBookings() {
        try {
            console.log("Inside service")
            const time = new Date( Date.now() - 1000 * 300 ); // time 5 mins ago
            const response = await bookingRepository.cancelOldBookings(time);
            
            return response;
        } catch(error) {
            console.log(error);
        }
    }
    
    module.exports = {
        createBooking,
        makePayment,
        cancelOldBookings
    }


    
