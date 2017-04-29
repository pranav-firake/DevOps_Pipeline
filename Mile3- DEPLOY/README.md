# DevOps_Milestone3

**TEAM NAME:**  Azra

#### Team members

2. Pranav Firake; ppfirake@ncsu.edu
3. Ajay Chandra Pendyala; apendya@ncsu.edu
4. Sunil Narasimhamurthy; snarasi5@ncsu.edu
5. Sohan Kunkerkar; sakunker@ncsu.edu




## Ansible Scripts

#### 1. Checkbox.io
   [AWS creation](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone3/awscreation.yml) <br>
   [AWS production](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone3/Production_CheckboxIO.yml)
   
#### 2. iTrust
   [Jenkins Setup](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone3/iTrust/Jenkins_setup_githook/buildJenkins.yaml)
   <br>[Provision and deploy](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone3/iTrust/Production_config_deploy_rolling/provision.yml)
  <br> [Rolling update](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone3/iTrust/Production_config_deploy_rolling/tomcat.yml)
   

## Screencasts: 

1. Checkbox.io

      [Deploy](https://youtu.be/Iigk39zlQJo)
         
      [Load Balancer](https://www.youtube.com/watch?v=Q0oS2Di4xp0&t=1s)
         
      [Feature Flag](https://youtu.be/gl2EIgTJtRs)
      
      [Canary](https://www.youtube.com/watch?v=SUPKaNurG-Q)

2. iTrust
         - [Deployment & Rolling Updates](https://youtu.be/0JIn7IL5PU8)



## For Checkbox.io 

### Instructions for Deploying Checkbox.io :

Repository used for Checkbox.io is [repo](https://github.com/pranav-firake/cb)

Dependencies : NPM, pip, nginx, node.js, mongodb
NPM modules : express, validator, archiver, json5, jade, emailjs, cors, mongodb, underscore
Configuration Changes : nginx and mongodb
VMs : 2 AWS instances : 
1. Host (for jenkins server)
2. Prod (for production environment)

![Image for Provision](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone3/archi.png)


### Steps for Checkbox.io DEPLOYMENT: 

1. Created AWS host machines. We used (https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone3/awscreation.yml) for creating the aws instance as Host.
2. Run ansible playbook yaml file. This file will install necessary dependencies and would setup jenkins server as aws host
3. On AWS Host : At port 8080 there will be jenkins running. Here we will create on job for deploying the checkbox.io to prod (another AWS instance serving as production). we have used git hook for it. git hook will build the application and deploy the application on Production (prod).

4. Production yml (https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone3/Production_CheckboxIO.yml) file will address prod AWS instance and it will serve for 
  
   (1) Install required dependencies 

   (2) Clone git repository of checkbox.io  

   (3) Install npm on repo cloned

   (4) Copy nginx configuration files

   (5) Install mongod and configure it

   (6) Start nginx service

   (7) Start mongod service

   (8) Install forever.js

   (9) Run server.js from cloned repository using forever.js

3. Now we can open prod server, we got checkbox.io deployed there.
4. For verification, we did sanity checking and then went to 'researchers' and created a survey.
5. We can see successful creation in browser having URL for it 
6. Also we can check it on mongodb data whether it is created.



## LOAD BALANCER IN CHECKBOX :

We implemented load balancer using Balancer.js(). 
We are using 2 files one with stable IPs and other with canary IP. 
On local we are mirroring the traffic of application. So we are balancing the load through redirecting servers by toggling their callings. So load is balanced.

![Architecture](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone3/load.png)

Steps : 

run 
```
node balance.js
```

Files :

1. Load balancer : (https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone3/Load%20balancer%20%26%20Canary%20Releease/balance.js)

2. Server IP files : 

    [Folder](https://github.ncsu.edu/ppfirake/DevOps_Project/tree/DevOps_Milestone3/Load%20balancer%20%26%20Canary%20Releease)
        
3. Screencast : [Load Balancer](https://www.youtube.com/watch?v=Q0oS2Di4xp0&t=1s)


## FEATURE FLAGS IN CHECKBOX :

We used redis server master slave sentinel for toggling feature flags on and off. Accordingly the feature will be edited.

Redis-server setup : Redis Master-slave connection using [script](https://github.com/DavidWittman/ansible-redis)
We used Upload functionality for feature flag and will be toggling it on/off according to the feature flag set true or false.

![Feature Flag](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone3/FeatureFlag.png)


Files :

1. Redis [redis](https://github.ncsu.edu/ppfirake/DevOps_Project/tree/DevOps_Milestone3/Feature%20Flag/Redis)
1. Feature flag implementation

Code snippet used for turning ON/OFF the feature- upload.

```
try{
 		client.get('canUpload', function(err, reply) {
 			if(reply == null || reply == 'false'){
 				res.send('[REDIS] Operation Not Permitted')
 			}
 			else{
 				var files = req.files.files;
 
 				async.map( files, uploadFile, function(err, results)
 				{
 					onReady( results );
				});
 			}
 		});
 	}
 	catch(e)
  	{
 		console.log("error");
 	}
```


2. Screencast : [Feature Flag](https://youtu.be/gl2EIgTJtRs)

## CANARY RELEASE IN CHECKBOX :

We implemented canary releasing with extending the code of loadbalancer.js.
When anary.js, same as load balancer, traffic will be balanced between servers. 
When alert is raised, canary server will stop if Alert is raised.


![Canary](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone3/canary.png)

Steps : 

run 
```
node canary.js
```

Files :

1. Canary :
   [canary.js](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone3/Load%20balancer%20%26%20Canary%20Releease/canary.js)

2. Server IP files : 
        - stableIPAddress
        - canaryIP

3. Screencast : [Canary](https://www.youtube.com/watch?v=SUPKaNurG-Q)




## For iTrust 

### Instructions for Deploying iTrust :

Requirements : Java SE Development Kit 8u112, Apache Tomcat v9.0, MySQL, maven
Config changes: Tomcat, maven

VMs : 2 AWS instances : 
1. Host (for jenkins server)
2. Prod (for production environment)


### Steps for iTrust deployment: 

Initially, we have repeated the process for creating the Jenkins server with the build job for iTrust from the milestone 2. Just that the host would now be an aws instance.

1. We used [provision.yaml](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone3/iTrust/Production_config_deploy_rolling/provision.yml) which would run in the build job after the build is successful for creating the aws instance as Host. 
2.  On AWS Host : At port 8080 there will be jenkins running. Here we can see that build job is created but the build will only be triggered by a git hook when a push is made in the repo. The git hook will trigger the build and deploy the application on Production (prod).

3. Provison.yml file will address prod AWS instance and it will serve for 
  
   (1) Install dependencies 

   (2) Download and install MySQL, Tomcat

   (3) Configure tomcat users and change the permissions for the admin user.

   (4) Start Tomcat service

   (5) Remove case-sensitivity and then restart MySQL service.

   (6) Update maven settings.

   (7) Clone the repo

   (8) Build the repo

   (9) Deploy it on Tomcat.

4. Now we opened the production server from the browser and we got iTrust deployed there on Tomcat.
5. For verification,  we logged in and checked for any UI errors etc.


### Rolling Update Strategy


Similarly, we have deployed 4 other instances of iTrust. Now, we've made a change in the Jenkins build definition where it won't create instances and configure them but rather would implement the rolling update strategy of **deploying the iTrust to the production instances in a way only one instance would be decomissioned to make the update while the rest 4 are operational.** This is done again, by a git hook which is triggered on a push to the source repo.

The ansible script is [here](https://github.ncsu.edu/ppfirake/DevOps_Project/blob/DevOps_Milestone3/iTrust/Production_config_deploy_rolling/tomcat.yml)
