import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

let apiRoutes = express.Router();
let router = express.Router();

import messageParser from '../helper/messageParser';
import * as userController from '../controller/userController';
import { validateUser } from '../model/userModel';

import validateMiddleWare from '../middleware/validate';

apiRoutes.use(async (req, res, next) => {
    let token = req.body.authorization || req.query.authorization || req.headers['authorization'];
    let userid = req.body.userid || req.query.userid || req.headers['userid'];
    let checkUserId = false;
    if (!token) {
        return res.json({
            "error": messageParser.noToken
        });
    }

    if (!userid) {
        return res.json({
            "error": messageParser.userIdRequired
        });
    }

    if (mongoose.isValidObjectId(userid))
        checkUserId = await userController.checkUserIsExistOrNot(userid)

    if (checkUserId) {
        jwt.verify(token, process.env.MY_SECRET, (err, decoded) => {
            if (err) {
                return res.json({
                    "error": messageParser.invalidToken
                });
            } else {
                req.user = decoded._doc;
                next();
            }
        });
    }
    else {
        return res.json({
            "error": messageParser.invalidUserId
        });
    }
});

router.use('/api', apiRoutes);

/**---------------------- | User | ------------------ */
// router.post('/signup', [validateMiddleWare(validateUser)], authController.signup_post)
router.post('/signUp', validateMiddleWare(validateUser), userController.signUp);
router.get('/api/user', userController.listUser);
router.put('/api/user', userController.updateUser);
router.delete('/api/user', userController.deleteUser);
router.get('/regenerateToken', userController.regenerateToken);
module.exports = router;