const Tour = require('./../models/tourModel');
const User = require('./../models/userModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.getAllTours = catchAsync(async(req, res) => {

    const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const tours = await features.query;

    // Send response
    res.status(200).json({
        status: 'success',
        results: tours.length,
        requestedAt: req.requestTime,
        data: {
            tours
        }
    });

});

exports.getTour = catchAsync(async(req, res, next) => {

    const tour = await Tour.findById(req.params.id).populate({
        path: 'guides',
        select: '-__v -passwordChangedAt'
    }).populate({
        path: 'reviews'
    });

    if (!tour) {
        next(new appError('There is no tour with given ID', 401));
    };

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
});

exports.addTour = catchAsync(async(req, res, next) => {

    const newTour = await Tour.create(req.body);

    if (!newTour) {
        return next(new AppError('Cannot create a tour', 401));
    };

    res.status(200).json({
        status: 'success',
        data: {
            tour: newTour
        }
    });

});

exports.updateTour = catchAsync(async(req, res) => {

    const tour = await Tour.findByIdAndUpdate(
        req.body.id,
        req.body, {
            new: true,
            runValidators: true
        }
    );

    if (!tour) {
        return new AppError('No tour found with that ID', 404);
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: tour
        }
    });
});


exports.deleteTour = catchAsync(async(req, res, next) => {
    // Get the data
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
        return next(new AppError('There is no tour found', 404));
    };


    res.status(200).json({
        status: 'success',
        data: {
            tour: tour
        }
    });
});

/*
exports.deleteTour = catchAsync(async(req, res, next) => {
    const doc = await Tour.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
}); */


exports.getTourStats = catchAsync(async(req, res) => {

    const stats = await Tour.aggregate([{
            $match: { ratingsAverage: { $gte: 4.5 } }
        },
        {
            $group: {
                _id: { $toUpper: '$difficulty' },
                toursNum: { $sum: 1 },
                numRatings: { $sum: '$ratingsQuantity' },
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' }
            },
        },
        {
            $sort: { avgPrice: 1 }
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            stats
        }
    });
});

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};