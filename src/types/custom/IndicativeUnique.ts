import { ParsedRule } from "indicative-parser";

declare module "indicative-rules" {
  interface ValidationRulesContract {
    unique([table, field]: [string, string]): ParsedRule;
  }
}
