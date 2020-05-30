var stepCount = 0;

// document.getElementById('introcont').onload = function () {
//     /*Execute on every reload on iFrame*/
//     loadCount1++;
//     window.scrollTo(0, 0);
//     if (loadCount1 > 3) {
//         window.scrollTo(0, 0);
//         //s0 = document.getElementById("step0");
//         s1 = document.getElementById("step1");
//         //s0.style.display = "none";
//         s1.style.display = "block";
//     }
// }
//
// document.getElementById('vidcont').onload = function () {
//     /*Execute on every reload on iFrame*/
//     loadCount2++;
//     if (loadCount2 == 2) {
//         window.scrollTo(0, 0);
//         s3 = document.getElementById("step3");
//         s4 = document.getElementById("step4");
//         //s3.style.display = "none";
//         s4.style.display = "block";
//     }
// }
//
// document.getElementById('gform3').onload = function () {
//     /*Execute on every reload on iFrame*/
//         window.scrollTo(0, 0);
// }
//
var videos = [
    '9Wkp2e-S4L4', // Group A part 1 (subs off)
    '01vOeI9iHvw', // Group A part 2 (subs on)
    'hSgGRqicfBo', // Group B part 1 (subs on)
    'XD1nn7CeulQ' // Group B part 2 (subs off)
];

var playerA1; // Group A part 1 (subs off)
var playerA2; // Group A part 2 (subs on)
var playerB1; // Group B part 1 (subs on)
var playerB2; // Group B part 2 (subs off)

var playerDivs = document.querySelectorAll(".vidcont");

var playerDivsArr = [].slice.call(playerDivs); // nodelist to array to use forEach();
var players = new Array(playerDivsArr.length);
var waypoints = new Array(playerDivsArr.length);

function onYouTubeIframeAPIReady() {
    // create yt players
    playerDivsArr.forEach(function (e, i) {
        players[i] = new YT.Player(e.id, {
            height: window.innerHeight,
            width: window.innerWidth,
            videoId: videos[i],
            events: {
                'onStateChange': funcCont[i]
            }
        })
    })
}

var funcCont = [];

funcCont.push(
    function showInfoA1() {
        var state = JSON.parse(event.data);
        if (state["info"] == 0) {
            var videoA1cont = document.getElementById("videoA-part1");
            var infoA1cont = document.getElementById("infoA-part1");
            videoA1cont.style.display = "none";
            infoA1cont.style.display = "block";
            GazeCloudAPI.StopEyeTracking();
            //Send gazeData to server
            request = new XMLHttpRequest()
            request.open("POST", "https://qhcirm-exp.xyz/group9/savegaze", true)
            // request.open("POST", "http://127.0.0.1:5000/savegaze", true)
            request.setRequestHeader("Content-type", "application/json")
            request.send(JSON.stringify(gazeJSON))
        }
    }
);

funcCont.push(
    function showInfoA2() {
        var state = JSON.parse(event.data);
        if (state["info"] == 0) {
            var videoA2cont = document.getElementById("videoA-part2");
            var infoA2cont = document.getElementById("infoA-part2");
            videoA2cont.style.display = "none";
            infoA2cont.style.display = "block";
            GazeCloudAPI.StopEyeTracking();
            //Send gazeData to server
            request = new XMLHttpRequest()
            request.open("POST", "https://qhcirm-exp.xyz/group9/savegaze", true)
            // request.open("POST", "http://127.0.0.1:5000/savegaze", true)
            request.setRequestHeader("Content-type", "application/json")
            request.send(JSON.stringify(gazeJSON))
        }
    }
);

funcCont.push(
    function showInfoB1() {
        var state = JSON.parse(event.data);
        if (state["info"] == 0) {
            var videoB1cont = document.getElementById("videoB-part1");
            var infoB1cont = document.getElementById("infoB-part1");
            videoB1cont.style.display = "none";
            infoB1cont.style.display = "block";
            GazeCloudAPI.StopEyeTracking();
            //Send gazeData to server
            request = new XMLHttpRequest()
            request.open("POST", "https://qhcirm-exp.xyz/group9/savegaze", true)
            // request.open("POST", "http://127.0.0.1:5000/savegaze", true)
            request.setRequestHeader("Content-type", "application/json")
            request.send(JSON.stringify(gazeJSON))
        }
    }
);

funcCont.push(
    function showInfoB2() {
        var state = JSON.parse(event.data);
        if (state["info"] == 0) {
            var videoB2cont = document.getElementById("videoB-part2");
            var infoB2cont = document.getElementById("infoB-part2");
            videoB2cont.style.display = "none";
            infoB2cont.style.display = "block";
            GazeCloudAPI.StopEyeTracking();
            //Send gazeData to server
            request = new XMLHttpRequest()
            request.open("POST", "https://qhcirm-exp.xyz/group9/savegaze", true)
            // request.open("POST", "http://127.0.0.1:5000/savegaze", true)
            request.setRequestHeader("Content-type", "application/json")
            request.send(JSON.stringify(gazeJSON))
        }
    }
);

