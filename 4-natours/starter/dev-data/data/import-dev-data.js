const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connection to DB successful');
  });

// Read Json File
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// Import Data into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data loaded successfully to DB');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete Data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully from DB');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] == '--delete') {
  deleteData();
} else if (process.argv[2] == '--import') {
  importData();
}

console.log(process.argv);
