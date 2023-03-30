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
            res.send(result.rows[0]);
        }
    })

})

router.post('/chek_attendance', async (req,res)=>{
    const week_num = req.body.week_num;
    const name = req.body.name;
    const s_id = req.body.student_id;

    const pg = new postgresql()
    await pg.connect()

    try{
        const result = await pg.client.query(
            `
            SELECT * FROM students
            WHERE name=$1 and student_id=$2;
            `, [name, s_id],
        )
        if(result.rowCount == 0){
            return res.status(400).send('이름과 학번이 일치하지 않습니다!');
        }
        
    }
    catch(e){
        console.log(e)
        return res.status(500).send({})
    }

    pg.client.query(
        
    )

    pg.client.query(
        `
        SELECT attendance_status FROM attendance
        WHERE week_number=$1 and student_name=$2
        ;
        `, [week_num, name] 
        ,(error, result) => {
            res.send(result.rows[0]);
        }
    )

})

module.exports = router