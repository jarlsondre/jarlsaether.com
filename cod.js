

function addToTable(data) {
    var tableRef = document.getElementById('playerTable').getElementsByTagName('tbody')[0];
        var newRow = tableRef.insertRow();
        var i; 
        for(i = 0; i < 4; i++) {
            var newCell = newRow.insertCell(i);
            var newText = document.createTextNode(data[i]);
            newCell.appendChild(newText); 
        }
        
}

// Function for fetching the json data from Rapid API and displaying it
function fetchData() {
    var username = document.getElementById("username").value; 
    fetch("https://rapidapi.p.rapidapi.com/warzone/" + username + "/psn", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
		"x-rapidapi-key": '4cfa8dde81msh47a98d07c3bdc5bp1ebfcejsnee06d0ca5e7a'
	}
    })
    .then(response => {
        return response.json();    
    })
    .then( (data) => {
        addToTable(formatFetchData(username, data)); 
    })
    .catch(err => {
        console.error(err);
    }); 
}

// Function for formatting the data gathered by the API, using only the data we care about
// which currently is wins, kills and kd :-)
function formatFetchData(username, data) {
    return [username, data["br_all"]["wins"], data["br_all"]["kills"], JSON.stringify(data["br_all"]["kdRatio"]).substring(0, 5)]
}



