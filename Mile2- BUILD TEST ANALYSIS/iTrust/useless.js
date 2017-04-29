
var fs = require('fs'),
    slash = require('slash'),
    xml2js  = require('xml2js'),
    LineReaderSync = require("line-reader-sync"),
    Random = require('random-js'),
    path = slash(__dirname),

const execSync = require('child_process').execSync;

var testResults = {};

loopCount = 1;

testResults.loop = loopCount;

function GenerateTestReport(){

    execSync("find " + path + '/target/surefire-reports' + " -type f -name '*.xml' > " + path + "/test_report.txt");
    var lineReader = new LineReaderSync(path + "/test_report.txt");
    var fileList = lineReader.toLines();
    for(var i=0; i < fileList.length; i++)
    {
        var filename = fileList[i];

        var xml = fs.readFileSync(filename).toString();
        parseString = require('xml2js').parseString;
        var json = {};

        parseString(xml, function (error, data) {
            // Module returns a JS object
            json = data;
            // Format as a JSON string
            //console.log(JSON.stringify(data));
        });

        var result = json;
        // console.log("***********JSON**************");
        // console.log(json);
        for(var testCase in result.testsuite.testcase)
        {

            var t = {};
            var failed = false;
            if(result.testsuite.testcase[testCase].hasOwnProperty("failure"))
            {
                // Failed test, make failed boolean true
                failed = true;
            }

            var key = result.testsuite.testcase[testCase]['$'].classname+":"+result.testsuite.testcase[testCase]['$'].name;
            if(key in testResults)
            {
                if(failed){
                    testResults[key].failure++;
                    console.log("Old testResults[key].failure++" + key)
                }
                else
                    testResults[key].success++;
            }
            else
            {
                var temp = {
                    success: 0,
                    failure: 0
                };

                testResults[key] = temp;

                if(failed){
                    testResults[key].failure++;
                    console.log("New testResults[key].failure++" + key);

                }
                else
                    testResults[key].success++;
            }
        }
    }

    var testResultsJson = JSON.stringify(testResults);
    //console.log("*************Test success failure results*************");
    //console.log(testResultsJson);
    fs.writeFileSync("testResults", testResultsJson, 'utf8');
}

GenerateTestReport();
