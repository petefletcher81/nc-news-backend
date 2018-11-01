

exports.handling404 = (err, req, res, next) => {
  console.log(err.name, '<<<<<<<<<<')
  if (err.status === 404)
    res.status(404).send({ msg: 'not found' });
  next(err);
}

exports.handling400 = (err, req, res, next) => {
  //console.log(err)
  if (err.status === 400 || err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(400).send({ msg: 'bad request' })
  } else {
    next(err)
  }
}

exports.handling500 = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error', err: err })

}