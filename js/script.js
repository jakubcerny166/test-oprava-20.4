let counter = 0;
function getDogData()
{
    $.ajax({
        url: "https://dogapi.dog/api/facts",
        header: {"":""},
        method: "GET",
        success: function(data){
            fact = data.facts;
            if(counter >= 5)
            {
                $("#main").empty();
                $("#main").append('<h3 class="text-danger">No new Dog fact</h3>');
                return;
            }
            $("#error").empty();
            counter = 0;
            createTable();
        },
        error: function(error){
            $("#error").empty();
            $("#error").append('<div class="alert alert-danger" role="alert">Service currently unaviable, try again later!</div>');
        }
    });
}

var baseURL = "https://v2.jokeapi.dev";
var categories = ["Programming", "Misc", "Pun", "Spooky", "Christmas"];
var params = [
    "blacklistFlags=nsfw,religious,racist",
    "idRange=0-100"
];

var xhr = new XMLHttpRequest();
xhr.open("GET", baseURL + "/joke/" + categories.join(",") + "?" + params.join("&"));

xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status < 300) 
    {
        var randomJoke = JSON.parse(xhr.responseText);

        if(randomJoke.type == "single")
        {
            alert(randomJoke.joke);
        }
        else
        {
            alert(randomJoke.setup);
            alert(randomJoke.delivery);
        }
    }
    else if(xhr.readyState == 4)
    {
        alert("Error while requesting joke.\n\nStatus code: " + xhr.status + "\nServer response: " + xhr.responseText);
    }
};

//xhr.send();

function createTable()
{
    $("#main").empty();
    $("#list").empty();   
    $("#main").append('<div class="px-2" id="dogfact"> <div class="card"> <h5 class="card-header">Dog Fact</h5> <div class="card-body"> <p class="card-text">' + fact + '</p> <div class="d-flex justify-content-around"> </div> </div> </div> </div>');
    $("#main").append('<div class="px-2" id="joke"> <div class="card"> <h5 class="card-header">Joke</h5> <div class="card-body"> <p class="card-text">' + xhr + '</p> <div class="d-flex justify-content-around"> </div> </div> </div> </div>');

}
