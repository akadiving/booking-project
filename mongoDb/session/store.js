const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const config = require('config');

const devUrl = config.get('dev.store');
const testUrl = config.get('test.store');
const devCollection = config.get('dev.collection');
const testCollection = config.get('test.collection');


const storeUri = process.env.NODE_ENV === 'test' ? process.env.MONGODB_URI + testUrl : process.env.MONGODB_URI + devUrl
const storeCollection = process.env.NODE_ENV === 'test'  ? testCollection : devCollection;


const store = new MongoDBStore({
    uri: storeUri,
    collection: storeCollection
})

store.on('error', function(error) {
    console.log(error);
  });

module.exports = store;