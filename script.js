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
        switch (this.checkerType)
        {
            case 'black':
                this.cell.classList.add('black');
                break;
            case 'white':
                this.cell.classList.add('whiteChecker');
                break;
            case 'whiteQueen':
                this.cell.classList.add('whiteQueen');
                break;
            case 'blackQueen':
                this.cell.classList.add('blackQueen');
                break;
        }
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
    let brown = 'rgb(102, 44, 23)';

    let evenColor = 'brown'; // Чётное
    let oddColor = 'whiteBG'; // Нечётное
    
    for (let i = 0; i < 8; i++)
    {
        for (let j = 0; j < 8; j++)
        {
            let oneCell = document.createElement('div');
            oneCell.dataset.position = `${j} ${i}`;

            if ((j + 1) % 2 == 1)
                oneCell.classList.add(oddColor);
            else
                oneCell.classList.add(evenColor);

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