import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from './models';
import { contractRouter, jobRouter, profileRouter, adminRouter } from './routers';
import swaggerUi from "swagger-ui-express"
import swaggerFile from "../docs/swagger-output.json";
import { env } from './utils/envConfig';
import { errorHandler } from './middleware';


const corsOptions = {
  origin: env.CORS_ORIGIN,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "profile_id"],
  credentials: true
};

const app: Express = express();

// Middlewares
app.use(cors(corsOptions));
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
        <p>Check the <a href="http://localhost:${env.PORT}/api-docs/">API documentation</a>.</p>
      </body>
      </html>
    `);
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(errorHandler);

export default app;
