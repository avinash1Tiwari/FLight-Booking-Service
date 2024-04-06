const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    FLIGTH_SERVICE: process.env.FLIGHTSERVICE
}