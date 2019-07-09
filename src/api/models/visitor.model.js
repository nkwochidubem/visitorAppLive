const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VisitorSchema = new Schema({
    fullName: {
        type: String
    },
    gender: {
        type: String
    },
    date: {
        type: Date
    },
    tagNo: {
        type: String
    },

    purpose: {
        type: String
    },

    timeIn: {
        type: String
    },
    timeOut: {
        type: String
    },
    whomToVisit: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    company: {
      type: String
  }
});

module.exports = mongoose.model('Visitor', VisitorSchema );

