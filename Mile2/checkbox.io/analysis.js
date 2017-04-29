var esprima = require("esprima");
var options = {tokens:true, tolerant: true, loc: true, range: true };
var fs = require("fs");
var glob = require('glob');
//emitter.setMaxListeners();


var fileBuilders = {};

function main()
{
   glob('./**/server-side/**/*.js',{ignore:['./node_modules/**','./**/node_modules/**','./**/ana3.js','./**/marqdown.js','./**/analysis.js']} ,function( err, files ) {
           //console.log("files  ");
	   //console.log(files);
      files.forEach(function(file,index){
         //console.log(file.toString().indexOf('node_modules'));
         if(file.toString().indexOf('node_modules') < 0) {



         fileBuilders[file] = {};
         fileBuilders[file].builders = [];
         complexity(file);

         for( var i in fileBuilders[file].builders)
         {
            fileBuilders[file].builders[i].report();

         }
         }
      });
   });

}


function ComplexityBuilder()
{
        this.StartLine = 0;
   this.EndLine = 0;
   this.numOfLines = 0;
        this.FunctionName = "";
        this.ParameterCount  = 0,
        this.SimpleCyclomaticComplexity = 1;
        this.MaxNestingDepth    = 0;
        this.MaxConditions      = 0;
   this.fileName = "";

        this.report = function()
        {
      if(this.MaxConditions >8 || this.numOfLines >100 || this.MaxNestingDepth >3){

         console.log(
            (
               "FileName:{0}\t{1}(): {2}\n" +
               "============\n" +
               "Maximum Conditions: {3}\t" +
               "Number of Lines: {4}\t"+
               "Big Oh Complexity: {5} \t Status:Failure\n\n"
                )
            .format(this.fileName, this.FunctionName, this.StartLine,
                     this.MaxConditions, this.numOfLines, this.MaxNestingDepth)
         );
		/* if(this.MaxConditions >8){

         console.log(
            (
               "============\n" +
	       "Build will fail because Maximum conditions are more than 8 for FileName:{0}\n having function {1}()"
                )
            .format(this.fileName, this.FunctionName)
         );
      } 
		if(this.numOfLines >100){

         console.log(
            (
               "============\n" +
	       "Build will fail because number of lines are more than 100 for FileName:{0}\n having function {1}()"
                )
            .format(this.fileName, this.FunctionName)
         );
      } 
		if(this.MaxNestingDepth >3){

         console.log(
            (
               "============\n" +
	       "Build will fail because Big-Oh is more than 3 for FileName:{0}\n having function {1}()"
                )
            .format(this.fileName, this.FunctionName)
         );
      } */
      }
		
		
		
		
		else{

         /* console.log(
            (
               "FileName:{0}\t{1}(): {2}\n" +
               "============\n" +
               "Maximum Conditions: {3}\t" +
               "Number of Lines: {4}\t"+
               "Big Oh Complexity: {5} \t Status:Success\n\n"
            )
            .format(this.fileName, this.FunctionName, this.StartLine,
                     this.MaxConditions, this.numOfLines, this.MaxNestingDepth)
         ); */
      }


};    
	/*  process.stdout.on('error', function( err ) {
    if (err.code == "EPIPE") {
        process.exit(0);
    }
}); */
}


// A function following the Visitor pattern. Provide current node to visit and function that is evaluated at each node.
function traverse(object, visitor)
{
    var key, child;

    visitor.call(null, object);

    for (key in object) {
        if (object.hasOwnProperty(key)) {
            child = object[key];
            if (typeof child === 'object' && child !== null) {
                traverse(child, visitor);
            }
        }
    }
}

// A function following the Visitor pattern.
// Annotates nodes with parent objects.
function traverseWithParents(object, visitor)
{
    var key, child;

    visitor.call(null, object);

    for (key in object) {
        if (object.hasOwnProperty(key)) {
            child = object[key];
            if (typeof child === 'object' && child !== null && key != 'parent')
 {
                child.parent = object;
                                        traverseWithParents(child, visitor);
            }
 }
    }
}


// A function following the Visitor pattern but allows canceling transversal if visitor returns false.
function traverseWithCancel(object, visitor)
{
    var key, child;

    if( visitor.call(null, object) )
    {
            for (key in object) {
                if (object.hasOwnProperty(key)) {
                    child = object[key];
                    if (typeof child === 'object' && child !== null) {
                        traverseWithCancel(child, visitor);
                    }
                }
            }
         }
}

function complexity(filePath)
{
        var buf = fs.readFileSync(filePath, "utf8");
        var ast = esprima.parse(buf, options);

        var i = 0;
        // Tranverse program with a function visitor.
        traverseWithParents(ast, function (node)
        {
                if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')
                {
         // console.log(node.loc.start.line +' '+node.loc.end.line+'*************');

        var builder = new ComplexityBuilder();

           builder.fileName = filePath;
           // console.log(" "+builder.fileName);
                builder.FunctionName = functionName(node);
                        builder.StartLine    = node.loc.start.line;
         builder.EndLine = node.loc.end.line;
         builder.numOfLines = builder.EndLine - builder.StartLine;
           //console.log("debg2  "+ builder.numOfLines);
                // fileBuilders[filePath].builders[builder.FunctionName] = builder;

         var conditions = 0,maxConditions = 0,nesting = 0, maxNesting = 0;

         traverseWithParents(node, function(node){
            if(node.type === 'IfStatement'){
               conditions = 0;
 traverseWithParents(node.test, function(node){
                  if(node.type === 'LogicalExpression'){
                     conditions++;
					   }
               });
               if(conditions > maxConditions){
                  maxConditions = conditions;
               }
            }
            builder.MaxConditions = maxConditions+1;

            if(node.type === 'ForStatement' || node.type === 'WhileStatement'){
               nesting = 1;
               traverseWithParents(node.body, function(node){
                  if(node.type === 'ForStatement' || node.type === 'WhileStatement'){
                     nesting++;
                  }
               });
               if(nesting > maxNesting){
                  maxNesting = nesting;
               }

            }
            
            builder.MaxNestingDepth = maxNesting - 1;
         });
	 if(builder.MaxNestingDepth==-1){builder.MaxNestingDepth==0;}

         fileBuilders[filePath].builders.push(builder);
            //console.log("debug 3    :  "+builder.MaxNestingDepth);
                }

        });

}
// Helper function for counting children of node.
function childrenLength(node)
{
        var key, child;
        var count = 0;
        for (key in node)
        {
                if (node.hasOwnProperty(key))
                {
                        child = node[key];
                        if (typeof child === 'object' && child !== null && key != 'parent')
                        {
                                count++;
                        }
                }
        }
        return count;
}


// Helper function for checking if a node is a "decision type node"
function isDecision(node)
{
        if( node.type == 'IfStatement' )
        {
                // Don't double count else/else if
 if( node.parent && node.parent.type == 'IfStatement' && node.parent["alternate"] )
                {
                        return false;
                }
                return true;
        }

        if( node.type == 'ForStatement' || node.type == 'WhileStatement' ||
                 node.type == 'ForInStatement' || node.type == 'DoWhileStatement')
        {
                return true;
        }
        return false;
}

// Helper function for printing out function name.
function functionName( node )
{
        if( node.id )
        {
                return node.id.name;
        }
        return "anon function @" + node.loc.start.line;
}

// Helper function for allowing parameterized formatting of strings.
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
  return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

main();


                                                                                                                   

																												   
