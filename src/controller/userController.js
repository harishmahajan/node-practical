import { userModel } from '../model/userModel';

import responseHelper from '../helper/responseHelper';
import messageParser from '../helper/messageParser';
import * as jwtGenerate from '../helper/jwtGenerateHelper';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
let objectId = mongoose.Types.ObjectId;

/**
 * CREATE USER
 * POST http://localhost:1930/api/user
 * {
    "email": "harish.mahajan@atozinfoway.com",
    "mobile": "9999988766",
    "password": "admin123",
}
 */
exports.createUser = async (req, res, next) => {
    try {
        let passwordHash = await bcrypt.hashSync(req.body.password, 8);
        let { email, mobile, addedDate = new Date().toUTCString() } = req.body;
        let requestData = new userModel();
        requestData = { email, mobile, password: passwordHash, addedDate };
        let userData = await userModel.create(requestData);
        if (userData) {
            let tokenData = {
                userId: userData._id,
                email: userData.email,
                mobile: userData.mobile
            };
            let token = await jwtGenerate.generateAccessJWT(tokenData);
            let data = {
                "token": token,
                "userId": userData._id,
                "expires_in": process.env.TOKEN_EXPIRES_IN,
            };
            res.json(responseHelper.successResponse(200, messageParser.alertMessage['users'].createSuccess, data));
        } else {
            res.json(responseHelper.errorResponse(401, messageParser.alertMessage['users'].createError, {}));
        }

    } catch (error) {
        res.json(responseHelper.errorResponse(401, messageParser.alertMessage['users'].createError, error.stack));
    }
};

/**
 * UPDATE USER 
 * PUT http://localhost:1930/api/user
 * {
    "_id": "5e984fa695b3190e843ee202",
    "name": "Ankit Patel",
    "email": "ankit.patel@atozinfoway.in",
    "mobile": "9865741230",
    "userTypeId": "5e69e0e9bf2d1e1cc4ce1498",
    "updatedBy":"5e6b25b18dd3ca15d060f568",
    "address": "Navsari"
}
 */
exports.updateUser = async (req, res, next) => {
    try {
        if (!req.body.userid) res.json(responseHelper.errorResponse(401, messageParser.idRequired, 'error'));
        else {
            let userData = await userModel.findOne({ _id: req.body.userid });
            if (userData) {
                let { name, address, phoneNumber, updatedDate = new Date().toUTCString() } = req.body;
                let requestData = new userModel();
                requestData = { name, address, updatedDate, phoneNumber };
                let updatedData = await userModel.updateOne({ _id: req.body.userid }, { $set: requestData }, { upsert: true });
                if (updatedData.ok == 1) {
                    res.json(responseHelper.successResponse(200, messageParser.alertMessage['users'].updateSuccess, updatedData));
                } else {
                    res.json(responseHelper.errorResponse(401, messageParser.alertMessage['users'].updateError, 'error'));
                }
            } else {
                res.json(responseHelper.errorResponse(401, messageParser.alertMessage['users'].noDataFound, 'error'));
            }
        }
    } catch (error) {
        res.json(responseHelper.errorResponse(401, messageParser.alertMessage['users'].updateError, error.stack));
    }
};


/**
 * GET ALL USERS
 * GET http://localhost:1858/api/user?userid=5eeb35ce30012c1660ee6aa9
 */
exports.listUser = async (req, res, next) => {
    try {
        let usersData = await userModel.aggregate([
            {
                $match: { $and: [{ isDeleted: false }] }
            }
        ]);
        if (usersData) {
            res.json(responseHelper.successResponse(200, messageParser.alertMessage['users'].listSuccess, usersData));
        } else {
            res.json(responseHelper.errorResponse(401, messageParser.alertMessage['users'].listError, []));
        }
    } catch (error) {
        res.json(responseHelper.errorResponse(401, messageParser.alertMessage['users'].listError, error.stack));
    }
};


/**
 * DELETE USER
 * DELETE http://localhost:1930/api/user?userid=5e6b2abb8dd3ca15d060f56a&updatedBy=5e6b25b18dd3ca15d060f568
 */
exports.deleteUser = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.query.userid });
        if (userData) {
            let requestData = {
                isDeleted: !userData.isDeleted,
                updatedDate: new Date().toUTCString()
            };

            let updatedData = await userModel.updateOne({ _id: req.query.userid }, { $set: requestData }, { upsert: true });
            if (updatedData.ok == 1) {
                res.json(responseHelper.successResponse(200, messageParser.alertMessage['users'].deleteSucces, updatedData));
            } else {
                res.json(responseHelper.errorResponse(401, messageParser.alertMessage['users'].deleteError, 'error'));
            }
        } else {
            res.json(responseHelper.errorResponse(401, messageParser.alertMessage['users'].noDataFound, 'error'));
        }
    } catch (error) {
        res.json(responseHelper.errorResponse(401, messageParser.alertMessage['users'].deleteError, error.stack));
    }
};

exports.checkUserIsExistOrNot = async (userid) => {
    let usersData = await userModel.findOne({ _id: userid });
    if (usersData)
        return true;
    else
        return false;
};

exports.regenerateToken = async (req,res) => {
    if (mongoose.isValidObjectId(req.query.userid)) {
        let userData = await userModel.findOne({ _id: req.query.userid })
        if (userData) {
            let tokenData = {
                userId: userData._id,
                email: userData.email,
                mobile: userData.mobile
            };
            let token = await jwtGenerate.generateAccessJWT(tokenData);
            let data = {
                "token": token,
                "userId": userData._id,
                "expires_in": "24h",
            };
            res.json(responseHelper.successResponse(200, messageParser.tokenGeneratedSuccessfully, data));
        } else {
            res.json(responseHelper.successResponse(200, messageParser.recordsNotFound, {}));
        }
    }
    else {
        res.json(responseHelper.successResponse(200, messageParser.invalidUserId, data));
    }
};