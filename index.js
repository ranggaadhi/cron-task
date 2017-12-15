"use strict"

let debug = require("debug")("one-script:index")
let bluebird = require("bluebird")
let handler = require("./core/handler_pid_file.js")

module.exports = bluebird.coroutine(function* (config) {

    debug('Starting Cron Task')

    //========== VALIDATION
    let validate = require("./core/validation.js")
    yield validate(config)

    //========== SIGNAL HANDLING
    let signal_handler = require("./core/handler_signal.js")
    signal_handler(config)

    //========== Logger
    let filepath = `${config.log_folder}/${config.log_file}.log`
    //global.myLogger = require('mony-logger')(filepath, config.log_file + ".log", 102400000, 50, 'trace')

    let source = yield getSource(config.source)
    let f_run = source[config.run] || source.run
    let f_init = config.init === false ? bluebird.coroutine(function*() {}) : source[config.init] || source.init || bluebird.coroutine(function*() {})
    let f_close = config.close === false ? bluebird.coroutine(function*() {}) : source[config.close] || source.close || bluebird.coroutine(function*() {})

    //========== START JOB
    let infinite_loop = true
    yield cron_start(config)
    yield f_init(config.db)
    while (infinite_loop == true) {

        yield f_run(config.db)
        yield sleep(config.sleep)

        infinite_loop = config.infinite_loop

    }
    yield f_close(config.db)
    yield cron_end(config)
    //========== END JOB

    debug('Exiting Cron Task')
})

const sleep = bluebird.coroutine(function* (t) {
    yield new Promise((resolve) => {
        setTimeout(function () {
            resolve(true)
        }, t)
    })
})

const cron_start = bluebird.coroutine(function* (config) {
    //myLogger.info('START', {message: "Starting one-script", config})
    debug('Starting cronjob..')

    let filepath = `${config.pid_file}.pid`
    yield handler.open(filepath)

})

const cron_end = bluebird.coroutine(function* (config) {

    // if(config.signal_info !== undefined) {
        // myLogger.info('END', {message: "Signal : " + config.signal_info, config})
    // }else{
        // myLogger.info('END', {message: "Signal : UNDEFINED", config})
    // }

    let filepath = `${config.pid_file}.pid`
    yield handler.close(filepath)

    debug('Exiting cronjob')

})

const getSource = bluebird.coroutine(function *(source) {

    if(typeof source == "object") {
        return source
    }else{
        return require(source)
    }
})