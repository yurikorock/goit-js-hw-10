const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

document.addEventListener('DOMContentLoaded', () => {
  const savedData = localStorage.getItem(localStorageKey);

  if (savedData) {
    const parsedData = JSON.parse(savedData);
    formData.email = parsedData.email || '';
    formData.message = parsedData.message || '';

    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  }
});

form.addEventListener('input', event => {
  const fieldName = event.target.name;
  const fieldValue = event.target.value.trim();

  formData[fieldName] = fieldValue;
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Дані форми:', formData);

  localStorage.removeItem(localStorageKey);
  form.reset();

  formData.email = '';
  formData.message = '';
});

// form.addEventListener('submit', evt => {
//   evt.preventDefault();
//   console.log(evt.target.elements.email.value);
//   console.log(evt.target.elements.message.value);
//   localStorage.removeItem(localStorageKey);
//   form.reset();
// });

// form.addEventListener('submit', onFormSubmit);

// function onFormSubmit(event) {
//   event.preventDefault();
//   console.log(event.target.elements);
// }
