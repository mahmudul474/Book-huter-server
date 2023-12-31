const express = require('express')
const app = express()


const port = process.env.PORT || 5000;
const cors = require("cors");


//middleware
app.use(express.json());
app.use(cors());

///database  connect

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// const uri = `mongodb+srv://Assainment-5:HyAXDpnLTARhmibL@474.79d3jxt.mongodb.net/?retryWrites=true&w=majority`; // Your MongoDB server URL
 

// async function connectToMongoDB() {
//   try {
//     await client.connect();
//     app.listen(port, () => {
//       console.log(`Server started on port`, port);
//     });


//     const bookCollection = client.db("book-huter").collection("books");

//     app.post("/book", async (req, res) => {
//       try {
//         const book = req.body;
//         const result = await bookCollection.insertOne(book);
//         res.status(200).json({ data: result, msg: "Book added successfully" });
//       } catch (error) {
//         res.status(500).json({ msg: "A Eroor founde" });
//         console.log(error);
//       }
//     });

//     app.get("/books", async (req, res) => {
//       try {
//         const books = await bookCollection
//           .find({})
//           .sort({ publicationDate: -1 })
//           .limit(10)
//           .toArray();
//         res.status(200).json(books);
//       } catch (error) {
//         res.status(500).json({ error:"server problem " });
//       }
//     });

//     app.get("/allbooks", async (req, res) => {
//       try {
//         const books = await bookCollection.find({}).toArray();
//         res.status(200).json(books);
//       } catch (error) {
//         res.status(500).json({ error: "Internal server error" });
//       }
//     });

//     app.get("/book/:id", async (req, res) => {
//       try {
//         const id = req.params.id;
//         const query = { _id: new ObjectId(id) };
//         const book = await bookCollection.findOne(query);
//         res.status(200).json(book);
//       } catch (error) {
//         res.status(500).json({ error: "server no response " });
//       }
//     });

//     app.put("/book/review/:id", async (req, res) => {
//       try {
//         const newReview = req.body;
//         const bookId = req.params.id;
//         const query = { _id: new ObjectId(bookId) };
//         const result = await bookCollection.updateOne(query, {
//           $push: { reviews: newReview },
//         });

//         console.log(result, "check  result ");
//         if (result.modifiedCount === 1) {
//           res.status(200).json({ message: "Review added successfully." });
//         } else {
//           res
//             .status(404)
//             .json({ message: "Book not found or review not added." });
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ message: "Internal server error." });
//       }
//     });

//     app.delete("/book/delete/:id", async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const data = req.body;
//       const author = data?.user?.user?.email;
//       const book = await bookCollection.findOne(query);

//       if (!book) {
//         return res.status(404).json("Book not found");
//       }

//       if (book.author !== author) {
//         return res
//           .status(404)
//           .json({ message: "You are not the author of this book" });
//       } else {
//         const result = await bookCollection.deleteOne(query);
//         res.status(200).json({ message: "Book deleted successfully" });
//       }
//     });

//     app.put("/book/edit/:id", async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const data = req.body;
//       const authorEmail = data?.user?.user?.email;

//       const { authorName, title, genre, publicationDate } = data?.book?.book;
//       const product = await bookCollection.findOne(query);
//       if ( authorEmail !== product?.author) {
//         return res.status(400).json("You are not the author of this book");
//       } else {
//         const result = await bookCollection.updateOne(query, {
//           $set: { authorName, title, genre, publicationDate },
//         });

//         res.status(200).json({ message: "Book updated successfully" });
//       }
//     });
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// }

// database connection
const { MongoClient, ObjectId } = require("mongodb");

// MongoDB Atlas connection URI
const uri = `mongodb+srv://Assainment-5:HyAXDpnLTARhmibL@474.79d3jxt.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient
const client = new MongoClient(uri);

// Function to connect to MongoDB and start the Express server
async function connectToMongoDB() {
  try {
    // Connect to MongoDB
    await client.connect();

    // Start the Express server
    app.listen(port, () => {
      console.log(`Server started on port`, port);
    });

 

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Call the function to connect to MongoDB and start the server
connectToMongoDB();

app.get("/", (req, res) => {
  res.send("Welcome assignment 5  frontend!");
});


