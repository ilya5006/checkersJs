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

/**
 * Creating cells(divs) white and brown colors
 * @param {DOMElement} field - DIV where will creating cells
 * @returns {array} - Array which contains cells with checkers
 */
let initCellsAndCheckers = (field) =>
{
    let evenColor = 'brown'; // Чётное
    let oddColor = 'whiteBG'; // Нечётное
    let checkers = [];
    
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

            let isLineEven = (i + 1) % 2 == 0;
            let isLineOdd = (i + 1) % 2 == 1;

            let isCellEven = (j + 1) % 2 == 0;
            let isCellOdd = (j + 1) % 2 == 1;

            let isCellBrown = ( (isLineOdd && isCellEven) || (isLineEven && isCellOdd) );

            if (isCellBrown && i < 3)
                checkers.push(new Checker('white', oneCell));
                
            if (isCellBrown && i > 4)
                checkers.push(new Checker('black', oneCell));

            field.insertAdjacentElement('beforeEnd', oneCell);
        }

        [evenColor, oddColor] = [oddColor, evenColor];
    }

    return checkers;
}

let field = document.querySelector('#field');

initCellsAndCheckers(field);

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