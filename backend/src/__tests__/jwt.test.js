import jwt from "jsonwebtoken";
import { generateToken } from "../utils/jwt.js";

process.env.JWT_SECRET = "test-secret-recipehub";

describe("generateToken", () => {
  test("retorna un string", () => {
    const token = generateToken("userId123");
    expect(typeof token).toBe("string");
  });

  test("el token contiene el id del usuario", () => {
    const token = generateToken("userId123");
    const decoded = jwt.verify(token, "test-secret-recipehub");
    expect(decoded.id).toBe("userId123");
  });

  test("el token expira en 7 dias", () => {
    const token = generateToken("userId123");
    const decoded = jwt.decode(token);
    const siete_dias = 7 * 24 * 60 * 60;
    expect(decoded.exp - decoded.iat).toBe(siete_dias);
  });
});
