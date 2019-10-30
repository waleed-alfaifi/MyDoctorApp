import Sequelize from 'sequelize';

const { DB, DB_USER, DB_PASS } = process.env;
const sequelize = new Sequelize(DB, DB_USER, DB_PASS, {
  dialect: 'postgres',
  operatorsAliases: false,
});

const models = {
  User: sequelize.import('./user'),
  Profile: sequelize.import('./profile'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

// // The models we are going to use in our database.
// const models = {
//     User: sequelize.import('./user'),
//     Profile: sequelize.import('./profile')
// }

// Object.keys(models).forEach(modelName => {

//     // If the passed key/property (modelName) has the associate method.
//     if (models[modelName].associate) {
//         // Then associate it to the models object (i.e. the other models).
//         models[modelName].associate(models);
//     }
// });

sequelize
  .authenticate()
  .then(() => console.log('Connected to the database successfully.'))
  .catch(err => console.log('Unable to connect to the database.', err));

// export { sequelize, models };
export { sequelize };
export default models;
