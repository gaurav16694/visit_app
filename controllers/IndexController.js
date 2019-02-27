var db = require('../mysqlconnection');
const csv = require('csv-parser');
const fs = require('fs');
var path = require('path');
var User = require('../models/User');
var UserStep = require('../models/UserStep');


exports.PostCsv = async (req, res) => {
    if (req.file.mimetype != 'text/csv')
        return res.json({
            message: 'invalid file',
            status: 0
        });

    try {
        var buffer = path.resolve(req.file.path);
        var data = await ReadCsV(buffer);
        for (value of data) {
            var check_user = await User.find(value.id);
            if (!check_user)
                await User.InsertUser(value);
            var check = await UserStep.findWithDate(value.id, value.date);
            if (!check)
                await UserStep.InsertStep(value);
        }
        return res.json({
            message: 'data uploaded successfully',
            status: 1
        });
    } catch (err) {
        console.log(err);
    }

};

exports.GetData = async (req, res) => {
    try {
        const user_id = req.query.user_id;
        if (!user_id)
            return res.json({
                message: 'please provide a user_id'
            });

        var check = await User.find(user_id);
        if (!check)
            return res.json({
                message: 'No user found'
            });

        var data = await User.FindUsersWithSteps(user_id);
        return res.json({
            message: 'data loaded',
            data: data
        });
    } catch (err) {
        console.log(err);
    }
};

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