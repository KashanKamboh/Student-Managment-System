import inquirer from "inquirer";
// Define the student class
class student {
    static counter = 1000;
    name;
    id;
    courses;
    balance;
    constructor(name) {
        this.name = name;
        this.id = student.counter++;
        this.courses = [];
        this.balance = 100;
    }
    // methode to enroll a student in the courses
    enroll_course(course) {
        this.courses.push(course);
    }
    // methode to view a student balance
    view_balance() {
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }
    //Methode to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} Fees paid successfully for ${this.name}`);
    }
    // Methode to display student status
    view_status() {
        console.log(`id : ${this.id}`);
        console.log(`name : ${this.name}`);
        console.log(`balance : ${this.balance}`);
        console.log(`courses : ${this.courses}`);
    }
}
// Define the student_manager class to manage student
class student_manager {
    students;
    constructor() {
        this.students = [];
    }
    //Methode to add a new student
    add_student(name) {
        let students = new student(name);
        this.students.push(students);
        console.log(`student: ${name} added successfully. student ID : ${students.id}`);
    }
    //Methode to enroll student in a course
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} Enrolled in ${course} successfully`);
        }
    }
    //Methode to view a students balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(`Student not found. Please enter a correct student ID`);
        }
    }
    //Method to pay student fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log(`Student not found. Please enter a correct student ID`);
        }
    }
    // Method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_status();
        }
    }
    //Method to find a student by student_id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
// Main function to run the program
async function main() {
    console.log("Welcome to `CodeWithKashaf` - Student Managment System");
    console.log("-".repeat(50));
    // While loop to keep programe running
    let Student_manager = new student_manager();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "Choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit",
                ],
            }
        ]);
        //Using switch case to handle user choice
        switch (choice.Choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a student name",
                    }
                ]);
                Student_manager.add_student(name_input.name);
                break;
            case "Enroll student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name",
                    }
                ]);
                Student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                Student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay",
                    }
                ]);
                Student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                Student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
// Calling the main Function
main();
