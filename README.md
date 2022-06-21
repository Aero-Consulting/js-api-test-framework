### Проект тестов для API

#### Запуск тестов
Перейти в директорию проекта и выполнить команду

`docker compose -f docker-compose.api-tests.yaml up --exit-code-from autotests`

#### Генерация отчета
Перейти в директорию проекта и выполнить команду

`allure serve allure-results`