// function onYouTubePlayerAPIReady() {
//     playerA1 = new YT.Player('videoA-part1', {
//         //height: '390',
//         //width: '640',
//         height: window.innerHeight,
//         width: window.innerWidth,
//         videoId: videos[0],
//         events: {
//             //'onReady': onPlayerReady,
//             'onStateChange': onPlayerStateChange
//         }
//     });
//     // playerA2 = new YT.Player('videoA-part2', {
//     //     //height: '390',
//     //     //width: '640',
//     //     height: window.innerHeight,
//     //     width: window.innerWidth,
//     //     videoId: videos[1],
//     //     events: {
//     //         //'onReady': onPlayerReady,
//     //         'onStateChange': onPlayerStateChange
//     //     }
//     // });
//     playerB1 = new YT.Player('videoB-part2', {
//         //height: '390',
//         //width: '640',
//         height: window.innerHeight,
//         width: window.innerWidth,
//         videoId: videos[2],
//         events: {
//             //'onReady': onPlayerReady,
//             'onStateChange': onPlayerStateChange
//         }
//     });
//     // playerB2 = new YT.Player('videoB-part2', {
//     //     //height: '390',
//     //     //width: '640',
//     //     height: window.innerHeight,
//     //     width: window.innerWidth,
//     //     videoId: videos[3],
//     //     events: {
//     //         //'onReady': onPlayerReady,
//     //         'onStateChange': onPlayerStateChange
//     //     }
//     // });
// }

//
// // autoplay video
// // function onPlayerReady(event) {
// //     event.target.playVideo();
// // }
// // when video ends
//
function onPlayerStateChange(event) {
    // if (event.data === 0) {
    //     var s2 = document.getElementById("step2");
    //     var s3 = document.getElementById("step3");
    //     s2.style.display = "none";
    //     s3.style.display = "block";
    //     GazeCloudAPI.StopEyeTracking();
    //     //caliComp = false;
    //     //Send gazeData to server
    //     request = new XMLHttpRequest()
    //     request.open("POST", "https://qhcirm-exp.xyz/savegaze", true)
    //     // request.open("POST", "http://127.0.0.1:5000/savegaze", true)
    //     request.setRequestHeader("Content-type", "application/json")
    //     request.send(JSON.stringify(gazeJSON))
    // }
}

//document.getElementById("calibrate").onclick =

var buttonFunc = function () {
    GazeCloudAPI.StartEyeTracking();

    var rad = document.getElementsByName('radiobutton');
    for (var i = 0, length = rad.length; i < length; i++) {
        if (rad[i].checked) {
            var group = rad[i].value;
            break;
        }
    }

    var introCont = document.getElementById("step1");
    introCont.style.display = 'none';

    var vidcontA1 = document.getElementById("videoA-part1");
    var vidcontB1 = document.getElementById("videoB-part1");
    var vidcontA2 = document.getElementById("videoA-part2");
    var vidcontB2 = document.getElementById("videoB-part2");

    var groupACont = document.getElementById("step-groupA");
    var groupBCont = document.getElementById("step-groupB");

    var infoA1cont = document.getElementById("infoA-part1");
    var infoB1cont = document.getElementById("infoB-part1");

    if (group == "groupA") {

        if (stepCount == 0) {
            groupACont.style.display = 'block';
            vidcontA1.style.display = 'block';
            stepCount++;
        } else {
            infoA1cont.style.display = 'none';
            vidcontA2.style.display = 'block';
        }
    } else {
        if (stepCount == 0) {
            groupBCont.style.display = 'block';
            vidcontB1.style.display = 'block';
            stepCount++;
        } else {
            infoB1cont.style.display = 'none';
            vidcontB2.style.display = 'block';
        }
    }

    //   var playerDivs = document.querySelectorAll(".vidcont");
    //   playerDivs.forEach(function(e, i) {
    //     if(e.style.display == "block"){
    //       players[i].playVideo();
    //     }
    //   }
    // );

    // document.getElementById("calibrate").disabled = true;
    // document.getElementById("b0").disabled = false;
};

var calibrationButtons = document.querySelectorAll(".calibrateButton");

calibrationButtons.forEach(function (e, i) {
    e.onclick = buttonFunc;
})


//Button step 0 -> inits vid1
// document.getElementById("b0").onclick = function () {
//     var s1 = document.getElementById("step1");
//     var s2 = document.getElementById("step2");
//     s1.style.display = "none";
//     s2.style.display = "block";
// };
