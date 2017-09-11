// // WIP

import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'hospitalrun/tests/helpers/start-app';
// import { t, expectTranslation } from 'hospitalrun/node_modules/ember-i18n/test-support/helpers';

module('Acceptance | language dropdown', {
  beforeEach() {
    this.application = startApp();
    // this.application.inject('service', 'languagePreference', 'service:language-preference');
  },

  afterEach() {
    Ember.run(this.application, 'destroy');
  }
});

test('setting a language preference persists after logout', (assert) => {
  runWithPouchDump('default', () => {
    authenticateUser({ name: 'foobar', prefix: 'p2' });
    visit('/');

    andThen(() => {
      assert.equal(currentURL(), '/');
      assert.equal(find('.view-current-title').text(), 'Welcome to HospitalRun!');
    });
    andThen(() => {
      click('a.settings-trigger');
      waitToAppear('.settings-nav');
      // andThen(() => {
      //   select('.language-dropdown', 'French');
      //   andThen(() => {
      //     debugger;
      //   });
      // });
    });
  });
});

// test('different users can have different language preferences on the same browser', function(assert) {
// });