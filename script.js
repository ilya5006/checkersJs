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
            case 'whiteChecker':
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
}

let makeMove = (event) =>
{
    event.target.classList.remove('possibleMove');
    event.target.classList.add('brown');
    event.target.classList.add(choseChecker.checker);
    event.target.removeEventListener('click', makeMove);
}

let allIsPosibleToMoveCells = (checker, field) =>
{
    let checkerPosition = checker.cell.dataset.position;
    checkerPosition = checkerPosition.split(' ');
    checkerPosition = checkerPosition.map((coordinate) => { return parseInt(coordinate); });

    let cells = [];

    for (let i = checkerPosition[1] - 1; i < checkerPosition[1] + 2; i++)
    {
        for (let j = checkerPosition[0] - 1; j < checkerPosition[0] + 2; j++)
        {
            try // Beacuse we can out of range
            {
                let cell = field.querySelector(`div[data-position="${j} ${i}"]`);
                let isPossibleToMove = cell.classList.contains('brown') && !cell.classList.contains('whiteChecker') && 
                                      !cell.classList.contains('whiteQueen') && !cell.classList.contains('black') && 
                                      !cell.classList.contains('blackQueen');

                if (isPossibleToMove) cells.push(cell);
            }
            catch (e)
            {
                null;
            }
        }
    }

    return cells;
}

let showMovement = (cells) =>
{
    cells.forEach((cell) =>
    {
        cell.classList.add('possibleMove');
        cell.classList.remove('brown');
    });
}

let findBrownCellsWithoutChecker = (field) =>
{
    let brownCellsWithoutChecker = [];

    let cells = field.querySelectorAll('div');

    cells.forEach((cell) =>
    {
        let isChecker = cell.classList.contains('whiteChecker') || cell.classList.contains('black') || cell.classList.contains('whiteQueen') || cell.classList.contains('blackQueen');
        let isBrown = cell.classList.contains('brown');
        if (!isChecker && isBrown) brownCellsWithoutChecker.push(cell);
    });

    return brownCellsWithoutChecker;
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
                checkers.push(new Checker('whiteChecker', oneCell));
                
            if (isCellBrown && i > 4)
                checkers.push(new Checker('black', oneCell));

            field.insertAdjacentElement('beforeEnd', oneCell);
        }

        [evenColor, oddColor] = [oddColor, evenColor];
    }

    return checkers;
}

let field = document.querySelector('#field');

let choseChecker = null;

let checkers = initCellsAndCheckers(field);

let brownCellsWithoutChecker = findBrownCellsWithoutChecker(field);

let cellsForMovement = [];

checkers.forEach((checker) =>
{
    checker.cell.addEventListener('click', (event) =>
    {
        choseChecker = checker;
        
        // cellsForMovement.forEach((cell) =>
        // {
        //     cell.removeEventListener('click', makeMove);
        //     cell.classList.remove('possibleMove');
        //     cell.classList.add('brown');
        // });

        cellsForMovement = allIsPosibleToMoveCells(choseChecker, field);
        showMovement(cellsForMovement);

        cellsForMovement.forEach((cell) =>
        {
            cell.addEventListener('click', makeMove);
        });
    });
});