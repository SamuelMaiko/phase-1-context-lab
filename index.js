/* Your Code Here */
function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(array => createEmployeeRecord.call(this, array));
  }
  
  function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
  
    employeeRecord.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour),
      date: date
    });
  
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
  
    employeeRecord.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt(hour),
      date: date
    });
  
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    const timeInHour = timeInEvent.hour;
    const timeOutHour = timeOutEvent.hour;
  
    const hoursWorked = (timeOutHour - timeInHour) / 100;
  
    return hoursWorked;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate.call(this, employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
    const wagesEarned = hoursWorked * payRate;
  
    return wagesEarned;
  }
  
//   function allWagesFor(employeeRecord) {
//     const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
//     const totalWages = datesWorked.reduce(function(total, date) {
//       return total + wagesEarnedOnDate.call(this, employeeRecord, date);
//     }.bind(this), 0);
  
//     return totalWages;
//   }
  
  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce(function(total, employeeRecord) {
      return total + allWagesFor.call(this, employeeRecord);
    }.bind(this), 0);
  
    return totalPayroll;
  }
  

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

