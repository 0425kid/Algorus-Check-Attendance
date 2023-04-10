const express = require("express");
const router = express.Router();
const path = require('path');
const {isErrored} = require("stream");
const postgresql = require('../lib/postgresql');

router.get('/getStatus/:week', async (req, res) => {
    const week_num = req.params.week;

    const pg = new postgresql()
    await pg.connect()

    pg.client.query(
        `
            SELECT student_id, student_name, attendance_status
            FROM attendance
            WHERE week_number = $1;
        `
        , [week_num],
        (error, result) => {
            if (error) {
                res.send(`
                <script>alert("Failed"); 
                </script>
            `)
            } else {
                res.send(result.rows);
            }

        })

})


module.exports = router
