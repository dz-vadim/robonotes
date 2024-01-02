import { MongoClient } from "mongodb";

const uri = "mongodb+srv://user:UNmeZwGsyksGH9Gy@todos.80yourq.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

client.connect().then(() => {

    const todosCollection = client.db("myDatabase").collection("todos");

    todosCollection.insertOne({
        title: "Купити молоко",
        completed: false,
    });

    const todos = todosCollection.find().toArray();

    console.log(todos);
    console.log("todos");
}).catch((error) => {
    console.log(error);
});
