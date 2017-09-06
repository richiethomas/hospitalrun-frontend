import Ember from 'ember';

export default Ember.Service.extend({

  i18n: Ember.inject.service(),
  config: Ember.inject.service(),

  setUserI18nPreference() {
    let configDB = this.get('config.configDB');
    let userName;
    configDB.get('current_user').then((doc) => {        // Set username in current_user DB
      userName = doc.value;
    }).then(() => {                                   // Fetch preferences DB
      return configDB.get('preferences');
    }).then((doc) => {                                //  Set current user's i18n preference
      let name = (typeof userName === 'object') ? userName.name : userName;
      if (doc[name]) {
        let preference = doc[name].i18n;
        this.set('i18n.locale', preference);
      }
      return;
    }).catch((err) => {
      console.log(err);
      this._initPreferencesDB(userName, 'en');
    });
  },

  storeUserI18n(selection) {
    let configDB = this.get('config.configDB');
    let username;
    configDB.get('current_user').then((user) => {
      username = (typeof user.value === 'string') ? user.value : user.value.name;
    }).then(() => {
      return configDB.get('preferences');
    }).then((preferences) => {
      if (preferences[username] === undefined) {
        preferences[username] = {};
      }
      preferences[username].i18n = selection;
      configDB.put(preferences);
      this.set('i18n.locale', selection);
    }).catch((err) => {
      console.log(err);
      this._initPreferencesDB(username, selection);
    });
  },

  _initPreferencesDB(username, i18n) {
    let configDB = this.get('config.configDB');
    let doc = {
      _id: 'preferences',
      'default': {
        'i18n': 'en'
      }
    };
    if (username != undefined) {
      doc[username] = {
        i18n: i18n || 'en'
      };
    }
    configDB.put(doc);
  }
});
