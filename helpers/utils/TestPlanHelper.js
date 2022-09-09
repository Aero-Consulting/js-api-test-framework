const Helper = require('@codeceptjs/helper');

const fs = require('fs');

class TestPlanHelper extends Helper {
  plan = [];

  _init() {
    const path = process.env.ALLURE_TESTPLAN_PATH;

    if (path && fs.existsSync(path)) {
      const data = fs.readFileSync(path);
      const testplan = JSON.parse(data.toString());

      testplan.tests.forEach((test) => {
        this.plan.push(test.selector);
      });
    }
  }

  _before(test) {
    console.log(`    Start "${test.title}" ...`);

    const testTags = (test._currentRetry === 0) ? test.opts.tags : test._retriedTest.opts.tags;

    if (testTags) {
      testTags.forEach((tag) => {
        allure.addLabel('tag', tag);
      });
    }
  }

  _addFeatureTags(test) {
    if (test.parent.opts.tags) {
      if (test.opts.tags) {
        const suiteTags = test.parent.opts.tags.filter((suiteTag) => !test.opts.tags.includes(suiteTag));

        // eslint-disable-next-line no-param-reassign
        test.opts.tags = test.opts.tags.concat(suiteTags);
      } else {
        // eslint-disable-next-line no-param-reassign
        test.opts.tags = test.parent.opts.tags;
      }
    }
  }

  _beforeSuite(suite) {
    suite.tests.forEach(this._addFeatureTags);

    if (this.plan.length) {
      // eslint-disable-next-line no-param-reassign
      suite.tests = suite.tests.filter((test) => {
        const fullName = `${suite.title}:.${test.title}`;
        return this.plan.indexOf(fullName) >= 0;
      });
    }

    if (process.env.INCLUDE_TAGS) {
      const includeTags = process.env.INCLUDE_TAGS.split(',');

      // eslint-disable-next-line no-param-reassign
      suite.tests = suite.tests.filter((test) => {
        if (test.opts.tags) {
          return includeTags.some((includeTag) => test.opts.tags.includes(includeTag));
        }

        return false;
      });
    }

    if (process.env.EXCLUDE_TAGS) {
      const excludeTags = process.env.EXCLUDE_TAGS.split(',');

      // eslint-disable-next-line no-param-reassign
      suite.tests = suite.tests.filter((test) => {
        if (test.opts.tags) {
          return excludeTags.some((excludeTag) => !test.opts.tags.includes(excludeTag));
        }

        return true;
      });
    }
  }
}

module.exports = TestPlanHelper;
