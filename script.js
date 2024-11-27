const clockElement = document.getElementById("clock");
const timezoneElement = document.getElementById("timezone");
const timezoneSelect = document.getElementById("timezone-select");
const toggleFormatButton = document.getElementById("toggle-format");
const toggleThemeButton = document.getElementById("toggle-theme");
const alarmInput = document.getElementById("alarm-time");
const setAlarmButton = document.getElementById("set-alarm");
const alarmMessageElement = document.getElementById("alarm-message");
const reminderInput = document.getElementById("reminder-time");
const reminderMessageInput = document.getElementById("reminder-message");
const setReminderButton = document.getElementById("set-reminder");
const reminderList = document.getElementById("reminder-list");

let is24HourFormat = true; // Start with 24-hour format
let currentTimeZone = "UTC"; // Default timezone
let alarmTime = null; // Alarm time
let reminders = []; // List of reminders

/**
 * Updates the clock every second.
 */
function updateClock() {
    const now = new Date();
    const options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !is24HourFormat,
        timeZone: currentTimeZone,
    };
    const timeString = now.toLocaleTimeString("en-US", options);
    clockElement.textContent = timeString;
    timezoneElement.textContent = `Time Zone: ${currentTimeZone}`;

    // Check if the alarm matches the current time
    if (alarmTime && timeString.startsWith(alarmTime)) {
        alert("Alarm ringing!");
        alarmTime = null; // Reset the alarm
        alarmMessageElement.textContent = "";
    }

    // Check reminders
    reminders.forEach((reminder, index) => {
        if (timeString.startsWith(reminder.time)) {
            alert(`Reminder: ${reminder.message}`);
            reminders.splice(index, 1); // Remove the reminder
            updateReminderList();
        }
    });
}

/**
 * Toggle between 24-hour and 12-hour formats.
 */
toggleFormatButton.addEventListener("click", () => {
    is24HourFormat = !is24HourFormat;
    toggleFormatButton.textContent = is24HourFormat ? "Switch to 12-Hour" : "Switch to 24-Hour";
});

/**
 * Change the current time zone.
 */
timezoneSelect.addEventListener("change", (event) => {
    currentTimeZone = event.target.value;
});

/**
 * Toggle between light and dark themes.
 */
toggleThemeButton.addEventListener("click", () => {
    const isDarkMode = document.body.classList.toggle("dark");
    toggleThemeButton.textContent = isDarkMode ? "Switch to Light Theme" : "Switch to Dark Theme";
});

/**
 * Set an alarm.
 */
setAlarmButton.addEventListener("click", () => {
    alarmTime = alarmInput.value;
    if (alarmTime) {
        alarmMessageElement.textContent = `Alarm set for ${alarmTime}`;
    }
});

/**
 * Set a reminder.
 */
setReminderButton.addEventListener("click", () => {
    const reminderTime = reminderInput.value;
    const reminderMessage = reminderMessageInput.value;

    if (reminderTime && reminderMessage) {
        reminders.push({ time: reminderTime, message: reminderMessage });
        updateReminderList();
        reminderInput.value = "";
        reminderMessageInput.value = "";
    }
});

/**
 * Update the reminder list display.
 */
function updateReminderList() {
    reminderList.innerHTML = reminders
        .map((reminder) => `<li>${reminder.time} - ${reminder.message}</li>`)
        .join("");
}

// Start updating the clock
setInterval(updateClock, 1000);
updateClock(); // Initial call to display the time immediately
