let setChecker = (oneCell, checker) =>
{
    oneCell.style.backgroundImage = `url("./img/${checker}.png")`;
    oneCell.style.backgroundSize = 'cover';
    oneCell.style.backgroundRepeat = 'no-repeat';
}

let initAndFillColorsCells = (field) =>
{
    let white = 'rgb(250, 248, 221)';
    let brown = 'rgb(102, 44, 23)';

    let evenColor = brown; // Чётное
    let oddColor = white; // Нечётное
    
    for (let i = 1; i <= 64; i++)
    {
        let oneCell = document.createElement('div');
    
        if (i % 2 == 1)
            oneCell.style.backgroundColor = oddColor;
        else
            oneCell.style.backgroundColor = evenColor;

        if (oneCell.style.backgroundColor == brown && i <= 24)
            setChecker(oneCell, 'white');
        if (oneCell.style.backgroundColor == brown && i >= 41)
            setChecker(oneCell, 'black');

        if (i % 8 == 0) [evenColor, oddColor] = [oddColor, evenColor];
        
        field.insertAdjacentElement('beforeEnd', oneCell);
    }
}

let field = document.querySelector('#field');

initAndFillColorsCells(field);