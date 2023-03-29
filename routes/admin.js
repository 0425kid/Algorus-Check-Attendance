const express = require("express");
const router = express.Router();
const path = require('path');
const { isErrored } = require("stream");
const postgresql = require('../lib/postgresql');

router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname + '/../view/admin_home.html'))
})

router.get('/getStudents', async (req,res)=>{

    const pg = new postgresql()
    await pg.connect()

    pg.client.query(
        `
        SELECT * FROM students;
        `
    ,
    (error, result)=>{
        if(error){
            res.send(`
                <script>alert("Failed"); 
                window.location.href="/admin";
                </script>
            `)
        }
        else {
            res.send(result.rows);
        }
        
    })

})

router.get('/updateStudents', async (req,res)=>{

    const json = require('../data/members.json');

    const pg = new postgresql()
    await pg.connect()

    //기존의 유저 데이터 초기화
    pg.client.query(
        `
        TRUNCATE students RESTART IDENTITY;
        `
    );

    //json에 있는 데이터대로 새로 추가
    try {
        await Promise.all(json.map((element) =>
            pg.client.query(
                `
                INSERT INTO students(name, student_id, boj_id)
                VALUES($1, $2, $3)
                `,
                [element.name, element.s_id, element.b_id]
            )
        ));
        // res.redirect('/admin');
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
    
    


module.exports = router
