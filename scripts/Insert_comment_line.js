//----------------------------------------------------------------------------------------------------------------------
//  Author:     Mathieu Hedard
//  Date:       28/12/2017
//  Version:    1.0
//
//----------------------------------------------------------------------------------------------------------------------
//  Description: Scripts allow to add a comment line, it means a line starting with a comment character, and follows
//               by '-' character until maximal column. Comment character is defined according to file extension
//
//----------------------------------------------------------------------------------------------------------------------
// History
//  Version :   Author      :   Date        :   Changes
//  1.0     :   M. Hedard   :   28/12/2017  :   Creation
//  1.1     :   M. Hedard   :   28/12/2017  :   Add a check on column position
//----------------------------------------------------------------------------------------------------------------------

// Call the main function
main();

//-----------------------------------------
// Function main
//  Main function which execute the process
//-----------------------------------------
function main() {
    // Process the function only if document is not empty
    if (UltraEdit.document.length > 0) {

        // Variable declaration
        var len_max = 120;
        var i = 0;
        var line = "";
        var line_comment = "#";
        var start = UltraEdit.activeDocument.currentColumnNum;

        // Get current column mode
        var column_mode = UltraEdit.columnMode;

        // Deactivate column mode
        UltraEdit.columnModeOff();
        UltraEdit.insertMode();

        // For PERL files (extenstion : pl or pm)
        if (UltraEdit.activeDocument.isExt("pl") || UltraEdit.activeDocument.isExt("pm")) {
            line_comment = "#";
        // For VHDL files (extenstion : vhd)
        } else if ( UltraEdit.activeDocument.isExt("vhd")) {
            line_comment = "--";
        // For Verilog/SystemVerilog files (extenstion : v or sv)
        } else if (UltraEdit.activeDocument.isExt("v") || UltraEdit.activeDocument.isExt("sv")) {
            line_comment = "//";
        // For Javascript
        } else if ( UltraEdit.activeDocument.isExt("js")) {
            line_comment = "//";
        // Default
        } else {
            line_comment = "--";
        }

        // BEGIN V1.1
        // Construct line. If selected line started on column 1, the comment character is added, else comment character
        // is defined to blanck
        if ( start == 1 ) {
            line += line_comment;
        } else {
            line_comment = "";
        }
        // END V1.1

        for ( i = start; i <= ( len_max - line_comment.length ); i++ ) {
           line += "-";
        }

        // Write line in file
        UltraEdit.activeDocument.write( line );

        // Restore column mode if was previous true
        if ( column_mode ) {
            UltraEdit.columnModeOn;
        }
    }
}