var db = require('../mysqlconnection');
var self = {
    find: async function(id) {
        var user = [];
        await new Promise((resolve, reject) => {
            db.query('select * from users where id=? LIMIT 1', [id], async function(err, result) {
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
    FindUsersWithSteps: async function(id) {
        var user = [];
        await new Promise((resolve, reject) => {
            const q = 'select users.id,users.name,user_steps.date,user_steps.steps,user_steps.calories\
            from users left join user_steps on users.id = user_steps.user_id where users.id= ?';
            db.query(q, [id], async function(err, result) {
                if (err) {
                    console.log(err)
                    reject();
                } else if (result) {
                    user = result;
                }
                resolve();
            });
        });
        return user;
    },
    InsertUser : async function(id,name)
    {
        var sql = "INSERT INTO users (id,name) VALUES ?";
        var values = [
            [value.id, value.name]
        ];
        await new Promise((resolve, reject) => {
            db.query(sql, [values], async function(err, result) {
                if (err) {
                    console.log(err)
                    reject();
                } else if (result) {
                }
                resolve();
            });
        });
    }
};
module.exports = self;