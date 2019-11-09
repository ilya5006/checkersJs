let field = document.querySelector('#field');

// Creating cells and events for change background
for (let i = 1; i <= 64; i++)
{
    let oneCell = document.createElement('div');
    field.insertAdjacentElement('beforeEnd', oneCell);
}