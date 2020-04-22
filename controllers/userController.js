const User = require('./../models/userModel');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

const filterObj = (obj, ...allowedFileds) => {

    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFileds.includes(el)) {
            newObj[el] = obj[el];
        };
    });

    return newObj;
};

exports.getAllUsers = catchAsync(async(req, res, next) => {

    const users = await User.find();

    // Send response
    res.status(200).json({
        status: 'success',
        results: users.length,
        requestedAt: req.requestTime,
        data: {
            users
        }
    });
});

exports.getUser = catchAsync(async(req, res) => {

    const user = User.findById(req.params.id);

    if (!user) {
        next(new AppError('There is no such a user with given ID', 401))
    };

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

exports.addUser = catchAsync(async(req, res) => {
    const newUser = await User.create(req.body);

    if (!newUser) {
        return new AppError('Please, provide a user data');
    };

    res.status(200).json({
        status: 'succes',
        newUser
    });

});

exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

exports.deleteUser = catchAsync(async(req, res) => {

    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success'
    });
});

exports.updateMe = catchAsync(async(req, res, next) => {
    // Make error if user posts password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This route is not for password updates! Please, use update my password', 499));
    };

    // Filter fields that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');

    // Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    });
});


exports.deleteMe = catchAsync(async(req, res, next) => {
    await User.findByIdAndDelete(req.user.id, { active: false });

    res.status(204).json({
        status: 'success',
        data: null
    });
})