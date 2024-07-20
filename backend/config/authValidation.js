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

export { AuthSchema, LoginAuthSchema };
