#!/bin/bash

cd /var/lib/jenkins
wget http://192.168.33.37:8090/jnlpJars/jenkins-cli.jar
java -jar jenkins-cli.jar -s http://192.168.33.37:8090  login --username admin --password 61f254c45a1c49fa8c44ad82789cd2f3

java -jar jenkins-cli.jar -s http://192.168.33.37:8090 create-job buildJobTest< /home/config.xml

java -jar jenkins-cli.jar -s http://192.168.33.37:8090 build buildJobTest
