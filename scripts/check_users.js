const mongoose = require('mongoose');
const uri = 'mongodb+srv://mdnurealamsiddiquee2004:khelahobe@ieee-rusb.vuhmi.mongodb.net/test?retryWrites=true&w=majority&appName=ieee-rusb';
mongoose.connect(uri).then(async () => {
  const users = await mongoose.connection.collection('users').find({ $or: [{ position: /webmaster/i }, { position: /public relation/i }] }).toArray();
  const filtered = users.map(u => ({ name: u.name, position: u.position, roles: u.roles, isApproved: u.isApproved }));
  console.log(JSON.stringify(filtered, null, 2));
  process.exit(0);
}).catch(console.error);
