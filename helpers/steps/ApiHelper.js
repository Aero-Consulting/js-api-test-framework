const axios = require('axios');
const https = require('https');
const merge = require('lodash.merge');

const Helper = require('@codeceptjs/helper');

class ApiHelper extends Helper {
  constructor(config, options = {}) {
    super(config)
    this.client = axios.create(
      merge(
        {
          baseURL: config.defaultHost,
          timeout: 60000,
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
          },
          httpsAgent: new https.Agent({ rejectUnauthorized: false })
        },
        options
      )
    );

    // Add a request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        const configAttachment = {
          method: config.method,
          baseURL: config.baseURL,
          url: config.url,
          headers: config.headers,
          data: config.data
        }
        
        addAttachment('Request', JSON.stringify(configAttachment, null, 4), 'application/json');
        return config;
      }, async (error) => {
        addAttachment('Request', JSON.stringify(error, null, 4), 'application/json');
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    this.client.interceptors.response.use(
      async (response) => {
        const transformedResponse = this.#formatResponse(response);

        addAttachment('Response', JSON.stringify(transformedResponse, null, 4), 'application/json');
        return transformedResponse;
      }, async (error) => {
        const transformedErrorResponse = this.#formatResponse(error);

        addAttachment('Response', JSON.stringify(transformedErrorResponse, null, 4), 'application/json');
        return Promise.reject(transformedErrorResponse);
      }
    );
  }

  post(uri, body = {}, opts = {}) {
    return this.client.post(uri, body, opts)
      .then(response => response)
      .catch(error => error);
  }

  get(uri, opts = {}) {
    return this.client.get(uri, opts)
      .then(response => response)
      .catch(error => error);
  }

  delete(uri, body = {}, opts = {}) {
    return this.client.delete(uri, opts)
      .then(response => response)
      .catch(error => error);
  }

  #formatResponse(response) {
    let result = response.hasOwnProperty('data') ? response : response.response

    return {
      data: result.data,
      status: result.status,
      statusText: result.statusText,
      headers: result.headers
    }
  }

  async checkResponseStatusCode(code) {
    await createStep(`Код ответа сервиса ${code}`, () => {
      const { status } = this.response
      expect(status, 'Код ответа не соответствует ожидаемому').to.equal(code)
    })
  }

  async checkResponseContainsErrorMessage(message) {
    await createStep(`Ответ содержит сообщение об ошибке = "${message}"`, () => {
      const { errors } = this.response.data
      expect(errors.map((e) => e.message).includes(message),
        `Ответ не содержит сообщение об ошибке ${message}.\nТело ответа: ${JSON.stringify(this.response.data, null, 2)}`).to.be.true
    })
  }
}

module.exports = ApiHelper;
