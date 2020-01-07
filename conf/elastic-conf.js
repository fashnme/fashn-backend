const elasticsearch = require('elasticsearch');
const { dev } = require('./../config.json')

const  esClient =  new elasticsearch.Client({  host: [
    {
      host: dev.esHost,
      protocol: dev.esProtocol,
      port: dev.esPort,
      auth: `${dev.esUser}:${dev.esPassword}`,
    }
  ]
});

module.exports = {esClient}