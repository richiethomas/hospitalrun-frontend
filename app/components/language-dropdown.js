import Ember from 'ember';

export default Ember.Component.extend({
  i18n: Ember.inject.service(),
  languagePreference: Ember.inject.service(),

  classNames: ['language-dropdown'],

  languageOptions: Ember.computed('i18n.locale', function() {
    let i18n = this.get('i18n');
    return i18n.get('locales').map((item) => {
      return {
        id: item,
        name: i18n.t(`languages.${item}`)
      };
    });
  }),

  onFinish: null,

  actions: {
    selectLanguage(selection) {
      this.get('languagePreference').storeUserI18n(selection);
      this.get('onFinish')();
    }
  }

});
