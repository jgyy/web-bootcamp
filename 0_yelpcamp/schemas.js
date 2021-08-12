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

export default campgroundSchema;
