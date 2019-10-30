import Sequelize from 'sequelize';
import models from '../models/index';

const Op = Sequelize.Op;

// [] is to help us write dynamic (not static) object properties.
export const index = (req, res) => {
    // Query on which we are going to search for doctors.
    const { q } = req.query;
    const searchQuery = q ? { name: { [Op.like]: `%${q.replace(' ', '')}%` } } : {};

    models.User.findAll({
        where: { userType: 'doctor', ...searchQuery },
        include: [{ model: models.Profile, as: 'profile' }],
        attributes: { exclude: 'password' }
    })
        .then(doctors => {
            res.json({ doctors, searchQuery });
        })
        .catch(err => res.status(500).json({ err }));
}

export const getDoctors = (req, res) => {
    models.User.findAll({
        where: { userType: 'doctor' },
        include: [{ model: models.Profile, as: 'profile' }],
        attributes: { exclude: 'password' }
    })
        .then(doctors => {
            res.json({ doctors });
        })
        .catch(err => res.status(500).json({ err }));
}