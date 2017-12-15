"use strict"

let oneScript = require("one-script")

oneScript({
    infinite_loop: true,
    log_folder: "../logs",
    log_file: "log_basic.log",
    pid_file: "../pid/pid_basic.pid",
    source: "./logic.js",
    init: "init",
    run: "main",
    close: "close",
    sleep: 1000
})