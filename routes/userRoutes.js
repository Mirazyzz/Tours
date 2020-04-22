const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

//router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch('/updatePassword', authController.protect, authController.updatePassword);
router.patch('/updateMyData', authController.protect, userController.updateMe);

router.delete('/deleteMyAccount', authController.protect, userController.deleteMe);


router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.addUser);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(authController.protect, authController.restrictTo('admin', 'lead-guide'), userController.deleteUser);


module.exports = router;