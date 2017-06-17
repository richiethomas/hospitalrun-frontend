import Ember from 'ember';


export default Ember.Component.extend({
  config: Ember.inject.service(),
  i18n: Ember.inject.service(),
  languageOptions: Ember.computed(function() {
    return Object.keys(this.get('languageMap'));
  }),
  onFinish: null,
  languageMap: Ember.computed(() => {
    return {
      "English": "en",
      "French": "fr",
      "Spanish": "es"
    }
  }),
  selectedLanguage: null,

  actions: {
    selectLanguage(_, selection) {
      let configDB = this.get('config.configDB');
      let languageChoice = this.get('languageMap')[selection];
    configDB.get('current_user').then((user) => {
      configDB.put({
        lang: languageChoice,
        _id: user._id,
        _rev: user._rev,
        value: user.value
      });
      this.set('i18n.locale', user.lang);
      this.get('onFinish')();
    });
    }
  }
});
