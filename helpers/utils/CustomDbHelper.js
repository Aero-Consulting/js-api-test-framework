const { Client } = require('pg')

class CustomDbHelper extends Helper {
  constructor(config) {
    super(config);
    this.client = null
  }

  async connect() {
    const connection = this.config.conn;
    this.client = await new Client({
      user: `${connection.Username}`,
      host: `${connection.Hostname}`,
      database: `${connection.Database}`,
      password: `${connection.Password}`,
      port: `${connection.Port}`
    })
    await this.client.connect()
  }

  async databaseQuery(command, ...params) {
    await createStep('Подключение к db', async () => {
      await this.connect();
    });

    let result;

    if (params.length > 0) {
      await createStep(`Выполнение запроса: ${command}, с параметрами: ${params}`, async () => {
        result = await this.client.query(command, ...params, (err, res) => {
          if (res) {
            console.log(res)
          }
        })
      });
    } else {
      await createStep(`Выполнение запроса: ${command}`, async () => {
        await this.client.query(command, (err, res) => {
         this.client.end();
          if (res) {
            console.log(res)
          }
        })
      });
    }

    await createStep('Отключение от db', async () => {
      this.client.end();
    });

    return result;
  }
}

module.exports = CustomDbHelper;
module.exports.db = new CustomDbHelper();
