var student = require("./Student.js");
var teacher = require("./Teacher.js");
function add (teacherName,students) {
	teacher.add(teacherName);
	students.forEach(function each(name,index) {
		student.add(name);
	});
}
exports.add = add;