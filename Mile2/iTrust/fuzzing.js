var fs = require("fs"),
    slash = require('slash'),
    Random = require('random-js'),
    LineReaderSync = require("line-reader-sync"),
    LineByLine = require('line-by-line'),
    path = slash(__dirname);

const execSync = require('child_process').execSync;
var projectFolder = slash("/src/main/edu/ncsu/csc/itrust");

function Fuzzing() {
    execSync("find " + path + projectFolder + " -type f -name '*.java' > " + path + "/source_file_list.txt");
    lineReader = new LineReaderSync(path + "/source_file_list.txt");
    var fileList = lineReader.toLines();
    console.log("Number of source files edited: " + fileList.length);
    if (fileList.length == 0) {
        reject("No Java source files");
        return;
    }
    // set count n
    var n = 1;
    while(n > 0)
    {
        fuzzFiles(fileList, n);
        n--;
    }
}

var gitCommand = function() {
    //console.log("Git add, commit and push shell script being called")
    return execSync("sh " + path + "/commit.sh ").toString();
}

function fuzzFiles(fileList, n) {
    var fileArray = [];
    for (var f in fileList) {
        var file = fileList[f];
        fileArray.push(RandomFileEdit(file, n));
    }
    Promise.all(fileArray).then(gitCommand());
}

function RandomFileEdit(file, n) {
    return new Promise(function(resolve, reject) {
        var content = "";
        var random = new Random(Random.engines.mt19937().seed(0));

        lineReader = new LineByLine(file, {
            encoding: 'utf8',
            skipEmptyLines: false
        });

        lineReader.on('error', function(err) {
            //console.log(err + "\nError reading lines in file " + file);
        });

        lineReader.on('line', function(line) {

            //  var n = 50;
            var chance = random.bool((50/100).toFixed(2));
//            var chance  = true;
            var lineText = line;

            if (chance) {
                if (lineText.includes("==")) {
                    lineText = lineText.replace(/==/g, '!=');

                } else if (lineText.includes("!=")) {
                    lineText = lineText.replace(/!=/g, '==');
                }

//                else if (lineText.includes("<")) {
//                    if(!lineText.includes(">")){
//                        lineText = lineText.replace(/</g, '>');
//                    }
 //               }
 //               else if (lineText.includes(">")) {
  //                  if(!lineText.includes("<") ){
    //                    lineText = lineText.replace(/>/g, '<');
      //              }
    //            }
            }
            line = lineText;
            content += line + "\n";
        });

        lineReader.on('end', function() {
            fs.writeFileSync(file, content);
            resolve("Done: " + file);
        });
    });
}

Fuzzing();
