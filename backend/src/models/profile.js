// Profile table (model).

const profile = (sequelize, DataTypes) => {
    const Profile = sequelize.define('profile', {
        specialization: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        workingHours: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        }
    });

    // We get these models from where we defined the Objecy.keys() function.
    Profile.associate = models => {
        Profile.belongsTo(models.User);
    };

    return Profile;
}

export default profile;