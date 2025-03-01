// Напиши скрипт, який після сабміту форми створює проміс. В середині колбека цього промісу через вказану користувачем кількість мілісекунд проміс має виконуватися (при fulfilled) або відхилятися (при rejected), залежно від обраної опції в радіокнопках. Значенням промісу, яке передається як аргумент у методи resolve/reject, має бути значення затримки в мілісекундах.

// Створений проміс треба опрацювати у відповідних для вдалого/невдалого виконання методах.

// Якщо проміс виконується вдало, виводь у консоль наступний рядок, де delay — це значення затримки виклику промісу в мілісекундах.

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');

const btnSubmit = document.querySelector('button[type="submit"]');

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

form.addEventListener('submit', event => {
  // console.log('Button pushed');
  event.preventDefault();

  let delay = Number(inputDelay.value);
  // console.log('delayValue:', delay);

  const inputRadio = document.querySelector('input[name="state"]:checked');
  let state = inputRadio.value;
  // console.log('stateValue:', state);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  // console.log(promise); // Об'єкт промісу

  promise
    .then(value => {
      // console.log(value); // `✅ Fulfilled promise in ${delay}ms`
      iziToast.show({
        imageWidth: 50,
        message: `✅ Fulfilled promise in ${delay}ms`,
        messageColor: 'white',
        backgroundColor: '#59a10d',
        position: 'topRight',
        class: 'custom-toast',
      });
    })
    .catch(error => {
      // console.log(error); // `❌ Rejected promise in ${delay}ms`
      iziToast.show({
        imageWidth: 50,
        message: `❌ Rejected promise in ${delay}ms`,
        messageColor: 'white',
        backgroundColor: '#ef4040',
        position: 'topRight',
        class: 'custom-toast',
      });
    });
  form.reset();
});
