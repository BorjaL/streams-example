const Writable = require('stream').Writable
const Transform = require('stream').Transform
const JSONStream = require('JSONStream');
const fs = require('fs');
const rstream = fs.createReadStream('1000-users.json');
const customTransform = require('./transform');
const ITEMS_PER_FILE = 100;

function tranform() {
  return new Transform({
    objectMode: true,
    transform: (data, _, done) => {
      done(null, customTransform(data));
    }
  });
}

function writer() {
  let count = 0;
  let numberOfFiles = 1;
  let jsonFile = fs.createWriteStream('output/file' + numberOfFiles + '.json');
  createOutpuFolder();

  return new Writable({
    objectMode: true,
    write: (data, _, done) => {
      if (count >= ITEMS_PER_FILE) {
        count = 0;
        numberOfFiles++;
        jsonFile = fs.createWriteStream('output/file' + numberOfFiles + '.json');
      }
      jsonFile.write(JSON.stringify(data));
      count++;
      done();
    }
  });
}

function createOutpuFolder() {
  if (!fs.existsSync('output')) {
    fs.mkdirSync('output');
  }
}

rstream
  .pipe(JSONStream.parse('*'))
  .pipe(tranform())
  .pipe(writer());
