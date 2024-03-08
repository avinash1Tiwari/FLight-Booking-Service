// const { Logger } = require('../config');
// // const { response } = require('express');
// const { error } = require('winston');

// // making constructor

// class crudRepository {

//     constructor(model) {
//         this.model = model;
//     }


//     async create(data) {
//         console.log("inside repository")

//         try {


//             const response = await this.model.create(data);
//             return response;
//         }
//         catch (error) {
//             Logger.error("Something went wrong on the crud Repo : create");
//             throw error;

//         }
//     }


//     // destroy from model where id == data;, just like 'WHERE' in SQL
//     async destroy(data) {
//         try {

//             const response = await this.model.destroy({
//                 where: {
//                     id: data
//                 }
//             });
//             return response;
//         }
//         catch (error) {
//             Logger.error("Something went wrong on the crud Repo : destroy");
//             throw error;

//         }
//     }



//     // select * from airplane where primary key = data;

//     async get(data) {

//         try {
//             const response = await this.model.findByPk(data);
//             return response;
//         }
//         catch (error) {
//             Logger.error("Something went wrong on the crud Repo : get");
//             throw error;

//         }

//     }

//     //    select *

//     async getAll() {
//         try {
//             const response = await this.model.findByAll();
//             return response;
//         }
//         catch (error) {
//             Logger.error("Something went wrong on the crud Repo : getAll ");
//             throw error;

//         }
//     }


//     // update
//     // data is an oject like -> {col:val, ......}

//     async update(id, data) {
//         try {
//             const response = await this.model.update(data, {
//                 where: {
//                     id: id
//                 }
//             });
//             return response;
//         }
//         catch (error) {
//             Logger.error("Something went wrong on the crud Repo : update ");
//             throw error;

//         }
//     }


// }


// module.exports = crudRepository;












// const { Logger } = require('../config');
// // const { response } = require('express');
// // const { error } = require('winston');

// // making constructor

// class crudRepository {

//     constructor(model) {
//         this.model = model;
//     }


//     async create(data) {

//         const response = await this.model.create(data);
//             return response;

//     }


//     // destroy from model where id == data;, just like 'WHERE' in SQL
//     async destroy(data) {
//         try {

//             const response = await this.model.destroy({
//                 where: {
//                     id: data
//                 }
//             });
//             return response;
//         }
//         catch (error) {
//             Logger.error("Something went wrong on the crud Repo : destroy");
//             throw error;

//         }
//     }



//     // select * from airplane where primary key = data;

//     async get(data) {

//         try {
//             const response = await this.model.findByPk(data);
//             return response;
//         }
//         catch (error) {
//             Logger.error("Something went wrong on the crud Repo : get");
//             throw error;

//         }

//     }

//     //    select *

//     async getAll() {
//         try {
//             const response = await this.model.findByAll();
//             return response;
//         }
//         catch (error) {
//             Logger.error("Something went wrong on the crud Repo : getAll ");
//             throw error;

//         }
//     }


//     // update
//     // data is an oject like -> {col:val, ......}

//     async update(id, data) {
//         try {
//             const response = await this.model.update(data, {
//                 where: {
//                     id: id
//                 }
//             });
//             return response;
//         }
//         catch (error) {
//             Logger.error("Something went wrong on the crud Repo : update ");
//             throw error;

//         }
//     }


// }


// module.exports = crudRepository;


















const {StatusCodes} = require('http-status-codes')
const { Logger } = require('../config');
const AppError = require('../utils/errors/app-error');
// const { response } = require('express');
// const { error } = require('winston');

// making constructor

class crudRepository {

    constructor(model) {
        this.model = model;
    }


    async create(data) {
        console.log("data : " +data )
        const response = await this.model.create(data);
       
            return response;
    }


    // destroy from model where id == data;, just like 'WHERE' in SQL
    async destroy(data)
     {
            const response = await this.model.destroy({
                where: {
                    id: data
                }
            });
            if(!response){
                throw new AppError("The airplane you want to delete is not present or already deleted",StatusCodes.NOT_FOUND)
            }
            return response;
    }



    // select * from airplane where primary key = data;

    async get(data) {

            const response = await this.model.findByPk(data);
            if(!response){
                throw new AppError("Not able to find the required resource",StatusCodes.NOT_FOUND)
            }
            return response;
    }

    //    select *

    async getAll() {
            const response = await this.model.findAll();
            return response;
    }


    // update
    // data is an oject like -> {col:val, ......}

    async update(id, data) {
            const response = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            console.log("response from update service  =>" + response)
            console.log("data =>" + data)
            return response;
        }



       
}


module.exports = crudRepository;
























