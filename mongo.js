const mongoose = require("mongoose");

const argsLength = process.argv.length;

if (argsLength < 5) {
  if (argsLength === 3) {
    const [, , userPassword] = process.argv;
    const url = `mongodb+srv://yaroslavkarpenko:${userPassword}@cluster0.2c9gcjp.mongodb.net/phonebook?retryWrites=true&w=majority`;
    mongoose.set("strictQuery", false);
    mongoose.connect(url);
    const personSchema = new mongoose.Schema({
      name: String,
      number: String,
    });
    const Person = mongoose.model("Person", personSchema);
    Person.find({}).then((persons) => {
      console.log("phonebook:");

      persons.forEach((person) =>
        console.log(`${person.name} ${person.number}`)
      );

      mongoose.connection.close();
    });
  } else {
    console.log("incorrect input");
    process.exit(1);
  }
} else {
  const [, , name, number, userPassword] = process.argv;
  const url = `mongodb+srv://yaroslavkarpenko:${userPassword}@cluster0.2c9gcjp.mongodb.net/phonebook?retryWrites=true&w=majority`;
  mongoose.set("strictQuery", false);
  mongoose.connect(url);
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });
  const Person = mongoose.model("Person", personSchema);
  const person = new Person({ name, number });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
