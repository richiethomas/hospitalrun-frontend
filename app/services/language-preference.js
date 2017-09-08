import Ember from 'ember';

export default Ember.Service.extend({

  i18n: Ember.inject.service(),
  config: Ember.inject.service(),

  setSessionI18nPreference() {
    let setSessionI18n = (preferences, userName) => {
      if (userName && preferences[userName]) {
        this.set('i18n.locale', preferences[userName].i18n);
      }
    };
    this._fetchUserPreferencesDBThen(setSessionI18n);
  },

  setUserI18nPreference(i18n) {
    let setUserI18n = (preferences, userName) => {
      if (preferences[userName] === undefined) {
        preferences[userName] = {};
      }
      preferences[userName].i18n = i18n;
      this.get('config.configDB').put(preferences);
      this.set('i18n.locale', i18n);
    };
    this._fetchUserPreferencesDBThen(setUserI18n);
  },

  _fetchUserPreferencesDBThen(callback) {
    let configDB = this.get('config.configDB');
    let userName;
    configDB.get('current_user').then((user) => {
      userName = this._fetchUsername(user);
      let preferences = configDB.get('preferences');
      let promises = { userName, preferences };
      return Ember.RSVP.hash(promises);
    }).then((promises) => {
      let { preferences, userName } = promises;
      callback(preferences, userName);
    }).catch((err) => {
      console.log(err);
      if (err.status === 404) {
        this._initPreferencesDB(userName, 'en');
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
        return undefined;
    }
  },

  _initPreferencesDB(username, i18n) {
    let doc = {
      _id: 'preferences'
    };
    if (username != undefined) {
      doc[username] = {
        i18n: i18n || 'en'
      };
    }
    this.get('config.configDB').put(doc);
  }
});
