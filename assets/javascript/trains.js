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
        frequency: 60,
        arrival: "06:30 a"
    },
    {
        frequency: 90,
        arrival: "08:00 a"
    },
    {
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

function initialTrainSchedule() {
    for (let i = 0; i < train.length; i++) {
        if (train[i].arrival <= moment().format('hh:mm a')) {
            console.log("if " + i);
            train[i].arrival = moment(train[i].arrival, 'hh:mm a').add(train[i].frequency, 'minutes').calendar();
            console.log(train[i].arrival);
            $("#train" + i).find(".arrival").html(moment(train[i].arrival, 'hh:mm a').format('hh:mm a'));
            $("#train" + i).find(".min-away").html(moment(train[i].arrival, 'hh:mm a').fromNow());
        } else {
            console.log("else " + i);
            $("#train" + i).find(".frequency").html(train[i].frequency);
            $("#train" + i).find(".arrival").html(moment(train[i].arrival, 'hh:mm a').format('hh:mm a'));
            $("#train" + i).find(".min-away").html(moment(train[i].arrival, 'hh:mm a').fromNow());
            console.log(localStorage.getItem("train" + i + "-frequency", train[i].arrival))
        }
    }
}
console.log(moment().format('hh:mm:ss a'));

function updateTrainTime() {
    console.log("update");
    for (let i = 0; i < train.length; i++) {
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


function toBeExecutedOnFirstLoad() {
    console.log("initial");
    for (let i = 0; i < 3; i++) {
        initialTrainSchedule();
        localStorage.setItem("train" + i + "-frequency", train[i].frequency);
        localStorage.setItem("train" + i + "-arrival", train[i].arrival);
    }
}

if (localStorage.getItem('first') === null) {
    toBeExecutedOnFirstLoad();
    localStorage.setItem('first', 'nope!');
}

updateTrainTime()

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
        frequency: parseInt(addTrainFrequency),
        arrival: addTrainArrival1
    })

    console.log(train);
    initialTrainSchedule();
})

