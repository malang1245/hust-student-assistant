// Chạy một lần: npm run setup  -> tạo database và các bảng
import 'dotenv/config'
import fs from 'node:fs'
import mysql from 'mysql2/promise'

const name = process.env.DB_NAME || 'hust_student_assistant'
try {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  })
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${name}\` CHARACTER SET utf8mb4`)
  await conn.query(`USE \`${name}\``)
  await conn.query(fs.readFileSync(new URL('./schema.sql', import.meta.url), 'utf8'))
  const [tables] = await conn.query('SHOW TABLES')
  console.log(`Đã tạo database "${name}" với ${tables.length} bảng:`, tables.map((t) => Object.values(t)[0]).join(', '))
  await conn.end()
} catch (e) {
  console.error('Không tạo được database:', e.message)
  console.error('Kiểm tra lại DB_USER / DB_PASSWORD trong file .env và MySQL đã chạy chưa.')
  process.exit(1)
}
