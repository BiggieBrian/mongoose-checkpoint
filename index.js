// =============================
// Import dependencies
// =============================
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// =============================
// Connect to MongoDB
// =============================
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ Connection error:', err));

// =============================
// Define Person Schema & Model
// =============================
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String] // Array of strings
});

const Person = mongoose.model('Person', personSchema);

// =============================
// 1. Create and Save a Single Person
// =============================
const createAndSavePerson = () => {
  const person = new Person({
    name: 'John Doe',
    age: 25,
    favoriteFoods: ['Pizza', 'Pasta']
  });

  person.save((err, data) => {
    if (err) return console.error(err);
    console.log('📌 Person saved:', data);
  });
};

// =============================
// 2. Create Many People
// =============================
const createManyPeople = (arrayOfPeople) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    console.log('📌 People created:', people);
  });
};

// Example data
const arrayOfPeople = [
  { name: 'Mary', age: 22, favoriteFoods: ['Burritos', 'Pasta'] },
  { name: 'Jane', age: 28, favoriteFoods: ['Rice', 'Chicken'] },
  { name: 'Mark', age: 30, favoriteFoods: ['Burger', 'Burritos'] },
];

// =============================
// 3. Find people by name
// =============================
const findPeopleByName = (personName) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err);
    console.log(`📌 People named ${personName}:`, data);
  });
};

// =============================
// 4. Find one person by favorite food
// =============================
const findOneByFood = (food) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    console.log(`📌 First person who likes ${food}:`, data);
  });
};

// =============================
// 5. Find person by ID
// =============================
const findPersonById = (personId) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    console.log('📌 Found by ID:', data);
  });
};

// =============================
// 6. Find, Edit, then Save
// =============================
const findEditThenSave = (personId) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push('hamburger');
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      console.log('📌 Updated person:', updatedPerson);
    });
  });
};

// =============================
// 7. Find One and Update
// =============================
const findAndUpdate = (personName) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, updatedPerson) => {
      if (err) return console.error(err);
      console.log('📌 Updated document:', updatedPerson);
    }
  );
};

// =============================
// 8. Delete by ID
// =============================
const removeById = (personId) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return console.error(err);
    console.log('📌 Removed:', removedPerson);
  });
};

// =============================
// 9. Delete Many
// =============================
const removeManyPeople = () => {
  Person.remove({ name: 'Mary' }, (err, result) => {
    if (err) return console.error(err);
    console.log('📌 Deleted:', result);
  });
};

// =============================
// 10. Chain Query Helpers
// =============================
const queryChain = () => {
  Person.find({ favoriteFoods: 'Burritos' })
    .sort({ name: 1 }) // ascending order
    .limit(2)
    .select('-age') // hide age
    .exec((err, data) => {
      if (err) return console.error(err);
      console.log('📌 Query chain result:', data);
    });
};

// =============================
// Example function calls
// =============================
// createAndSavePerson();
// createManyPeople(arrayOfPeople);
// findPeopleByName('Mary');
// findOneByFood('Pasta');
// findPersonById('replace_with_id');
// findEditThenSave('replace_with_id');
// findAndUpdate('Jane');
// removeById('replace_with_id');
// removeManyPeople();
// queryChain();
