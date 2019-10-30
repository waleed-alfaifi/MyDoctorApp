// Users table (model).

const user = (sequelize, DataTypes) => {
  // sequelize.define returns a new model with the specified name and fields.
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    userType: {
      type: DataTypes.ENUM('doctor', 'normal'),
    },
    latitude: {
      type: DataTypes.FLOAT,
    },
    longitude: {
      type: DataTypes.FLOAT,
    },
  });

  // We get these models from where we defined the Objecy.keys() function.
  User.associate = models => {
    User.hasOne(models.Profile);
  };

  return User;
};

export default user;
