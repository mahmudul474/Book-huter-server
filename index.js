const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

///database  connect

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = `mongodb+srv://Assainment-5:HyAXDpnLTARhmibL@474.79d3jxt.mongodb.net/?retryWrites=true&w=majority`; // Your MongoDB server URL
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    const bookCollection = client.db("book-huter").collection("books");

    app.post("/book", async (req, res) => {
      try {
        const book = req.body;
        const result = await bookCollection.insertOne(book);
        res.status(200).json({ data: result, msg: "Book added successfully" });
      } catch (error) {
        res.status(500).json({ msg: "A Eroor founde" });
        console.log(error);
      }
    });

    app.get("/books", async (req, res) => {
      try {
        const books = await bookCollection
          .find({})
          .sort({ publicationDate: -1 })
          .limit(10)
          .toArray();
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.get("/book/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const book = await bookCollection.findOne(query);
        res.status(200).json(book);
      } catch (error) {
        res.status(500).json({ error: "server no response " });
      }
    });

    app.put("/book/review/:id", async (req, res) => {
      try {
        const newReview = req.body;
        const bookId = req.params.id;
        const query = { _id: new ObjectId(bookId) };
        const result = await bookCollection.updateOne(query, {
          $push: { reviews: newReview },
        });

        console.log(result, "check  result ");
        if (result.modifiedCount === 1) {
          res.status(200).json({ message: "Review added successfully." });
        } else {
          res
            .status(404)
            .json({ message: "Book not found or review not added." });
        }
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error." });
      }
    });

    app.delete("/book/delete/:id", function (req, res) {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = bookCollection.deleteOne(query);
      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Book deleted successfully." });
      } else {
        res
          .status(404)
          .json({ message: "Book not found or review not added." });
      }
    });

    app.put("/book/edit/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updatedBook = req.body.book;
      const { authorName, title, genre, publicationDate } = updatedBook;

      try {
        const result = await bookCollection.updateOne(query, {
          $set: { authorName, title, genre, publicationDate },
        });

        if (result.modifiedCount === 1) {
          res.status(200).json({ message: "Book updated successfully." });
        } else {
          res.status(404).json({ message: "Book not found or update failed." });
        }
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error." });
      }
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// database connection
connectToMongoDB();

app.get("/", (req, res) => {
  res.send("Welcome assignment 5  frontend!");
});

app.listen(port, () => {
  console.log(`Server started on port`, port);
});
