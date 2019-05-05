'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  BASE_API: '"http://127.0.0.1:5000/api/v1.0"',
  FILE_UPLOAD_URL: '"http://127.0.0.1:5000/api/v1.0/common/upload_file"',
  FILE_VISIT_URL: '"http://127.0.0.1:5000/static/uploads/"',
})
