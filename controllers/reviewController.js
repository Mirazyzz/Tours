const Review = require('./../models/reviewModel');
//const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const appError = require('./../utils/appError');

exports.getAllReviews = catchAsync(async(req, res, next) => {
    const reviews = await Review.find();

    res.status(200).json({
        status: 'success',
        results: reviews.length,
        data: {
            reviews
        }
    });
});

exports.getReview = catchAsync(async(req, res, next) => {
    const review = await Review.findById(req.params.id).populate({
        path: 'users',
        select: '-__v -passwordChangedAt'
    }).populate({
        path: 'tours'
    });

    if (!review) {
        next(new appError('There is no review with given ID', 404));
    };

    res.status(200).json({
        status: 'success',
        data: {
            review
        }
    });
})

exports.addReview = catchAsync(async(req, res) => {
    const newReview = await Review.create(req.body);

    if (!newReview) {
        return new AppError('Please, provide a user data');
    };

    res.status(200).json({
        status: 'succes',
        newReview
    });

});

exports.updateReview = catchAsync(async(req, res, next) => {

    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!review) {
        next(new appError('Please, provide correct parameters!'));
    };

    res.status(200).json({
        status: 'success',
        data: {
            review
        }
    });
});

exports.deleteReview = catchAsync(async(req, res, next) => {
    if (!req.params.id) {
        next(new appError('Please, provide id of review'));
    };

    await Review.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success'
    });
})


exports.setreviewUserIds = (req, res, next) => {
    // Allow nested routes
    if (!req.body.review) req.body.review = req.params.reviewId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
};