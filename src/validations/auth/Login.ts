import { validate } from "indicative/validator";
import { sanitize } from "indicative/sanitizer";
import { ILogginUser } from "../../types/auth/signin";

export default async (data: ILogginUser) => {
  const rules = {
    email: "required|email|max:250",
    password: "required|min:4",
  };

  const messages = {
    "email.required": "Email is required",
    "email.email": "Invalid email address",
    "password.required": "Password is required",
    "password.min": "Password is too short",
  };

  const sanitizationRules = {
    email: "trim|escape|lower_case|strip_tags",
    password: "trim|escape|strip_tags",
  };

  // sanitize data
  const sanitizedData = sanitize(data, sanitizationRules);

  return validate(sanitizedData, rules, messages);
};
