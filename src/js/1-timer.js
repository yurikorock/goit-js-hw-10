import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const btnStart = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
// console.log(btnStart);
btnStart.disabled = true;

// перевірка валідної дати в календарі
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    const selectedDate = selectedDates[0];

    if (!selectedDate || selectedDate.getTime() < Date.now()) {
      // window.alert('"Please choose a date in the future"');
      iziToast.show({
        icon: 'fa-regular fa-circle-xmark',
        iconColor: ' rgb(199, 198, 198)',
        imageWidth: 50,
        message: 'Please choose a date in the future',
        messageColor: 'white',
        backgroundColor: '#ef4040',
        position: 'topRight',
        class: 'custom-toast',
      });
      btnStart.disabled = true;
      return;
    } else {
      userSelectedDate = selectedDate;
      btnStart.disabled = false;
    }
  },
});

//запуск таймера
btnStart.addEventListener('click', () => {
  btnStart.disabled = true;
  input.disabled = true;

  let timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = userSelectedDate - currentTime;

    if (deltaTime <= 0) {
      clearInterval(timerId);
      updateTimerUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      input.disabled = false;
      return;
    }

    const timeComponents = convertMs(deltaTime);
    updateTimerUI(timeComponents);
  }, 1000);
});

// функція підрахунку значень
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// функція оновлення інтерфейсу
function updateTimerUI({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}

// функція форматує значення і додає ноль в інтерфейс

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
