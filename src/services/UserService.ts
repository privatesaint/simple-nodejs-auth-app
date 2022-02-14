import User from "../models/User";
import { ICreateUser } from "../types/auth/signup";
import bcrypt from "bcryptjs";

class UserService {
  /**
   * @description hash password
   */
  static async hashpassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  /**
   * Create new user
   * @param data
   */
  static async createAccount(data: ICreateUser) {
    delete data.confirmPassword;

    const hashedPassword = await this.hashpassword(data.password);
    data.password = hashedPassword;

    const user = await User.query().insert(data);

    return user;
  }
}

export default UserService;
