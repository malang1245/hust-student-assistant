import { createContext, useContext } from 'react'

export const LANGS = ['vi', 'en', 'km']
export const LANG_NAMES = { vi: 'Tiếng Việt', en: 'English', km: 'ភាសាខ្មែរ' }

// Mỗi khóa: [Tiếng Việt, English, ភាសាខ្មែរ]. Thêm chuỗi mới ở đây.
export const D={
 edit:['Sửa','Edit','កែប្រែ'],save:['Lưu','Save','រក្សាទុក'],cancel:['Hủy','Cancel','បោះបង់'],
 tLogin:['Đăng nhập','Log in','ចូលប្រើប្រាស់'],tReg:['Đăng ký','Sign up','ចុះឈ្មោះ'],uname:['Họ và tên','Full name','ឈ្មោះពេញ'],email:['Email','Email','អ៊ីមែល'],pass:['Mật khẩu','Password','ពាក្យសម្ងាត់'],logout:['Đăng xuất','Log out','ចាកចេញ'],
 toReg:['Chưa có tài khoản? Đăng ký','No account yet? Sign up','មិនទាន់មានគណនី? ចុះឈ្មោះ'],toLogin:['Đã có tài khoản? Đăng nhập','Already have an account? Log in','មានគណនីហើយ? ចូលប្រើប្រាស់'],loading:['Đang tải...','Loading...','កំពុងផ្ទុក...'],
 errLogin:['Email hoặc mật khẩu không đúng.','Wrong email or password.','អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវទេ។'],errEmail:['Email này đã được đăng ký.','This email is already registered.','អ៊ីមែលនេះត្រូវបានចុះឈ្មោះរួចហើយ។'],errShort:['Mật khẩu cần ít nhất 6 ký tự.','Password must be at least 6 characters.','ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច ៦ តួអក្សរ។'],
 errGeneric:['Có lỗi xảy ra, vui lòng thử lại.','Something went wrong, please try again.','មានបញ្ហាកើតឡើង សូមព្យាយាមម្តងទៀត។'],errAuth:['Phiên đăng nhập đã hết hạn, hãy đăng nhập lại.','Your session expired, please log in again.','សម័យចូលប្រើបានផុតកំណត់ សូមចូលប្រើម្តងទៀត។'],errNet:['Không kết nối được máy chủ. Hãy kiểm tra backend đã chạy chưa.','Cannot reach the server. Is the backend running?','មិនអាចភ្ជាប់ទៅម៉ាស៊ីនមេបានទេ។ សូមពិនិត្យថាម៉ាស៊ីនមេកំពុងដំណើរការឬអត់។'],
 lang:['Ngôn ngữ','Language','ភាសា'],
 sub:['Quản lý môn học, thời khóa biểu, bài tập và lịch thi của riêng bạn.','Manage your own courses, timetable, assignments and exams.','គ្រប់គ្រងមុខវិជ្ជា កាលវិភាគ កិច្ចការ និងការប្រឡងរបស់អ្នក។'],
 tHome:['Tổng quan','Overview','ទិដ្ឋភាពទូទៅ'],tTT:['Thời khóa biểu','Timetable','កាលវិភាគសិក្សា'],tTask:['Bài tập','Assignments','កិច្ចការ'],tExam:['Lịch thi','Exams','ការប្រឡង'],tCourse:['Môn học','Courses','មុខវិជ្ជា'],
 d0:['Thứ 2','Mon','ច័ន្ទ'],d1:['Thứ 3','Tue','អង្គារ'],d2:['Thứ 4','Wed','ពុធ'],d3:['Thứ 5','Thu','ព្រហស្បតិ៍'],d4:['Thứ 6','Fri','សុក្រ'],d5:['Thứ 7','Sat','សៅរ៍'],d6:['CN','Sun','អាទិត្យ'],
 sToday:['buổi học hôm nay','classes today','ម៉ោងសិក្សាថ្ងៃនេះ'],sPend:['bài tập chưa xong','pending assignments','កិច្ចការមិនទាន់ចប់'],sExam:['kỳ thi sắp tới','upcoming exams','ការប្រឡងខាងមុខ'],sCourse:['môn học','courses','មុខវិជ្ជា'],
 todayT:['Lịch học hôm nay','Today\'s classes','ម៉ោងសិក្សាថ្ងៃនេះ'],upT:['Deadline sắp tới','Upcoming deadlines','ថ្ងៃកំណត់ជិតមកដល់'],upE:['Lịch thi sắp tới','Upcoming exams','ការប្រឡងខាងមុខ'],
 noClass:['Hôm nay không có buổi học nào.','No classes today.','ថ្ងៃនេះគ្មានម៉ោងសិក្សាទេ។'],noPend:['Không còn bài tập nào chưa nộp.','No pending assignments.','គ្មានកិច្ចការដែលមិនទាន់ធ្វើទេ។'],noExam:['Chưa có lịch thi nào.','No exams yet.','មិនទាន់មានការប្រឡងទេ។'],
 needC:['Hãy thêm ít nhất một môn học ở tab Môn học trước.','Add at least one course in the Courses tab first.','សូមបន្ថែមមុខវិជ្ជាយ៉ាងហោចណាស់មួយនៅផ្ទាំងមុខវិជ្ជាជាមុនសិន។'],
 addS:['Thêm buổi học','Add a class','បន្ថែមម៉ោងសិក្សា'],course:['Môn','Course','មុខវិជ្ជា'],day:['Thứ','Day','ថ្ងៃ'],start:['Bắt đầu','Start','ចាប់ផ្តើម'],end:['Kết thúc','End','បញ្ចប់'],room:['Phòng','Room','បន្ទប់'],
 free:['Trống','Free','ទំនេរ'],clash:['Trùng giờ với buổi trước','Overlaps the previous class','ជាន់ម៉ោងជាមួយម៉ោងមុន'],
 addT:['Thêm bài tập','Add an assignment','បន្ថែមកិច្ចការ'],title:['Tên bài tập','Title','ចំណងជើង'],due:['Hạn nộp','Due date','ថ្ងៃកំណត់'],dueS:['Hạn','Due','កំណត់'],noTask:['Chưa có bài tập nào. Thêm bài đầu tiên ở trên.','No assignments yet. Add your first one above.','មិនទាន់មានកិច្ចការទេ។ បន្ថែមកិច្ចការដំបូងខាងលើ។'],
 addE:['Thêm lịch thi','Add an exam','បន្ថែមការប្រឡង'],eDate:['Ngày thi','Exam date','ថ្ងៃប្រឡង'],time:['Giờ','Time','ម៉ោង'],past:['Đã thi','Past','បានប្រឡងរួច'],
 addC:['Thêm môn học','Add a course','បន្ថែមមុខវិជ្ជា'],cName:['Tên môn','Course name','ឈ្មោះមុខវិជ្ជា'],noCourse:['Chưa có môn học nào.','No courses yet.','មិនទាន់មានមុខវិជ្ជាទេ។'],
 delW:['Xóa một môn sẽ xóa luôn buổi học, bài tập và lịch thi của môn đó.','Deleting a course also deletes its classes, assignments and exams.','ការលុបមុខវិជ្ជា នឹងលុបម៉ោងសិក្សា កិច្ចការ និងការប្រឡងរបស់មុខវិជ្ជានោះដែរ។'],
 del:['Xóa','Delete','លុប'],mark:['Đánh dấu hoàn thành','Mark as done','សម្គាល់ថាបានធ្វើរួច'],gone:['(môn đã xóa)','(deleted course)','(មុខវិជ្ជាត្រូវបានលុប)'],
 late:['Quá hạn {n} ngày','Overdue by {n} day(s)','ហួសកំណត់ {n} ថ្ងៃ'],today:['Hôm nay','Today','ថ្ងៃនេះ'],tmr:['Ngày mai','Tomorrow','ថ្ងៃស្អែក'],left:['Còn {n} ngày','{n} days left','នៅសល់ {n} ថ្ងៃ'],
 errEnd:['Giờ kết thúc phải sau giờ bắt đầu.','End time must be after start time.','ម៉ោងបញ្ចប់ត្រូវនៅក្រោយម៉ោងចាប់ផ្តើម។'],errC:['Hãy thêm môn học trước.','Add a course first.','សូមបន្ថែមមុខវិជ្ជាជាមុនសិន។'],
 c1:['Cấu trúc dữ liệu','Data Structures','រចនាសម្ព័ន្ធទិន្នន័យ'],c2:['Hệ điều hành','Operating Systems','ប្រព័ន្ធប្រតិបត្តិការ'],c3:['Thiết kế giao diện','UI Design','ការរចនាចំណុចប្រទាក់អ្នកប្រើ'],
 k1:['Bài tập lớn: cây nhị phân','Project: binary trees','គម្រោងធំ៖ ដើមឈើគោលពីរ'],k2:['Wireframe 4 màn hình','Wireframes for 4 screens','វ៉ាយហ្វ្រេមសម្រាប់ ៤ អេក្រង់'],k3:['Báo cáo lab tiến trình','Process lab report','របាយការណ៍មន្ទីរពិសោធន៍ដំណើរការ']
};

