import inquirer from "inquirer";
var studentStatus;
(function (studentStatus) {
    studentStatus[studentStatus["resgitered"] = 0] = "resgitered";
    studentStatus[studentStatus["enrolled"] = 1] = "enrolled";
})(studentStatus || (studentStatus = {}));
var paymentStatus;
(function (paymentStatus) {
    paymentStatus[paymentStatus["unpaid"] = 0] = "unpaid";
    paymentStatus[paymentStatus["paid"] = 1] = "paid";
})(paymentStatus || (paymentStatus = {}));
class course {
    name;
    fee;
    constructor(name, _fee) {
        this.name = name;
        this.fee = _fee;
    }
    addCourse(_name, _fee) {
        let obj = new course(_name, _fee);
        courselist.push(obj);
    }
    static getCourse(name) {
        return courselist.find((obj) => obj.name == name);
    }
    static getCourses() {
        return courselist;
    }
}
class enrollStudent {
    student;
    course;
    fee;
    paid;
    paymentStatus;
    constructor(student, course, fee, status, paid) {
        this.student = student;
        this.course = course;
        this.fee = fee;
        this.paymentStatus = status;
        this.paid = paid;
    }
    enroll(enroll) {
        enrolledList.push(enroll);
    }
    static getEnrolledStudentswithCourses() {
        return enrolledList;
    }
    static getEnrolledStudentCourse(id, cousrename) {
        return enrolledList.find((obj) => obj.student._StudentId == id && obj.course.name == cousrename);
    }
    static getEnrolledStudentCourses(id, ispaid) {
        if (ispaid != undefined)
            return enrollStudent.getEnrolledStudentswithCourses().filter((obj) => obj.student._StudentId == id && obj.paymentStatus == ispaid);
        return enrolledList.filter((obj) => obj.student._StudentId == id);
    }
    addEnrollStudent(studentid, course, fee, _paymentStatus) {
        let _student = studentList.find((obj) => {
            return obj._StudentId = studentid;
        });
        let _course = courselist.find((obj) => {
            return obj.name = course;
        });
        let paidamount = 0;
        if (_paymentStatus == paymentStatus.paid)
            paidamount = _course.fee;
        let enrolledStudent = new enrollStudent(_student, _course, _course.fee == 0 ? _course.fee : 0, _paymentStatus, paidamount);
        enrolledList.push(enrolledStudent);
    }
    static updateCoursePayment(id, cousrename) {
        if (enrollStudent.getEnrolledStudentswithCourses().filter((obj) => obj.student._StudentId == id && obj.course.name == cousrename).length > 0) {
            enrollStudent.getEnrolledStudentCourse(id, cousrename).paid = course.getCourse(cousrename).fee;
        }
        console.log("Payment made Suucessfully");
    }
}
class student {
    name;
    _StudentId;
    courseEnrollList;
    status;
    constructor(_name) {
        this.name = _name;
        this._StudentId = "PAIC" + Math.floor(Math.random() * 1000);
        this.status = studentStatus.resgitered;
    }
    addstudent(obj) {
        studentList.push(obj);
        //console.log(obj);
    }
    static getStudent(id) {
        let students = studentList.find((obj) => obj._StudentId == id);
        //console.log(students);
        return students;
    }
    static updatestatus(id, status) {
        student.getStudent(id).status = status;
    }
    static getStudents() {
        return studentList;
    }
    static viewBalance(id) {
        let balance = 0;
        enrollStudent.getEnrolledStudentCourses(id).forEach((obj) => { balance += obj.fee - obj.paid; });
        return balance;
    }
    static getenrolledCourse(id, ispaid) {
        let balance = 0;
        if (ispaid == paymentStatus.unpaid)
            return enrollStudent.getEnrolledStudentCourses(id).filter((obj) => obj.paymentStatus == ispaid);
        return enrollStudent.getEnrolledStudentCourses(id);
    }
    static showstatus() {
        let objs = [];
        this.getStudents().forEach((obj1) => {
            let courselist = [];
            let balance = 0;
            enrollStudent.getEnrolledStudentCourses(obj1._StudentId).forEach((objEnrolled) => {
                console.log(balance),
                    courselist.push(objEnrolled.course.name),
                    balance += objEnrolled.fee - objEnrolled.paid;
            });
            objs.push({ name: obj1.name, id: obj1._StudentId, cousrelst: courselist, balance: balance });
        });
        return objs;
    }
}
let courselist = [];
let studentList = [];
let enrolledList = [];
let execute = async () => {
    let options = await inquirer.prompt([
        {
            name: "option",
            type: "list",
            message: "Please Select option ",
            choices: [
                "Add Course", "Add Student", "Enroll Course", "View Balance", "Pay Fee", "View Details", "Exit"
            ],
        }
    ]);
    let currentOption = options.option;
    if (currentOption == "Add Course") {
        let options = await inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "Please Provide Course Name"
            },
            {
                name: "fee",
                type: "number",
                message: "Please Provide Fee"
            },
        ]);
        let courseobj = new course(options.name, options.fee);
        courseobj.addCourse(courseobj.name, courseobj.fee);
        continueAgain();
    }
    else if (currentOption == "Add Student") {
        let options = await inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "Please Provide Student Name"
            }
        ]);
        let obj = new student(options.name);
        obj.addstudent(obj);
        continueAgain();
    }
    else if (currentOption == "View Balance") {
        let lststudent = [];
        student.getStudents().forEach((obj) => {
            lststudent.push(obj._StudentId);
        });
        let options = await inquirer.prompt([
            {
                name: "_StudentId",
                type: "list",
                message: "Please Select Course ",
                choices: lststudent,
            }
        ]);
        //console.log(options._StudentId);
        console.log(`Student ${student.getStudent(options._StudentId).name} current balance is :${student.viewBalance(options._StudentId)}`);
        continueAgain();
    }
    else if (currentOption == "Enroll Course") {
        // console.log(courselist);
        // console.log(studentList);
        let lstcourse = [];
        let lststudent = [];
        course.getCourses().forEach((obj) => {
            lstcourse.push(obj.name);
        });
        student.getStudents().forEach((obj) => {
            lststudent.push(obj._StudentId);
        });
        let options = await inquirer.prompt([
            {
                name: "name",
                type: "list",
                message: "Please Select Course ",
                choices: lstcourse,
            },
            {
                name: "_StudentId",
                type: "list",
                message: "Please Select Course ",
                choices: lststudent,
            },
            {
                name: "paymentconfim",
                type: "confirm",
                message: "Do You Want to PayNow?",
            }
        ]);
        //console.log(options);
        if ((student.getStudent(options._StudentId)._StudentId != "") && (course.getCourse(options.name).name != "")) {
            //if(options.paymentconfim)
            let payment = 0;
            let paytStatus = paymentStatus.unpaid;
            let fee = course.getCourse(options.name).fee;
            if (options.paymentconfim) {
                payment = course.getCourse(options.name).fee;
                paytStatus = paymentStatus.paid;
            }
            let paymentstatus = studentStatus.enrolled;
            student.updatestatus(options._StudentId, paymentstatus);
            let studentobj = student.getStudent(options._StudentId);
            let courseobj = course.getCourse(options.name);
            //console.log(studentobj,courseobj);
            let enroll = new enrollStudent(studentobj, courseobj, fee, paytStatus, payment);
            enroll.enroll(enroll);
        }
        continueAgain();
        // let obj=new student(options.name);    
        // obj.addstudent(obj);
        // continueAgain();
    }
    else if (currentOption == "View Details") {
        console.log('View Students');
        console.log("===============Course List=====================");
        courselist.forEach((obj) => {
            console.log(obj.name, obj.fee);
        });
        console.log("===============Student List=====================");
        studentList.forEach((obj) => {
            console.log(obj._StudentId, obj.name);
        });
        console.log("===============Enrolled Student List=====================");
        enrollStudent.getEnrolledStudentswithCourses().forEach((obj) => {
            console.log(obj.student._StudentId, obj.student.name, obj.course.name, obj.course.fee, obj.paid, obj.fee - obj.paid);
        });
        console.log("===============shows Status List=====================");
        const json = JSON.parse(JSON.stringify(student.showstatus()));
        console.log(json);
        continueAgain();
    }
    else if (currentOption == "Pay Fee") {
        let lstcourse = [];
        let lststudent = [];
        let estudents = [];
        student.getStudents().forEach((obj) => {
            lststudent.push(obj._StudentId);
        });
        enrollStudent.getEnrolledStudentswithCourses().forEach((obj) => {
            estudents.push({ student: obj.student.name, cousre: obj.course.name });
        });
        let options = await inquirer.prompt([
            {
                name: "_StudentId",
                type: "list",
                message: "Please Select Student ",
                choices: lststudent,
            }
        ]);
        enrollStudent.getEnrolledStudentCourses(options._StudentId, paymentStatus.unpaid).forEach((obj) => lstcourse.push(obj.course.name));
        let Courseoptions = await inquirer.prompt([
            {
                name: "name",
                type: "list",
                message: "Please Select Course ",
                //when: (answers) => answers._StudentId,
                choices: lstcourse,
            }
        ]);
        course.getCourse(options.name);
        enrollStudent.updateCoursePayment(options._StudentId, Courseoptions.name);
        console.log(` ${student.getStudent(options._StudentId).name} Your Remaing Payment is :${student.viewBalance(options._StudentId)}`);
        continueAgain();
    }
    if (currentOption == "Exit") {
    }
};
let continueAgain = async () => {
    let { again } = await inquirer.prompt([{
            name: "again",
            type: 'checkbox',
            message: "Do you want to Continue?",
            choices: [
                "Yes", "No"
            ],
            default: false,
        }]);
    if (again == "Yes") {
        execute();
    }
};
execute();
