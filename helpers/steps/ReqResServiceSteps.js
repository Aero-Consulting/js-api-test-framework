const ApiHelper = require('./ApiHelper.js')

class ReqResServiceSteps extends ApiHelper {

  async sendCreateUserRequest(body, options) {
    return await createStep('Я отправляю запрос на создание пользователя', async () => {
      this.response = await this.post('/api/users', body, options)
      const { id } = this.response
      return id
    })
  }

  async sendGetUserRequest(options) {
    return await createStep('Я отправляю запрос на создание пользователя', async () => {
      this.response = await this.get('/api/get/users', options)
    })
  }

  async sendDeleteUserRequest(userId, options) {
    return await createStep(`Я отправляю запрос на удаление пользователя c id=${userId}`, async () => {
      this.response = await this.delete(`/api/users/${userId}`, null, options)
    })
  }

  async sendRegistrationUserRequest(body, options) {
    return await createStep('Я отправляю запрос на регистрацию пользователя', async () => {
      this.response = await this.post('/api/register', body, options)
      const { id } = this.response
      return id
    })
  }

  async sendLoginUserRequest(body, options) {
    return await createStep('Я отправляю запрос на авторизацию пользователя', async () => {
      this.response = await this.post('/api/login', body, options)
      const { token } = this.response
      return token
    })
  }

  async checkResponseContainsField(field) {
    return createStep(`Я проверяю, что ответ содержит поле ${field}`, async () => {
      const { data } = this.response
      expect(data[field], 'Заказ не содержит token авторизации').to.be.not.null
      return data[field]
    })
  }

  async checkResponseNotContainsToken() {
    return createStep('Я проверяю, что ответ содержит токен авторизации', async () => {
      const { data } = this.response.data
      expect(data, 'Заказ не содержит токен авторизации').to.be.undefined
    })
  }

  async checkFieldValueEquals(fieldName, expectedFieldValue) {
    return createStep(`Я проверяю значение в поле ${fieldName} равно ${expectedFieldValue}`,
      async () => {
        const { data } = this.response
        expect(expectedFieldValue === data[fieldName],
          `Ожидаемый результат ${expectedFieldValue} не совпадает с актуальным ${data[fieldName]}`).to.be.true
      })
  }

  async sleep(milliseconds) {
    return createStep(`Ожидание ${milliseconds} мс`,
      async () => {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      })
  }

}

module.exports = ReqResServiceSteps;