import Ember from 'ember';

export default Ember.Service.extend({

  i18n: Ember.inject.service(),
  config: Ember.inject.service(),

  setUserI18nPreference() {
    let configDB = this.get('config.configDB');
    let userName;
    configDB.get('current_user').then((user) => {
      switch (typeof user.value) {
        case 'string':
          userName = user.value;
          break;
        case 'object':
          userName = user.value.name;
          break;
        default:
          userName = 'default';
      }
    }).then(() => {
      return configDB.get('preferences');
    }).then((preferences) => {
      this._setSessionI18nIfPreferenceExists(preferences, userName);
    }).catch((err) => {
      console.log(err);
      this._initPreferencesDB(userName, 'en');
    });
  },

  _setSessionI18nIfPreferenceExists(preferences, userName) {
    if (preferences[userName]) {
      this.set('i18n.locale', preferences[userName].i18n);
    }
  },

  storeUserI18n(i18n) {
    let configDB = this.get('config.configDB');
    let userName;
    configDB.get('current_user').then((user) => {
      switch (typeof user.value) {
        case 'string':
          userName = user.value;
          break;
        case 'object':
          userName = user.value.name;
          break;
        default:
          userName = 'default';
      }
    }).then(() => {
      return configDB.get('preferences');
    }).then((preferences) => {
      this._storeUserI18nIfPreferenceExists(preferences, userName, i18n);
    }).catch((err) => {
      console.log(err);
      this._initPreferencesDB(userName, i18n);
    });
  },

  _storeUserI18nIfPreferenceExists(preferences, userName, i18n) {
    if (preferences[userName] === undefined) {
      preferences[userName] = {};
    }
    preferences[userName].i18n = i18n;
    this.get('config.configDB').put(preferences);
    this.set('i18n.locale', i18n);
  },

  _initPreferencesDB(username, i18n) {
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
    this.get('config.configDB').put(doc);
  }
});
