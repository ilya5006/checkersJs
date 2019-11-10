class Checker
{
    constructor(type, cell)
    {
        this.cell = cell;
        this.checker = type;
    }

    set checker(value)
    {
        this.checkerType = value;

        this.cell.style.backgroundImage = `url("./img/${this.checkerType}.png")`;
        this.cell.style.backgroundSize = 'cover';
        this.cell.style.backgroundRepeat = 'no-repeat';
    }

    get checker()
    {
        return this.checkerType;
    }

    makeMove()
    {

    }

    _isMovePossible(x, y)
    {

    }
}

let initAndFillColorsCells = (field) =>
{
    let white = 'rgb(250, 248, 221)';
    let brown = 'rgb(102, 44, 23)';

    let evenColor = brown; // Чётное
    let oddColor = white; // Нечётное
    
    for (let i = 0; i < 8; i++)
    {
        for (let j = 0; j < 8; j++)
        {
            let oneCell = document.createElement('div');
            oneCell.dataset.position = `${j} ${i}`;

            if ((j + 1) % 2 == 1)
                oneCell.style.backgroundColor = oddColor;
            else
                oneCell.style.backgroundColor = evenColor;

            if (oneCell.style.backgroundColor == brown && i < 3)
                new Checker('white', oneCell);
            if (oneCell.style.backgroundColor == brown && i > 4)
                new Checker('black', oneCell);

            field.insertAdjacentElement('beforeEnd', oneCell);
        }

        [evenColor, oddColor] = [oddColor, evenColor];
    }
}

let field = document.querySelector('#field');

initAndFillColorsCells(field);

let cells = document.querySelectorAll('#field div');

cells.forEach((cell) =>
{
    // cell.addEventListener('mouseover', (event) =>
    // {
    //     event.target.style.backgroundColor = 'grey';
    // });

    // cell.addEventListener('mouseout', (event) =>
    // {
    //     event.target.style.backgroundColor = 'grey';
    // });

});