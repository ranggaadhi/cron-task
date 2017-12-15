"use strict"

let oneScript = require("one-script")
let bluebird = require("bluebird")

oneScript({
    infinite_loop: true,
    log_folder: "../logs",
    log_file: "log_object.log",
    pid_file: "../pid/pid_object.pid",
    source: {
        run : bluebird.coroutine(function* () {
            console.log("Executing function RUN..")
        }),
        main : bluebird.coroutine(function* () {
            console.log("Executing function MAIN..")
        }),
        init : bluebird.coroutine(function* () {
            console.log("Executing function INIT..")
        }),
        close : bluebird.coroutine(function* () {
            console.log("Executing function CLOSE..")
        })
    },
    init: "init",
    run: "main",
    close: "close",
    sleep: 1000
})