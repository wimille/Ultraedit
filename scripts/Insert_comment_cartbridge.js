//----------------------------------------------------------------------------------------------------------------------
//  Author:     Mathieu Hedard
//  Date:       28/12/2017
//  Version:    1.0
//
//----------------------------------------------------------------------------------------------------------------------
//  Description: Scripts allow to add a cartbridge around the selected text. This cartbridge is defined according
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
function main () {

    // Process the function only if document is not empty and lines are selected
    if (( UltraEdit.document.length > 0 ) && ( UltraEdit.activeDocument.isSel() )) {

        // Get current column mode
        var column_mode = UltraEdit.columnMode;

        // Deactivate column mode
        UltraEdit.columnModeOff();

        // Variable declaration
        var comment_txt   = UltraEdit.activeDocument.selection;
        var comment_len   = comment_txt.length;
        var comment_start = 1;
        var line          = "";
        var tab           = "";
        var line_comment  = "#";

        // Get line terminator
        if ( UltraEdit.activeDocument.lineTerminator == 0 ) {
            var line_Terminator = "\r\n";
        } else {
            var line_Terminator = "\n";
        }

        // Get column start : selection column - selection length
        comment_start = UltraEdit.activeDocument.currentColumnNum - comment_len;

        // For PERL files (extenstion : pl or pm)
        if (UltraEdit.activeDocument.isExt("pl") || UltraEdit.activeDocument.isExt("pm")) {
            line_comment = "#";
        // For VHDL files (extenstion : vhd)
        } else if ( UltraEdit.activeDocument.isExt("vhd")) {
            line_comment = "--";
        // For Verilog/SystemVerilog files (extenstion : v or sv)
        } else if (UltraEdit.activeDocument.isExt("sv") || UltraEdit.activeDocument.isExt("v")) {
            line_comment = "//";
        }

        // Tab value according to column start
        for (i = 1; i < comment_start; i++) {
            tab += " ";
        }

        // Print line 1 : comment character + ' ' + N * '-' + ' ' + comment character + line terminator
        line += line_comment;
        for (i = 0; i < ( comment_len + 2 ); i++) {
           line += "-";
        }
        line += line_comment;
        line += line_Terminator;

        // Print line 2 : space + comment character + ' ' + comment + ' ' + comment character + line terminator
        line += tab + line_comment + " " + comment_txt + " " + line_comment + line_Terminator;

        // Print line 1 : space + comment character + ' ' + N * '-' + ' ' + comment character
        line += tab;
        line += line_comment;
        for (i = 0; i < ( comment_len + 2 ); i++) {
           line += "-";
        }
        line += line_comment;

        // Print cartbridge
        UltraEdit.activeDocument.write( line );

        // Restore column mode if was previous true
        if ( column_mode ) {
            UltraEdit.columnModeOn;
        }
    }
}