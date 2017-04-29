var fs = require('fs');
testResultsString = fs.readFileSync("testResults", 'utf8');
jsonObj = JSON.parse(testResultsString);
loopCount = jsonObj.loopCount;
function report() {
    var uselessTests = [];
    var usefulTests = [];

    console.log('*******************Test report***************');
    for (var name in jsonObj) {
        if (name == 'loop')
            continue;
        if (jsonObj[name].success == loopCount || jsonObj[name].failure == loopCount)
            uselessTests.push(name);
        else
            usefulTests.push(name);
    }

    console.log('*******************Useless tests list***************');
    for (i = 0; i < uselessTests.length; i++) {
        console.log(uselessTests[i]);
    }
    console.log('*******************Useful tests list***************');
    for (i = 0; i < usefulTests.length; i++) {
        console.log(usefulTests[i]);
    }
}

report();
