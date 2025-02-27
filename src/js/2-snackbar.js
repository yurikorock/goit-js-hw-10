// Напиши скрипт, який після сабміту форми створює проміс. В середині колбека цього промісу через вказану користувачем кількість мілісекунд проміс має виконуватися (при fulfilled) або відхилятися (при rejected), залежно від обраної опції в радіокнопках. Значенням промісу, яке передається як аргумент у методи resolve/reject, має бути значення затримки в мілісекундах.

// Створений проміс треба опрацювати у відповідних для вдалого/невдалого виконання методах.

// Якщо проміс виконується вдало, виводь у консоль наступний рядок, де delay — це значення затримки виклику промісу в мілісекундах.

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');

const btnSubmit = document.querySelector('button[type="submit"]');

let delayValue;
let stateValue;

form.addEventListener('submit', event => {
  console.log('Button pushed');
  event.preventDefault();

  delayValue = inputDelay.value;
  console.log('delayValue:', delayValue);

  const inputRadio = document.querySelector('input[name="state"]:checked');
  stateValue = inputRadio.value;
  console.log('stateValue:', stateValue);
});
