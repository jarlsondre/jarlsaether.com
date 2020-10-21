

// List of all playernames
var playerNames = ["flyplass", "tomasgule", "marmyren", "xfate-assainzy"]

// List of the players and their stats
var listOfPlayers = []; 


// Function that updates the leaderboard of who has the most wins
function updatePlayerStatTable() {
    var tableRef = document.getElementById('playerStatTable').getElementsByTagName('tbody')[0];
    var x;
    // Removing previous entries
    for(x = tableRef.rows.length - 1 ; x > 0; x--) {
        tableRef.deleteRow(x); 
    }
    var i; 
    var j; 
    for(j = 0; j < listOfPlayers.length; j++) {
        var data = listOfPlayers[j]
        var newRow = tableRef.insertRow();
        for(i = 0; i < 4; i++) {
            var newCell = newRow.insertCell(i);
            var newText = document.createTextNode(data[i]);
            newCell.appendChild(newText); 
        }
    }
}

// Function that updates the leaderboard of who has the most kills in the last 20 games
function updatePlayerMostKillsTable() {
    var tableRef = document.getElementById('playerMostKillsTable').getElementsByTagName('tbody')[0];
    var x;
    // Removing previous entries 
    for(x = tableRef.rows.length - 1 ; x > 0; x--) {
        tableRef.deleteRow(x); 
    }
    var i; 
    var j; 
    // For every player in the list 
    for(j = 0; j < listOfPlayers.length; j++) {
        var data = listOfPlayers[j]
        var newRow = tableRef.insertRow();
        // We only want to add the first and the last element, which is the username and the amount of kills
        var newCell = newRow.insertCell(0);
        var newText = document.createTextNode(data[0]);
        newCell.appendChild(newText); 
        var newCell = newRow.insertCell(1);
        var newText = document.createTextNode(data[4]);
        newCell.appendChild(newText); 
    }

}

function updateTable() {
    var tableRef = document.getElementById('playerTable').getElementsByTagName('tbody')[0];
    var x;
    for(x = tableRef.rows.length - 1 ; x > 0; x--) {
        tableRef.deleteRow(x); 
    }
        var i; 
        var j; 
        for(j = 0; j < listOfPlayers.length; j++) {
            var data = listOfPlayers[j]
            var newRow = tableRef.insertRow();
            for(i = 0; i < 4; i++) {
                var newCell = newRow.insertCell(i);
                var newText = document.createTextNode(data[i]);
                newCell.appendChild(newText); 
            }
        }
}



function sortPlayersOnWins() {
    listOfPlayers.sort(function(a, b) {return b[1] - a[1]});
}

function sortPlayersOnMostKills() {
    listOfPlayers.sort(function(a, b) {return b[4] - a[4]});
}

// We already have stored information about every account. This will be stored in a file


// Function for fetching the json data from Rapid API and displaying it
function getStats() {
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
        var formatted = formatFetchData(username, data);
        listOfPlayers.push(formatted); 
        sortPlayersOnWins(); 
        updatePlayerStatTable()
        console.log(listOfPlayers); 
    })
    .catch(err => {
        console.error(err);
    }); 
}

function getMatches() {
    var username = document.getElementById("username").value; 
    fetch("https://rapidapi.p.rapidapi.com/warzone-matches/" + username + "/psn", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
		"x-rapidapi-key": "4cfa8dde81msh47a98d07c3bdc5bp1ebfcejsnee06d0ca5e7a"
	}
})
.then(response => {
    console.log(response);
    return response.json(); 
})
.then((data) => {
    console.log(data["matches"]["0"]["playerStats"]["kills"]); 
    console.log("The most kills was", findMostKills(data));
    console.log(listOfPlayers); 
    for(var i = 0; i < listOfPlayers.length; i++) {
        if (listOfPlayers[i][0] == username) {
            listOfPlayers[i].push(findMostKills(data)); 
            sortPlayersOnMostKills(); 
            updatePlayerMostKillsTable(); 
            break;
        } 
    }
    
    
    console.log(listOfPlayers); 
})
.catch(err => {
	console.error(err);
});
}

// Given data (matches), this function will find the highest amount of kills in those matches
function findMostKills(data) {
    var highest = 0; 
    var matches = data["matches"]; 
    console.log(matches);
    for(var i = 0; i < matches.length; i ++) {
        if (matches[i.toString()]["playerStats"]["kills"] > highest) {
            highest = matches[i.toString()]["playerStats"]["kills"]; 
        }
    }
    return highest; 
}

// Function for formatting the data gathered by the API, using only the data we care about
// which currently is wins, kills and kd :-)
function formatFetchData(username, data) {
    return [username, data["br_all"]["wins"], data["br_all"]["kills"], JSON.stringify(data["br_all"]["kdRatio"]).substring(0, 5)]
}



