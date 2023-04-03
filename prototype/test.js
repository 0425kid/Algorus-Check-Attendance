const week_num = 1;
const json = require(`../prototype/check${week_num}.json`);
const postgresql = require("../lib/postgresql");

const pg = new postgresql()
await pg.connect()

pg.client.query(
    `
        DELETE
        FROM attendance
        WHERE week_number = ${week_num};
    `
);

//json에 있는 데이터대로 새로 출석체크
await Promise.all(json.map((element) =>
    pg.client.query(
        `
            INSERT INTO attendance(week_number, student_id, student_name, attendance_status)
            VALUES ($1, $2, $3, $4)
        `,
        [week_num, element.s_id, element.name, element.atnd]
    )
));