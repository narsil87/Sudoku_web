// Setup game
window.onload = function () {
    LoadMainGrid();
}

//M

function SudokuGrid() {
    this.RowColumn_Count = 9;
    this.AllBlocks = [];
    this.AllBoxes = [];

    // Setup blocks and boxes
    for (var block_id = 0; block_id < this.RowColumn_Count; ++block_id) {
        var block = new SudokuBlock(block_id);

        // Add boxes to block
        for (var box_id = 0; box_id < this.RowColumn_Count; ++box_id) {
            var box = new SudokuBox(box_id, block);
            // Add box to block
            block.Boxes.push(box);
            // Add to all boxes
            this.AllBoxes.push(box);
        }
        // Add block to Blocks
        this.AllBlocks.push(block);
    }
}

function SudokuBox(id, block) {
    this.Id = id;
    this.Block = block;
    this.HtmlElement = null;
    this.UniqueId = this.Id + '_' + this.Block.Id;

    this.Value = 0;
}
// Updates the HTML element to display the current value
SudokuBox.prototype.UpdateValue = function () {
    if (this.HtmlElement == null)
        return;

    this.HtmlElement.innerHTML = this.Value;
};



function SudokuBlock(id) {
    this.Id = id;
    this.Boxes = [];
}

//get coordinate of cell and changes the cell value
function GetCellCoord(cell) {
    var x = cell.cellIndex;
    var y =cell.parentNode.rowIndex;
    document.getElementById("DisCelCoor").innerHTML = y + "_" + x;
    cell.innerHTML = cell.cellIndex;
    box.HtmlElement = cell[i];
}
// Get a random 
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
var rowCount = 9;
var cellCoount = 9;
var rows = [];
var cells = [];

var rowIdx;
var cellIdx;
var newRow;
var newCell;
var cellCord;
// Game Init
function LoadMainGrid() {
    var mainGrid = document.getElementById('mainGrid');
    var sudoGrid = new SudokuGrid();

    // Create table view
    for (rowIdx = 0; rowIdx < sudoGrid.RowColumn_Count; rowIdx++) {
        // New <tr>
        newRow = document.createElement('tr');
       
        // Set Block style
        if ((rowIdx + 1) % 3 == 0)
            newRow.setAttribute('class', 'tr_border');


        // Create <td>'s
        for (cellIdx = 0; cellIdx < sudoGrid.RowColumn_Count; cellIdx++) {
            newCell = document.createElement('td');
            //m
            newCell.id = rowIdx + '_' + cellIdx;
            cellCord = newCell.id;
            //m
            newCell.innerHTML = getRandomInt(1, 10);
            //m
            //get coordinate of cell and changes the cell value
            newCell.onclick = function (e) {
                GetCellCoord(this);
            }
            newRow.appendChild(newCell);
            cells.push(newCell);
        }
        //matbe
        rows.push(newRow);
        mainGrid.appendChild(newRow);
        
    }
}


 //Link Model 
for (var blockIdx = 0; blockIdx < sudoGrid.AllBlocks.length; blockIdx++) {
    var block = sudoGrid.AllBlocks[blockIdx];

    for (var boxIdx = 0; boxIdx < block.Boxes.length; boxIdx++) {
        var box = sudoGrid.AllBoxes[boxIdx];
        //box.HtmlElement = ??;
        box.Value = 3;
        box.UpdateValue();
    }
}

var Beginning, Intermediate, Difficult;


/*  END GAME LOGIC  */

var cells = document.getElementById('tr')