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
function toBeExecutedOnFirstLoad() {
    console.log("initial");
    localStorage.setItem("length", 3);
    localStorage.setItem("i", 2);
    for (let i = 0; i < localStorage.getItem("length"); i++) {
        // initialTrainSchedule();
        localStorage.setItem("train" + i + "-name", train[i].name);
        localStorage.setItem("train" + i + "-destination", train[i].destination);
        localStorage.setItem("train" + i + "-frequency", train[i].frequency);
        localStorage.setItem("train" + i + "-arrival", train[i].arrival);

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
function updateTrainTime() {
    console.log("update");
    moment.relativeTimeThreshold('m', 1000);
    for (let i = 0; i < localStorage.getItem("length"); i++) {

        console.log(localStorage.getItem("train" + i + "-arrival"));
        if ((moment(localStorage.getItem("train" + i + "-arrival"), "hh:mm a") - moment()) <= 0) {
            while ((moment(localStorage.getItem("train" + i + "-arrival"), "hh:mm a") - moment()) <= 0) {
                console.log("if " + i);
                let temp = moment(localStorage.getItem("train" + i + "-arrival"), 'hh:mm a').add(localStorage.getItem("train" + i + "-frequency"), 'minutes').calendar();
                localStorage.setItem("train" + i + "-arrival", temp);
                $("#train" + i).find(".arrival").html(moment(localStorage.getItem("train" + i + "-arrival"), 'hh:mm a').format('hh:mm a'));
                $("#train" + i).find(".min-away").html(moment(localStorage.getItem("train" + i + "-arrival"), 'hh:mm a').fromNow());
            }
        } else {
            console.log("else " + i);

            $("#train" + i).find(".frequency").html(localStorage.getItem("train" + i + "-frequency"));
            $("#train" + i).find(".arrival").html(moment(localStorage.getItem("train" + i + "-arrival"), 'hh:mm a').format('hh:mm a'));
            $("#train" + i).find(".min-away").html(moment(localStorage.getItem("train" + i + "-arrival"), 'hh:mm a').fromNow());


        }
    }
}

$("#submit").on("click", function () {
    let i = localStorage.getItem("i");
    i++;
    localStorage.setItem("i", i);
    var addTrainName = $("#train-name").val();
    // $("tbody").append("<tr class='text-center' id='train" + i + "'></tr>");
    // $("#train" + i).append("<td class='name'>" + addTrainName + "</td>");
    var addTrainDestination = $("#train-destination").val();
    // $("#train" + i).append("<td class='destination'>" + addTrainDestination + "</td>");

    var addTrainFrequency = $("#train-frequency").val();
    var addTrainArrival1 = $("#train-time-1").val()
    // $("#train" + i).append("<td class='frequency'></td>");
    // $("#train" + i).append("<td class='arrival'></td>");
    // $("#train" + i).append("<td class='min-away'></td>");
    localStorage.setItem("train" + i + "-name", addTrainName);
    localStorage.setItem("train" + i + "-destination", addTrainDestination);
    localStorage.setItem("train" + i + "-frequency", addTrainFrequency);
    localStorage.setItem("train" + i + "-arrival", addTrainArrival1);


    // train.push({
    //     name: addTrainName,
    //     destination: addTrainDestination,
    //     frequency: parseInt(addTrainFrequency),
    //     arrival: addTrainArrival1
    // })
    var length = localStorage.getItem("length");
    length++;
    localStorage.setItem("length", length);
    console.log(train);
    renderPage();
    updateTrainTime();
})