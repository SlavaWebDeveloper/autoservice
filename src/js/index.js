import { fetchData, postData } from "./api";

const data = await fetchData();

import { allMonths } from "../data/data";
import { createRadioBtns } from "./radioUtils";
import * as constant from "../data/formElements";


const currentMonth = new Intl.DateTimeFormat("ru-RU", { month: 'long' }).format(new Date(),);
let month = currentMonth;

let currentStep = 0;

const showResultData = () => {
  const currentYear = new Date().getFullYear();
  const monthIndex = allMonths.findIndex(item => item === month);

  const dateString = `${currentYear}-${(monthIndex + 1).toString().padStart(2, "0")}-${constant.dataToWrite.day.toString().padStart(2, "0")}T${constant.dataToWrite.time}`;

  const dateObj = new Date(dateString);

  const formattedDate = dateObj.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
  })

  constant.formInfoType.textContent = constant.dataToWrite.dataType.title;
  constant.formInfoData.innerHTML = `
    <span class="form__info-data-day">${formattedDate}</span>
    <span class="form__info-data-time">${constant.dataToWrite.time}</span>
  `
  constant.formInfoData.datatime = new Date(dateString).toISOString();
}

const updateFieldsetVisibility = (currentStep) => {
  constant.formFieldsets.forEach((fieldset, index) => {
    if (index === currentStep) {
      fieldset.classList.add('form__fieldset-active');
      if (index === constant.formFieldsets.length - 1) {
        showResultData();
      }
    } else {
      fieldset.classList.remove('form__fieldset-active');
    }
  });

  const isPrevStep = currentStep > 0;
  const isLastStep = currentStep === constant.formFieldsets.length - 1;

  constant.formButtons.prev.style.display = isPrevStep ? '' : 'none';
  constant.formButtons.next.style.display = isLastStep ? 'none' : '';
  constant.formButtons.submit.style.display = isLastStep ? '' : 'none';
};

const createFormDay = (date) => {
  const objectMonth = date.find(item => item.month === month);
  const days = Object.keys(objectMonth.day);
  const typeData = days.map(item => ({
    value: item,
    title: item,
  }));

  createRadioBtns(constant.daysRadioWrapper, 'day', typeData);
}

const createFormMonth = (months) => {
  constant.formMonthsWrapper.textContent = '';

  const buttonsMonth = months.map(item => {
    const btn = document.createElement('button');
    btn.className = 'form__btn-month';
    btn.type = 'button';
    btn.textContent = `${item[0].toUpperCase()}${item.substring(1).toLowerCase()}`;

    if (item === month) {
      btn.classList.add('form__btn-month_active')
    }
    return btn;
  })

  constant.formMonthsWrapper.append(...buttonsMonth);

  buttonsMonth.forEach(btn => {
    btn.addEventListener('click', ({ target }) => {
      constant.formButtons.next.disabled = true;

      if (target.classList.contains('form__btn-month_active')) {
        return;
      };

      constant.formTime.style.display = 'none';

      buttonsMonth.forEach(btn => {
        btn.classList.remove('form__btn-month_active');
      });

      target.classList.add('form__btn-month_active');

      month = target.textContent.toLowerCase();

      // Обновляем дни для нового месяца
      const date = data.find(item => item.type === constant.dataToWrite.dataType.type).date;
      createFormDay(date);
    })
  })
}

const createFormTime = (date, day) => {
  const objectMonth = date.find(item => item.month == month);
  const days = objectMonth.day;
  const daysData = days[day].map(item => ({
    value: `${item}:00`,
    title: `${item}:00`,
  }))

  createRadioBtns(constant.timesRadioWrapper, 'time', daysData);
  constant.formTime.style.display = 'block';
}

const handelInputForm = ({ currentTarget, target }) => {
  if (currentTarget.type.value && currentStep === 0) {
    constant.formButtons.next.disabled = false;

    const typeObject = data.find(item => item.type === currentTarget.type.value)

    constant.dataToWrite.dataType.type = typeObject.type;
    constant.dataToWrite.dataType.title = typeObject.title;

    const date = typeObject.date;
    const months = date.map(item => item.month);

    createFormMonth(months);
    createFormDay(date);
  }

  if (createFormTime) {
    if (currentTarget.day.value && target.name === "day") {
      constant.dataToWrite.day = currentTarget.day.value;

      const date = data.find(item => item.type === constant.dataToWrite.dataType.type).date;
      createFormTime(date, constant.dataToWrite.day);
    }

    if (
      currentTarget.day.value &&
      currentTarget.time.value &&
      target.name === "time"
    ) {
      constant.dataToWrite.time = currentTarget.time.value;
      constant.formButtons.next.disabled = false;
    }
  }

  if (currentStep === 2) {
    const inputs = constant.formFieldsetClient.querySelectorAll('.form__input');
    let allFilled = true;

    inputs.forEach(input => {
      if (input.value.trim() === '') {
        allFilled = false;
      }
    })
    constant.formButtons.submit.disabled = !allFilled;
  }
}

const renderTypeFieldset = () => {
  const typeData = data.map(item => ({
    value: item.type,
    title: item.title,
  }));

  createRadioBtns(constant.typesRadioWrapper, 'type', typeData)
}

const init = () => {
  constant.formButtons.next.disabled = true;

  constant.form.addEventListener('click', event => {
    if (event.target === constant.formButtons.next && currentStep < constant.formFieldsets.length - 1) {
      currentStep++;
      updateFieldsetVisibility(currentStep);
      constant.formButtons.next.disabled = true;
      constant.formButtons.submit.disabled = true;
    } else if (event.target === constant.formButtons.prev && currentStep > 0) {
      currentStep--;
      updateFieldsetVisibility(currentStep);
      constant.formButtons.next.disabled = false;
      constant.formButtons.submit.disabled = false;
    }
  });

  constant.form.addEventListener('input', handelInputForm);

  updateFieldsetVisibility(currentStep);
  renderTypeFieldset();

  const resetForm = () => {
    constant.formReset.classList.add('visually-hidden');
    constant.formResetTitle.textContent = '';

    currentStep = 0;
    updateFieldsetVisibility(currentStep);
    constant.form.reset();
  };

  constant.form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(constant.form);

    const formDataObject = Object.fromEntries(formData);
    formDataObject.month = month;

    postData(formDataObject)
      .then(() => {

        constant.formReset.classList.remove('visually-hidden');
        constant.formResetTitle.textContent = 'Данные отправлены!';
        console.log('Данные отправлены');

        constant.formBtnReset.addEventListener('click', resetForm);
      })
      .catch(error => {
        constant.formReset.classList.remove('visually-hidden');
        constant.formResetTitle.textContent = 'Данные не отправлены, попробуйте позже';
        console.error(`Ошибка при отправке данных: ${error}`);

        constant.formBtnReset.addEventListener('click', resetForm);
      });

  })
}

init();