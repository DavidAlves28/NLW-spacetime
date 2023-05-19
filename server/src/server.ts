import "dotenv/config";
import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { memoriesRoutes } from "./routes/memories";
import { authRoutes } from "./routes/auth";
const app = fastify();

app.register(cors, {
  origin: ["http://localhost:3333"],
});

app.register(memoriesRoutes);
app.register(authRoutes);
app.register(jwt, {
  secret: "spacetimenlw",
});
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP servidor rodando http://localhost:3333");
  });
