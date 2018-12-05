// original trains on the pages are listed in this object
let train = [
    {
        name: "Trenton Express",
        destination: "Trenton",
        frequency: 60,
        arrival: "06:35 a"
    },
    {
        name: "Boston Bus",
        destination: "Boston",
        frequency: 90,
        arrival: "09:15 a"
    },
    {
        name: "California Caravan",
        destination: "San Francisco",
        frequency: 120,
        arrival: "07:50 a"
    }
];
// this function stores some variables into local storage to 
// allow for other fuctions to access, including all the information
// needed to fill out the train schedule. This fuction fills out the 
// page the first time the user opens the page
function toBeExecutedOnFirstLoad() {
    localStorage.setItem("length", 3);
    localStorage.setItem("i", 2);
    for (let i = 0; i < localStorage.getItem("length"); i++) {
        localStorage.setItem("train" + i + "-name", train[i].name);
        localStorage.setItem("train" + i + "-destination", train[i].destination);
        localStorage.setItem("train" + i + "-frequency", train[i].frequency);
        localStorage.setItem("train" + i + "-arrival", train[i].arrival);
    }
    renderPage();
    updateTrainTime();
}
// this checks to see if the user has already been to the page
// and runs the appropriate script accordingly
if (localStorage.getItem('first') === null) {
    toBeExecutedOnFirstLoad();
    localStorage.setItem('first', 'nope!');
} else {
    renderPage();
    updateTrainTime();
}
// this function loops through all the trains in local storage
// and displays the facts about the train that are constant in the table
// ie, name, destination, and frequency
// length is used to keep track of how many trains there are
function renderPage() {
    for (let i = 0; i < localStorage.getItem("length"); i++) {
        var addTrainName = localStorage.getItem("train" + i + "-name");
        $("tbody").append("<tr class='text-center' id='train" + i + "'></tr>");
        $("#train" + i).append("<td class='name'>" + addTrainName + "</td>");
        var addTrainDestination = localStorage.getItem("train" + i + "-destination");
        $("#train" + i).append("<td class='destination'>" + addTrainDestination + "</td>");
        var addTrainFrequency = localStorage.getItem("train" + i + "-frequency");
        $("#train" + i).append("<td class='frequency'>" + addTrainFrequency + "</td>");
        $("#train" + i).append("<td class='arrival'></td>");
        $("#train" + i).append("<td class='min-away'></td>");
    }
}
// this function updates all the changing parts of the train schedule
// it checks to see if the time is current and runs the script accordingly
// the arrival time and the minutes away sections are updated here
function updateTrainTime() {
    moment.relativeTimeThreshold('m', 1000);
    for (let i = 0; i < localStorage.getItem("length"); i++) {
        if ((moment(localStorage.getItem("train" + i + "-arrival"), "hh:mm a") - moment()) <= 0) {
            while ((moment(localStorage.getItem("train" + i + "-arrival"), "hh:mm a") - moment()) <= 0) {
                console.log("if " + i);
                let temp = moment(localStorage.getItem("train" + i + "-arrival"), 'hh:mm a').add(localStorage.getItem("train" + i + "-frequency"), 'minutes').calendar();
                localStorage.setItem("train" + i + "-arrival", temp);
                $("#train" + i).find(".arrival").html(moment(localStorage.getItem("train" + i + "-arrival"), 'hh:mm a').format('hh:mm a'));
                $("#train" + i).find(".min-away").html(moment(localStorage.getItem("train" + i + "-arrival"), 'hh:mm a').fromNow(true));
            }
        } else {
            $("#train" + i).find(".frequency").html(localStorage.getItem("train" + i + "-frequency"));
            $("#train" + i).find(".arrival").html(moment(localStorage.getItem("train" + i + "-arrival"), 'hh:mm a').format('hh:mm a'));
            $("#train" + i).find(".min-away").html(moment(localStorage.getItem("train" + i + "-arrival"), 'hh:mm a').fromNow(true));
        }
    }
}
// when a new train is submitted, the data is stored to local storage
// and the page is rendered again and the train times are updated.
// the variable i allows for the trains to be IDed properly
$("#submit").on("click", function () {
    let i = localStorage.getItem("i");
    i++;
    localStorage.setItem("i", i);
    let addTrainName = $("#train-name").val();
    let addTrainDestination = $("#train-destination").val();
    let addTrainFrequency = $("#train-frequency").val();
    let addTrainArrival1 = $("#train-time-1").val()
    localStorage.setItem("train" + i + "-name", addTrainName);
    localStorage.setItem("train" + i + "-destination", addTrainDestination);
    localStorage.setItem("train" + i + "-frequency", addTrainFrequency);
    localStorage.setItem("train" + i + "-arrival", addTrainArrival1);
    let length = localStorage.getItem("length");
    length++;
    localStorage.setItem("length", length);
    console.log(train);
    renderPage();
    updateTrainTime();
})