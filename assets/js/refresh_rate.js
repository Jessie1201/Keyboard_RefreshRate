/*
	This is the main part of this program to compute the refresh rate of user's keyboard.
*/

/*capture the keystrokes holding time */

var timedown = [];
document.addEventListener("keydown", function(){
    // get the timestamp when the key is pressed down
    var d1 = new Date();
    timedown.push(d1.getTime());
});

var timeup =[];
var timelast = [];
document.addEventListener("keyup", function(){
    // get the timestamp when the key is lossed up
    var d2 = new Date();
    timeup.push(d2.getTime());

    // calculate keys holding time and print it
    for(i = timeup.length - 1; i < timeup.length; i++){
        timelast.push(timeup[i] - timedown[i]);
    }
    document.getElementById("timelast").innerHTML = timelast;

    // when get more than 500 data, alter input instruction
    if(timedown.length > 120 && timedown.length < 180){
        document.getElementById("inputinstr").innerHTML = "Almost There!";
    }else if(timedown.length >= 180){
        document.getElementById("inputinstr").innerHTML = "Great! Enough Keystrokes!";
        document.getElementById("inputinstr").style.color = "Blue";
    }
});


/* Statistical analysis: count how many times per milisecond appears */

document.getElementById("resultbutton").onclick = function(){getScanrate()};
function getScanrate(){
    // Get the Frequency of Each Pressing Time and Save to Array
    // get the max & min in timelast array
    var mintime = Math.min(...timelast);
    var maxtime = Math.max(...timelast);
    var frequency = [];
    // loop to count frequency
    for(i = mintime; i <= maxtime; i++){
        var n = 0;
        for(j = 0; j < timelast.length; j++){
            if(timelast[j] == i){
                n++;
            }
        }
        frequency.push(n);
    }

    // call FFT transformation
    // infer the size of input, aka k
    for(i=0; i <20; i++){
        if(frequency.length > Math.pow(2, i) && frequency.length < Math.pow(2, i+1)){
            var k = Math.pow(2, i);
        }
    }
    
    // get the first k data into new input array
    var inputfrequency = [];
    for(i = 0; i < k; i++){
        inputfrequency.push(frequency[i]);
    }
    
    // start FFT
    Fft(k/2);
    function Fft(size) {
        // split original data by half into inputreal and inputimag
        var inputreal = [];
        for(i = 0; i < inputfrequency.length/2; i++){
            inputreal.push(inputfrequency[i]);
        }
        var inputimag = [];
        for(i = inputfrequency.length/2; i < inputfrequency.length; i++){
            inputimag.push(inputfrequency[i]);
        }
        var refoutreal = new Array(size);
        var refoutimag = new Array(size);
        naiveDft(inputreal, inputimag, refoutreal, refoutimag, false);

        var actualoutreal = inputreal.slice(0);
        var actualoutimag = inputimag.slice(0);
        transform(actualoutreal, actualoutimag);
    }

    //Naive reference computation functions
    function naiveDft(inreal, inimag, outreal, outimag, inverse) {
        if (inreal.length != inimag.length || inreal.length != outreal.length || outreal.length != outimag.length)
            throw "Mismatched lengths";

        var n = inreal.length;
        var coef = (inverse ? 2 : -2) * Math.PI;
        for (var k = 0; k < n; k++) {  // For each output element
            var sumreal = 0;
            var sumimag = 0;
            for (var t = 0; t < n; t++) {  // For each input element
                var angle = coef * (t * k % n) / n;  // This is more accurate than t * k
                sumreal += inreal[t]*Math.cos(angle) - inimag[t]*Math.sin(angle);
                sumimag += inreal[t]*Math.sin(angle) + inimag[t]*Math.cos(angle);
            }
            outreal[k] = sumreal;
            outimag[k] = sumimag;
        }
        
        
        // compute the average of the intervals of outreal array
        // peak saves the time index of all peaks
        var peak = [0];
        for(i = 1; i < outreal.length-1; i++){
            if(outreal[i] > outreal[i-1] && outreal[i] > outreal[i+1]){
                peak.push(i);
            }
        }
        // interval saves the interval of all values in peak
        var interval = [];
        for(i = 0; i < peak.length-1; i++){
            interval.push(peak[i+1] - peak[i]);
        }
        // compute the mean value in interval array
        var sum = 0;
        for(i = 0; i < interval.length; i++){
            sum += interval[i];
        }
        var mean = Number((sum/interval.length).toFixed(3));
        // the scan rate is the inverse of mean interval
        var scanrate = Number((1000/mean).toFixed(2));        
        document.getElementById("scanrate").innerHTML = "<br />" + scanrate + "Hz" 
            + "<br />" + "It means your keyboard refreshes every " + mean + "ms" 
            + "<br /><br /><br /><br />" + "The computing approach is to look in to the pressing time that your keyboard is able to recognize. More data lies around specific time points, the interval of them is right the refreshing period of your keyboard.";
    }
}

