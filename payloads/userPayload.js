const { faker } = require('@faker-js/faker/locale/ru');
const merge = require('lodash.merge');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const userInfo = (params = {}) => merge({
  name: faker.name.firstName('male'),
  job: faker.name.jobTitle()
}, params)

const userCredentials = (params = {}) => merge({
  email: 'eve.holt@reqres.in',
  password: 'pistol'
}, params)

const userCredentialsWithEmptyField = (field) => {
  switch (field) {
    case 'email':
      return userCredentials({ email: '' })
    case 'password':
      return userCredentials({ password: '' })
    default:
      throw Error('Должно быть указано поле, которое нужно оставить пустым в теле запроса')
  }
}

const userCredentialsWithCustomField = (field, value) => {
  switch (field) {
    case 'email':
      return userCredentials({ email: value })
    case 'password':
      return userCredentials({ password: value })
    default:
      throw Error('Должно быть указано поле, которое нужно оставить пустым в теле запроса')
  }
}

const userCredentialsWithoutField = (field) => {
  const data = userCredentials()

  switch (field) {
    case 'email':
      delete data.email
      break
    case 'password':
      delete data.password
      break
    default:
      console.error('Должно быть указано поле, которое должно отсутствовать в теле запроса')
  }

  return data
}

module.exports = {
  userInfo,
  userCredentials,
  userCredentialsWithoutField,
  userCredentialsWithEmptyField,
  userCredentialsWithCustomField
}