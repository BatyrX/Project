const express = require('express');
const mongoose = require('mongoose');

mongoose
.connect(
  "mongodb+srv://Baha:Baha2003.@cluster0.q2mgor5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => console.log("Database Connected!"))
.catch((err) => console.log(err))

const coffeeSchema = new mongoose.Schema({
  name: String,
  price: Number,
  id: String
});

const Coffee = mongoose.model('Coffee', coffeeSchema);

const app = express();
app.use(express.json());

app.post('/coffee', async (req, res) => {
  try {
    const coffee = new Coffee(req.body);
    await coffee.save();
    res.status(201).send(coffee);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.get('/coffee', async (req, res) => {
  try {
    const coffees = await Coffee.find();
    res.send(coffees);
  } catch (error) {
    res.status(500).send(error);
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
