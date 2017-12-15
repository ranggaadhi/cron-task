"use strict"

let bluebird = require("bluebird")


exports.run = bluebird.coroutine(function* () {
    console.log("Executing function RUN..")
})

exports.main = bluebird.coroutine(function* () {
    console.log("Executing function MAIN..")
})

exports.init = bluebird.coroutine(function* () {
    console.log("Executing function INIT..")
})

exports.close = bluebird.coroutine(function* () {
    console.log("Executing function CLOSE..")
})