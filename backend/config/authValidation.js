import joi from "joi";

const AuthSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi
    .string()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "in"] } })
    .required(),
  password: joi
    .string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      ) //one uppercase ,one lowercase,one special character,one number,min 8 length
    )
    .required(),
});

const LoginAuthSchema = joi.object({
  email: joi
    .string()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "in"] } })
    .required(),
  password: joi
    .string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      ) //one uppercase ,one lowercase,one special character,one number,min 8 length
    )
    .required(),
});

const itemSchema = joi.object({
  itemName: joi.string().required(),
  size: joi.string().required(),
  price: joi.number().required(),
  quantity: joi.number().required(),
  buyPrice: joi.number().required(),
  discount: joi.number().required(),
});

const partySchema = joi.object({
  partyName: joi.string().required(),
  phoneNumber: joi.string().length(10).required(),
  address: joi.string().required(),
  partyType: joi.string().required(),
});

const partyItemSchema = joi.object({
  itemName: joi.string().required(),
  size: joi.string().required(),
  price: joi.number().required(),
  sellPrice: joi.number().required(),
  quantity: joi.number().required(),
  discount: joi.number().required(),
  date: joi.string().required(),
});

export {
  AuthSchema,
  LoginAuthSchema,
  itemSchema,
  partySchema,
  partyItemSchema,
};
