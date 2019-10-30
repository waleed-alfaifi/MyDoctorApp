import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import models from '../models/index';

export const register = async (req, res, next) => {
  // We are using async/await instead of callbacks here.

  const {
    name,
    email,
    password,
    userType,
    specialization,
    address,
    location,
    phone,
    workingHours,
  } = req.body;

  // Try/catch to handle errors that result from asynchrous process.
  try {
    // Because hash() is a asynchrous method, we need to wait for it until it's done.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User.
    const user = await models.User.create({
      name,
      email,
      password: hashedPassword,
      userType,
      latitude: location.latitude,
      longitude: location.longitude,
    });

    if (userType === 'doctor') {
      const profile = await models.Profile.create({
        userId: user.id,
        specialization,
        address,
        workingHours,
        phone,
      });
    }

    res.json({ message: 'تم إنشاء الحساب بنجاح.' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const login = (req, res, next) => {
  const { email, password } = req.body;

  models.User.findOne({ where: { email } })
    .then(user => {
      // The email is correct. Now compare the password.

      // Compare the entered password with the found user's password.
      bcrypt.compare(password, user.password).then(isAuthenticated => {
        // Create a token that will allow encrypting the user's information by the means of a secret key,
        // that we can later retrieve using the same secret key.
        if (isAuthenticated) {
          const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            process.env.JWT_SECRET
          );
          res.json({ token, isAuthenticated });
        } else {
          res
            .status(403)
            .json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحين.' });
        }
      });
    })
    .catch(() => {
      // For security reasons, we don't say that it's the email that is not found!
      res
        .status(403)
        .json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحين.' });
    });
};

export const me = (req, res) => {
  const user = req.currentUser;
  res.json({ user });
};

export const getProfile = (req, res) => {
  const user = req.currentUser;

  // The include property below finds natural joins between tables.
  models.User.findById(user.id, {
    include: [{ model: models.Profile, as: 'profile' }],
    attributes: { exclude: ['password'] },
  })
    .then(user => {
      if (!user)
        return res.status(422).json({ message: 'لا يوجد مستخدم بهذا الاسم' });

      res.json({ user });
    })
    .catch(err => res.status(500).json(err));

  // models.User.findById(user.id)
  //     .then(user => {
  //         if (!user) return res.status(422).json({ message: 'لا يوجد مستخدم بهذا الاسم' });

  //         res.json({ message: 'هذا هو المستخدم وسرها', user });
  //     })
  //     .catch(err => res.status(500).json({ err }));
};
