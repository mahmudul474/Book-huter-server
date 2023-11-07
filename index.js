const express = require('express');
const app = express();
const port =process.env.PORT ||5000
const  cors = require('cors')
require('dotenv').config()



//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())


///database  connect 


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<username>:<password>@474.79d3jxt.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
const bookCollection =client.db("book-huter").collection("books");


app.post("/book", async (req, res) => {
    try {
      const book = req.body;
      const result = await bookCollection.insertOne(book);
      res.status(200).json({ data: result, msg: 'Book added successfully' });
    } catch (error) {
      res.status(500).json({ msg: 'A Eroor founde' });
    }
  });
  



} finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);





app.get("/", (req, res) => {
    res.send("Welcome assignment 5  frontend!");
});



app.listen(port, () => {
    console.log(`Server started on port`, port);
});
