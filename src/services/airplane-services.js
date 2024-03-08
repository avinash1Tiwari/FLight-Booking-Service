const { StatusCodes } = require('http-status-codes');
const { AirplaneRepository} = require('../repositories')
const AppError = require('../utils/errors/app-error')

const airplanerepository = new AirplaneRepository();


async function createAirplaneA(data) {

    try{

        console.log("inside service")

        const airplane = await airplanerepository.create(data);
        return airplane; 
       
    }
    catch(error)
    {
        // console.log("error ka naam " + error.name)
        // if(error.name == 'TypeError')
        // {
        //     // console.log("nkkkkk")
        //     throw new AppError('cannot create a new Airplane object ',StatusCodes.INTERNAL_SERVER_ERROR);

        // }
        // throw error;





        if(error.name == 'SequelizeValidationError')
        {
            let explaination = [];
            // console.log(error)

            error.errors.forEach((err) => {
                explaination.push(err.message);
                
            });

            // console.log(explaination)
            // throw new AppError('cannot create a new Airplane object ',StatusCodes.INTERNAL_SERVER_ERROR);

            throw new AppError(explaination,StatusCodes.BAD_REQUEST);

        }

            throw new AppError('cannot create a new Airplane object ',StatusCodes.INTERNAL_SERVER_ERROR);




        
        
    }

}



module.exports ={
    createAirplaneA,

}