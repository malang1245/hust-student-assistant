import { createContext, useContext } from 'react'

export const LANGS = ['vi', 'en', 'km']
export const LANG_NAMES = { vi: 'Tiếng Việt', en: 'English', km: 'ភាសាខ្មែរ' }

// Mỗi khóa: [Tiếng Việt, English, ភាសាខ្មែរ]. Thêm chuỗi mới ở đây.
export const D={
 edit:['Sửa','Edit','កែប្រែ'],save:['Lưu','Save','រក្សាទុក'],cancel:['Hủy','Cancel','បោះបង់'],
 lang:['Ngôn ngữ','Language','ភាសា'],
 sub:['Quản lý môn học, thời khóa biểu, bài tập và lịch thi. Đang dùng dữ liệu mẫu, bạn có thể sửa hoặc xóa.','Manage courses, timetable, assignments and exams. Sample data is loaded; edit or delete it freely.','គ្រប់គ្រងមុខវិជ្ជា កាលវិភាគ កិច្ចការ និងការប្រឡង។ ទិន្នន័យគំរូត្រូវបានដាក់ជាមុន អ្នកអាចកែ ឬលុបបាន។'],
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
