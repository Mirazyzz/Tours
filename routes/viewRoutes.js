const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();


router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/addUser', authController.protect, authController.restrictTo('admin'), viewsController.getManageUsersForm);
router.get('/manageTours', authController.protect, authController.restrictTo('admin'), viewsController.getTourManagementForm);
router.get('/manageTour/:slug', authController.protect, authController.restrictTo('admin'), viewsController.getEditTourForm);
router.get('/deleteTour/:slug', authController.protect, authController.restrictTo('admin'), viewsController.getDeleteTourForm);
router.get('/addTour', authController.protect, authController.restrictTo('admin'), viewsController.getAddTourForm);

router.post(
    '/submit-tour-data',
    authController.restrictTo('admin'),
    viewsController.updateTourData
);



module.exports = router;