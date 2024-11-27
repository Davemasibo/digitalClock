// Get DOM elements
const clockElement = document.getElementById("clock");
const timezoneElement = document.getElementById("timezone");
const timezoneSelect = document.getElementById("timezone-select");
const toggleFormatButton = document.getElementById("toggle-format");
const toggleThemeButton = document.getElementById("toggle-theme");
const alarmTimeInput = document.getElementById("alarm-time");
const setAlarmButton = document.getElementById("set-alarm");
const alarmMessageElement = document.getElementById("alarm-message");
const reminderTimeInput = document.getElementById("reminder-time");
const reminderMessageInput = document.getElementById("reminder-message");
const setReminderButton = document.getElementById("set-reminder");
const reminderList = document.getElementById("reminder-list");

// Global variables
let is12HourFormat = false;
let alarmTime = null;
let alarmMessage = "";
let reminders = [];

// Function to update the clock display
function updateClock() {
  const now = new Date();

  // Get the selected timezone
  const selectedTimezone = timezoneSelect.value;

  // Update the clock with the current time in the selected timezone
  const options = {
    timeZone: selectedTimezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: is12HourFormat
  };
  const formattedTime = new Intl.DateTimeFormat([], options).format(now);
  clockElement.textContent = formattedTime;

  // Update timezone display
  timezoneElement.textContent = `Time Zone: ${selectedTimezone}`;
  
  // Check if it's time for the alarm
  if (alarmTime && formattedTime === alarmTime) {
    soundAlarm();
    alarmMessageElement.textContent = alarmMessage || "Alarm time reached!";
  }
}

// Function to toggle time format between 12-hour and 24-hour
toggleFormatButton.addEventListener("click", () => {
  is12HourFormat = !is12HourFormat;
  toggleFormatButton.textContent = is12HourFormat ? "Switch to 24-Hour" : "Switch to 12-Hour";
});

// Function to toggle dark theme
toggleThemeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleThemeButton.textContent = document.body.classList.contains("dark-mode") ? "Switch to Light Theme" : "Switch to Dark Theme";
});

// Set alarm functionality
setAlarmButton.addEventListener("click", () => {
  alarmTime = alarmTimeInput.value;
  alarmMessage = "Your alarm is ringing!";
  alarmMessageElement.textContent = `Alarm set for ${alarmTime}`;
});

function soundAlarm() {
  // Use the absolute path to the audio file (adjust according to your system)
  const audio = new Audio("file:///C:\Users\daveMasiboFr\Documents\html\Freesound.mp3")
  // Or for macOS/Linux:);  // For Windows "
  // const audio = new Audio("file:///Users/YourName/Music/alarm-beep.mp3");  

  audio.play(); // Play the alarm sound
  setTimeout(() => {
    audio.pause(); // Stop the sound after 2 seconds
  }, 2000);
}


// Function to set reminders
setReminderButton.addEventListener("click", () => {
  const reminderTime = reminderTimeInput.value;
  const reminderMessage = reminderMessageInput.value;
  if (reminderTime && reminderMessage) {
    reminders.push({ time: reminderTime, message: reminderMessage });
    reminderMessageInput.value = ''; // Clear the input after adding the reminder
    updateReminderList();
  }
});

// Function to update reminder list display
function updateReminderList() {
  reminderList.innerHTML = '';
  reminders.forEach(reminder => {
    const li = document.createElement('li');
    li.textContent = `${reminder.time} - ${reminder.message}`;
    reminderList.appendChild(li);
  });
}

// Periodically update the clock and check alarm
setInterval(updateClock, 1000); // Update every second
