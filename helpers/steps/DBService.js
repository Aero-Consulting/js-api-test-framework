const db = codeceptjs.container.helpers('CustomDbHelper');

class DBService {
  async deleteAllRows() {
    await createStep(`В таблице удаляем все записи`, async () => {
      await db.databaseQuery("DELETE FROM table");
    });
  }
}

module.exports = new DBService();
module.exports.DBService = DBService;