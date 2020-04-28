import { Router } from 'express'

import UserController from './app/controllers/UserController'

import validateUserStore from './app/validators/UserStore'

const routes = Router()

routes.post('/users', validateUserStore, UserController.store)
// routes.get('/users', UserController.index)

// routes.use(authMiddleware);

export default routes
