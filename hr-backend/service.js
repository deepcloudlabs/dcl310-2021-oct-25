import logger from "morgan";
import express from "express";
import bodyParser from "body-parser";

// Layered Architecture
// Database                   : MongoDB  ✔  Schema-less
// Persistence Layer          : Mongoose -> Schema
//region Persistence Layer
import * as mongoose from "mongoose";
import {connect, model, mongo, Schema, Types} from "mongoose";
import util from "./utility";

// MongoDB: document (JSON, max: 16MB ) -> collection
//          binary large documents -> GridFS -> clustered, indexed
//          RabbitMQ (AMQP, plugin -> MQTT,WS,..., In-memory -> Low latency)
//                    IoT, Ultra Low-Latency (AlgoTrading, HFT)
//                    MongoDB
const employeeSchema = new Schema({
    "_id": Types.ObjectId,
    "fullname": {
        type: String,
        required: true,
        minLength: 5
    },
    "identityNo": {
        type: String,
        required: true,
        validate: [util.tcKimlikNoValidator, 'This is not a valid identity no.']
    },
    "photo": {
        type: String,
        required: false,
        default: util.NO_IMAGE
    },
    "salary": {
        type: Number,
        required: true,
        min: 3500,
        default: 3500
    },
    "iban": {
        type: String,
        required: true,
        validate: [util.ibanValidator, "This is not a valid iban."]
    },
    "department": {
        type: String,
        enum: ["IT", "SALES", "FINANCE", "HR"],
        default: "SALES"
    },
    "fulltime": {
        type: Boolean,
        required: true,
        default: true
    }
});
connect("mongodb://localhost:27017/hr")
const Employee = model('employees', employeeSchema);
//endregion

// REST over HTTP -- API Layer: Express
const port = 4001;
const app = express();

app.use(bodyParser.json({limit: '5mb'}))
app.use(logger('dev'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
    next();
});
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port);
console.log(`Server is running at ${port}`);
