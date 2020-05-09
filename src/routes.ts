import { Router } from 'express'

import multer from 'multer'
import multerConfig from './config/multer'

import UserController from './app/controllers/UserController'
import FileController from './app/controllers/FileController'
import SessionController from './app/controllers/SessionController'

import validateUserStore from './app/validators/UserStore'
import validateUserUpdate from './app/validators/UserUpdate'
import validateSessionStore from './app/validators/SessionStore'

import authMiddleware from './app/middlewares/auth'

const routes = Router()
const upload = multer(multerConfig)

routes.post('/users', validateUserStore, UserController.store)
routes.post('/sessions', validateSessionStore, SessionController.store)

routes.use(authMiddleware)

routes.put('/users/:id', validateUserUpdate, UserController.update)
routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.show)

routes.put('/sessions', validateUserUpdate, SessionController.update)
routes.get('/sessions', SessionController.show)

routes.post('/files', upload.single('file'), FileController.store)

export default routes
