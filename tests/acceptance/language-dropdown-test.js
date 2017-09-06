// WIP

// import Ember from 'ember';
// import { module, test } from 'qunit';
// import startApp from 'hospitalrun/tests/helpers/start-app';

// module('Acceptance | language dropdown', {
//   beforeEach() {
//     this.application = startApp();
//     // this.application.inject('service', 'languagePreference', 'service:language-preference');
//   },

//   afterEach() {
//     Ember.run(this.application, 'destroy');
//   }
// });

// test('setting a language preference persists after logout', (assert) => {
//   runWithPouchDump('default', () => {
//     authenticateUser({ name: 'foobar', prefix: 'p2' });
//     visit('/');

//     andThen(() => {
//       assert.equal(currentURL(), '/');
//       click('a.settings-trigger');
//     });
//     andThen(() => {
//       select('.language-dropdown', 'German');
//     });
    // andThen(() => {
    //   assert.equal(find('.view-current-title').text(), 'Was möchten Sie tun?');
    // });
    // andThen(() => {
    //   click('a.settings-trigger');
    // });
    // andThen(() => {
    //   click('a.logout');
    // });
    // andThen(() => {
    //   authenticateUser({ name: 'foobar' });
    //   visit('/');
    // });
    // andThen(() => {
    //   assert.equal(find('.view-current-title').text(), 'Was möchten Sie tun?');
    // });

//   });
// });

// test('different users can have different language preferences on the same browser', function(assert) {
// });