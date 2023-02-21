const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 6969;
const JWT_SECRET = process.env.JWT_SECRET || 'LOREM';
const JWT_EXP = process.env.JWT_EXP || 60;
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'IPSUM';
const REFRESH_EXP = process.env.REFRESH_EXP || 3600;
const users = [
    {
        username: 'Abylai',
        password: 'Nurske',
        email: 'Abylai@gmail.com',
    },
    {
        username: 'Nurmukhammed',
        password: 'Omirzak',
        email: 'Nurmukhammed@gmail.com'
    },
    {
        username: 'Kairat',
        password: 'Nurtas',
        email: 'Kairat@gmail.com'
    },
    {
        username: 'Nursultan',
        password: 'Nazarbayev',
        email: 'Nursultan@gmail.com'
    },
    {
        username: 'Arman',
        password: 'Suleimenov',
        email: 'Arman@gmail.com'
    },
    {
        username: 'Pavel',
        password: 'Durov',
        email: 'Pavel@gmail.com'
    },
    {
        username: 'Nikolai',
        password: 'Durov',
        email: 'Nikolai@gmail.com'
    },
    {
        username: 'Oleg',
        password: 'Tinkov',
        email: 'Oleg@gmail.com'
    },
    {
        username: 'Arkady',
        password: 'Volozh',
        email: 'Arkady@gmail.com'
    },
    {
        username: 'Vladimir',
        password: 'Putin',
        email: 'Vladimir@gmail.com'
    }
];

module.exports = users;

module.exports = {
    PORT,
    JWT_SECRET,
    JWT_EXP,
    REFRESH_SECRET,
    REFRESH_EXP,
    users
};