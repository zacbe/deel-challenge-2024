import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './model';
import { contractRouter, jobRouter, profileRouter } from './routers';



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

export default app;
