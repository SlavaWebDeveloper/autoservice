export function createRadioInput(name, value, id) {
  const radioInput = document.createElement('input');
  radioInput.className = 'radio__input';
  radioInput.type = 'radio';
  radioInput.name = name;
  radioInput.id = id;
  radioInput.value = value;
  return radioInput;
}

export function createRadioLabel(id, title) {
  const radioLabel = document.createElement('label');
  radioLabel.className = 'radio__label';
  radioLabel.htmlFor = id;
  radioLabel.textContent = title;
  return radioLabel;
}

export function createRadioBtns(wrapper, name, data) {
  wrapper.textContent = '';
  data.forEach(item => {
    const radioDiv = document.createElement('div');
    radioDiv.className = 'radio';

    const radioInput = createRadioInput(name, item.value, item.value);
    const radioLabel = createRadioLabel(item.value, item.title);

    radioDiv.append(radioInput, radioLabel);
    wrapper.append(radioDiv);
  })
}
