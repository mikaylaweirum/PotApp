/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

};

    // create a new to-do
function createNewDish()
{
    var dishDictionary = {};
 
    // prompt the user to enter to-do
    var dish = prompt("Dish","");
    if (dish != null)
    {
        if (dish == "")
        {
            alert("Dish can't be empty!");
        }
        else
        {
            // append the new to-do with the table
            dishDictionary = { check : 0 , text : dish}; //this is where we store local permamenet data
            addTableRow(dishDictionary, false); //this is defined below
        }
    }
 
}


//populate the table with new row
var rowID = 0;
function addTableRow(dishDictionary, appIsLoading)
{
    rowID +=1;
    var table = document.getElementById("dataTable");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
 
 
    // create the textbox
    var cell1 = row.insertCell(0);
    var element1 = document.createElement("input");
    element1.type = "text";
    element1.name = "txtbox[]";
    element1.size = 16;
    element1.id = "text" + rowID;
    element1.value = dishDictionary["text"];
    element1.setAttribute("onchange", "saveDishList()");
    cell1.appendChild(element1);
 
 
    // create the delete button
    var cell2 = row.insertCell(1);
    var element2 = document.createElement("input");
    element2.type = "button";
    element2.value = "Delete";
    element2.setAttribute("onclick", "deleteSelectedRow(this)");
    cell2.appendChild(element2);
 
    // update the UI and save the to-do list

    saveDishList();
 
    //if (!appIsLoading) alert("Task Added Successfully.");
}
// add the strike-through styling to completed tasks
function checkboxClicked()
{
    var table = document.getElementById("dataTable");
    var rowCount = table.rows.length;
 
    // loop through all rows of the table
    for(var i = 0; i < rowCount; i++)
    {
        var row = table.rows[i];
        var chkbox = row.cells[0].childNodes[0];
        var textbox = row.cells[1].childNodes[0];
 
        // if the checkbox is checked, add the strike-through styling
        if(null != chkbox && true == chkbox.checked)
        {
            if(null != textbox)
            {       
                textbox.style.setProperty("text-decoration", "line-through");
            }
        }
 
        // if the checkbox isn't checked, remove the strike-through styling
        else
        {
            textbox.style.setProperty("text-decoration", "none");
        }
 
    }
 
    // save the to-do list
    saveDishList();
}
// view the content of the selected row
function viewSelectedRow(dishTextField)
{
    alert(dishTextField.value);
}
// delete the selected row
function deleteSelectedRow(deleteButton)
{
    var p = deleteButton.parentNode.parentNode;
    p.parentNode.removeChild(p);
    saveDishList();
}

// remove completed tasks
function removeCompletedTasks()
{
    var table = document.getElementById("dataTable");
    var rowCount = table.rows.length;
 
    // loop through all rows of the table
    for(var i = 0; i < rowCount; i++)
    {
        // if the checkbox is checked, delete the row
        var row = table.rows[i];
        var chkbox = row.cells[0].childNodes[0];
        if(null != chkbox && true == chkbox.checked)
        {
            table.deleteRow(i);
            rowCount--;
            i--;
        }
    }
 
    // save the to-do list
    saveDishList();
 
    alert("Completed Tasks Were Removed Successfully.");
}

// save the to-do list
function saveDishList()
{
    var dishArray = {};
    var checkBoxState = 0;
    var textValue = "";
 
    var table = document.getElementById("dataTable");
    var rowCount = table.rows.length;
 
    if (rowCount != 0)
    {
        // loop through all rows of the table
        for(var i=0; i<rowCount; i++)
        {
            var row = table.rows[i];
 
            // determine the state of the checkbox
            var chkbox = row.cells[0].childNodes[0];
            if(null != chkbox && true == chkbox.checked)
            {
                checkBoxState = 1;
            }
            else
            {
                checkBoxState= 0;
            }
 
            // retrieve the content of the to-do
            var textbox = row.cells[1].childNodes[0];
            textValue = textbox.value;
 
            // populate the array with checkbox state and text value
            dishArray["row" + i] =
            {
                check : checkBoxState, //this formate is nescessary because we are going to turn it into a json key value pair
                text : textValue
            };
        }
    }
    else
    {
        dishArray = null;
    }
 
    // use the local storage API to persist the data as JSON, hence the storage format
    window.localStorage.setItem("dishList", JSON.stringify(dishArray)); //the function to save data locally, to the phone.  Takes json object format.
}

// load the to-do list
function loadDishList()
{
    // use the local storage API load the JSON formatted to-do list, and decode it
    var theList = JSON.parse(window.localStorage.getItem("dishList"));
 
    if (null == theList || theList == "null")
    {
        deleteAllRows();
    }
    else
    {
        var count = 0;
        for (var obj in theList)
        {
            count++;
        }
 
        // remove any existing rows from the table
        deleteAllRows();
 
        // loop through the to-dos
        for(var i = 0; i < count; i++)
        {
            // adding a row to the table for each one
            addTableRow(theList["row" + i], true); //same function we use to add a new table row, we're just looping now though through all the rows that were saved
        }
    }
}

// delete all the rows
function deleteAllRows()
{
    var table = document.getElementById("dataTable");
    var rowCount = table.rows.length;
 
    // loop through all rows of the table
    for(var i = 0; i < rowCount; i++)
    {
        // delete the row
        table.deleteRow(i);
        rowCount--;
        i--;
    }
 
    // save the to-do list
    saveDishList();
}





