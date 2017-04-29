# DevOps_Milestone1

**TEAM NAME:**  Azra

####Team members

2. Pranav Firake; ppfirake@ncsu.edu
3. Ajay Chandra Pendyala; apendya@ncsu.edu
4. Sunil Narasimhamurthy; snarasi5@ncsu.edu
5. Sohan Kunkerkar; sakunker@ncsu.edu


## Contribution : 

Kindly visit https://trello.com/b/dTwOCgKb/devops-milestone-1 for our trello work summary.

In brief : 

Checkbox.io : 

     development : Sohan & Pranav

     test : Sunil & Ajay

iTrust : 

     development : Sunil & Ajay 

     test : Sohan & Pranav

## Ansible Scripts

1. [Checkboc.io] (https://github.ncsu.edu/ppfirake/DevOps_Milestone1/blob/master/abc.yml)
2. [iTrust] (https://github.ncsu.edu/ppfirake/DevOps_Milestone1/blob/master/iTrust/iTrust.yml)

## Screencasts: 

1. [Checkbox.io screencast] (https://youtu.be/bHKwlbAp1-Y)
2. [iTrust screencast] (https://youtu.be/DiTDFWzsl7U)


## For Checkbox.io 

### Instructions for Checkbox.io :

Dependencies : NPM, pip, nginx, node.js, mongodb
NPM modules : express, validator, archiver, json5, jade, emailjs, cors, mongodb, underscore
Configuration Changes : nginx and mongodb

1. Created Vagrant node-host machines. One being ansible server and another as node.
2. Run ansible playbook yaml file. This file will 

   ansible playbook file for checkbox.io is  https://github.ncsu.edu/ppfirake/DevOps_Milestone1/blob/master/abc.yml

   (1) Install dependencies 

   (2) Clone git repository of checkbox.io  

   (3) Install npm on repo cloned

   (4) Copy nginx configuration files

   (5) Install mongod and configure it

   (6) Start nginx service

   (7) Start mongod service

   (8) Install forever.js

   (9) Run server.js from cloned repository using forever.js

3. Now we opened 192.168.33.40 and we got checkbox.io deployed there.
4. For verification, we did sanity checking and then went to 'researchers' and created a survey.
5. We can see successful creation in browser having URL for it 
6. Also we can check it on mongodb data whether it is created.




### Experiences while setting up the system: 

1. NPM packages : 
      we faced some errors for almost every dependency and had to install them.
      
2. marked module : 
      we tried installing by 
      ```
      sudo npm install marked
      ```
      but it did not work. Then we tried sudo npm install marked@0.3.6. We searched on stack-overfow too. But no luck.
      Finally we browsed through npm website and in documentation we got 
      ```
      sudo npm install -g marked
      ```
      It was silly mistake. but took lot of efforts.
      
3. configuring site on 192.168.33.40 instead of 192.168.33.40:3002. I did not restart nginx service and was checking this 
   configuration change to show on browser.
   
4. Survey page issue : when survey was created we got cannot see html rendering on links for survey page. Thing was we mentioned 
   wrong URL in js file. i.e. 192.168.33.40/checkbox.io/studies/ like. Expected was 192.168.33.40/studies/ -ish.

5. Ansible script : we tried to configure it all at node end through multiple ansible scrpts so as to save time. For 
   submission, while merging all of them and adjusting syntax, it took lot of time.

6. setting up local environment variables: we had to do lot of RnD for this and then got hint from slack answers and used it.

7. Overall experience was good and we got to learn many new things and importance of configuration files.



### Issues while replicating this process automatically

1. writing the ansible script : we tried to configure it all at node end through multiple ansible scrpts so as to save time. For 
   submission, while merging all of them and adjusting syntax, it took lot of time.
   
2. whie setting up local environment variables: we had to do lot of RnD for this and then got hint from slack answers and used it.

3. Using forever vs service. we tried to make custom service for running server.js but somehow we faced lots of issues. 
   Finally we decided to move ahead with forever only. As from SE-project we knew how to run using forever.js so we decided 
   to use forever.

4. Multiple Vagrant systems, for deployment we created new sever-client vagrant pair and used them for finalizations.

5. Though we faced lot many issues, it was good learning from them and we got to use and RnD many new things.




### Significant changes in checkbox.io
1. Environment variables
2. Configuration setting
3. URLs in js files
4. result[0] -> study
5. etc
 

## iTrust

While setting up the system for iTrust, we faced many challenges. Understanding the setup document which was provided to us was a task in itself. The following encapsulates our experience and issues with setting up the system and replicating it automcatically:

1. Finding a way to install mysql and bypassing the prompts for password via ansible was an issue.
2. Then, removing case sensitivity from mysql using an ansible playbook was difficult, we had to find a way to exactly place the setting in the [mysqld] section.
3. Configuring tomcat and tomcat user was a very tough part in process to deploying the project.
4. There were many issues with permissions to access manager app on tomcat.
5. It was difficult to automatically update the context.xml of the webapp and the manager.xml of the localhost.
6. There were also issues with tables being empty after the build. Then we had to run the test data generators.
7. There were issues with running tomcat as a service or running it from ./bin/startup.sh.
8. We had to also make use of multiple shell scripts in order to run commands.
9. There was also a difficulty in cloning the repo from ncsu github enterprise. So, we decided to make the ansible script to ask for credentials as soon as the playbook starts on the host machine.
10. We also had to increase the memory of the node machine in order to completely run the tests as they were getting killed before the build ended.



### Instructions for iTrust :

Requirements : Java SE Development Kit 8u112, Apache Tomcat v9.0, MySQL, maven
Config changes: Tomcat, maven


1. Created Vagrant node-host machines. One being ansible server and another as node.
2. Run ansible playbook yaml file. This file will 

   (1) Install dependencies 

   (2) Download and install MySQL, Tomcat

   (3) Configure tomcat users and change the permissions for the admin user.

   (4) Start Tomcat service

   (5) Remove case-sensitivity and then restart MySQL service.

   (6) Update maven settings.

   (7) Clone the repo

   (8) Build the repo

   (9) Deploy it on Tomcat.

3. Now we opened the localhost from the browser and we got iTrust deployed there on Tomcat.
4. For verification,  we logged in and checked for any UI errors etc.

