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
    },
    {
        username: 'Nurmukhammed',
        password: 'Omirzak',
    },
    {
        username: 'Kairat',
        password: 'Nurtas',
    },
    {
        username: 'Nursultan',
        password: 'Nazarbayev',
    },
    {
        username: 'Arman',
        password: 'Suleimenov',
    },
    {
        username: 'Pavel',
        password: 'Durov',
    },
    {
        username: 'Nikolai',
        password: 'Durov',
    },
    {
        username: 'Oleg',
        password: 'Tinkov',
    },
    {
        username: 'Arkady',
        password: 'Volozh',
    },
    {
        username: 'Vladimir',
        password: 'Putin',
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