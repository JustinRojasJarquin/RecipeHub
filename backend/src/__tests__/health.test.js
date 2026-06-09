import request from "supertest";
import app from "../app.js";

describe("GET /api/health", () => {
  test("retorna status 200", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
  });

  test("retorna { status: 'ok' }", async () => {
    const res = await request(app).get("/api/health");
    expect(res.body.status).toBe("ok");
  });

  test("retorna timestamp", async () => {
    const res = await request(app).get("/api/health");
    expect(res.body.timestamp).toBeDefined();
  });
});
