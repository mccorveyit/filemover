const fs = require('fs-extra')
require('dotenv').config();
const ss = require('./config/ss');


// Request Smartsheet document by ID
// Select Row by No start date & Check

module.exports.put = async () => {
    // Find Smartsheet document
    let sheet = await ss.sheets.getSheet({ id: '6487517416449924' });
    debugger;
    // Find the column "Date Created"
    let dateCreatedColumnId = sheet.columns.find(column => column.title === "Date Created").id;
    let projectNumberColumnId = sheet.columns.find(column => column.title === "Project Number").id;
    let projectNameColumnId = sheet.columns.find(column => column.title === "Project Name").id;
    let checkedBoxColumnId = sheet.columns.find(column => column.title === "Project Approved").id;
    let companyNameColumnId = sheet.columns.find(column => column.title === "Company").id;
    
    const columnIds = sheet.columns.reduce((accumulation, column) => ({
        ...accumulation,
        [column.title]: column.id
    }), {})// ex) columnIds['Date Created']

    console.log(dateCreatedColumnId)
    // Find the row where it is empty at 16
    // let blankRows = sheet.rows.filter(row => 
    //     ! row.cells.find(cell => cell.columnId === dateCreatedColumnId).value    
    // );


    let blankAndCheckedRows = sheet.rows.filter(row => {

        const dateCreatedCell = row.cells.find(cell => cell.columnId === dateCreatedColumnId)
        const checkedBoxCell = row.cells.find(cell => cell.columnId === checkedBoxColumnId)
        const checkedBoxCellValue = checkedBoxCell.value
        const dateCreatedCellValue = dateCreatedCell.value
        if ((dateCreatedCellValue) || !(checkedBoxCellValue)){
            return false
        }
        else {
            return true
        }
    });

    //for cosnt of 
    for (const blankRow of blankAndCheckedRows) {
        const projectNumber = blankRow.cells.find(cell => cell.columnId === projectNumberColumnId).value
        const projectName = blankRow.cells.find(cell => cell.columnId === projectNameColumnId).value
        const projectDateCreated = blankRow.cells.find(cell => cell.columnId === dateCreatedColumnId).value
        const companyName = blankRow.cells.find(cell => cell.columnId === companyNameColumnId).value

        // const getProjectName = blank.cells[]
        debugger
        // fileName variable
        // const targetFolderName = 
        const fileName = projectNumber + " - " + projectName
        console.log(fileName)

        const targetFolder = 'C:/Users/gposell/' + companyName;
        const folderDestination = 'C:/Users/gposell/' + fileName;
        fs.copySync(targetFolder, folderDestination);

        // Get today's date
        var today = new Date().toISOString();
        // var dd = String(today.getDate()).padStart(2, '0');
        // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        // var yyyy = today.getFullYear();

        // today = mm + '/' + dd + '/' + yyyy;
        console.log(today)
        const dateUpdatedCell = blankRow.cells.find(cell => cell.columnId === dateCreatedColumnId)

        dateUpdatedCell.value = today

        const updatedRow = {
            cells: [dateUpdatedCell],
            id: blankRow.id
        }




        await ss.sheets.updateRow({ sheetId: sheet.id, body: updatedRow })



        debugger;
    }

}
module.exports.put();

// const updatedRow2 = {
//     cells: blankRow.cells
//         .map(cell => cell.columnId === dateCreatedColumnId && { value: today, columnId: cell.columnId })
//         .filter(a => a),
//     id: blankRow.id
// }


// Use Company name to find folder
// Copy Folder & Rename with Project Number - Project Name
// Find Target Folder
// Paste folder


//fs.readdir(testFolder, (err, files) => {
//  if (err) return console.log(err);
//  files.forEach(file => {
//     console.log(file);
//  });
//});