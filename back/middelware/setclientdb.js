const mongoose = require('mongoose');
const config = require('../config/dbconfig')
let client;
            let clientname;
            let activedb;

            var Promise = require("bluebird");
            Promise.promisifyAll(require("mongoose"));
            //mongoose = require('mongoose');


            function setclientdb() {
                return function (req, res, next) {
                    //check if client is not valid
                    if (typeof(req.session.Client) === 'undefined' || !req.session.Client && req.session.Client.name !== req.subdomains[1]) {
                        delete req.session.Client;
                        client = false;
                        return next();
                    }
                    //if client already has an existing connection make it active
                    else if (global.App.clients.indexOf(req.session.Client.subdomain) > -1) {
                        global.App.activdb = global.App.clientdbconn[req.session.Client.subdomain]; //global.App.clientdbconnection is an array of or established connections
                        console.log('did not make new connection for ' + req.session.Client.name);
                        return next();
                    }
                    //make new db connection
                    else {
                        console.log('setting db for client ' + req.subdomains[1] );
                        client = mongoose.createConnection(config.clientdbpart1+req.session.Client.subdomaine+config.clientdbpart2 , { useNewUrlParser: true,  useUnifiedTopology: false });
                        client.on('connected', function () {
                            console.log('Mongoose default connection open to  ' + req.session.Client.fname);
                            //If pool has not been created, create it and Add new connection to the pool and set it as active connection
                            if (typeof(global.App.clients) === 'undefined' || typeof(global.App.clients[req.session.Client.name]) === 'undefined' && typeof(global.App.clientdbconn[req.session.Client.name]) === 'undefined') {
                                clientname = req.session.Client.subdomaine;
                                console.log(req.session.Client);
                                global.App.clients.push(clientname);// Store name of client in the global clients array
                                activedb = global.App.clientdbconn[clientname] = client; //Store connection in the global connection array and set it as the current active database
                                console.log('I am now in the list of active clients  ' + global.App.clients[clientname]);
                                global.App.activdb = activedb;
                                console.log('client connection established, and saved ' + req.session.Client.name);
                                return next();
                            }
                        });
                        // When the connection is disconnected
                        client.on('disconnected', function () {
                            console.log('Mongoose ' + req.session.Client.name + ' connection disconnected');
                        });

                        // If the Node process ends, close the Mongoose connection
                        process.on('SIGINT', function () {
                            client.close(function () {
                                console.log(req.session.Client.name + ' connection disconnected through app termination');
                                process.exit(0);
                            });
                        });
                    }


                }
            }

            module.exports = setclientdb;