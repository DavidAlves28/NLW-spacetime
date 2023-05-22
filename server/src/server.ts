import "dotenv/config";
import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { memoriesRoutes } from "./routes/memories";
import { authRoutes } from "./routes/auth";
import multipart from "@fastify/multipart";
import { upLoadRoutes } from "./routes/update";
import { resolve } from "node:path";
const app = fastify();
app.register(require('@fastify/static'),{
root: resolve(__dirname ,'../uploads'),
prefix: '/uploads'
})
app.register(multipart);
app.register(cors, {
  origin: true,
});
app.register(memoriesRoutes);
app.register(authRoutes);
app.register(upLoadRoutes);
app.register(jwt, {
  secret: "spacetimenlw",
});
app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("HTTP servidor rodando http://localhost:3333");
  });
