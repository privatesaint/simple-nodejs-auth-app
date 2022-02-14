import { validate } from "indicative/validator";
import { sanitize } from "indicative/sanitizer";
import { ICreateUser } from "../../types/auth/signup";
import "../../utils/CustomValidator";

export default async (data: ICreateUser) => {
  const rules = {
    firstName: "required|string|max:250",
    email: "required|email|max:250|unique:users,email",
    password: "required|min:4",
    confirmPassword: "same:password",
  };

  const messages = {
    "firstName.required": "First Name is required",
    "firstName.max": "Invalid Name",
    "firstName.string": "First Name contains unallowed characters",
    "email.required": "Email is required",
    "email.email": "Invalid email address",
    "email.unique": "Email already exists",
    "password.required": "Password is required",
    "password.min": "Password is too short",
    "confirmPassword.same": "Password mismatch",
  };

  const sanitizationRules = {
    email: "trim|escape|lower_case|strip_tags",
    password: "trim|escape|strip_tags",
    firstName: "trim|escape|strip_tags",
  };

  // sanitize data
  const sanitizedData = sanitize(data, sanitizationRules);

  return validate(sanitizedData, rules, messages);
};
