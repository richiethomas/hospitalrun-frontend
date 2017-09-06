import Ember from 'ember';

export default Ember.Service.extend({

  i18n: Ember.inject.service(),
  config: Ember.inject.service(),

  setUserI18nPreference() {
    // TODO: remove duplication between this function and `storeUserI18n` function below
    let configDB = this.get('config.configDB');
    let userName;
    configDB.get('current_user').then((user) => {
      // see if you can get away with skipping this step if the user is not logged in
      userName = this._fetchUsername(user);
    }).then(() => {
      return configDB.get('preferences');
    }).then((preferences) => {
      // This block is the only difference between the two functions
      this._setSessionI18nIfPreferenceExists(preferences, userName);
    }).catch((err) => {
      console.log(err);
      if (err.status === 404) {
        this._initPreferencesDB(userName, 'en');
      }
    });
  },

  storeUserI18n(i18n) {
    // TODO: remove duplication between this function and `setUserI18nPreference` function above
    let configDB = this.get('config.configDB');
    let userName;
    configDB.get('current_user').then((user) => {
      userName = this._fetchUsername(user);
    }).then(() => {
      return configDB.get('preferences');
    }).then((preferences) => {
      // This block is the only difference between the two functions
      this._storeUserI18nIfPreferenceExists(preferences, userName, i18n);
    }).catch((err) => {
      console.log(err);
      if (err.status === 404) {
        this._initPreferencesDB(userName, i18n);
      }
    });
  },

  _fetchUsername(user) {
    switch (typeof user.value) {
      case 'string':
        return user.value;
      case 'object':
        return user.value.name;
      default:
        return 'default';
    }
  },

  _setSessionI18nIfPreferenceExists(preferences, userName) {
    if (preferences[userName]) {
      this.set('i18n.locale', preferences[userName].i18n);
    }
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
