const postgresql = require('../lib/postgresql')
const {Pool} = require('pg');

var pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'pre_algorus',
    password: 'password',
    port: 5432 //postgres의 기본 포트인듯?
  })

const addMembers = async (data) => {
    data.forEach(element => {
        pool.query(
            `
            INSERT INTO students(name, student_id, boj_id)
            VALUES($1, $2, $3)
            `
        ,[element.name, element.s_id, element.b_id])
    });
}

module.exports = {
    addMembers
}
