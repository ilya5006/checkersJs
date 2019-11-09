let field = document.querySelector('#field');

for (let i = 1; i <= 64; i++)
{
    let oneCell = document.createElement('div');
    field.insertAdjacentElement('beforeEnd', oneCell);
}