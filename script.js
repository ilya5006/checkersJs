let field = document.querySelector('#field');
let pickBlocks = document.querySelectorAll('.pickBlock');
let pickedBlock = pickBlocks[0];
let cleanUpBlock = document.querySelector('#block7');


for (let i = 0; i < 6; i++)
{
    pickBlocks[i].style.backgroundImage = `url("./img/sprite${i + 1}.png")`;
}

document.querySelector('#chose').style.backgroundImage = pickBlocks[0].style.backgroundImage;

// Creating cells and events for change background
for (let i = 1; i <= 48; i++)
{
    let oneCell = document.createElement('div');
    field.insertAdjacentElement('beforeEnd', oneCell);
    oneCell.addEventListener('click', (event) =>
    {
        if (pickedBlock == cleanUpBlock)
            event.target.style.backgroundImage = 'none';
        else
            event.target.style.backgroundImage = pickedBlock.style.backgroundImage;
    });
}

pickBlocks.forEach((block) =>
{
    block.addEventListener('click', (event) =>
    {
        pickedBlock = event.target;
        document.querySelector('#chose').style.backgroundImage = pickedBlock.style.backgroundImage;
    });
});