const { userCredentials } = require('../payloads/userPayload');
const { ReqResServiceSteps } = require('codeceptjs').container.helpers();

Feature('Контрактные тесты ReqRes');

Scenario('Проверка схемы ответа регистрации пользователя', async () => {
  await ReqResServiceSteps.sendRegistrationUserRequest(userCredentials())
  await ReqResServiceSteps.checkResponseStatusCode(200)
  await ReqResServiceSteps.checkResponseSchema('schema.json')
});