//----------------------------------------------------------------------------------------------------------------------
//  Author:     Mathieu Hedard
//  Date:       28/12/2017
//  Version:    1.0
//
//----------------------------------------------------------------------------------------------------------------------
//  Description: Scripts allow to add comment characters at the end of line. Comment character is defined according
//               to file extension
//
//----------------------------------------------------------------------------------------------------------------------
// History
//  Version :   Author      :   Date        :   Changes
//  1.0     :   M. Hedard   :   28/12/2017  :   Creation
//
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
        var line_term = "--";

        // Get the first column
        var start = UltraEdit.activeDocument.currentColumnNum;

        // Get current column mode
        var column_mode = UltraEdit.columnMode;

        // Deactivate column mode
        UltraEdit.columnModeOff();
        UltraEdit.insertMode();

        // Define comment character according to file extension
        // For VHDL files (extension : vhd)
        if (UltraEdit.activeDocument.isExt("vhd")) {
            line_term = "--";
        // For PERL files (extension : pl or pm)
        } else if (UltraEdit.activeDocument.isExt("pl") || UltraEdit.activeDocument.isExt("pm")) {
            line_term = "#";
        // For BATCH files (extension : bat)
        } else if (UltraEdit.activeDocument.isExt("bat")) {
            line_term = "#";
        // For Text files (extension : txt)
        } else if (UltraEdit.activeDocument.isExt("txt")) {
            line_term = "#";
        // Default case
        } else {
            line_term = "#";
        }

        // Process lines: add space until last character
        for (i = start; i <= len_max - line_term.length; i++) {
           line += " ";
        }
        line += line_term;

        // Write line to file
        UltraEdit.activeDocument.write( line );

        // Restore column mode if was previous true
        if ( column_mode ) {
            UltraEdit.columnModeOn;
        }
    }
}