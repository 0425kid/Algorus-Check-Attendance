const express = require("express");
const router = express.Router();
const path = require('path');
const { isErrored } = require("stream");
const postgresql = require('../lib/postgresql');


router.get('/:week', async (req,res)=>{
    const week_num = req.params.week;
    console.log(`${week_num}주차 출석체크`);
    const json = require('../prototype/check.json');

    const pg = new postgresql()
    await pg.connect()

    //기존의 유저 데이터 초기화
    pg.client.query(
        `
        TRUNCATE attendance RESTART IDENTITY;
        `
    );

    //json에 있는 데이터대로 새로 추가
    try {
        await Promise.all(json.map((element) =>
            pg.client.query(
                `
                INSERT INTO attendance(week_number, student_name, attendance_status)
                VALUES($1, $2, $3)
                `,
                [week_num, element.name, element.atnd]
            )
        ));
        res.send(`
            <script>alert("Success"); 
            window.location.href="/admin";
            </script>
        `);
    } catch (error) {
        //console.error(error);
        let errormsg = error.severity + ' : ' + error.code + ' : ' + error.detail;
        res.status(400).send(errormsg);
    } finally {
        await pg.disconnect();   
    }
});

router.get('/getStatus/:week', async (req,res)=>{
    const week_num = req.params.week;

    const pg = new postgresql()
    await pg.connect()

    pg.client.query(
        `
        SELECT student_name, attendance_status FROM attendance
        WHERE week_number = $1;
        `
    ,[week_num],
    (error, result)=>{
        if(error){
            res.send(`
                <script>alert("Failed"); 
                </script>
            `)
        }
        else {
            res.send(result.rows);
        }
        
    })

})
    
    


module.exports = router
