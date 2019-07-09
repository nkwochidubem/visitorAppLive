const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {
    type: String
  },
  code: {
    type: String
  }
});

module.exports = mongoose.model('Company', companySchema );
