var db = require('../mysqlconnection');
const csv = require('csv-parser');
const fs = require('fs');
var path = require('path');
var User = require('../models/User');
var UserStep = require('../models/UserStep');
exports.UploadContent = async () => {
    const testFolder = './samples/';
    const fs = require('fs');
    temp = fs.readdirSync(testFolder);
    for (val of temp) {
        await FeedIntoDatabase(`samples/${val}`);
    }
}
async function FeedIntoDatabase(file) {
    try {
        var buffer = path.resolve(file);
        console.log(`processing --- ${buffer}`);
        var data = await ReadCsV(buffer);
        for (value of data) {
            var check_user = await User.find(value.id);
            if (!check_user)
                await User.InsertUser(value);
            var check = await UserStep.findWithDate(value.id, value.date);
            if (!check)
                await UserStep.InsertStep(value);
        }
    } catch (err) {
        console.log(err);
    }

}
async function ReadCsV(buffer) {
    var results = [];
    await new Promise((resolve, reject) => {
        fs.createReadStream(buffer)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve();
            });
    });
    return results;
}