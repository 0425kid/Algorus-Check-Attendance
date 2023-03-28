const express = require("express")
const router = express.Router()
const postgresql = require('../lib/postgresql')

router.get('/', (req, res)=>{
    res.send('Admin page');
})

// 로그인
router.get('/updateStudents', async (req,res)=>{

    const json = require('../data/sample.json');

    const pg = new postgresql()
    await pg.connect()

    //기존의 유저 데이터 초기화
    pg.client.query(
        `
        TRUNCATE students RESTART IDENTITY;
        `
    );

    //json에 있는 데이터대로 새로 추가
    json.forEach(element => {
        pg.client.query(
            `
            INSERT INTO students(name, student_id, student_dept, phone_number, boj_id, tier)
            VALUES($1, $2, $3, $4, $5, $6)
            `
        ,[element.name, element.s_id, element.dept, element.pn, element['boj-id'], element.tier],
        (error)=>{
            if(error){
                res.send(`
                    <script>alert("Failed"); 
                    window.location.href="/admin";
                    </script>
                `)
            }
        })
    });
    
    res.send(`
            <script>alert("Success"); 
            window.location.href="/admin";
            </script>
        `);

})

module.exports = router