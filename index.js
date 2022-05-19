//npm start run dev  for launching project

const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

(async () => {
  const argv = program.opts();

  async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
      case 'list': {
        const data = await listContacts();
        console.table(data);
        break;
      }

      case 'get': {
        const data = await getContactById(id);
        console.table(data);
        break;
      }

      case 'add': {
        await addContact(name, email, phone);
        const data = await listContacts();
        console.table(data);
        break;
      }

      case 'remove': {
        await removeContact(id);
        const data = await listContacts();
        console.table(data);
        break;
      }

      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  }

  await invokeAction(argv);
})();