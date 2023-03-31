const express = require("express");
const router = express.Router();
const path = require('path');
const postgresql = require('../lib/postgresql');

var bodyParser = require('body-parser')

router.use(express.urlencoded({extended: true}));
router.use(express.json());


router.post('/check_boj_id', async (req,res)=>{

    const name = req.body.name;
    const student_id = req.body.student_id;
    console.log(req.body);

    const pg = new postgresql()
    await pg.connect()

    pg.client.query(
        `
        SELECT boj_id FROM students
        WHERE name=$1 and student_id=$2
        ;
        `,[name, student_id]
    ,
    (error, result)=>{
        if(error){
            res.send(`
                <script>alert("Failed"); 
                window.location.href="/";
                </script>
            `)
        }
        else if(result.rowCount == 0) {
            res.send(`
                <script>alert("등록된 회원정보 없음"); 
                window.location.href="/";
                </script>
            `)
        }
        else {
            res.send(result.rows[0]['boj_id']);
        }
    })

})

router.post('/chek_attendance', async (req,res)=>{
    const week_num = req.body.week_num;
    const s_name = req.body.name;
    const s_id = req.body.student_id;

    const pg = new postgresql()
    await pg.connect()

    try{
        const result = await pg.client.query(
        `
        SELECT attendance_status FROM attendance
        WHERE week_number=$1 and student_id=$2 and student_name=$3
        ;
        `, [week_num, s_id, s_name]
        )
        console.log(result.rowCount)
        if(result.rowCount == 0){
            return res.send("일치하는 회원 정보가 없습니다. 학번과 이름을 확인해주세요!")
        }
        res.send(result.rows[0]);
        
    }
    catch(error){
        //console.log(e)
        let errormsg = error.severity + ' : ' + error.code + ' : ' + error.detail;
        res.status(400).send(errormsg);
    }

})

module.exports = router
