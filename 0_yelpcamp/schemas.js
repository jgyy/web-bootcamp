import Joi from "joi";

const campgroundSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.string().required().min(0),
  }).required(),
});

const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required(),
    body: Joi.string().required(),
  }).required(),
});

export { campgroundSchema, reviewSchema };
