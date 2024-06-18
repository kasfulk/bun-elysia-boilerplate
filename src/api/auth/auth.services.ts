import { db } from '@database/index';
import { users } from '@database/schema';
import { hashPassword } from '@utils/password';
import { eq } from 'drizzle-orm';

export class AuthServices {
  private _db = db;
  async validateUser(username: string, password: string) {
    const result = await this._db.query.users.findFirst({
      where: eq(users.username, username),
    });
    if (!result?.username) {
      return {
        success: false,
        code: 404,
      };
    }
    const isMatch = await Bun.password.verify(password, result.password);
    if (!isMatch) {
      return {
        success: false,
        code: 401,
      };
    }

    return {
      success: true,
      code: 200,
      data: result,
    };
  }

  async registerUser({
    username,
    password,
    email,
  }: {
    username: string;
    password: string;
    email: string;
  }) {
    const result = await this._db.query.users.findFirst({
      where: eq(users.username, username),
    });
    if (result?.username) {
      return {
        success: false,
        code: 409,
      };
    }
    const hashedPassword = await hashPassword(password);
    await this._db
      .insert(users)
      .values({
        username,
        password: hashedPassword,
        email,
      })
      .execute();
    return {
      success: true,
      code: 201,
      data: result,
    };
  }
}
