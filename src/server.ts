import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './models';
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
  res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Documentation</title>
      </head>
      <body>
        <h1>Deel API</h1>
      </body>
      </html>
    `);
});

export default app;
