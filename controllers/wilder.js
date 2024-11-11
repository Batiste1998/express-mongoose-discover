const WilderModel = require('../models/Wilder')
const { listErrors } = require('../utils/tools')

const methods = {
  create: (req, res) => {
    const { name, city, skills } = req.body

    WilderModel.init().then(() => {
      const wilder = new WilderModel({
        name,
        city,
        skills,
      })
      wilder
        .save()
        .then((result) => {
          res.json({ success: true, result })
        })
        .catch((error) => {
          res.status(400).json({ success: false, result: listErrors(error) })
        })
    })
  },

  all: (req, res) => {
    WilderModel.find()
      .then((result) => {
        res.json({ success: true, result })
      })
      .catch((error) => {
        res.status(400).json({ success: false, result: listErrors(error) })
      })
  },

  delete: (req, res) => {
    const { _id } = req.body

    WilderModel.deleteOne({ _id })
      .then((result) => {
        if (result.deletedCount === 0) {
          return res
            .status(404)
            .json({ success: false, result: 'Wilder not found' })
        }
        res.json({ success: true, result })
      })
      .catch((error) => {
        res.status(400).json({ success: false, result: listErrors(error) })
      })
  },

  // deleteById: (req, res) => {
  //   const { _id } = req.params
  //   console.log(_id)

  //   WilderModel.deleteOne({ _id })
  //     .then((result) => {
  //       if (result.deletedCount === 0) {
  //         return res
  //           .status(404)
  //           .json({ success: false, result: 'Wilder not found' })
  //       }
  //       res.json({ success: true, result })
  //     })
  //     .catch((error) => {
  //       res.status(400).json({ success: false, result: listErrors(error) })
  //     })
  // },

  // deleteByIdQuery: (req, res) => {
  //   const { _id } = req.query
  //   console.log(_id)

  //   WilderModel.deleteOne({ _id })
  //     .then((result) => {
  //       if (result.deletedCount === 0) {
  //         return res
  //           .status(404)
  //           .json({ success: false, result: 'Wilder not found' })
  //       }
  //       res.json({ success: true, result })
  //     })
  //     .catch((error) => {
  //       res.status(400).json({ success: false, result: listErrors(error) })
  //     })
  // }

  update: (req, res) => {
    const { _id, name, city, skills } = req.body

    WilderModel.updateOne({ _id }, { name, city, skills })
      .then((result) => {
        if (result.matchedCount === 0) {
          return res
            .status(404)
            .json({ success: false, result: 'Wilder not found' })
        }
        res.json({ success: true, result })
      })
      .catch((error) => {
        res.status(400).json({ success: false, result: listErrors(error) })
      })
  },

  find: (req, res) => {
    const { _id } = req.params

    WilderModel.findOne({_id})
      .then((result) => {
        if (!result) {
          return res
            .status(404)
            .json({ success: false, result: 'Wilder not found' })
        }
        res.json({ success: true, result })
      })
      .catch((error) => {
        res.status(400).json({ success: false, result: listErrors(error) })
      })
  },
}

module.exports = methods
