//----------------------------------------------------------------------------------------------------------------------
//  Author:     Mathieu Hedard
//  Date:       03/01/2018
//  Version:    1.0
//
//----------------------------------------------------------------------------------------------------------------------
//  Description: Scripts allow to align selected text according to specific characeter.
//               This script is based on originl script alignEqual.js from UltraEdit forum
//
//----------------------------------------------------------------------------------------------------------------------
// History
//  Version :   Author      :   Date        :   Changes
//  1.0     :   M. Hedard   :   03/01/2018  :   Creation
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

        // Variables declaration
        var MySign;
        var MySignPrev;
        var maxColSign;
        var pos1        = 0;
        var MyEndOfLine = "\r\n";
        var sEntireText = UltraEdit.activeDocument.selection;

        // Keep previous column mode
        var columnmode = UltraEdit.columnMode;

        // Add new method for RegExp : escape all special characters
        RegExp.quote = function(str) {
          return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        };

        // Select line terminator (DOS or UNIX)
        // If a DOS line terminator is found, use "\r\n", else use "\n"
        if ( UltraEdit.activeDocument.lineTerminator == 0 ) {
          MyEndOfLine = "\r\n";
        } else {
          MyEndOfLine = "\n";
        }

        // Get sign to align
        MySign = UltraEdit.getString("Enter sign to align:",1);

        // Get previous sign
        MySignPrev = getStringAlign();

        if ( MySign.length == 0 ) {
          MySign = MySignPrev;
        }

        // Activate Perl RegEx
        UltraEdit.perlReOn();

        // Transform selection into array
        var asLines = sEntireText.split(MyEndOfLine);

        // Split align characters
        var AlignChars = MySign.split(";;");

        // Get position of the first character
        pos1 = getColOfFirstChar( asLines[0] );

        // Repeat operations for each align characters
        for ( var Idx_align = 0; Idx_align < AlignChars.length; Idx_align++ ) {

            // Remove leading spaces
            asLines = RemoveLeadingSpaces( asLines, AlignChars[Idx_align] );

            // Get column number of sign
            maxColSign = getMaxColSign( asLines, AlignChars[Idx_align] );

            // Process lines
            asLines = stuff( pos1, maxColSign, asLines, AlignChars[Idx_align] );
        }

        // Replace slection with processed lines
        for ( var nIndex = 0; nIndex < asLines.length; nIndex++ ) {

          // Don't add '\r\n' on last line
          if ( nIndex == asLines.length - 1 ) {
            UltraEdit.activeDocument.write( asLines[nIndex] );
          }
          else {
            UltraEdit.activeDocument.write( asLines[nIndex] + MyEndOfLine );
          }
        }

        // Save String alignement character
        setStringAlign( MySign, MySignPrev );
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Sub- Functions
//----------------------------------------------------------------------------------------------------------------------

// Stuff
function stuff(pPos1, pMaxCol, tab, sign ) {
    var final_tab = new Array;
    var col;
    var spaces = "                                                                 ";

    for ( var nIndex = 0; nIndex < tab.length; nIndex++ ) {
        col = tab[nIndex].indexOf( sign );
        final_tab[nIndex] = tab[nIndex].replace( sign, spaces.substring(0, pMaxCol - col ) + sign);
        var tmp =  pMaxCol - col ;
    }
    return final_tab;
}

// get the mostright equal-sign in the selection. This is the orientation for the stuffing-spaces at the
// beginning of the line.
function getMaxColSign( tab, sign ) {
    var max = 0;
    var col = 0;
    for ( var nIndex = 0; nIndex < tab.length; nIndex++ ) {
        col = tab[nIndex].indexOf( sign );
        if ( col > max ) {
            max = col;
        }
    }
    return max;
}

// remove leading spaces
function RemoveLeadingSpaces( tab, sign ) {
    var tmp_tab = new Array;
    for ( var nIndex = 0; nIndex < tab.length; nIndex++ ) {
        var re = new RegExp( "\\s+" + RegExp.quote(sign) + "\\s+", "g" );
        tmp_tab[nIndex] = tab[nIndex].replace( re, " " + sign + " " );
    }
    return tmp_tab;
}

//Return the column number of the first character 1
function getColOfFirstChar( line ) {
    return ( col_num = line.indexOf( line.match(/\w/ )));
}

// Store align String
function setStringAlign( StringAlign, PrevStringAlign ) {
    // Select clipboard 7
    UltraEdit.selectClipboard(7);

    // Store only if previous string alignment is different
    if ( StringAlign != PrevStringAlign ) {
      UltraEdit.clipboardContent = "LastAlignString=" + StringAlign;
    }

    // Select the standard clipboard of the operating system.
    UltraEdit.selectClipboard(0);
}

// Get align String
function getStringAlign() {
    var tmp_string;

    // Select clipboard 7
    UltraEdit.selectClipboard(7);

    // Get string
    if (UltraEdit.clipboardContent.indexOf("LastAlignString=") == 0) {
        tmp_string = UltraEdit.clipboardContent.substr(16);
    }

    // Select the standard clipboard of the operating system.
    UltraEdit.selectClipboard(0);

    return tmp_string;
}
