class Checker
{
    constructor(type, cell)
    {
        this.cell = cell;
        this.checker = type;
    }

    set checker(checkerType)
    {
        this.checkerType = checkerType;
        switch (this.checkerType)
        {
            case 'blackChecker':
                this.cell.classList.add('blackChecker');
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

let checkerWaitMove = (event, checker) =>
{
    choseChecker = checker;
    cellsForMovement = allIsPosibleToMoveCells(choseChecker, field);
    showMovement(cellsForMovement);

    cellsForMovement.forEach((cell) =>
    {
        
        cell.addEventListener('click', makeMove.bind(this));
    });
}

let findAndRemoveElementFromArray = (array, elementToRemove) =>
{
    let elementIndex = array.findIndex((element) =>
    {
        return (element == elementToRemove);
    });

    if (elementIndex != -1)
    {
        array.splice(elementIndex, 1);
    }
}

let addPossibilityToMove = () =>
{
    checkers.forEach((checker) =>
    {
        checker.cell.addEventListener('click', checkerWaitMove.bind(this, null, checker));
    });
}

let makeMove = (event) =>
{
    console.log(choseChecker);
    choseChecker.cell.removeEventListener('click', checkerWaitMove);
    event.target.classList.remove('possibleMove');
    event.target.classList.add('brownBG');
    event.target.classList.add(choseChecker.checker);

    checkers.push(new Checker(choseChecker.checker, event.target));
    findAndRemoveElementFromArray(checkers, choseChecker);
    addPossibilityToMove();

    cellsForMovement.forEach((cell) =>
    {
        cell.classList.remove('possibleMove');
        cell.classList.add('brownBG');
        cell.removeEventListener('click', makeMove);
    });
    
    choseChecker.cell.classList.remove(choseChecker.checker);
    brownCellsWithoutChecker = findBrownCellsWithoutChecker(field);
}

let allIsPosibleToMoveCells = (checker, field) =>
{
    let checkerPosition = checker.cell.dataset.position;
    checkerPosition = checkerPosition.split(' ').map((coordinate) => { return parseInt(coordinate); });

    let cells = [];

    for (let i = checkerPosition[1] - 1; i < checkerPosition[1] + 2; i++)
    {
        for (let j = checkerPosition[0] - 1; j < checkerPosition[0] + 2; j++)
        {
            try // Beacuse we can out of range
            {
                let cell = field.querySelector(`div[data-position="${j} ${i}"]`);
                let isPossibleToMove = cell.classList.contains('brownBG') && !cell.classList.contains('whiteChecker') && 
                                      !cell.classList.contains('whiteQueen') && !cell.classList.contains('blackChecker') && 
                                      !cell.classList.contains('blackQueen');

                if (isPossibleToMove) cells.push(cell);
            }
            catch (e) { null; }
        }
    }

    return cells;
}

let showMovement = (cells) =>
{
    cells.forEach((cell) =>
    {
        cell.classList.add('possibleMove');
        cell.classList.remove('brownBG');
    });
}

let findBrownCellsWithoutChecker = (field) =>
{
    let brownCellsWithoutChecker = [];

    let cells = field.querySelectorAll('div');

    cells.forEach((cell) =>
    {
        let isChecker = cell.classList.contains('whiteChecker') || 
                        cell.classList.contains('blackChecker') || 
                        cell.classList.contains('whiteQueen') || 
                        cell.classList.contains('blackQueen');
                        
        let isBrown = cell.classList.contains('brownBG');
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
    let evenColor = 'brownBG'; // Чётное
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
                checkers.push(new Checker('blackChecker', oneCell));

            field.insertAdjacentElement('beforeEnd', oneCell);
        }

        [evenColor, oddColor] = [oddColor, evenColor];
    }

    return checkers;
}

let field = document.querySelector('#field');

let choseChecker = null;

let checkers = initCellsAndCheckers(field);

let cellsForMovement = [];

let brownCellsWithoutChecker = findBrownCellsWithoutChecker(field);

addPossibilityToMove();