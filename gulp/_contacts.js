// >---------- Imports ----------

const fs = require('fs');

// >---------- Consts ----------

let CONTACTS =  fs.readFileSync("./contacts", "utf8");

CONTACTS = CONTACTS.replace('[date]', new Date().getFullYear());

module.exports = {
	CONTACTS
};
