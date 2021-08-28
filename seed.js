const { client } = require("./db/index");
const { createUser, createChannel, addUserToChannel } = require("./db/users");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    // have to make sure to drop in correct order
    await client.query(`
			DROP TABLE IF EXISTS messages;
      DROP TABLE IF EXISTS userChannels;
			DROP TABLE IF EXISTS channels;
			DROP TABLE IF EXISTS users;
		`);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
			CREATE TABLE users (
				id SERIAL PRIMARY KEY,
				username varchar(255) UNIQUE NOT NULL
			);
    `);
    console.log("USERS CREATED");
    await client.query(`
			CREATE TABLE channels (
				id SERIAL PRIMARY KEY,
				name varchar(255) UNIQUE NOT NULL
			);
    `);
    console.log("CHANNELS CREATED");
    await client.query(`
      CREATE TABLE userChannels (
        "userId" INTEGER REFERENCES users(id),
        "channelId" INTEGER REFERENCES channels(id)
      );
    `);
    console.log("USERCHANNELS CREATED");
    await client.query(`
			CREATE TABLE messages (
				id SERIAL PRIMARY KEY,
				"authorId" INTEGER REFERENCES users(id),
				"channelId" INTEGER REFERENCES channels(id),
				content TEXT NOT NULL
			);
		`);
    console.log("MESSAGES CREATED");
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    console.log("TODO: Set up create users");
    await createUser("Ben");
    await createUser("Brianna");
    await createUser("Izzy");
    await createUser("Seth");

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialChannels() {
  try {
    console.log("Starting to create channels...");
    await createChannel("dogs");
    await createChannel("cats");

    console.log("Finished creating channels!");
  } catch (error) {
    console.log("Error creating posts!");
    throw error;
  }
}

async function createUserChannels() {
  try {
    console.log("Starting to add users to channels...");
    await addUserToChannel(1, 1);
    await addUserToChannel(2, 1);
    await addUserToChannel(2, 2);
    await addUserToChannel(3, 1);
    await addUserToChannel(4, 2);

    console.log("Finished adding users to channels!");
  } catch (error) {
    console.log("Error creating posts!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialChannels();
    await createUserChannels();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
