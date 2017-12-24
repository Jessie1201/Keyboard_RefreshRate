/*
	This is the main part of this program to compute the refresh rate of user's keyboard.
*/

//capture the keystrokes holding time
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
    if(timedown.length > 200 && timedown.length < 250){
        document.getElementById("inputinstr").innerHTML = "Almost There!";
    }else if(timedown.length >= 250){
        document.getElementById("inputinstr").innerHTML = "Great! Enough Keystrokes!";
        document.getElementById("inputinstr").style.color = "Blue";
}
});




function download (content, fileName, mimeType){
    var a = document.createElement('a');
    mimeType = mimeType || 'application/octet-stream';
    if (navigator.msSaveBlob) { // IE10
return navigator.msSaveBlob(new Blob([content], { type: mimeType }), fileName);
    } else if ('download' in a) { //html5 A[download]
        a.href = 'data:' + mimeType + ',' + encodeURIComponent(content);
        a.setAttribute('download', fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return true;
    } else { //do iframe dataURL download (old ch+FF):
        var f = document.createElement('iframe');
        document.body.appendChild(f);
        f.src = 'data:' + mimeType + ',' + encodeURIComponent(content);
            setTimeout(function() {
        document.body.removeChild(f);
    }, 300);
    return true;
}
    }
    
//Use like this
var csvContent = "";
for(var i = 0; i < timelast.length; i++) {
    csvContent += timelast[i] + '\n';
}
var csvName = 'records.csv';
