(function() {
    'use strict';
    var noop = function() {};
    var resolvedPromise = function() { return Promise.resolve(); };
    var rejectedPromise = function() { return Promise.reject(); };

    window.PokiSDK = {
        init: function() {
            return Promise.resolve();
        },
        initWithVideoHB: function() {
            return Promise.resolve();
        },
        customEvent: noop,
        commercialBreak: function() {
            return Promise.resolve();
        },
        rewardedBreak: function() {
            return Promise.resolve(false);
        },
        displayAd: noop,
        destroyAd: noop,
        getLeaderboard: function() {
            return Promise.resolve([]);
        },
        getSharableURL: rejectedPromise,
        getURLParam: function(param) {
            var match = RegExp('[?&]' + param + '=([^&]*)').exec(window.location.search);
            return match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : '';
        },
        disableProgrammatic: noop,
        gameLoadingStart: noop,
        gameLoadingFinished: noop,
        gameInteractive: noop,
        roundStart: noop,
        roundEnd: noop,
        muteAd: noop,
        setDebug: noop,
        gameplayStart: noop,
        gameplayStop: noop,
        gameLoadingProgress: noop,
        happyTime: noop,
        setPlayerAge: noop,
        togglePlayerAdvertisingConsent: noop,
        logError: noop,
        sendHighscore: noop,
        setDebugTouchOverlayController: noop,
        isAdBlocked: function() { return false; },
        measure: noop,
        dequeue: noop
    };
})();