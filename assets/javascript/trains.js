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
        arrival: "07:00 p"
    },
    {
        frequency: 90,
        arrival: "06:45 p"
    },
    {
        frequency: 600,
        arrival: "10:00 p"
    }
];

// // Updating train1 stats
// $("#train1").find(".frequency").html(train1.frequency);
// $("#train1").find(".arrival").html(train1.firstArrival);
// $("#train1").find(".arrival").html(moment(train1.firstArrival, 'HH:mm').format('hh:mm a'));
// $("#train1").find(".min-away").html(moment(train1.firstArrival, 'HH:mm').fromNow());

// // Updating train2 stats
// $("#train2").find(".frequency").html(train2.frequency);
// $("#train2").find(".arrival").html(moment(train2.arrival, 'hh:mm a').format('hh:mm a'));
// $("#train2").find(".min-away").html(moment(train2.arrival, 'hh:mm a').fromNow());
// if (train2.arrival <= moment().format('hh:mm:ss a')) {

//     train2.arrival = moment(train2.arrival, 'hh:mm a').add(train2.frequency, 'minutes').calendar();
//     $("#train2").find(".arrival").html(moment(train2.arrival, 'hh:mm a').format('hh:mm a'));
//     $("#train2").find(".min-away").html(moment(train2.arrival, 'hh:mm a').fromNow());
// }
// console.log(train2.arrival);
// $("#train2").find(".arrival").html(moment(train2.arrival, 'hh:mm a').format('hh:mm a'));


// // Updating train3 stats
// $("#train3").find(".frequency").html(train3.frequency);
// $("#train3").find(".arrival").html(train3.firstArrival);
// $("#train3").find(".arrival").html(moment(train3.firstArrival, 'HH:mm').format('hh:mm a'));
// $("#train3").find(".min-away").html(moment(train3.firstArrival, 'HH:mm').fromNow());


function updateTrainTime(i) {

    $("#train" + i).find(".frequency").html(train[i].frequency);
    if (train[i].arrival <= moment().format('hh:mm:ss a')) {
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
    }
    localStorage.setItem("train" + i + "-frequency", train[i].frequency);
    localStorage.setItem("train" + i + "-arrival", train[i].arrival);

}

for (let i = 0; i < 3; i++) {
    updateTrainTime(i);

}