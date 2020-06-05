import Knex from '../database/connection';
import { Request, Response } from 'express';

class ItemsController{
    
    async index(request: Request, response: Response) {

        const items = await Knex('items').select('*');
    
        const seerializedItems = items.map((item)=>{
            return {
                id:item.id,
                title:item.title,
                image_url:`http://192.168.0.106:3333/uploads/${item.image}`
            };
        });
    
        response.json(seerializedItems);
    
    }

}

export default new ItemsController;