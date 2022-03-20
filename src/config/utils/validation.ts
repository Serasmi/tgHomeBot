import joi from 'joi';

const permitUsersValidator: joi.CustomValidator<string> = (value, helper) => {
  const validationFailed = () => helper.error(
    'any.custom',
    {
      error: new Error('The value could not be cast to number[] from a string')
    }
  );

  try {
    const permitUsers = JSON.parse(value);
    const schema = joi.array().min(1).items(joi.number()).required();
    const { error, value: parsedValue } = schema.validate(permitUsers);

    if (error) {
      return validationFailed();
    }

    return parsedValue;
  } catch {
    return validationFailed();
  }
};

export const envVarsSchema = joi.object({
  HA_API_BASEURL: joi.string().uri().required(),
  HA_API_TOKEN: joi.string().required(),

  TG_API_TOKEN: joi.string().required(),
  TG_PERMIT_USERS: joi.string().custom(permitUsersValidator).required()
}).unknown()
  .required();
