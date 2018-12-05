// testing to get times to update properly
let train = [
    {
        name: "Trenton Express",
        destination: "Trenton",
        frequency: 60,
        arrival: "06:00 p"
    },
    {
        name: "Boston Bus",
        destination: "Boston",
        frequency: 60,
        arrival: "05:16 p"
    },
    {
        name: "California Caravan",
        destination: "San Francisco",
        frequency: 120,
        arrival: "09:10 a"
    }
];
function toBeExecutedOnFirstLoad() {
    console.log("initial");
    localStorage.setItem("length", 3);
    localStorage.setItem("i", 2);
    for (let i = 0; i < localStorage.getItem("length"); i++) {

        storeVariables(i, train[i].name, train[i].destination, train[i].frequency, train[i].arrival);

    }
    renderPage();
    updateTrainTime();
}
if (localStorage.getItem('first') === null) {
    toBeExecutedOnFirstLoad();
    localStorage.setItem('first', 'nope!');
} else {
    renderPage();
    updateTrainTime();
}

function storeVariables(i, name, destination, frequency, arrival) {
    localStorage.setItem("train" + i + "-name", name);
    localStorage.setItem("train" + i + "-destination", destination);
    localStorage.setItem("train" + i + "-frequency", frequency);
    localStorage.setItem("train" + i + "-arrival", arrival);
}
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

console.log(moment(localStorage.getItem("train1-arrival"), "hh:mm a") - moment());
// console.log(moment("06:08 p", "hh:mm a") - moment())
function updateTrainTime() {
    console.log("update");
    moment.relativeTimeThreshold('m', 1000);
    while ((moment(localStorage.getItem("train1-arrival"), "hh:mm a") - moment()) <= 0) {
        // while (localStorage.getItem("train1-arrival") <= moment().format('hh:mm a')) {
        console.log("before:" + localStorage.getItem("train1-arrival"));
        console.log(moment().format('hh:mm a'));
        let temp = moment(localStorage.getItem("train1-arrival"), 'hh:mm a').add(localStorage.getItem("train1-frequency"), 'minutes').calendar();
        console.log(temp);
        localStorage.setItem("train1-arrival", temp);
        console.log("after:" + localStorage.getItem("train1-arrival"));

        // for (let i = 0; i < localStorage.getItem("length"); i++) {
        //     while (localStorage.getItem("train" + i + "-arrival") <= moment().format('hh:mm a')) {
        //         console.log("before:" + localStorage.getItem("train" + i + "-arrival"));
        //         console.log(moment().format('hh:mm a'));
        //         let temp = moment(localStorage.getItem("train" + i + "-arrival"), 'hh:mm a').add(localStorage.getItem("train" + i + "-frequency"), 'minutes').calendar();
        //         console.log(temp);
        //         localStorage.setItem("train" + i + "-arrival", temp);
        //         console.log("after:" + localStorage.getItem("train" + i + "-arrival"));
        //     }
        //     // console.log(localStorage.getItem("train" + i + "-arrival"));
        //     if (localStorage.getItem("train" + i + "-arrival") <= moment().format('hh:mm a')) {


        //         // console.log("if " + i);

        //         $("#train" + i).find(".arrival").html(moment(localStorage.getItem("train" + i + "-arrival"), 'hh:mm a').format('hh:mm a'));
        //         $("#train" + i).find(".min-away").html(moment(localStorage.getItem("train" + i + "-arrival"), 'hh:mm a').fromNow());
        //     } else {
        //         // console.log("else " + i);

        //         $("#train" + i).find(".frequency").html(localStorage.getItem("train" + i + "-frequency"));
        //         $("#train" + i).find(".arrival").html(moment(localStorage.getItem("train" + i + "-arrival"), 'hh:mm a').format('hh:mm a'));
        //         $("#train" + i).find(".min-away").html(moment(localStorage.getItem("train" + i + "-arrival"), 'hh:mm a').fromNow());


        //     }
    }
}

$("#submit").on("click", function () {
    let i = localStorage.getItem("i");
    i++;
    localStorage.setItem("i", i);
    var addTrainName = $("#train-name").val();
    var addTrainDestination = $("#train-destination").val();

    var addTrainFrequency = $("#train-frequency").val();
    var addTrainArrival1 = $("#train-time-1").val();
    storeVariables(i, addTrainName, addTrainDestination, addTrainFrequency, addTrainArrival1);

    var length = localStorage.getItem("length");
    length++;
    localStorage.setItem("length", length);
    console.log(train);
    renderPage();
    updateTrainTime();
})