const path = require('path');
const fs = require('fs').promises;

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const contact = contacts.find(({ id }) => `${id}` === `${contactId}`);
    return contact;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const filteredContacts = contacts.filter(({ id }) => `${id}` !== `${contactId}`);
    const beautifyContacts = JSON.stringify(filteredContacts, null, 4);
    await fs.writeFile(contactsPath, beautifyContacts);
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const id = Math.max(...contacts.map(({ id }) => id)) + 1;
    const contact = { id, name, email, phone };
    const updatedContacts = [...contacts, contact];
    const newContacts = JSON.stringify(updatedContacts, null, 4);
    await fs.writeFile(contactsPath, newContacts);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };