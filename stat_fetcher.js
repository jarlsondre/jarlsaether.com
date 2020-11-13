

var sort_column = 1; 
var the_data; 

function get_stats() {
    fetch("https://128.199.56.250:8080/", {
        "method" : "GET"
    })
    .then(response => {
        return response.json();    
    })
    .then( (data) => {
        console.log(data)
        the_data = data; 
        var sorted_data = sort_data(the_data, sort_column); 
        update_highscore_table(sorted_data)
        })
}

function sort_data(data, col_number) {
    // First we have to make a list with our json objects
    var ar = [];
    for (var elem in data) {
        ar.push([elem, data[elem]]);
    }
    ar.sort(function(a, b) {return b[1][col_number] - a[1][col_number]});

        // General formatting of the array

    
    for (var i = 0; i < ar.length; i++) {
        // Remove the '%23' from battle users
        var splitted_name = ar[i][0].split("%23");
        if (splitted_name.length > 1) {
            ar[i][0] = splitted_name[0] + "#" + splitted_name[1]; 
        }
 
        // Round the kd to 3 decimals
        ar[i][1][4] = ar[i][1][4].toFixed(3);
    }





    return ar
}

function sort_data_again(id) {
    var newly_sorted_data = sort_data(the_data, parseInt(id)); 
    update_highscore_table(newly_sorted_data); 
}

function update_highscore_table(data) {
    var tableRef = document.getElementById('highscore_table').getElementsByTagName('tbody')[0];

    console.log(data); 

    // Removing previous entries 
    for(var x = tableRef.rows.length - 1 ; x >= 0; x--) {
        tableRef.deleteRow(x); 
    }

    // Adding the playerinfo to our table
    for (var j = 0; j < data.length; j++) {
        console.log(data[j]); 
        var newRow = tableRef.insertRow();
        for (var i = data[j][1].length-1; i >= 0; i--) { // Adding the stats in opposite order to make them correct
            var newCell = newRow.insertCell(0);
            var newText = document.createTextNode(data[j][1][i]);
            newCell.appendChild(newText); 
        }
        var newCell = newRow.insertCell(0);
        var newText = document.createTextNode(data[j][0]);  // Inserting the players name
        newCell.appendChild(newText); 
    }
}

get_stats(); 