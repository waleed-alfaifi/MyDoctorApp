import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import expressValidator from 'express-validator';

// Importing routes.
import indexRouter from './routes/index';
import accountRouter from './routes/account';

const app = express();

// Middleware to allow connections from other servers to this server.
app.use(cors());

// Logger middleware for helpful information.
app.use(morgan('dev'));

// Parsers for handling Request/Response data.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// User input validation middleware (adds validation methods to the req object).
app.use(expressValidator());

// Routing.
app.use('/', indexRouter);
app.use('/account', accountRouter);

// Middleware to handle 404 errors.
app.use((req, res, next) => {
  const err = new Error('الصفحة غير موجودة');
  err.status = 404;
  next(err);
});

// Middleware for displaying error messages.
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

export default app;
