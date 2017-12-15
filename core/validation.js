"use strict"
let bluebird = require("bluebird")
let path = require("path")
let fs = require('fs')

module.exports = bluebird.coroutine(function* (config) {

    let debug = require("debug")("one-script:core/validation")
    debug('Config validation start..')

    let props = Object.keys(validate)

    for(let prop of props) {
        debug(`- ${prop}`)
        yield validate[prop](config)
        debug(`--- succeed`)
    }

    debug('Config validation done')
})

const infinite_loop = bluebird.coroutine(function *(config) {
    if(typeof config.infinite_loop !== "boolean") {
        throw new Error(`"infinite_loop" must be a boolean !`)
    }
})

const sleep = bluebird.coroutine(function *(config) {
    if(isNaN(config.sleep)) {
        throw new Error(`${config.sleep} is not a number !`)
    }
})

const run = bluebird.coroutine(function *(config) {

    let source = typeof config.source == "string" ? require(config.source) : config.source
    let f_run = source[config.run] || source.run
    if(!isFunction(f_run)) {
        if(config.run) {
            throw new Error(`"${config.run}" is not a function !`)
        }else{
            throw new Error(`Please specify "run" property !`)
        }
    }
})

const init = bluebird.coroutine(function *(config) {

    if(config.init === false) {
        return
    }

    let source = typeof config.source == "string" ? require(config.source) : config.source
    let f_init = source[config.init] || source.init || function () {}
    if(!isFunction(f_init)) {
        if(config.init) {
            throw new Error(`"${config.init}" is not a function !`)
        }
    }
})

const close = bluebird.coroutine(function *(config) {

    if(config.close === false) {
        return
    }

    let source = typeof config.source == "string" ? require(config.source) : config.source
    let f_close = source[config.close] || source.close || function () {}
    if(!isFunction(f_close)) {
        if(config.close) {
            throw new Error(`"${config.close}" is not a function !`)
        }
    }
})

const source = bluebird.coroutine(function *(config) {
    if(typeof config.source == "string") {
        config.source = path.resolve(config.source)
        let fs = require("fs")
        if (!fs.existsSync(config.source)) {
            throw new Error(`"${config.source}" is not exist !`)
        }
    } else if(typeof config.source != "object") {
        throw new Error(`Invalid "source" type ! Must be an object or a string !`)
    }
})

const log_file = bluebird.coroutine(function* (config) {
    // let {log_file} = config
    // let extension = log_file.substring(log_file.length - 4)
    // if(extension == ".log") {
    //     config.log_file = config.log_file.substring(0, log_file.length - 4)
    // }

})

const pid_file = bluebird.coroutine(function* (config) {
    let arrFile = config.pid_file.split('/')
    arrFile.splice(-1,1)
    let pathFile = arrFile.join('/')
    if(!fs.existsSync('../pid')) {
        fs.mkdirSync('../pid')
    }
    config.pid_file = path.resolve(config.pid_file)
    let extension = config.pid_file.substring(config.pid_file.length - 4)

    if(extension == ".pid") {
        config.pid_file = config.pid_file.substring(0, config.pid_file.length - 4)
    }

})

const log_folder = bluebird.coroutine(function* (config) {
    // let {log_folder} = config
    // config.log_folder = path.resolve(config.log_folder)
    // createFolderIfNotExist(log_folder)

})

function createFolderIfNotExist (path) {
    let fs = require("fs")

    if(fs.existsSync(path)) {
        let lstat = fs.lstatSync(path)
        if(!lstat.isDirectory()) {
            throw new Error(path + " already exist, please choose different path !")
        }
    } else {
        fs.mkdirSync(path)
    }
}

function isFunction (functionToCheck) {
    let getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

const validate = {
    infinite_loop,
    source,
    init,
    run,
    close,
    sleep,
    log_folder,
    log_file,
    pid_file
}