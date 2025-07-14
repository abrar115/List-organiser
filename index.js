const item = document.querySelector('#list')
const enter = document.querySelector('.enter')
const del = document.querySelector('.delete')
const input = document.querySelector('.c1')
const container = document.querySelector('.container')
const form = document.querySelector('.form-container')


let div

names = [];
amounts = [];
let customclass = 0; 

enter.addEventListener('click', addCheckbox);

item.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();  // Prevent form submission or default Enter behavior
    addCheckbox();
  }
});


function addCheckbox() {
  const fileList = item.value.trim().split(/\s+/);
  let currentNames = [];
  let currentAmount = null;

  fileList.forEach((e) => {
    if (!isNaN(parseFloat(e))) {
      currentAmount = parseFloat(e);
    } else {
      currentNames.push(e);
    }
  });

  if (currentAmount === null) {
    currentAmount = 1;
  }

  const combinedName = currentNames.join('-');

  names.push(combinedName);
  amounts.push(currentAmount);

  const labelText = `${combinedName} - ${currentAmount}x`;

  customclass++;

  div = `
    <div class="form-container dynamic-checkbox ab${customclass}">
      <label class="label" for="check${customclass}">${labelText}</label>
      <input class="c1 inline" type="checkbox" id="check${customclass}" name="cl${customclass}">
    </div>`;

  container.insertAdjacentHTML('beforeend', div);

  const checkbox = document.querySelector(`#check${customclass}`);

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      const parentDiv = checkbox.closest('.form-container');
      if (parentDiv) parentDiv.remove();

      const label = parentDiv.querySelector('label').textContent;
      const nameFromLabel = label.split(' - ')[0];
      const indexToRemove = names.indexOf(nameFromLabel);
      if (indexToRemove !== -1) {
        names.splice(indexToRemove, 1);
        amounts.splice(indexToRemove, 1);
      }

      console.log(names);
      console.log(amounts);
    }
  });

  item.value = "";
}


del.addEventListener('click', () => {
  names.pop();
  amounts.pop();
  console.log(names);
  console.log(amounts);

 
  const last = container.querySelector('.dynamic-checkbox:last-of-type');
  if (last) {
    last.remove();
  }
});

 
