

exports.handling404 = (err, req, res, next) => {
  console.log(err)
  if (err.status === 404)
    res.status(404).send('not found')
  next(err);
}

exports.handling400 = (err, req, res, next) => {
  //console.log(err)
  if (err.status === 400) {
    res.status(400).send('bad request')
  } else {
    res.status(500).send({ msg: 'Internal Server Error' })
  }
}