export const LangCtx = createContext(0)
export const translate = (li, k, n) => D[k][li].replace('{n}', n)
export const useT = () => {
  const li = useContext(LangCtx)
  return (k, n) => translate(li, k, n)
}


// ===== Đổi chữ để dùng cho cả việc học và việc cá nhân =====
Object.assign(D, {
  sub: ['Quản lý lịch học, công việc và mọi kế hoạch của riêng bạn.', 'Manage your classes, tasks and plans in one place.', 'គ្រប់គ្រងម៉ោងសិក្សា កិច្ចការ និងផែនការរបស់អ្នកនៅកន្លែងតែមួយ។'],

  // Tổng quan: "Hôm nay"
  todayT: ['Hôm nay', 'Today', 'ថ្ងៃនេះ'],
  sToday: ['lịch hôm nay', 'events today', 'កាលវិភាគថ្ងៃនេះ'],
  noClass: ['Hôm nay chưa có lịch nào.', 'Nothing scheduled today.', 'ថ្ងៃនេះមិនទាន់មានកាលវិភាគទេ។'],

  // "Phòng" thành "Địa điểm"
  room: ['Địa điểm', 'Location', 'ទីកន្លែង'],

  // Lịch tuần
  addS: ['Thêm lịch', 'Add an event', 'បន្ថែមកាលវិភាគ'],

  // Môn học thành "Môn / hoạt động" (nhập tự do: Đi chơi, Hẹn hò, Tập gym...)
  course: ['Môn / hoạt động', 'Course / activity', 'មុខវិជ្ជា / សកម្មភាព'],
  tCourse: ['Môn & hoạt động', 'Courses & activities', 'មុខវិជ្ជា និងសកម្មភាព'],
  addC: ['Thêm môn / hoạt động', 'Add a course / activity', 'បន្ថែមមុខវិជ្ជា / សកម្មភាព'],
  cName: ['Tên (ví dụ: Giải tích, Đi chơi, Hẹn hò)', 'Name (e.g. Calculus, Hang out, Date)', 'ឈ្មោះ (ឧ. គណិតវិទ្យា, ទៅលេង, ណាត់ជួប)'],
  sCourse: ['môn / hoạt động', 'courses / activities', 'មុខវិជ្ជា / សកម្មភាព'],
  noCourse: ['Chưa có môn hay hoạt động nào.', 'No courses or activities yet.', 'មិនទាន់មានមុខវិជ្ជា ឬសកម្មភាពទេ។'],
  needC: ['Hãy thêm ít nhất một môn hoặc hoạt động ở tab "Môn & hoạt động" trước.', 'Add at least one course or activity in the "Courses & activities" tab first.', 'សូមបន្ថែមមុខវិជ្ជា ឬសកម្មភាពមួយនៅផ្ទាំង "មុខវិជ្ជា និងសកម្មភាព" ជាមុនសិន។'],
  delW: ['Xóa một mục sẽ xóa luôn lịch, công việc và lịch thi của mục đó.', 'Deleting an item also deletes its events, tasks and exams.', 'ការលុបធាតុមួយ នឹងលុបកាលវិភាគ កិច្ចការ និងការប្រឡងរបស់វាដែរ។'],

  // Bài tập thành "Công việc"
  tTask: ['Công việc', 'Tasks', 'កិច្ចការ'],
  addT: ['Thêm công việc', 'Add a task', 'បន្ថែមកិច្ចការ'],
  title: ['Tên công việc', 'Task name', 'ឈ្មោះកិច្ចការ'],
  due: ['Hạn', 'Due date', 'ថ្ងៃកំណត់'],
  sPend: ['việc chưa xong', 'pending tasks', 'កិច្ចការមិនទាន់ចប់'],
  upT: ['Việc sắp tới', 'Upcoming tasks', 'កិច្ចការជិតមកដល់'],
  noPend: ['Không còn việc nào chưa xong.', 'No pending tasks.', 'គ្មានកិច្ចការមិនទាន់ចប់ទេ។'],
  noTask: ['Chưa có công việc nào. Thêm việc đầu tiên ở trên.', 'No tasks yet. Add your first one above.', 'មិនទាន់មានកិច្ចការទេ។ បន្ថែមកិច្ចការដំបូងខាងលើ។'],
})