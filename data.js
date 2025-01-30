const mongoose = require("mongoose");
const Book = require("./models/Book");
const { v4: uuidv4 } = require("uuid");

mongoose
  .connect("mongodb+srv://keerthana:keerthana@cluster0.vals6.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Error connecting to database:", err));

const books = [
  {
    id: uuidv4(),
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A gripping story of racial injustice in the Deep South.",
    price: "$15",
    coverImage: "https://cdn2.penguin.com.au/covers/original/9781784752637.jpg",
  },
  {
    id: uuidv4(),
    title: "1984",
    author: "George Orwell",
    description: "A dystopian novel depicting a totalitarian society.",
    price: "$12",
    coverImage:
      "https://th.bing.com/th/id/OIP.8bTpGDLEYVpDlV8tD10XlQAAAA?rs=1&pid=ImgDetMain",
  },
  {
    id: uuidv4(),
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "A novel about the American dream and love in the Roaring Twenties.",
    price: "$14",
    coverImage:
      "https://hachette.imgix.net/books/9780762498130.jpg?auto=compress,format",
  },
  {
    id: uuidv4(),
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "A novel about the American dream, love, and tragedy during the Roaring Twenties.",
    price: "$14",
    coverImage:
      "https://hachette.imgix.net/books/9780762498130.jpg?auto=compress,format",
  },
  {
    id: uuidv4(),
    title: "Moby Dick",
    author: "Herman Melville",
    description:
      "An epic tale of obsession and revenge, following the journey of the whaling ship Pequod.",
    price: "$18",
    coverImage:
      "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781625584595/moby-dick-9781625584595_hr.jpg",
  },
  {
    id: uuidv4(),
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description:
      "A story of teenage rebellion and alienation told through the voice of Holden Caulfield.",
    price: "$13",
    coverImage:
      "https://th.bing.com/th/id/OIP.2WwofUigvAOE5ra4QibF5wAAAA?rs=1&pid=ImgDetMain",
  },
  {
    id: uuidv4(),
    title: "Brave New World",
    author: "Aldous Huxley",
    description:
      "A futuristic novel exploring the dangers of technological advancements and loss of individuality.",
    price: "$16",
    coverImage:
      "https://cdn.kobo.com/book-images/b75f696b-495b-45b7-b94d-dd6d1dfcf52d/1200/1200/False/brave-new-world-12.jpg",
  },
  {
    id: uuidv4(),
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description:
      "A fantasy adventure following Bilbo Baggins' journey to recover a treasure guarded by a dragon.",
    price: "$20",
    coverImage:
      "https://th.bing.com/th/id/OIP.u1jvgQh_S5zIR3e4uX5oNwHaLH?rs=1&pid=ImgDetMain",
  },
  {
    id: uuidv4(),
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    description:
      "A story of love, independence, and resilience as Jane navigates through life’s challenges.",
    price: "$12",
    coverImage:
      "https://th.bing.com/th/id/OIP.nITskJnfWS4gv_F0V6ApmQHaLf?rs=1&pid=ImgDetMain",
  },
  {
    id: uuidv4(),
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    description:
      "An epic fantasy tale about the battle between good and evil in Middle-earth.",
    price: "$30",
    coverImage:
      "https://cdn11.bigcommerce.com/s-gibnfyxosi/images/stencil/1920w/products/154740/156431/51eq24cRtRL__98083.1615576774.jpg?c=1",
  },
  {
    id: uuidv4(),
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description:
      "A story of teenage rebellion and alienation told through the voice of Holden Caulfield.",
    price: "$13",
    coverImage:
      "https://th.bing.com/th/id/OIP.2WwofUigvAOE5ra4QibF5wAAAA?rs=1&pid=ImgDetMain",
  },
  {
    id: uuidv4(),
    title: "The Alchemist",
    author: "Paulo Coelho",
    description:
      "A philosophical novel about pursuing one's dreams and the journey to self-discovery.",
    price: "$14",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg",
  },
  {
    id: uuidv4(),
    title: "Wuthering Heights",
    author: "Emily Brontë",
    description:
      "A passionate tale of love and revenge on the Yorkshire moors, exploring themes of obsession and violence.",
    price: "$12",
    coverImage:
      "https://th.bing.com/th/id/OIP.-V0TZ5kcqG36TF5w9DdLggHaKP?rs=1&pid=ImgDetMain",
  },
  {
    id: uuidv4(),
    title: "The Odyssey",
    author: "Homer",
    description:
      "An ancient Greek epic that follows Odysseus' perilous journey home after the Trojan War.",
    price: "$17",
    coverImage:
      "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781451674187/the-odyssey-9781451674187_hr.jpg",
  },
  {
    id: uuidv4(),
    title: "Frankenstein",
    author: "Mary Shelley",
    description:
      "A Gothic novel about a scientist's creation of a creature that turns monstrous in its rejection by society.",
    price: "$11",
    coverImage:
      "https://th.bing.com/th/id/OIP.hyqwGmQw_WRmiB67FDzkNQHaLD?rs=1&pid=ImgDetMain",
  },
  {
    id: uuidv4(),
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    description:
      "A philosophical novel about vanity, moral corruption, and the consequences of indulgence.",
    price: "$15",
    coverImage:
      "https://th.bing.com/th/id/OIP.f87kvy7StzeacxY7DidHsgAAAA?rs=1&pid=ImgDetMain",
  },
  {
    id: uuidv4(),
    title: "Animal Farm",
    author: "George Orwell",
    description:
      "A satirical novella about a group of farm animals who overthrow their human owner and establish their own government.",
    price: "$9",
    coverImage:
      "https://epeolatry.in/images/posts/animal-farm-by-george-orwell.jpg",
  },
  {
    id: uuidv4(),
    title: "Catch-22",
    author: "Joseph Heller",
    description:
      "A darkly comic novel about the absurdities of war and the paradoxes within military bureaucracy.",
    price: "$16",
    coverImage:
      "https://th.bing.com/th/id/OIP.8176UT2wXeN8km6wuq_imwAAAA?rs=1&pid=ImgDetMain",
  },
  {
    id: uuidv4(),
    title: "Slaughterhouse-Five",
    author: "Kurt Vonnegut",
    description:
      "A satirical novel that blends science fiction and history to explore the bombing of Dresden during World War II.",
    price: "$14",
    coverImage:
      "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781684156252/slaughterhouse-five-9781684156252_hr.jpg",
  },
  {
    id: uuidv4(),
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    description:
      "A philosophical novel about faith, doubt, and morality, following the complex lives of the Karamazov brothers.",
    price: "$22",
    coverImage:
      "https://th.bing.com/th/id/OIP.1MUIUcFqU6cmwRJ8p3MifQAAAA?rs=1&pid=ImgDetMain",
  },
];

const seedDB = async () => {
  await Book.deleteMany({});
  await Book.insertMany(books);
  console.log("Books inserted successfully!");
  mongoose.connection.close();
};

seedDB();
