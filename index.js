const express = require("express");
const app = express();
const pets = require("./helpers");

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send(`<h1>Adopt A Pet</h1>
  <p>See all of our animals below:</p>
  <ul>
  <a href="/animals/dogs"><li>Dogs</li></a>
  <a href="/animals/cats"><li>Cats</li></a>
  <a href="/animals/rabbits"><li>Rabbits</li></a>
  </ul>
  `);
});

app.get("/animals", (req, res) => {
  const allPets = Object.keys(pets);
  let allNames = "";
  allPets.forEach((name) =>
    pets[name].forEach(
      (pet, index) =>
        (allNames += `<a href=/animals/${name}/${index}><li>${pet.name}</li></a>`)
    )
  );
  res.send(allNames);
});

app.get("/animals/:pet_type", (req, res) => {
  const { pet_type } = req.params;
  let petsList = "";
  pets[pet_type].forEach((animal, index) => {
    petsList += `<li><a href="${pet_type}/${index}">${animal.name}</a></li>`;
  });
  res.send(`<h1>Pets list</h1>
  <ul>${petsList}</ul>`);
});

app.get("/animals/:pet_type/:pet_id", (req, res) => {
  const { pet_type, pet_id } = req.params;
  const petArray = pets[pet_type];
  console.log("array", petArray);
  const pet = petArray[pet_id];

  let html = `<h1>Welcome to ${pet.name}'s page!</h1>
  <img src="${pet.url}" alt=${pet.name} />
  <p> ${pet.description}</p>
  <ul>
  <li>Breed: ${pet.breed}</li>
  <li>Age: ${pet.age}</li>
  </ul>`;

  res.send(html);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
