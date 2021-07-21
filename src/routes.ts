import express from 'express'
import workersController from './workers/workers.controller'
import reportsController from './reports/reports.controller'
import usersController from './users/users.controller'
import { authMiddleware } from './middlevers/auth.middleware'

const routes = express.Router()

routes.use('/workers', authMiddleware, workersController)
routes.use('/reports', authMiddleware, reportsController)
routes.use('/users', usersController)

export default routes
