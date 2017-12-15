"use strict"

let debug = require("debug")("one-script:core/validation")

module.exports = function (config) {

    debug('Attaching signal handler started..')

    process.on('SIGINT', () => sig_handler('SIGINT', config))
    process.on('SIGHUP', () => sig_handler('SIGHUP', config))
    process.on('SIGTERM', () => sig_handler('SIGTERM', config))

    debug('Attaching signal handler done')
}

function sig_handler (sig, config) {

    debug('Signal received : ' + sig)

    switch (sig) {
    case 'SIGTERM':
        config.signal_info = 'SIGTERM'
        config.infinite_loop = false
        break
    case 'SIGHUP':
        config.signal_info = 'SIGHUP'
        config.infinite_loop = false
        break
    case 'SIGINT':
        config.signal_info = 'SIGINT'
        config.infinite_loop = false
        break
    default:
        config.signal_info = 'UNDEFINED SIG ' + sig
        config.infinite_loop = false
    }

}