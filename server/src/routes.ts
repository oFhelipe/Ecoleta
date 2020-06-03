import { Router } from 'express';

import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

const routes = Router();

routes.get('/items', ItemsController.index);

routes.post('/points', PointsController.create);

routes.get('/points/:id', PointsController.show);
routes.get('/points/', PointsController.index);

export default routes;