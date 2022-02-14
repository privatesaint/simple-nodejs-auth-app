import { Model } from "objection";
import { v4 as uuidv4 } from "uuid";

export default class Person extends Model {
  id!: string;
  firstName!: string;
  email!: string;
  password!: string;

  static tableName = "users";

  $beforeInsert() {
    this.id = uuidv4();
  }
}
