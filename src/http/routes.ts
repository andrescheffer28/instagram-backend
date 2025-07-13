import { FastifyInstance } from "fastify";
import { register } from "./controllers/register.controller";
import { authenticate } from "./controllers/authenticate.controller";
import { profile } from "./controllers/profile.controller";

export async function appRoutes(app: FastifyInstance) {
    app.post('/user', register)
    app.post('/login', authenticate)
    app.patch('/user', profile)
}