import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/404', (req: Request, res: Response) => {
  res.status(200).render('404', {
    title: '404'
  });
});

router.get('/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;

  res.status(200).render('trip', {
    title: slug
  });
});

router.get('/:slug/itinerary/', (req: Request, res: Response) => {
  res.status(200).render('itinerary', {
    title: 'Your Itinerary'
  });
});

router.get('/:slug/itinerary/add', (req: Request, res: Response) => {
  res.status(200).render('editStop', {
    title: 'Add Trip Stop'
  });
});

router.get('/:slug/expenses/add', (req: Request, res: Response) => {
  res.status(200).render('editExpense', {
    title: 'Add Expense'
  });
});

router.get('/:slug/expenses', (req: Request, res: Response) => {
  res.status(200).render('expenses', {
    title: 'Trip Expenses'
  });
});

router.get('/:slug/todo/add', (req: Request, res: Response) => {
  res.status(200).render('editTodo', {
    title: 'Add Todo'
  });
});

router.get('/:slug/todo', (req: Request, res: Response) => {
  res.status(200).render('todo', {
    title: 'Todo List'
  });
});

export default router;
