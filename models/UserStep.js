var db = require('../mysqlconnection');
var self = {
    findWithDate: async function(id,date) {
        var user = [];
        await new Promise((resolve, reject) => {
            db.query('select * from user_steps where user_id=? and date = ? LIMIT 1', [id,date], async function(err, result) {
                if (err) {
                    console.log(err)
                    reject();
                } else if (result) {
                    user = result[0];
                }
                resolve();
            });
        });
        return user;
    },
    InsertStep : async function(value)
    {
        var sql = "INSERT INTO user_steps (user_id,date,steps,calories) VALUES ?";
        var values = [
            [value.id, value.date,value.steps,value.calories]
        ];
        await new Promise((resolve, reject) => {
            try{
                db.query(sql, [values], async function(err, result) {
                if (err) {
                    console.log(err)
                    reject();
                } else if (result) {
                }
                resolve();
            });
            }
            catch(err){
                console.log(err);
            }
            
        });
    }
};
module.exports = self;