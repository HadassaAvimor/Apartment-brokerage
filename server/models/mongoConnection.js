const mongoose = require('mongoose');

async function connect() {
    console.log('try connect!!')
    const connString = process.env.DATABASE_URL;
    await mongoose.connect(
        connString);
    console.log('connect!!')
}

module.exports = { connect }