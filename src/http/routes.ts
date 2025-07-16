import { FastifyInstance } from "fastify"
import { register } from "./controllers/register.controller"
import { authenticate } from "./controllers/authenticate.controller"
import { createPost } from "./controllers/createPost.controller"
import { deletarPost } from "./controllers/deletarPost.controller"
import { getAllPosts } from "./controllers/getAllPosts.controller"
import { getMyPosts } from "./controllers/getMyPosts.controller"
import { editPost } from "./controllers/editPost.controller"
import { editProfile } from "./controllers/editProfile.controller"

export async function appRoutes(app: FastifyInstance) {
    app.post('/user', register)
    app.post('/login', authenticate)
    app.patch('/user', editProfile)

    app.post('/post', createPost)
    app.patch('/post/:postId', editPost)
    app.delete('/post/:id', deletarPost)
    app.get('/posts', getAllPosts)
    app.get('/my-posts', getMyPosts)
}