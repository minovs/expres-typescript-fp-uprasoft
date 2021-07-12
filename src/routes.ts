import express from 'express'
import workersController from './workers/workers.controller'
import reportsController from './reports/reports.controller'

const routes = express.Router()

routes.use('/workers', workersController)
routes.use('/reports', reportsController)

export default routes
