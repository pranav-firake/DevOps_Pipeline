# DevOps_Special_Milestone

**TEAM NAME:**  Azra

#### Team members

2. Pranav Firake; ppfirake@ncsu.edu
3. Ajay Chandra Pendyala; apendya@ncsu.edu
4. Sunil Narasimhamurthy; snarasi5@ncsu.edu
5. Sohan Kunkerkar; sakunker@ncsu.edu


## Project Presentation: 

Please find [pdf](https://github.com/pranav-firake/DevOps_Pipeline/blob/master/Mile4-%20CleanUp%20Monkey%20&%20Gremlin%20Monkey/Devops%20project.pdf)
or [pptx](https://github.com/pranav-firake/DevOps_Pipeline/blob/master/Mile4-%20CleanUp%20Monkey%20&%20Gremlin%20Monkey/Devops%20project.pptx)

Please find presentation [screencast](https://www.youtube.com/watch?v=prwYZsg7wu4)



## Code 



## Deliverable :
 
 ** For this milestone we developed and applied 2 monkeys to our devOps pipeline. These include **
 1. Clean up Monkey
 2. Gremlin Monkey
 


## Clean up monkey

 ![Architecture](https://github.com/pranav-firake/DevOps_Pipeline/blob/master/Mile4-%20CleanUp%20Monkey%20&%20Gremlin%20Monkey/cleanup.png)


### Purpose:
  - This monkey can be forever run on server side using cleanup.js
  - If size of the log files or some inportant files on server that are important 
  but do not contribute to execution of the application raises more than the threshold we set,
  - Cleanup monkey would back up this file into backup server and delete those log files from running server,
  cleaning up the server for healthy memory environment. 


### Problem:
   In multiserver environment, there can be the scenario when the log files or the files which are important but they do not contribute to execution of the application.
   

### Solution: 
   Clean up monkey will track the log files and if their size gets greater than limit then it copies those files to backup server and deletes them from running server
   
   
   ![Architecture](https://github.com/pranav-firake/DevOps_Pipeline/blob/master/Mile4-%20CleanUp%20Monkey%20&%20Gremlin%20Monkey/Z_Cleanup_monkey.png)
   
### Advantages:
     
     - Backing up important files
     - Cleaning up the running server so as to free resources above threshold
     - Forever running so readily automated
     
     
   ======================================================================================================================================
   
   
 ## Gremlins Monkey
 
   ![image](https://github.com/pranav-firake/DevOps_Pipeline/blob/master/Mile4-%20CleanUp%20Monkey%20&%20Gremlin%20Monkey/gremlin.jpg)

### Purpose: 
    - To enable gremlin testing for checkbox.io application
    - Gremlin testing is performed to check robustness of the web application.
    - Here Gremlin monkey will constantly horde attack in terms of 
    > Random clicking
    > Random scrolling
    > Uneven navigations
    - Browser logs can be evaluated same time to see for errors if any
    - This confirms the robustness of application
    
### Problem:
   Web application to be robust, it must be tested for varied user inputs. 
   This includes random clicks, unexpected user behaviour 
  
### Solution: 
Gremlins.js is a monkey testing library written in JavaScript, for Node.js and the browser.It provides the functionality to perform random clicks and navigations on application and to check the robustness of web applications by unleashing a horde of undisciplined gremlins. While implementing this monkey, we customized the library provided by Gremlins.js and added those which are required for checking the robustness of checkboxio application. </br>
We came up wiith two approaches:<br>
<b>1. Include JavaScript inside webapplication page where we need to perform testing </b><br>
We embedded following script in the html page where we need to perform monkey testing.We have created one link on checkboxio application with the name "Horde-Attack" where we have given the reference of script which is mentioned below.Once we click on that link,it will start the monkey testing.<br>
```
<script>
   var log = Minilog('checkboxio')
   Minilog.enable();
   gremlins
       .createHorde()
       .strategy(gremlins.strategies.distribution([0.3,0.3,0.3,0.1]).delay(50).nb(1000))
       .gremlin(gremlins.species.formFiller())
       .gremlin(gremlins.species.clicker().clickTypes(['click','dblclick']))
       .gremlin(gremlins.species.toucher())
       .gremlin(gremlins.species.scroller())
       .mogwai(gremlins.mogwais.alert())
       .mogwai(gremlins.mogwais.fps())
       .mogwai(gremlins.mogwais.gizmo().maxErrors(3))
       .logger(log)
       .unleash();
</script>
```
<b>2. Use grunt file which will trigger the gremlin.js libraries to perform testing on checkboxio applciation.</b><br>
This solution is an extension to previous one where instead of writing this script across different HTML page to test the robustness of an application,we are making use of grunt file which will provide gremlin.js libraries used to check against an application.In this case, it would be checkboxio.<br>
To set up an environment we need grunt,grunt-gremlins which can be installed using NPM pacakage manager or it can be automated 
using ansible-playbook. We can make use of following Gruntfile.js file.<br>
```
module.exports = fucntion(grunt){
grunt.initConfig({
    gremlins :{
    tests: {
      options: {
        path: "./public_html/index.html"
      }
    }
      }
    });
   grunt.loadNpmTasks('grunt-gremlins');
   grunt.registerTask('default',['gremlins']);

  };
```
Gruntfile should be present inside an applcaition folder in order to work this testing properly.
Here is the screenshot for the test that we perfomed on Index.html page with first approach.<br><br>
![Screenshot](https://github.com/pranav-firake/DevOps_Pipeline/blob/master/Mile4-%20CleanUp%20Monkey%20&%20Gremlin%20Monkey/gremlin%20attack.png)<br><br>
One of the challenging part about this monkey is getting the application testing logs. The logs which are generated after testing are available in browsers applcation log file which can be extracted easily by following the below instructions:<br>

1. Firstly, we must enable logging for the browser
2. Quit any running instance of chrome.
3. Launch /Applications/Utilities/Terminal.app
4. At the command prompt enter:
  `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --enable-logging --v=1`
5. The output will be saved to the file chrome_debug.log in Chrome's user data directory (~/Library/Application Support/Google/Chrome/Default)
6. You can now the access the log file and can represent it in a logical manner you'd want it to be in.


### Advantages:
     
     - Testing robustness of application
     - Getting idea of user random behaviour
     - Forever running so readily automated
   

     
