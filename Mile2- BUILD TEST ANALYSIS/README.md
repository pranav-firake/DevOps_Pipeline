# DevOps_Milestone2

**TEAM NAME:**  Azra

####Team members

2. Pranav Firake; ppfirake@ncsu.edu
3. Ajay Chandra Pendyala; apendya@ncsu.edu
4. Sunil Narasimhamurthy; snarasi5@ncsu.edu
5. Sohan Kunkerkar; sakunker@ncsu.edu


## Ansible Scripts

1. [checkboxio.yml](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone2/checkboxio.yml)
2. [iTrust] (https://github.ncsu.edu/ppfirake/DevOps_Project/tree/DevOps_Milestone2/iTrust/Ansible%20and%20shell%20scripts)

## Screencasts: 

1. [Checkbox.io screencast] (https://youtu.be/rPqQ2FIIG-U)
2. iTrust screencast

a. [Build] (https://www.youtube.com/watch?v=zqexYvXSg3g)

b. [Fuzzer] (https://www.youtube.com/watch?v=MAeK_EkoWLI)

c. [Useless test] (https://www.youtube.com/watch?v=quY7beqzPvY)



##Build Test & Analysis

# 1. Checkbox.io

## Build & jenkins setup - Checkbox.io

Task : Build a job for Checkbox.io

Please find screencat here https://youtu.be/rPqQ2FIIG-U
 
Steps : 

```
ansible-playbook checkboxio.yml
```

1. With the help of Vagrant-ansible [setup](https://github.com/CSC-510/Course/blob/master/Materials/CM.md) server-node vms for further steps.  
2. Run [playbook]() to install required tools and dependencies. This includes
   a) Tools like Nodejs, npm, nginx, jenkins, Java8, maven, mongodb.
   b) Include Jenkins configuration changes and retry wait time commands in playbook.
   c) Create a job for jenkins with the help of template xml file via playbook. 
      This job will build the checkbox.io by the git repository and 
      execute some shell commands for building checkbox.io and analysing it.
3. Jenkins will be installed on desired ip-address and you can see one created job and it will be successful.
   Repository used for playbook is [link](https://github.com/pranav-firake/checkbox.io)

 Please find code and script here 
  1. [checkboxio.yml](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone2/checkboxio.yml)
  2. [check.sh](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone2/check.sh)
  3. [config.xml](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone2/config.xml)



## Analysis and build failure - Checkbox.io

Task : Analyze the code to detect the errors (Maximum conditions reached, Long method and Complexity threshold) and fail build accordingly. 

Steps :

1. Analysis : 
   Run the analysis tool here [analysis.js](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone2/checkbox.io/analysis.js) that runs on checkbox.io's server-side code and analyzes complexity of code in terms of :

     a. Max condition: Detect the max number of conditions within an if statement in a function (greater than 8).
     
     b. Long method: Detect any long methods (greater than 100 lines of code).
     
     c. The Big O. Detect any method with a big O greater than 3.

2. For Failing the build we are using grep to find failure in 'node analysis.js' and  
   if failure is occured then we are failing the job with exit 1 else it will build the job successfully.

   1. [analysis.js](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone2/checkbox.io/analysis.js)
   2. [checkboxio.yml](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone2/checkboxio.yml)
   3. [shell-script](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone2/check.sh)
   
   For job failure we used following commands
   
   ```
   npm install
   node analysis.js
   if node analysis.js | grep -q 'Status:Failure'; then
       exit 1
   else
      cd server-side/site
      forever start -o out.log -e err.log  server.js
    fi
   ```


# 2. iTrust- [Repo with our changes](https://github.ncsu.edu/snarasi5/iTrust-v23)

1. Build Jobs and Jenkins setup - 20%

The ansible file for the Jenkins setup build job is [here](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone2/iTrust/Ansible%20and%20shell%20scripts/buildjenkinsjob.yml) and the config.xml for this job is [here](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone2/iTrust/Ansible%20and%20shell%20scripts/configMaster.xml). The shell scripts and any other files that the script uses are in the iTrust/Ansible and Shell scripts directory.

The screencast showng the above is [here](https://www.youtube.com/watch?v=zqexYvXSg3g)

2. Test suites, coverage, and test results - 20%

We have used Jacoco plugin for the code coverage which along with other plugins are automatically installed via the ansible script used above. And you can see the test results and the test suite in the video.

3. Test case fuzzer - 20%

The code for the test case fuzzer is [here](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone2/iTrust/fuzzing.js) and we have made a new build job for this. The ansible file for the Testcase fuzzer setup job is [here](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone2/iTrust/Ansible%20and%20shell%20scripts/test_fuzzer.yml) and the config.xml for this job is [here](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone2/iTrust/Ansible%20and%20shell%20scripts/config.xml). Any shell scripts that ansible script uses are in the iTrust/Ansible and Shell scripts directory.

The screencast for this is [here](https://www.youtube.com/watch?v=MAeK_EkoWLI)

4. Useless test detector - 20%

The code for the useles test detector is [here](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone2/iTrust/useless.js) and the sample report that is generated is [here](). The ansible script is [here](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone2/iTrust/Ansible%20and%20shell%20scripts/useless_test.yml) and the config is [here] (https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone2/iTrust/Ansible%20and%20shell%20scripts/configuseless.xml)
The screencast is [here] (https://www.youtube.com/watch?v=quY7beqzPvY)


