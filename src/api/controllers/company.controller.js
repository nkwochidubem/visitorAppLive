const Joi = require('@hapi/joi');
const Company = require('../models/company.model');
const HttpStatus = require('http-status-codes');

module.exports = ({
  findAll(req, res) {
    Company.find()
    .then(company => {
      res.json(company);
    })
    .catch(err => res.json(err));
  },
  create (req, res) {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        code: Joi.string().required(),
    });
    const {error, value } = Joi.validate(req.body, schema);
    if (error  && error.details) {
        return res.status(HttpStatus.BAD_REQUEST).json(error);
    }

    Company.create(value)
    .then(company => {
        res.json(company);
    })
    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
}

});
