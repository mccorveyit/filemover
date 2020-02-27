// Requiring Smartsheet routing and file system
const fs = require('fs-extra')
require('dotenv').config();
const ss = require('./config/ss');

// Request Smartsheet document by ID
// Select Row by No start date & Check

module.exports.put = async () => {

    let sheet = await ss.sheets.getSheet({ id: '6487517416449924' });

    let dateCreatedColumnId = sheet.columns.find(column => column.title === "Date Created").id;
    let projectNumberColumnId = sheet.columns.find(column => column.title === "Project Number").id;
    let projectNameColumnId = sheet.columns.find(column => column.title === "Project Name").id;
    let checkedBoxColumnId = sheet.columns.find(column => column.title === "Project Approved").id;
    let companyNameColumnId = sheet.columns.find(column => column.title === "Company").id;

    let blankAndCheckedRows = sheet.rows.filter(row => {
        const dateCreatedCell = row.cells.find(cell => cell.columnId === dateCreatedColumnId)
        const checkedBoxCell = row.cells.find(cell => cell.columnId === checkedBoxColumnId)
        const checkedBoxCellValue = checkedBoxCell.value
        const dateCreatedCellValue = dateCreatedCell.value
        if ((dateCreatedCellValue) || !(checkedBoxCellValue)) {
            return false
        }
        else {
            return true
        }
    });
    for (const blankRow of blankAndCheckedRows) {
        const projectNumber = blankRow.cells.find(cell => cell.columnId === projectNumberColumnId).value
        const projectName = blankRow.cells.find(cell => cell.columnId === projectNameColumnId).value
        const companyName = blankRow.cells.find(cell => cell.columnId === companyNameColumnId).value
        const fileName = projectNumber + " - " + projectName

        const targetFolder = 'C:/Users/gposell/' + companyName;
        const folderDestination = 'C:/Users/gposell/' + fileName;
        fs.copySync(targetFolder, folderDestination);

        // Get today's date
        var today = new Date().toISOString();
        const dateUpdatedCell = blankRow.cells.find(cell => cell.columnId === dateCreatedColumnId)
        dateUpdatedCell.value = today

        const updatedRow = {
            cells: [dateUpdatedCell],
            id: blankRow.id
        }
        await ss.sheets.updateRow({ sheetId: sheet.id, body: updatedRow })
    }
}
module.exports.put();
