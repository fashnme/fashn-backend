const elasticsearch = require('elasticsearch');
const config = require('./config.json');

const  esClient =  new elasticsearch.Client({  host: [
    {
      host: "localhost",
      protocol: 'http',
      port: 9200
    }
  ]
});


module.exports = {esClient}