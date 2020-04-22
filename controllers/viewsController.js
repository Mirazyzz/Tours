const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.getOverview = catchAsync(async(req, res, next) => {
    // Get all tours from DB
    const tours = await Tour.find();

    // Build template
    // Render template
    res.status(200).render('overview', {
        title: 'All Tours',
        tours
    });
});


exports.getTour = catchAsync(async(req, res, next) => {
    // Get the data, for the requested tour (including reviews and guides)
    const tour = await Tour.findOne({ slug: req.params.slug }).populate({
        path: 'reviews',
        fields: 'review rating user'
    });

    if (!tour) {
        return next(new AppError('There is no tour with that name.', 404));
    }

    // Build template
    // Render template using data from 1)
    res.status(200).render('tour', {
        title: `${tour.name} Tour`,
        tour
    });
});


exports.getAccount = (req, res) => {
    res.status(200).render('account', {
        title: 'Your account'
    });
};

exports.getLoginForm = (req, res) => {
    // Render login form
    res.status(200).render('login', {
        title: 'Login into your account'
    });
};

exports.getManageUsersForm = (req, res) => {
    // Render manage users form
    res.status(200).render('addUser', {
        title: 'Manage users'
    });
};

exports.getAddTourForm = (req, res) => {
    res.status(200).render('addTour', {
        title: 'Add tour'
    });
};

exports.getTourManagementForm = catchAsync(async(req, res) => {
    // Get all tours from DB
    const tours = await Tour.find();

    // Build template
    // Render template
    res.status(200).render('tourManagement', {
        title: 'All Tours',
        tours
    });
});

exports.getEditTourForm = catchAsync(async(req, res) => {
    // Get tour
    const guides = await User.find({ role: { $in: ["guide", "guide-lead"] } });

    const tour = await Tour.findOne({ slug: req.params.slug }).populate({
        path: 'reviews',
        fields: 'review rating user'
    });

    if (!tour) {
        return next(new AppError('There is no tour with that name.', 404));
    };

    // Build template
    // Render template using data from 1)
    res.status(200).render('editTour', {
        title: `${tour.name} Tour`,
        data: {
            tour,
            guides
        }
    });
});

exports.getDeleteTourForm = catchAsync(async(req, res, next) => {
    // Get tour
    const tour = await (await Tour.findOne({ slug: req.params.slug })).populate({
        path: 'reviews',
        fields: 'review rating user'
    });

    if (!tour) {
        return next(new AppError('There is no tour with given name', 404));
    };

    res.status(200).render('deleteTour', {
        title: `${tour.name} Tour`,
        tour
    });
});

exports.updateTourData = catchAsync(async(req, res, next) => {
    console.log(req.body);
    const updatedTour = await Tour.findByIdAndUpdate(
        req.tour._id, {
            name: req.body.name,
            duration: req.body.duration,
            maxGroupSize: req.body.maxGroupSize,
            difficulty: req.body.difficulty,
            price: req.body.price,
            description: req.body.description,
            summary: req.body.summary
        }, {
            new: true,
            runValidators: true
        }
    );

    res.status(200).render('account', {
        title: 'Your account',
        user: updatedUser
    });
})