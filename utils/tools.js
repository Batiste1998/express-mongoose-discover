const listErrors = (error) => {
  let errors = {}
  error.errors && Object.keys(error.errors).map((key) => {
    errors = { ...errors, [key]: error.errors[key].message }
  })
  // This errors is not generated in errors so we need to check if it's a Mongoose error (duplicate key)
  error.code === 11000 && Object.keys(error.keyPattern).map((key) => {
    errors = { ...errors, [key]: `${key} is already taken` }
  })

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    errors = { 
      [error.path]: `Invalid ${error.path} format`
    }
  }

  return errors
}

module.exports = { listErrors }