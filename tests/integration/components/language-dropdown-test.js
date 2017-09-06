import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('language-dropdown', 'Integration | Component | language dropdown', {
  integration: true,
  beforeEach() {
    this.inject.service('i18n', { as: 'i18n' });

  }
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{language-dropdown}}`);
  assert.equal(this.$('.language-dropdown').length, 1);
});

test('it reacts to language updates', function(assert) {
  assert.expect(6);
  let model = Ember.Object.extend({
    mockOnFinishCalled: 0
  });
  this.set('model', model);
  this.set('mockOnFinish', () => {
    assert.equal(1, 1);
  });

  let languagePreference = Ember.Service.extend({
    storeUserI18n(language) {
      assert.equal(language, 'de');
    }
  });

  this.register('service:languagePreference', languagePreference);
  this.inject.service('languagePreference', { as: 'languagePreference' });

  this.render(hbs`{{language-dropdown onFinish=(action mockOnFinish)}}`);

  assert.equal(this.$().text().trim().includes('Select Language'), true);
  assert.equal(this.$().text().trim().includes('German'), true);

  $('option:contains("German")').prop('selected', true).trigger('change');
});
