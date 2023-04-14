const fs = require("fs");
const XLSX = require("xlsx");

function testFileRead() {
  const callBackFileRead = (err, data) => {
    if (err) {
      console.log(err);
      return;
    }   

    // filter is for keeping rows where first column is a number
    const rows = data.split('\n').map(row => row.trim().split(/\s+/)).filter(row => /^\d+$/.test(row[0]));   

    // loop through each row
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      
      // check if the third column is 3 digits
      if (row[2].length === 3) {
        // insert an empty column between the 2nd column and 3rd column
        row.splice(2, 0, "");
      }
    }

    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "output.xlsx");
  };

  fs.readFile("0912.TXT", "utf8", callBackFileRead);
}

testFileRead();
