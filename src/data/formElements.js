export const form = document.querySelector('.form');
export const formFieldsetType = document.querySelector('.form__fieldset_type');
export const formFieldsetDate = document.querySelector('.form__fieldset_date');
export const formFieldsetClient = document.querySelector('.form__fieldset_client');
export const formReset = form.querySelector('.form__reset');
export const formResetTitle = formReset.querySelector('.form__reset-title');
export const formBtnReset = formReset.querySelector('.form__reset-btn');

export const formFieldsets = [formFieldsetType, formFieldsetDate, formFieldsetClient];

export const formButtons = {
  prev: document.querySelector('.form__btn_prev'),
  next: document.querySelector('.form__btn_next'),
  submit: document.querySelector('.form__btn_submit')
};

export const formTime = document.querySelector('.form__time');
export const typesRadioWrapper = document.querySelector('.form__radio-wrapper_type');
export const daysRadioWrapper = document.querySelector('.form__radio-wrapper_day');
export const timesRadioWrapper = document.querySelector('.form__radio-wrapper_time');
export const formMonthsWrapper = document.querySelector('.form__months');
export const formInfoType = document.querySelector('.form__info_type');
export const formInfoData = document.querySelector('.form__info_data');


export const dataToWrite = {
  dataType: {},
  day: '',
  time: '',
}
