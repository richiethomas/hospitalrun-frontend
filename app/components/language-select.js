import Ember from 'ember';


export default Ember.Component.extend({
  config: Ember.inject.service(),
  languages: Ember.computed(function() {
    return ['foo', 'bar', 'baz'];
  }),
  selectedLanguage: null,

  didRender() {
    // let configDB = this.get('config.configDB');
    // let langChoice;
    // configDB.get('current_user').then((user) => {
    //   configDB.put({
    //     lang: 'en',
    //     _id: user._id,
    //     _rev: user._rev,
    //     value: user.value
    //   });
    //   langChoice = 'en';
    //   this.set('i18n.locale', user.lang);
    //   debugger;
    // });
    // // let user = configDB.get('current_user').then((user) => {
    // debugger;
      // user.set('lang', 'en');
    // });

  },

  actions: {
    selectLanguage() {

    }
  }
});
