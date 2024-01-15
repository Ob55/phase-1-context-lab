/* Your Code Here */
// index.js

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
    });
    return employee;
  }
  
  function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
    });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100; // Assuming time in and out are on the same day
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employee, date), 0);
  }
  
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }
  
  function calculatePayroll(arrayOfEmployees) {
    return arrayOfEmployees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
  }
  
  
  
  const employeeData = [
    ["John", "Doe", "Developer", 25],
    ["Jane", "Doe", "Designer", 30],
  ];
  
  const employees = createEmployeeRecords(employeeData);
  
  createTimeInEvent(employees[0], "2024-01-15 0900");
  createTimeOutEvent(employees[0], "2024-01-15 1700");
  
  console.log(hoursWorkedOnDate(employees[0], "2024-01-15")); // Output: 8
  console.log(wagesEarnedOnDate(employees[0], "2024-01-15")); // Output: 200
  console.log(allWagesFor(employees[0])); // Output: 200
  
  const foundEmployee = findEmployeeByFirstName(employees, "Jane");
  console.log(foundEmployee); // Output: Employee record for Jane
  
  const totalPayroll = calculatePayroll(employees);
  console.log(totalPayroll); // Output: Total payroll for all employees
  