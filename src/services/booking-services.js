
const axios = require('axios')
const db = require('../models')

const {ServerConfig} = require('../config')

async function createBooking(data){
    try{

        const result = db.sequelize.transaction(async function bookingImplement(t){

            console.log("req=>")
            

            // 1. way
            console.log(`http://localhost:3000/api/v1/flights/${data.flightId}`)
            // const flight = await axios.get(`http://localhost:3000/api/v1/flights/${data.flightId}`);

            // 2. way
            console.log(`${ServerConfig.FLIGTH_SERVICE}/api/v1/flights/${data.flightId}`)
            const flight = await axios.get(`${ServerConfig.FLIGTH_SERVICE}/api/v1/flights/${data.flightId}`);

            console.log(flight.data)
            return true;
        });
    }
    catch{
        throw error;
    }
}





module.exports ={
        createBooking
}