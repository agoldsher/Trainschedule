// let train = {
//     frequency: 60,
//     firstArrival: "1600"
// }
// let train2 = {
//     frequency: 30,
//     arrival: "04:17 p"

// }
// const train3 = {
//     frequency: 600,
//     firstArrival: "1300"
// }
let train = [
    {
        name: "Trenton Express",
        destination: "Trenton",
        frequency: 60,
        arrival: "06:30 a"
    },
    {
        name: "Boston Bus",
        destination: "Boston",
        frequency: 90,
        arrival: "08:00 a"
    },
    {
        name: "California Caravan",
        destination: "San Francisco",
        frequency: 120,
        arrival: "09:10 a"
    }
];

// console.log(train);
// train.push({
//     frequency: 10,
//     arrival: "00:30 p"
// });
// console.log(train);


// function initialTrainSchedule() {
//     for (let i = 0; i < train.length; i++) {
//         localStorage.setItem("train" + i + "-name", train[i].name);
//         localStorage.setItem("train" + i + "-destination", train[i].destination);
//         localStorage.setItem("train" + i + "-frequency", train[i].frequency);
//         localStorage.setItem("train" + i + "-arrival", train[i].arrival);



//         // if (train[i].arrival <= moment().format('hh:mm a')) {
//         //     console.log("if " + i);
//         //     train[i].arrival = moment(train[i].arrival, 'hh:mm a').add(train[i].frequency, 'minutes').calendar();
//         //     console.log(train[i].arrival);
//         //     $("#train" + i).find(".arrival").html(moment(train[i].arrival, 'hh:mm a').format('hh:mm a'));
//         //     $("#train" + i).find(".min-away").html(moment(train[i].arrival, 'hh:mm a').fromNow());
//         // } else {
//         //     console.log("else " + i);
//         //     $("#train" + i).find(".frequency").html(train[i].frequency);
//         //     $("#train" + i).find(".arrival").html(moment(train[i].arrival, 'hh:mm a').format('hh:mm a'));
//         //     $("#train" + i).find(".min-away").html(moment(train[i].arrival, 'hh:mm a').fromNow());
//         //     console.log(localStorage.getItem("train" + i + "-frequency", train[i].arrival))
//         // }
//     }
// }
function toBeExecutedOnFirstLoad() {
    console.log("initial");
    localStorage.setItem("length", 3);
    for (let i = 0; i < localStorage.getItem("length"); i++) {
        // initialTrainSchedule();
        localStorage.setItem("train" + i + "-name", train[i].name);
        localStorage.setItem("train" + i + "-destination", train[i].destination);
        localStorage.setItem("train" + i + "-frequency", train[i].frequency);
        localStorage.setItem("train" + i + "-arrival", train[i].arrival);

    }

    updateTrainTime()
}
if (localStorage.getItem('first') === null) {
    toBeExecutedOnFirstLoad();
    localStorage.setItem('first', 'nope!');
}
if (localStorage.getItem('first') === "nope!") {
    updateTrainTime();

}

console.log(moment().format('hh:mm:ss a'));

function updateTrainTime() {
    console.log("update");
    for (let i = 0; i < localStorage.getItem("length"); i++) {

        console.log(localStorage.getItem("train" + i + "-arrival"));
        if (localStorage.getItem("train" + i + "-arrival") <= moment().format('hh:mm a')) {
            console.log("if " + i);
            let temp = moment(localStorage.getItem("train" + i + "-arrival"), 'hh:mm a').add(localStorage.getItem("train" + i + "-frequency"), 'minutes').calendar();
            localStorage.setItem("train" + i + "-arrival", temp);
            $("#train" + i).find(".arrival").html(moment(localStorage.getItem("train" + i + "-arrival"), 'hh:mm a').format('hh:mm a'));
            $("#train" + i).find(".min-away").html(moment(localStorage.getItem("train" + i + "-arrival"), 'hh:mm a').fromNow());
        } else {
            console.log("else " + i);
            moment.relativeTimeThreshold('m', 1000);
            $("#train" + i).find(".frequency").html(localStorage.getItem("train" + i + "-frequency"));
            $("#train" + i).find(".arrival").html(moment(localStorage.getItem("train" + i + "-arrival"), 'hh:mm a').format('hh:mm a'));
            $("#train" + i).find(".min-away").html(moment(localStorage.getItem("train" + i + "-arrival"), 'hh:mm a').fromNow());


        }
    }
}

function renderPage() {
    for (let i = 0; i < localStorage.getItem("length"); i++) {
        var addTrainName = localStorage.getItem("train" + i + "-name");
        $("tbody").append("<tr class='text-center' id='train" + i + "'></tr>");
        $("#train" + i).append("<td class='name'>" + addTrainName + "</td>");

        var addTrainDestination = localStorage.getItem("train" + i + "-destination");
        $("#train" + i).append("<td class='destination'>" + addTrainDestination + "</td>");

        var addTrainFrequency = localStorage.getItem("train" + i + "-frequency");
        var addTrainArrival1 = localStorage.getItem("train" + i + "-arrival");
        $("#train" + i).append("<td class='frequency'></td>");
        $("#train" + i).append("<td class='arrival'></td>");
        $("#train" + i).append("<td class='min-away'></td>");


    }
}


// updateTrainTime()

var i = 2

$("#submit").on("click", function () {
    i++;

    var addTrainName = $("#train-name").val();
    $("tbody").append("<tr class='text-center' id='train" + i + "'></tr>");
    $("#train" + i).append("<td class='name'>" + addTrainName + "</td>");
    var addTrainDestination = $("#train-destination").val();
    $("#train" + i).append("<td class='destination'>" + addTrainDestination + "</td>");

    var addTrainFrequency = $("#train-frequency").val();
    var addTrainArrival1 = $("#train-time-1").val()
    $("#train" + i).append("<td class='frequency'></td>");
    $("#train" + i).append("<td class='arrival'></td>");
    $("#train" + i).append("<td class='min-away'></td>");

    localStorage.setItem("train" + i + "-frequency", addTrainFrequency);
    localStorage.setItem("train" + i + "-arrival", addTrainArrival1);


    train.push({
        name: addTrainName,
        destination: addTrainDestination,
        frequency: parseInt(addTrainFrequency),
        arrival: addTrainArrival1
    })
    var length = localStorage.getItem("length");
    length++;
    localStorage.setItem("length", length);
    console.log(train);
    updateTrainTime();
})

