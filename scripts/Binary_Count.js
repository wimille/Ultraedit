//----------------------------------------------------------------------------------------------------------------------
//  Author:     Mathieu Hedard
//  Date:       28/12/2017
//  Version:    1.0
//
//----------------------------------------------------------------------------------------------------------------------
//  Description: Scripts allow to add a binary value in column mode. This script is in addition to embedded features in
//               UltraEdit which allow to add value in decimal and hexadecimal.
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
    if (UltraEdit.document.length > 0 ) {
        // Variables declaration
        var len_max = 120;
        var sLeadingZeros = "";
        var space_line = "";
        var size = UltraEdit.getString( "Number of bits", 1 );
        var cnt_threshold = UltraEdit.getString( "Count until", 1 );
        var start = UltraEdit.activeDocument.currentColumnNum;

        // Get line terminator
        if ( UltraEdit.activeDocument.lineTerminator == 0 ) {
            var line_Terminator = "\r\n";
        } else {
            var line_Terminator = "\n";
        }

        // Check value:
        //  + Process is made only if size of counter and counter threshold are different from 0
        //  + Process is made only if counter threshold can be reach with specified counter size value
        if ( size.length == 0 || cnt_threshold == 0 ) {
            return;
        } else if ( cnt_threshold > ( Math.pow(2, size) - 1 )) {
            UltraEdit.messageBox( 'Value specified for counter cannot be write with given number of bits' );
          return;
        }

        // Leading zeros
        for ( var idx = 0; idx < size; idx++ ) {
            sLeadingZeros += "0";
        }

        // Set number of line
        for ( i = 0; i < ( start - 1); i++ ) {
           space_line += " ";
        }

        // Binary count
        for ( var idx = 0; idx <= cnt_threshold; idx++ ) {
            var sBinary = idx.toString(2);
            var nLeadingZeroQuantity = sLeadingZeros.length - sBinary.length;

            if (nLeadingZeroQuantity > 0) {
              sBinary = sLeadingZeros.substr(0,nLeadingZeroQuantity) + sBinary;
            }

            // Add space except on first line (which is the reference of the column)
            if ( idx == 0 ) {
                UltraEdit.activeDocument.write( sBinary + line_Terminator );
            } else {
                UltraEdit.activeDocument.write( space_line + sBinary + line_Terminator );
            }
        }
    }
}
