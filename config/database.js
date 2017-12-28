if(process.env.NODE_ENV === 'production'){
  module.exports = {mongoURI: 'mongodb://vidjotUser:vidjot@ds133627.mlab.com:33627/vidjot'}
} else {
  module.exports = {mongoURI: 'mongodb://localhost/vidjot-dev'}
}
