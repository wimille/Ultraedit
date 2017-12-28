//----------------------------------------------------------------------------------------------------------------------
//  Author:     Mathieu Hedard
//  Date:       28/12/2017
//  Version:    1.0
//
//----------------------------------------------------------------------------------------------------------------------
//  Description: Scripts allow to add a specific character at the end of the selected lines.
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

    UltraEdit.outputWindow.write( "Debug : " );
    UltraEdit.outputWindow.write( "     longueur  : " + UltraEdit.document.length );

    // Process the function only if document is not empty and lines are selected
    if (( UltraEdit.document.length > 0 ) && ( UltraEdit.activeDocument.isSel() )) {
        // Variables declaration
        var sign_to_add = "";
        var i = 0;
        var s = 0;
        var resultArr = new Array();

        // Get current column mode
        var column_mode = UltraEdit.columnMode;

        // Get selection
        var str = UltraEdit.activeDocument.selection;

        // Get line terminator
        if ( UltraEdit.activeDocument.lineTerminator == 0 ) {
            var line_Terminator = "\r\n";
        } else {
            var line_Terminator = "\n";
        }

        // Get sign to add
        sign_to_add = UltraEdit.getString( "Enter sign to add:", 1 );

        // Process selection if sign is different from ""
        if ( sign_to_add.length > 0 ) {
            // Deactivate column mode
            UltraEdit.insertMode();
            UltraEdit.columnModeOff();

            // Split selected line into array, according to line terminator
            resultArr = str.split(line_Terminator);

            // Add sign at end of each line, add line terminator
            for (i = 0; i < resultArr.length ; i++) {
                // No sign is added on empty line
                if ( resultArr[i].length ==  0 ) {
                    UltraEdit.activeDocument.write( resultArr[i] + line_Terminator );

                // No  is added on last line
                } else if ( i == resultArr.length - 1 ) {
                    UltraEdit.activeDocument.write( resultArr[i] + sign_to_add );

                // All other lines
                } else {
                    UltraEdit.activeDocument.write( resultArr[i] + sign_to_add + line_Terminator );
                }
            }
        }

        // Set the previous column mode
        if ( column_mode ) {
            UltraEdit.columnModeOn;
        } else {
            UltraEdit.columnModeOff;
        }
    }
}