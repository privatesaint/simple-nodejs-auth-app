import knex from "../config/connectionInstance";
import { extend } from "indicative/validator";
import { getValue, skippable } from "indicative-utils";
import ErrorHandler from "./ErrorHandler";

extend("unique", {
  async: true,

  compile(args) {
    if (args.length !== 2) {
      throw new ErrorHandler(
        "Unique rule needs the table and column name",
        400
      );
    }
    return args;
  },

  async validate(data, field, args) {
    const fieldValue = getValue(data, field);

    if (skippable(fieldValue, field, { existyStrict: true })) {
      return true;
    }

    const [table, column] = args;
    const valueToLower = fieldValue.toLowerCase();

    const dbData = await knex(table)
      .whereRaw(`lower(${column}) = ?`, [valueToLower])
      .first();

    if (dbData) {
      return false;
    }

    return true;
  },
});
