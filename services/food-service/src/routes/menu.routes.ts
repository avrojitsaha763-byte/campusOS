import { Router } from 'express';
import { getMenus, createMenuItem } from '../controllers/menu.controller';

export const menuRouter = Router();

menuRouter.get('/', getMenus);
menuRouter.post('/', createMenuItem);
