import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './model';
import { contractRouter, jobRouter, profileRouter, adminRouter } from './routers';



const app: Express = express();

// Middlewares
app.use(bodyParser.json());

// Sequelize
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

// Routes
app.use('/contracts', contractRouter,);
app.use('/jobs', jobRouter);
app.use('/balances', profileRouter);
app.use('/admin', adminRouter);
app.get('/', (_req: Request, res: Response) => {
    return res.json({ message: 'Hello World!' });
});

export default app;
