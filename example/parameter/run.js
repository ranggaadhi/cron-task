"use strict"

let oneScript = require("one-script")
let param_1 = process.argv[2] || "argument_1"

oneScript({
    infinite_loop: true,
    log_folder: "../logs",
    log_file: "log_parameter.log",
    pid_file: "../pid/pid_" + param_1 + ".pid",
    source: "./logic.js",
    init: "init",
    run: "main",
    close: "close",
    sleep: 1000
})