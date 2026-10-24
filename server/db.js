import 'dotenv/config'
import mysql from 'mysql2/promise'

export default mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'hust_student_assistant',
  dateStrings: true, // trả DATE/TIME dạng chuỗi, tránh lệch múi giờ
  waitForConnections: true,
  connectionLimit: 10,
})
