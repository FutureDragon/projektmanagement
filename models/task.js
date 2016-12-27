function Task() {
    this.get = function (res) {
        return connection.acquire(function (err, con) {
            con.query('select * from task', function (err, result) {
                con.release();
                res.send(result);
            });
        });
    };
}