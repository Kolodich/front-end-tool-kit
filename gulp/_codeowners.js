// >---------- Imports ----------

const fs = require('fs');

// >---------- Consts ----------

let CONTACTS =  fs.readFileSync("./codeowners", "utf8");

CONTACTS = CONTACTS.replace('[date]', new Date().getFullYear());

module.exports = {
	CONTACTS
};
