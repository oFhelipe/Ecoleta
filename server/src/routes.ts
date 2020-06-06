import { Router } from 'express';
import multer from 'multer'
import multerConfig from './config/multer'
import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'
import { celebrate, Joi } from 'celebrate'

const routes = Router();
const upload = multer(multerConfig);

routes.get('/items', ItemsController.index);



routes.post('/points', upload.single('image'), celebrate({
    body: Joi.object().keys({
        name: Joi.object().required(),
        email: Joi.object().required(),
        whatsapp:Joi.number().required(),
        latitude:Joi.number().required(),
        longitude:Joi.number().required(),
        city:Joi.string().required(),
        uf:Joi.string().required().max(2),
        items:Joi.string().required(),
    }),
},{
    abortEarly: false
}) , PointsController.create);




routes.get('/points/:id', PointsController.show);
routes.get('/points/', PointsController.index);

export default routes;