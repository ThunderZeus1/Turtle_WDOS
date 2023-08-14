const monthYearElement = document.getElementById('monthYear');
const calendarDaysElement = document.getElementById('calendarDays');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentDate = new Date();

function renderCalendar() {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayIndex = firstDay.getDay();

    monthYearElement.innerText = currentDate.toLocaleString('en-us', { month: 'long', year: 'numeric' });

    let html = '';

    for (let i = 0; i < startDayIndex; i++) {
        html += '<div></div>';
    }

    for (let i = 1; i <= daysInMonth; i++) {
        html += `<div class="day">${i}</div>`;
    }

    calendarDaysElement.innerHTML = html;

    const days = document.getElementsByClassName('day');
    for (let day of days) {
        day.addEventListener('click', handleDayClick);
    }
}

function handleDayClick(event) {
    const selectedDay = event.target;

    if (selectedDay.classList.contains('booked')) {
      
        return;
    }

    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(selectedDay.innerText));
    const now = new Date();

    if (selectedDate < now) {
        
        return;
    }

    const activeDay = document.querySelector('.day.active');
    if (activeDay) {
        activeDay.classList.remove('active');
    }

    selectedDay.classList.add('active');

    
}

prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();

let ticketTypes = {
    "SL adult": 0,
    "SL child": 0,
    "foreign adult": 0,
    "foreign child": 0,
    "infant": 0
};

function bookTickets() {
    ticketTypes["SL adult"] = parseInt(document.getElementById("sl-adult").value);
    ticketTypes["SL child"] = parseInt(document.getElementById("sl-child").value);
    ticketTypes["foreign adult"] = parseInt(document.getElementById("foreign-adult").value);
    ticketTypes["foreign child"] = parseInt(document.getElementById("foreign-child").value);
    ticketTypes["infant"] = parseInt(document.getElementById("infant").value);

    updateAvailableTickets();
}

function updateAvailableTickets() {
    const ticketList = document.getElementById("ticket-list");
    ticketList.innerHTML = "";

    for (const ticketType in ticketTypes) {
        const quantity = ticketTypes[ticketType];
        const ticketItem = document.createElement("p");
        ticketItem.innerText = `${ticketType}: ${quantity}`;
        ticketList.appendChild(ticketItem);
    }
}


function bookTickets() {
    // Get user inputs
    const slAdultQty = parseInt(document.getElementById("sl-adult").value);
    const slChildQty = parseInt(document.getElementById("sl-child").value);
    const foreignAdultQty = parseInt(document.getElementById("foreign-adult").value);
    const foreignChildQty = parseInt(document.getElementById("foreign-child").value);
    const infantQty = parseInt(document.getElementById("infant").value);
    const selectedTime = document.getElementById("timeSelector").value;
    
    // Calculate prices based on selected time
    let slAdultPrice = 4;
    let slChildPrice = 2;
    let foreignAdultPrice = 10;
    let foreignChildPrice = 5;
    const infantPrice = 0;
    
    if (selectedTime === "9AM - 10AM" || selectedTime === "5PM - 6PM") {
        slAdultPrice = 6;
        slChildPrice = 3;
        foreignAdultPrice = 13;
        foreignChildPrice = 8;
    }
    
    const totalPrice = (slAdultQty * slAdultPrice) + (slChildQty * slChildPrice) +
                      (foreignAdultQty * foreignAdultPrice) + (foreignChildQty * foreignChildPrice);
    
    // Update the summary table
    const summaryTable = document.getElementById("summaryTable").getElementsByTagName("tbody")[0];
    summaryTable.innerHTML = ""; // Clear previous rows
    
    if (slAdultQty > 0) addSummaryRow(summaryTable, "SL Adult", slAdultQty, slAdultPrice);
    if (slChildQty > 0) addSummaryRow(summaryTable, "SL Child", slChildQty, slChildPrice);
    if (foreignAdultQty > 0) addSummaryRow(summaryTable, "Foreign Adult", foreignAdultQty, foreignAdultPrice);
    if (foreignChildQty > 0) addSummaryRow(summaryTable, "Foreign Child", foreignChildQty, foreignChildPrice);
    if (infantQty > 0) addSummaryRow(summaryTable, "Infant", infantQty, infantPrice);
    
    // Update total price
    document.getElementById("totalPrice").textContent = totalPrice + " US";
    localStorage.setItem("TotalPrice", totalPrice);
    // You can also display the selected time in the summary if needed
    localStorage.setItem("SelectedTime",selectedTime);
    localStorage.setItem("selectedDateLocal",selectedDateLocal);
}

// Rest of the code remains the same...
    // You can also display the selected time in the summary if needed


// Helper function to add a row to the summary table
function addSummaryRow(table, item, quantity, price) {
    const newRow = table.insertRow();
    newRow.insertCell(0).textContent = item;
    newRow.insertCell(1).textContent = quantity;
    newRow.insertCell(2).textContent = (price * quantity) + " US";
}
document.addEventListener("DOMContentLoaded", function () {
    const timeSelector = document.getElementById("timeSelector");
    
    const selectedTimeElement = document.getElementById("selectedTime");
    
    timeSelector.addEventListener("change", function () {
        const selectedTime = timeSelector.value;

        selectedTimeElement.textContent = selectedTime !== "" ? ": " + selectedTime : "";
    });
});

    document.addEventListener("DOMContentLoaded", function () {
        const calendarDays = document.getElementById("calendarDays");
        const monthYear = document.getElementById("monthYear");
        const selectedDateElement = document.getElementById("selectedDate");
        
        // Initialize the calendar
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();
        
        // Function to update the calendar
        function updateCalendar(year, month) {
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            // Clear the calendar days
            calendarDays.innerHTML = "";
            
            // Populate the calendar with days
            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement("div");
                dayElement.textContent = day;
                
                // Disable past dates
                if (year < currentYear || (year === currentYear && month < currentMonth) || (year === currentYear && month === currentMonth && day < currentDay)) {
                    dayElement.classList.add("past-date");
                } else {
                    dayElement.addEventListener("click", function () {
                        const selectedDate = new Date(year, month, day);
                        calendarDays.setAttribute("data-selected-date", selectedDate.toISOString());
                        monthYear.textContent = selectedDate.toLocaleString("default", { month: "long", year: "numeric" });
                        selectedDateElement.textContent = "Selected Date: " + selectedDate.toDateString();
                    
                    });
                }
                
                calendarDays.appendChild(dayElement);
                
            }
            
            // Update the month and year in the header
            monthYear.textContent = currentDate.toLocaleString("default", { month: "long", year: "numeric" });
        }
        
        updateCalendar(currentYear, currentMonth);
        
        // Handle navigation buttons
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");
        
        prevBtn.addEventListener("click", function () {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateCalendar(currentDate.getFullYear(), currentDate.getMonth());
        });
        
        nextBtn.addEventListener("click", function () {
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateCalendar(currentDate.getFullYear(), currentDate.getMonth());
        });
        
        
        
    });
   