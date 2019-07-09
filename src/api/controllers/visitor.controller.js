const Joi = require('@hapi/joi');
const Visitor = require('../models/visitor.model');
const HttpStatus = require('http-status-codes');

module.exports = {
    findAll (req, res, next ) {
        Visitor.find()
        .then(visitors => res.json(visitors))
        .catch(err => res.json(err));
    },

    create (req, res) {
        const schema = Joi.object().keys({
            fullName: Joi.string().required(),
            purpose: Joi.string().required(),
            whomToVisit: Joi.string().required(),
            date: Joi.date().required(),
            timeIn: Joi.string().required(),
            company: Joi.string().required(),
            address: Joi.string().allow(''),
            phone: Joi.string().allow(''),
            gender: Joi.string(),
            tagNo: Joi.string().allow(''),
            timeOut: Joi.string().allow('').valid('')

        });
        const {error, value } = Joi.validate(req.body, schema);
        if (error  && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }

        Visitor.create(value)
        .then(visitor => {
            res.json(visitor);
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },

    findOne(req, res) {
        let {id} = req.params;
        Visitor.findById(id)
            .then(visitor=> {
                if(!visitor) {
                    return res.status(HttpStatus.NOT_FOUND).json({err: 'Could not find any visitor'});
                }
                return res.json(visitor);
         })
         .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));

    },
    delete(req, res) {
        let {id} = req.params;
        Visitor.findByIdAndRemove(id)
            .then(visitor => {
                if(!visitor) {
                    return res.status(HttpStatus.NOT_FOUND).json({err: 'Could not delete any visitor'});
                }
                return res.json(visitor);
            }).catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },
    update(req, res) {
        let {id} = req.params;
        const schema = Joi.object().keys({
          fullName: Joi.string().required(),
          purpose: Joi.string().required(),
          whomToVisit: Joi.string().required(),
          date: Joi.date().required(),
          timeIn: Joi.string().required(),
          company: Joi.string().required(),
          address: Joi.string().allow('').optional(),
          phone: Joi.string().allow('').optional(),
          gender: Joi.string().optional(),
          timeOut: Joi.string().allow('').optional(),
          tagNo: Joi.string().allow('').optional(),
        });
        const {error, value } = Joi.validate(req.body, schema);
        if (error  && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
        Visitor.findOneAndUpdate({_id: id}, value, {new: true})
            .then(visitor => res.json(visitor))
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    }
};
