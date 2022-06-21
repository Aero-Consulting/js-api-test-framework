const cc = require("codeceptjs");
exports.config = {
  output: './output',
  helpers: {
    ChaiWrapper: {
      require: 'codeceptjs-chai',
      truncateThreshold: 0
    },
    ReqResServiceSteps: {
      require: './helpers/steps/ReqResServiceSteps',
      defaultHost: process.env.API_URL || 'http://mockserver:8081',
      headers: { Authorization: process.env.ADMIN_KEY || 'D796B3EF-0C4F-420B-8B75-2C7F8D30E0B5' }
    },
    CustomDbHelper: {
      require: './helpers/utils/CustomDbHelper',
      conn: {
        DriverName: 'postgres',
        Hostname: process.env.POSTGRESQL_HOST || 'localhost',
        Port: process.env.POSTGRESQL_PORT || '5432',
        Username: process.env.POSTGRESQL_USER || 'admin',
        Password: process.env.POSTGRESQL_USER_PASSWORD || 'password',
        Database: process.env.POSTGRESQL_DBNAME || 'admin'
      }
    },
    TestPlanHelper: {
      require: './helpers/utils/TestPlanHelper.js'
    },
    AllureHelper: {
      require: './helpers/utils/AllureHelper.js'
    }
  },
  include: {
    I: './steps_file.js'
  },
  mocha: {},
  bootstrap: async () => {
    const cc = require('codeceptjs');
    Object.assign(global, cc.container.plugins('allure'))
    global.expect = require('chai').expect
  },
  teardown: null,
  hooks: [],
  plugins: {
    allure: {
      enabled: true,
      outputDir: './allure-results'
    },
    commentStep: {
      enabled: true,
      registerGlobal: true
    }
  },
  tests: './tests/*_test.js',
  name: 'js-api-tests'
};