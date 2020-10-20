
var data; 

function fetchData() {
    fetch("https://rapidapi.p.rapidapi.com/warzone/Flyplass/psn", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
		"x-rapidapi-key": 
	}
    })
    .then(response => {
        return response.json(); 
    })
    .then((myJson) => {
        console.log(myJson);
        data = myJson; 
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


