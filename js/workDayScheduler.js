// Constants used in determineIfPastPresentOrFutureHr method and appendHours method.
const PAST = 0
const PRESENT = 1
const FUTURE = 2;

// This function is called when the page loads.  It gets the current day using Moment.js.
function setCurrentDayAndTime()
{
    var currDay = document.getElementById("currentDay");
    currDay.innerHTML = moment().format('MMMM Do YYYY');
}

/* This function determines if its parameter is equal to the current hour, before it, or after it.
Its return value will be 0 for past, 1 for present, or 2 for future.*/
function determineIfPastPresentOrFutureHr(timeBlockHr)
{
    var currentHour = moment().hour();

    if (currentHour === timeBlockHr)
    {
        return PRESENT;
    }
    else if (currentHour > timeBlockHr)
    {
        return PAST;
    }
    else 
    {
        return FUTURE;
    }
}

/* This function is called when the page loads.  Using JQuery, it dynamically appends all of the rows for the hours of 9 AM to 5 PM. */
function appendHours()
{
    const timesOfDay = [ "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM" ];
    const times = [ 9, 10, 11, 12, 13, 14, 15, 16, 17 ];
    const timesStr = [ "9", "10", "11", "12", "13", "14", "15", "16", "17"];

    var tblRow = "<tr class=\"row time-block";
    const pastStyle = " past\">";
    const futureStyle = " future\">";
    const presentStyle = " present\">";

    var pastPresentOrFutureHr = -1;

    var hourTblData = "<td class=\"description\">";

    var textAreaTblData = "<td><textarea rows=\"1\" maxlength=\"60\" cols=\"60\" id=\"";
    var txtAreaID = "txtArea";
    const endTxtAreaTblData = "\"></textarea></td>";

    var saveBtnTblData = "<td><input type=\"button\" value=\"Save\" class=\"saveBtn\" id =\"";
    var saveBtnID = "";
    const endSaveBtnTblData = "\"></td>";
    
    const endTblData = "</td>";
    const endTblRow = "</tr>";
    
    var appendData = "";
    const timeBlockTblId = "#timeblocksTbl";
       
    for (var i = 0; i < 9; i++)
    {
        appendData += tblRow;

        pastPresentOrFutureHr = determineIfPastPresentOrFutureHr(times[i]);

        if (pastPresentOrFutureHr === PAST)
        {
            appendData += pastStyle;
        }
        else if (pastPresentOrFutureHr === FUTURE)
        {
            appendData += futureStyle;
        }
        else
        {
            appendData += presentStyle;
        }
        
        appendData += hourTblData;
        appendData += timesOfDay[i];
        appendData += endTblData;

        appendData += textAreaTblData;
        txtAreaID += timesStr[i];
        appendData += txtAreaID;
        appendData += endTxtAreaTblData;

        appendData += saveBtnTblData;
        saveBtnID += timesStr[i];
        appendData += saveBtnID;
        appendData += endSaveBtnTblData;

        appendData += endTblData;
        appendData += endTblRow;

        $(timeBlockTblId).append(appendData);

        // Pre-populate text areas from local storage.        
        $("#" + txtAreaID).val(localStorage.getItem(saveBtnID));

        // Add click event handler to save button.
        $("#" + saveBtnID).click(function(event) {
            var idNbr = "" + event.target.id;
            var txtAreaVal = $("#txtArea" + idNbr).val();            
            localStorage.setItem(idNbr, txtAreaVal);
        });

        // reset variables for next iteration of loop.
        appendData = "";
        saveBtnID = "";
        txtAreaID = "txtArea";
    }
}