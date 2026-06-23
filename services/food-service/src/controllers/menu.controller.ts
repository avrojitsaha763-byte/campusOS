import { Request, Response } from 'express';
import { MenuItem } from '../models/menu.model';

export const getMenus = async (req: Request, res: Response) => {
  try {
    // Filter out inactive items by default
    const filter: any = { isAvailable: true };
    
    if (req.query.vendorId) filter.vendorId = req.query.vendorId;
    if (req.query.category) filter.category = req.query.category;

    const items = await MenuItem.find(filter).sort({ orderCount: -1 });
    
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    console.error('Error fetching menus:', error);
    res.status(500).json({ success: false, message: 'Server error fetching menus' });
  }
};

export const createMenuItem = async (req: Request, res: Response) => {
  try {
    const item = new MenuItem(req.body);
    await item.save();
    
    res.status(201).json({ success: true, data: item });
  } catch (error: any) {
    console.error('Error creating menu item:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};
