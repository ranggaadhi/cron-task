Cron-Task
==============

Config description :

 -   infinite_loop: (Boolean) Determines if the process will be run once or infinitely
 -   log_folder: (String) Path to folder which will be used to store log files
 -   log_file: (String) Name that will be used as log file
 -   pid_file: (String) Full path that will be used as log file
 -   source: (String/Object) JSON object with service logic function, OR absolute path to file containing JSON object with service logic promise
 -   run: (String) The name of the promise that will be run within the loop, this property is mandatory, default value is "run"
 -   init: (String/false) The name of the promise that will be run before the loop, not mandatory, default value "init". If set to false, nothing will be executed
 -   close: (String/false) The name of the promise that will be run after the loop, not mandatory, default value "close". If set to false, nothing will be executed
 -   sleep: (Number) Interval between each iteration

Example how to use this service with file source is written in ./example/basic
Example how to use this service with object as a source is in ./example/basic_object
Example how to use this service with parameter is in ./example/parameter