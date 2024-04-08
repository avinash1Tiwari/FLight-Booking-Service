
const axios = require('axios')
const db = require('../models')
const { StatusCodes } = require('http-status-codes');
const {BookingRepository} = require('../repositories')

const AppError = require('../utils/errors/app-error')
const {ServerConfig} = require('../config')

async function createBooking(data){


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

        // return new Promise((resolve, reject) => {
        //     db.sequelize.transaction(async function bookingImplement(t) {
        //         try {
        //             const flight = await axios.get(`${ServerConfig.FLIGTH_SERVICE}/api/v1/flights/${data.flightId}`);
        //             console.log(flight.data);
        
        //             const flightData = flight.data; // Assuming flight.data contains the actual flight data
        //             console.log("FlightData : ", flightData.TotalSeats, "noOfseats : ", data.noOfseats);
        
        //             if (data.noOfseats > flightData.TotalSeats) {
        //                 reject(new AppError('Not enough seats available', StatusCodes.BAD_REQUEST));
        //             } else {
        //                 resolve(true);
        //             }
        //         } catch (error) {
        //             reject(error); // Forwarding any caught errors to the outer promise
        //         }
        //     });
        // });
        
        
}





module.exports ={
        createBooking
}