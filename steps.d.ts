/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type ChaiWrapper = import('codeceptjs-chai');
type OzonHelper = import('./helpers/steps/OzonHelper');
type CustomDbHelper = import('./helpers/utils/CustomDbHelper');
type RetryScenarioHelper = import('./helpers/RetryScenarioHelper');
type TestPlanHelper = import('./helpers/utils/TestPlanHelper');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any }
  interface Methods extends ChaiWrapper, AllureHelper, OzonHelper, AdminHelper {}
  interface I extends ReturnType<steps_file>, 
    WithTranslation<ChaiWrapper>, 
    WithTranslation<AllureHelper>, 
    WithTranslation<OzonHelper>, 
    WithTranslation<CustomDbHelper>, 
    WithTranslation<RetryScenarioHelper>, 
    WithTranslation<TestPlanHelper> {}
  namespace Translation {
    interface Actions {}
  }
}
