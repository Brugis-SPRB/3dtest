const React = require('react');
const ReactDOM = require('react-dom');
const {connect} = require('react-redux');
const LocaleUtils = require('../MapStore2/web/client/utils/LocaleUtils');


require('rxjs/Rx');

LocaleUtils.setSupportedLocales({
    "fr": {
        code: "fr-FR",
        description: "Français"
    },
    "en": {
        code: "en-US",
        description: "English"
    },
    "nl": {
        code: "nl-NL",
        description: "Nederlands"
    }
});

const startApp = () => {
    const StandardApp = require('../MapStore2/web/client/components/app/StandardApp');
    const {pages, pluginsDef, initialState, storeOpts, appEpics = {}} = require('./appConfig');

    const StandardRouter = connect((state) => ({
        locale: state.locale || {},
        pages
    }))(require('../MapStore2/web/client/components/app/StandardRouter'));

    const appStore = require('./stores/store').bind(null, initialState, {
      maptype: require('../MapStore2/web/client/reducers/maptype'),
      maps: require('../MapStore2/web/client/reducers/maps')
    }, appEpics);

    const appConfig = {
        storeOpts,
        appEpics,
        appStore,
        pluginsDef,
        initialActions: [],
        appComponent: StandardRouter,
        printingEnabled: true,
        themeCfg: {theme: "console"}
    };

    ReactDOM.render(
        <StandardApp {...appConfig}/>,
        document.getElementById('container')
    );
};

if (!global.Intl ) {
    // Ensure Intl is loaded, then call the given callback
    LocaleUtils.ensureIntl(startApp);
} else {
    startApp();
}
