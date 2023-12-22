const express = require("express");
const app = express();

app.use(express.json());
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons/", (request, response) => {
  response.json(persons);
});
app.get("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  const person = persons.find((person) => person.id === id);

  person ? response.json(person) : response.status(404).end();
});
app.get("/info", (request, response) => {
  response.send(
    `<span>Phonebook has info for ${
      persons.length
    } people <br/>${Date()}</span>`
  );
});
function generateId() {
  const min = Math.ceil(0);
  const max = Math.floor(1e10);
  return Math.floor(Math.random() * (max - min) + min);
}
app.post("/api/persons", (request, response) => {
  const body = request.body;
  const nameExists = persons.find((person) => person.name === body.name);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  } else if (nameExists) {
    return response.status(409).json({ error: "name must be unique" });
  }
  const person = { name: body.name, number: body.number, id: generateId() };
  persons = persons.concat(person);

  response.json(person);
});
app.delete("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
