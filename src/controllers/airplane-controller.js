// const {StatusCodes} = require('http-status-codes');

// const {AirplaneServices} = require('../services');






// async function createAirplane(req,res) {



//         try{
//             console.log("inside controller")
//             console.log(req.body)

//             // const airplane = req.body.modelNumber + req.body.capacity;
//             const airplane = await AirplaneServices.createAirplaneA({
//                 modelNumber : req.body.modelNumber,
//                 capacity : req.body.capacity
//             });
        

//             return res
//                     .status(StatusCodes.CREATED)
//                     .json({
//                         success : true,
//                         messsage : "successfully created an airplane",
//                         data : airplane,
//                         error : {}
//                     });
                     

//         }
//         catch(error)
//         {
//             return res
//             .status(StatusCodes.INTERNAL_SERVER_ERROR)
//             .json({
//                 success : false,
//                 messsage : "something went wrong while  creating an airplane",
//                 data : {},
//                 error : error
//             });

//         }
   
// }

// module.exports = {
//     createAirplane,
// }









// after util folder

// const {StatusCodes} = require('http-status-codes');

// const {AirplaneServices} = require('../services');

// const{ErrorResponse,SuccessResponse} = require('../utils/common')


// async function createAirplane(req,res) {



//         try{
            

//             // const airplane = req.body.modelNumber + req.body.capacity;
//             const airplane = await AirplaneServices.createAirplaneA({
//                 modelNumber : req.body.modelNumber,
//                 capacity : req.body.capacity
//             });
        
//             SuccessResponse.data = airplane;
//             return res
//                     .status(StatusCodes.CREATED)
//                     .json(SuccessResponse);
                     

//         }
//         catch(error)
//         {

//             ErrorResponse.error = error;


//             return res
//             .status(StatusCodes.INTERNAL_SERVER_ERROR)
//             .json(ErrorResponse);

//         }
   
// }

// module.exports = {
//     createAirplane,
// }












// after error-app in util/error

const {StatusCodes} = require('http-status-codes');

const {AirplaneServices} = require('../services');

const{ErrorResponse,SuccessResponse} = require('../utils/common')




async function createAirplane(req,res) {



        try{
            

            // const airplane = req.body.modelNumber + req.body.capacity;
            const airplane = await AirplaneServices.createAirplaneA({
                modelNumber : req.body.modelNumber,
                capacity : req.body.capacity
            });
        
            SuccessResponse.data = airplane;
            return res
                    .status(StatusCodes.CREATED)
                    .json(SuccessResponse);
                     

        }
        catch(error)
        {    
            console.log(error.statusCode)

            ErrorResponse.error = error;
            return res
                    .status(error.statusCode)
                    .json(ErrorResponse);

        }
   
}

module.exports = {
    createAirplane,
}