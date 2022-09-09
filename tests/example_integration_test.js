const { userInfo, userCredentials, userCredentialsWithoutField } = require('../payloads/userPayload');
const { ReqResServiceSteps } = require('codeceptjs').container.helpers();

Feature('Интеграционные тесты ReqRes');

Scenario('Создание и удаление пользователя', async () => {
  const userId = await ReqResServiceSteps.sendCreateUserRequest(userInfo())
  await ReqResServiceSteps.checkResponseStatusCode(201)
  await ReqResServiceSteps.checkResponseContainsField('id')
  await ReqResServiceSteps.checkResponseContainsField('name')
  await ReqResServiceSteps.sendDeleteUserRequest(userId)
  await ReqResServiceSteps.checkResponseStatusCode(204)
});

Scenario('Регистрация и логин', async () => {
  await ReqResServiceSteps.sendRegistrationUserRequest(userCredentials())
  await ReqResServiceSteps.checkResponseStatusCode(200)
  await ReqResServiceSteps.checkResponseContainsField('id')
  await ReqResServiceSteps.sendLoginUserRequest(userCredentials())
  await ReqResServiceSteps.checkResponseStatusCode(200)
  await ReqResServiceSteps.checkResponseContainsField('token')
});

Scenario('Попытка входа без пароля', async () => {
  await ReqResServiceSteps.sendLoginUserRequest(userCredentialsWithoutField('password'))
  await ReqResServiceSteps.checkResponseStatusCode(400)
  await ReqResServiceSteps.checkFieldValueEquals('error', 'Missing password')
});

Scenario('Ответ с заглушкой от мок сервера', async () => {
  await ReqResServiceSteps.sendGetUserRequest()
  await ReqResServiceSteps.checkResponseStatusCode(200)
  await ReqResServiceSteps.checkFieldValueEquals('id', 'Hello world!')
});