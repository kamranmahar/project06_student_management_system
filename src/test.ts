
// const inquirer = require('inquirer');

// const students = ['Alice', 'Bob', 'Charlie'];
// const coursesByStudent = {
//   Alice: ['Math', 'Science'],
//   Bob: ['History', 'English'],
//   Charlie: ['Physics', 'Chemistry'],
// };

// const studentQuestion = {
//   type: 'list',
//   name: 'student',
//   message: 'Select a student:',
//   choices: students,
// };

// const courseQuestion = {
//   type: 'list',
//   name: 'course',
//   message: 'Select a course:',
//   when: (answers) => answers.student, // Show this question when student is selected
//   choices: (answers) => coursesByStudent[answers.student] || [],
// };

// inquirer.prompt([studentQuestion, courseQuestion]).then((answers) => {
//   console.log('Selected Student:', answers.student);
//   console.log('Selected Course:', answers.course);
// });