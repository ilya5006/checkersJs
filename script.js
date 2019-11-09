class Checker
{
    constructor(type, oneCell)
    {
        this.type = type;
        this.cell = oneCell;
        this._setCheckerInCell();
    }

    makeMove()
    {

    }

    _isMovePossible(x, y)
    {

    }

    _setCheckerInCell()
    {
        this.cell.style.backgroundImage = `url("./img/${this.type}.png")`;
        this.cell.style.backgroundSize = 'cover';
        this.cell.style.backgroundRepeat = 'no-repeat';
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

            // oneCell.addEventListener('click', (event) =>
            // {

            // });

            field.insertAdjacentElement('beforeEnd', oneCell);
        }

        [evenColor, oddColor] = [oddColor, evenColor];
    }
}

let field = document.querySelector('#field');

initAndFillColorsCells(field);