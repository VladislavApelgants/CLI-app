const contactsOpearions = require("./contacts");
const { program } = require("commander");

const {
    listContacts,
    getContactById,
    addContact,
    removeContact
} = contactsOpearions;

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const listResult = await listContacts();
            console.table(listResult);
            break;
        case 'get':
            const getResult = await getContactById(id);
            console.table(getResult);
            break;
        case 'add':
            const addContacts = await addContact(name, email, phone);
            console.table(addContacts);
            break;
        case 'remove':
            const removedContact = await removeContact(id);
            console.table(removedContact);
            break;
        default:
      console.warn('\x1B[31m Unknown action type!');
    }
};

program
    .option("-a, --action <type>", "contacts action")
    .option("--id <type>", "contacts id")
    .option("-n, --name <type>", "contacts name")
    .option("-e, --email <type>", "contacts email")
    .option("-p, --phone <type>", "contacts phone")

program.parse(process.argv);
const options = program.opts();

invokeAction(options);