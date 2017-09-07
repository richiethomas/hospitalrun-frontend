import Ember from 'ember';

export default Ember.Service.extend({

  i18n: Ember.inject.service(),
  config: Ember.inject.service(),

  setUserI18nPreference() {
    let success = (preferences, userName, options) => {
      this._setSessionI18nIfPreferenceExists(preferences, userName);
    }
    let failure = (err) => {
      console.log(err);
      if (err.status === 404) {
        this._initPreferencesDB(userName, 'en');
      }
    }
    this._fetchUserPreferencesDBThen(success, failure, {"i18n": 'en'});
  },

  storeUserI18n(i18n) {
    let success = (preferences, userName, options) => {
      this._storeUserI18nIfPreferenceExists(preferences, userName, options.i18n);
    }
    let failure = (err) => {
      console.log(err);
      if (err.status === 404) {
        this._initPreferencesDB(userName, i18n);
      }
    }
    this._fetchUserPreferencesDBThen(success, failure, {"i18n": i18n});
  },

  _fetchUserPreferencesDBThen(success, failure, options) {
    let configDB = this.get('config.configDB');
    let userName;
    configDB.get('current_user').then((user) => {
      userName = this._fetchUsername(user);
    }).then(() => {
      let preferences = configDB.get('preferences');
      let promises = { userName, preferences };
      return Ember.RSVP.hash(promises);
    }).then((promises) => {
      let { preferences, userName } = promises;
      success(preferences, userName, options);
    }).catch((err) => {
      failure(err);
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
