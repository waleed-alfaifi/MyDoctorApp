import 'dotenv/config';
import { sequelize, models } from './models/index';
import app from './app';

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => console.log(`Server running...`));
});
