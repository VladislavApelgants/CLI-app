const fs = require("fs/promises");
const path = require("path");
const { v1 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contactsList = JSON.parse(data);
  return contactsList;
};

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const result = allContacts.find(item => item.id === String(contactId));
  return result ? result : null;
};

async function addContact(name, email, phone) {
  const contact = { name, id: v1(), email, phone };
  const allContacts = await listContacts();
  allContacts.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return contact;
};

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === String(contactId));

  if (index === -1) {
    return null;
  };

  const deleteContacts = allContacts[index];
  allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return deleteContacts;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact
};