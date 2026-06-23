import { Router } from 'express';
const mockProducts = new Map<string, any>([
  ['1', { id: '1', name: "Neural Network Notes", price: 150, coins: 15, seller: "Alex Chen", category: "Academic", icon: "📝", condition: "Pristine", glow: "rgba(14, 165, 233, 0.2)", surge: true, stock: 12 }],
  ['2', { id: '2', name: "Mechanical Keyboard", price: 2400, coins: 240, seller: "Sarah J.", category: "Electronics", icon: "⌨️", condition: "Like New", glow: "rgba(99, 102, 241, 0.2)", surge: false, stock: 1 }],
  ['3', { id: '3', name: "Scientific Calculator", price: 800, coins: 80, seller: "Mike R.", category: "Electronics", icon: "🧮", condition: "Used", glow: "rgba(192, 132, 252, 0.2)", surge: false, stock: 4 }]
]);

export const productRouter = Router();

productRouter.get('/', (req, res) => {
  res.json({ 
    success: true, 
    data: Array.from(mockProducts.values()) 
  });
});

productRouter.post('/', (req, res) => {
  const product = { 
    id: 'P_' + Math.random().toString(36).substr(2, 9), 
    ...req.body,
    createdAt: new Date()
  };
  mockProducts.set(product.id, product);
  res.status(201).json({ success: true, data: product });
});

productRouter.get('/:id', (req, res) => {
  const product = mockProducts.get(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, data: product });
});

productRouter.put('/:id', (req, res) => {
  if (mockProducts.has(req.params.id)) {
    mockProducts.set(req.params.id, { ...mockProducts.get(req.params.id), ...req.body });
    res.json({ success: true, data: mockProducts.get(req.params.id) });
  } else {
    res.status(404).json({ success: false, message: 'Product not found' });
  }
});

productRouter.delete('/:id', (req, res) => {
  const deleted = mockProducts.delete(req.params.id);
  res.json({ success: deleted });
});
