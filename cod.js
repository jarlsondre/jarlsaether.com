
function fetchData() {
    var username = document.getElementById("username").value; 
    console.log(username); 
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
    .then((data) => {
        console.log(data);
        document.getElementById("cod_paragraph").innerHTML =  formatFetchData(data);
        console.log(JSON.stringify(data));
    })
    .catch(err => {
        console.error(err);
    });

}

function formatFetchData(data) {
    var my_string = "";
    my_string += "Wins: " + data["br_all"]["wins"] + ", ";
    my_string += "Kills: " + data["br_all"]["kills"] + ", ";
    my_string += "K/D: " + JSON.stringify(data["br_all"]["kdRatio"]).substring(0, 5); 
    return my_string; 
}

function clearData() {
    document.getElementById("cod_paragraph").innerHTML = ""; 
}


