// const {Booking} = require('../models');
// const crudRepository = require('./crud-operations');


// class BookingRepository extends crudRepository{
   
//     constructor(){
//         super(Booking);
//     }
//     // const s = "adffg";
// }


// // console.log("sdj")

// // with above inheritence , all things have been came 
// // from parent class, i.e, from crudRepository

// // we can write our custom operation function to 
// // perform some function on DB.

// module.exports = BookingRepository;




// const {StatusCodes} = require('http-status-codes')

// const {Booking} = require('../models/index')

// const {AppError,ValidationError} = require('../utils/errors/index')

// class BookingRepository {

//     async create(data){
      
//         try{

//             const booking  = await Booking.create(data);
//             return booking;

//         }
//         catch(error){

//             if(error.name == 'SequelizeValidationError'){
//                 throw new ValidationError(error)
//             }

//             throw new AppError(
//                 'RepositoryError',
//                 'Cannot create Booking',
//                 'There were somthing issue in creating the booking, please try again later',
//                 StatusCodes.INTERNAL_SERVER_ERROR
//             );
//         }
//     }

//     async update(data){
        
//     }
// }

// module.exports = BookingRepository;














// const {Booking} = require('../models');
// const crudRepository = require('./crud-operations');

// class BookingRepository {

// }















const { StatusCodes } = require('http-status-codes');
const { Op } = require("sequelize");

const { Booking } = require('../models');
const CrudRepository = require('./crud-operations');
const {Enum} = require('../utils/common');
const { CANCELLED, BOOKED } = Enum.BOOKING_STATUS;

class BookingRepository extends CrudRepository {
    constructor() {
        super(Booking);
    }

    async createBooking(data, transaction) {
        const response = await Booking.create(data, {transaction: transaction});
        console.log("repo " + response)
        return response;
    } 

    async get(data, transaction) {
        const response = await Booking.findByPk(data, {transaction: transaction});
        if(!response) {
            throw new AppError('Not able to fund the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async update(id, data, transaction) { // data -> {col: value, ....}
        const response = await Booking.update(data, {
            where: {
                id: id
            }
        }, {transaction: transaction});
        return response;
    }

    async cancelOldBookings(timestamp) {
        console.log("in repo")
        const response = await Booking.update({status: CANCELLED},{
            where: {
                [Op.and]: [
                    {
                        createdAt: {
                            [Op.lt]: timestamp
                        }
                    }, 
                    {
                        status: {
                            [Op.ne]: BOOKED
                        }
                    },
                    {
                        status: {
                            [Op.ne]: CANCELLED
                        }
                    }
                ]
                
            }
        });
        return response;
    }
}

module.exports = BookingRepository;