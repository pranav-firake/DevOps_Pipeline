#!/bin/bash

cd /var/lib/jenkins
wget http://54.200.177.148:8080/jnlpJars/jenkins-cli.jar
java -jar jenkins-cli.jar -s http://54.200.177.148:8080  login --username admin --password b1dc81585b514512abd08941bfc73407

java -jar jenkins-cli.jar -s http://54.200.177.148:8080 create-job newBuildJob< /home/config.xml

#java -jar jenkins-cli.jar -s http://54.200.177.148:8080 build newBuildJob
