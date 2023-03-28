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
            INSERT INTO students(name, student_id, student_dept, phone_number, boj_id, tier)
            VALUES($1, $2, $3, $4, $5, $6)
            `
        ,[element.name, element.s_id, element.dept, element.pn, element['boj-id'], element.tier])
    });
}

module.exports = {
    addMembers
}