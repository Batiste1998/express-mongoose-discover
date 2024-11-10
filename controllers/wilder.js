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
}

module.exports = methods
