const Helper = require('@codeceptjs/helper');

const idLabel = 'AS_ID';
const ownerLabel = 'owner';
const tagLabel = 'tag';
const epicLabel = 'epic';
const featureLabel = 'feature';
const storyLabel = 'story';
const issueLabel = 'youtrack';

class AllureHelper extends Helper {
  async id(id) {
    global.allure.addLabel(idLabel, id);
  }

  async owner(owner) {
    await global.allure.addLabel(ownerLabel, owner);
  }

  async epic(epic) {
    await global.allure.addLabel(epicLabel, epic);
  }

  async feature(feature) {
    await global.allure.addLabel(featureLabel, feature);
  }

  async story(story) {
    await global.allure.addLabel(storyLabel, story);
  }

  async issue(issue) {
    await global.allure.addLabel(issueLabel, issue);
  }

  async tag(tag) {
    await global.allure.addLabel(tagLabel, tag);
  }

  async step(name, stepFunc) {
    await global.allure.createStep(name, stepFunc);
  }
}

module.exports = AllureHelper;