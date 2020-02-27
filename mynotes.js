const columnIds = sheet.columns.reduce((accumulation, column) => ({
    ...accumulation,
    [column.title]: column.id
}), {})// ex) columnIds['Date Created']

 // Find the row where it is empty at 16
    // let blankRows = sheet.rows.filter(row => 
    //     ! row.cells.find(cell => cell.columnId === dateCreatedColumnId).value    
    // );

    const projectDateCreated = blankRow.cells.find(cell => cell.columnId === dateCreatedColumnId).value

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