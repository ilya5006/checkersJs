let initAndFillColorsCells = (field) =>
{
    let white = '#faf8dd';
    let brown = '#662c17';
    
    let evenColor = brown; // Чётное
    let oddColor = white; // Нечётное
    
    for (let i = 1; i <= 64; i++)
    {
        let oneCell = document.createElement('div');
    
        if (i % 2 == 1)
            oneCell.style.backgroundColor = oddColor;
        else
            oneCell.style.backgroundColor = evenColor;
    
        if (i % 8 == 0) [evenColor, oddColor] = [oddColor, evenColor];
        
        field.insertAdjacentElement('beforeEnd', oneCell);
    }
}

let field = document.querySelector('#field');

initAndFillColorsCells(field);