const dateInput = document.getElementById("date");
const calcBtn = document.getElementById("calc-btn");
const result = document.getElementById("result");

// no future birthdays allowed
dateInput.max = new Date().toISOString().split("T")[0];

// how many days in a month (month is 1-12)
// day 0 of the next month gives the last day of this one
function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function calculateAge() {
    if (!dateInput.value) {
        result.textContent = "Pick your birth date first";
        return;
    }

    // the input gives "2000-03-15", so just split it up
    const [birthYear, birthMonth, birthDay] = dateInput.value.split("-").map(Number);

    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth() + 1;
    const nowDay = now.getDate();

    let years = nowYear - birthYear;
    let months = nowMonth - birthMonth;
    let days = nowDay - birthDay;

    // birthday day not reached yet, borrow from last month
    if (days < 0) {
        months--;

        let lastMonth = nowMonth - 1;
        let lastMonthYear = nowYear;

        if (lastMonth === 0) {
            lastMonth = 12;
            lastMonthYear--;
        }

        days += daysInMonth(lastMonthYear, lastMonth);
    }

    // birthday month not reached yet, borrow from the year
    if (months < 0) {
        months += 12;
        years--;
    }

    result.textContent = `You are ${years} years, ${months} months and ${days} days old`;
}

calcBtn.addEventListener("click", calculateAge);