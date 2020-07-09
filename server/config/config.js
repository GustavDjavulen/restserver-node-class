// ====================
//  Puerto
// ====================
process.env.PORT = process.env.PORT || 3000;

// ====================
//  Entorno
// ====================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ====================
//  Base de datos
// ====================
let urldb;
if (process.env.NODE_ENV === 'dev') {
    urldb = 'mongodb://localhost:27017/cafe';
} else {
    urldb = 'mongodb+srv://Djavulen:r3uS9BIXmTQ625Zi@cluster0.dhxr8.mongodb.net/cafe'
}
process.env.URLDB = urldb;