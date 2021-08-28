const { client } = require("./");

const createUser = async (username) => {
  await client.query(
    `
        INSERT INTO users(username)
        VALUES($1)
        ON CONFLICT (username) DO NOTHING;
    `,
    [username]
  );
  console.log("CREATED USER: ", username);
};

const createChannel = async (channelName) => {
  await client.query(
    `
    INSERT INTO channels(name) VALUES($1);
  `,
    [channelName]
  );
  console.log("CREATED CHANNEL: ", channelName);
};

const getMessages = async () => {
  const { rows } = await client.query(`SELECT * FROM messages`);
  return rows;
};

const createMessage = async (content, userId, channelId) => {
  await client.query(
    `
    INSERT INTO messages(content, authorId, channelId)
    VALUES($1, $2, $3);
  `,
    [content, userId, channelId]
  );
};

const addUserToChannel = async (userID, channelID) => {
  await client.query(
    `
    INSERT INTO userChannels("userId", "channelId")
    VALUES($1, $2);
  `,
    [userID, channelID]
  );
  console.log("Added user to channel: ", userID, channelID);
};

module.exports = {
  createUser,
  createChannel,
  createMessage,
  addUserToChannel,
  getMessages,
};
