const fs = require("fs/promises");
const path = require("path");
// const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    return console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const findContact = contacts.find(({ id }) => id === contactId);
    if (!findContact) {
      throw new Error("Not found for contact!!!");
      return;
    }
    return findContact;
  } catch (error) {
    return console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactRemove = contacts.find(
      ({ id }) => id === contactId.toString()
    );
    const newContactsList = JSON.stringify(
      contacts.filter(({ id }) => id !== contactId.toString())
    );
    fs.writeFile(contactsPath, newContactsList);
    return contactRemove;
  } catch (error) {
    return console.error(error);
  }
}

// async function addContact(name, email, phone) {
//   try {
//     const contacts = await listContacts();
//     const newContact = { id: uuidv4(), name, email, phone };
//     const newContactsList = JSON.stringify([...contacts, newContact]);
//     fs.writeFile(contactsPath, newContactsList);
//     return newContact;
//   } catch (err) {
//     return console.error(err);
//   }
// }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  //   addContact,
};
