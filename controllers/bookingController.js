// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourID);

  //   const session = await stripe.checkout.session.create({
  //     payment_method_types: ['card'],
  //     success_url: `${req.protocol}://${req.get('host')}/`,
  //     cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
  //     customer_email: req.user.email,
  //     client_reference_id: req.params.tourId,
  //     line_items: [
  //       {
  //         name: `${tour.name} Tour`,
  //         description: tour.description,
  //         images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
  //         amount: tour.price * 100,
  //         currency: 'USD',
  //         quantity: 1,
  //       },
  //     ],
  //   });

  //   res.status(200).json({
  //     success: 'success',
  //     session,
  //   });
  next();
});
