import NavigationBar from "./components/NavigationBar"
import LoginScreen from "./Screens/LoginScreen"
import RegistrationScreen from "./Screens/RegistrationScreen"
import Dashboard from './components/Dashboard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CourseEdit from './Screens/CourseEdit'
import AddCourseScreen from './Screens/AddCourseScreen'
import Faculty from './components/Faculty'
import AddAdmin from './Screens/AddAdmin'
import FacultyEditScreen from "./Screens/FacultyEditScreen"
import StudentScreen from "./Screens/StudentScreen"
import CoursesScreen from './Screens/CoursesScreen'
import StudentEdit from "./components/StudentEdit"
import FacultyLog from "./components/FacultyLog"
import Example from "./Screens/example"
import CourseStudentScreen from "./Screens/CourseStudentScreen"
import StudentReportScreen from "./Screens/StudentReportScreen"
import CreateReportScreen from './Screens/CreateReportScreen'
import StudentReport from "./Screens/StudentReport"
import SingleStudentReport from './Screens/SingleStudentReport'
function App() {
  return (
    <Router>
      <NavigationBar/>
      <Routes>
        <Route path='/dashboard' exact element={<Dashboard/>} />
        <Route path='/' element={<LoginScreen/>} />
        <Route path='/register' element={<RegistrationScreen/>} />
        <Route path='/addcourse' element={<AddCourseScreen/>} />
        <Route path='/editCourses/:id' element={<CourseEdit/>} />
        <Route path='/department' element={<Faculty/>} />
        <Route path='/addadmin' element={<AddAdmin/>} />
        <Route path='/editfaculty/:id' element={<FacultyEditScreen/>} />
        <Route path='/student' element={<StudentScreen/>} />
        <Route path='/courses' element={<CoursesScreen/>} />
        <Route path='/attendance' element={<FacultyLog/>} />
        <Route path='/editstudent/:id' element={<StudentEdit/>} />
        <Route path='/report/:id' element={<CreateReportScreen/>} />
        <Route path='/faculty/studentreport' element={<StudentReportScreen/>} />
        <Route path='/studentreport' element={<StudentReport/>} />
        <Route path='/singlestudentreport' element={<SingleStudentReport/>} />
        <Route path='/faculty/student' element={<CourseStudentScreen/>} />
        <Route path='/example' element={<Example/>} />
      </Routes>
    </Router>
  )
}

export default App
