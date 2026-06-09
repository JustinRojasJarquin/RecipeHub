import request from "supertest";
import app from "../app.js";

describe("Rutas protegidas sin JWT", () => {
  test("POST /api/recetas sin token retorna 401", async () => {
    const res = await request(app).post("/api/recetas").send({});
    expect(res.status).toBe(401);
  });

  test("DELETE /api/comentarios/:id sin token retorna 401", async () => {
    const res = await request(app).delete("/api/comentarios/123456789012");
    expect(res.status).toBe(401);
  });

  test("POST /api/recetas/:id/comentarios sin token retorna 401", async () => {
    const res = await request(app)
      .post("/api/recetas/123456789012/comentarios")
      .send({});
    expect(res.status).toBe(401);
  });
});
