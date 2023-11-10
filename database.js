import { MongoClient, ObjectId } from "mongodb";

const mydb = "firstDatabase";
const uri = "mongodb://localhost:27017";

async function connectToDatabase() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected to the database");
    return client;
  } catch (error) {
    throw new Error("Error: " + err.message);
  }
}

async function getData() {
  const client = await connectToDatabase();
  try {
    const database = client.db(mydb);
    const collection = database.collection("student");

    // by default
    var pageNumber = 1,
      pageSize = 10;

    // Calculate skip value based on pageNumber and pageSize
    const skip = (pageNumber - 1) * pageSize;

    const result = await collection.find().skip(skip).limit(pageSize).toArray();
    return result;
    // console.log(result);
  } catch (err) {
    throw new Error("Error: " + err.message);
  } finally {
    await client.close();
  }
}

async function getDataById(id) {
  const client = await connectToDatabase();
  try {
    const database = client.db(mydb);
    const collection = database.collection("student");

    const filter = { _id: new ObjectId(id) };
    const result = await collection.findOne(filter);
    console.log(result);
    return result;
    // console.log(result);
  } catch (err) {
    throw new Error("Error: " + err.message);
  } finally {
    await client.close();
  }
}

//console.log(getDataById("6547cf42ec3247ff63b61a4e"));

async function insertData(document) {
  const client = await connectToDatabase();
  try {
    const database = client.db(mydb);
    const collection = database.collection("student");

    const result = await collection.insertOne(document);
    console.log("document inserted");
  } catch (err) {
    throw new Error("Error: " + err.message);
  } finally {
    await client.close();
  }
}

async function deleteData() {
  const client = await connectToDatabase();
  try {
    const database = client.db(mydb);
    const collection = database.collection("student");

    const result = await collection.deleteOne({
      name: "Company Inc",
      department: "civil",
    });

    console.log("document deleted");
  } catch (err) {
    throw new Error("Error: " + err.message);
  } finally {
    await client.close();
  }
}

async function updateData() {
  const client = await connectToDatabase();
  try {
    const database = client.db(mydb); // Replace "mydb" with your database name
    const collection = database.collection("student");

    const updateDocument = {
      $set: {
        department: "Mechanical Eng",
      },
    };
    const result = await collection.updateOne(
      {
        name: "Abdullah",
      },
      updateDocument
    );

    console.log("Matched Count:", result.matchedCount);
    console.log("Modified Count:", result.modifiedCount);

    if (result.matchedCount === 0) {
      console.log("No matching document found.");
    } else {
      console.log("Document updated successfully.");
    }
  } catch (err) {
    throw new Error("Error: " + err.message);
  } finally {
    await client.close();
  }
}

async function createCollection(databaseName, collectionName) {
  const client = await connectToDatabase();
  try {
    const database = client.db(databaseName);
    await database.createCollection(collectionName);

    console.log(
      `Collection '${collectionName}' created successfully in the '${databaseName}' database.`
    );
  } catch (err) {
    throw new Error("Error: " + err.message);
  } finally {
    await client.close();
  }
}

// Usage example:
// const databaseName = "firstDatabase"; // Replace with your desired database name
// const collectionName = "mycollection"; // Replace with your desired collection name

// createCollection(databaseName, "departmentDetail");

export {
  createCollection,
  updateData,
  getData,
  deleteData,
  insertData,
  getDataById,
};
