#!/bin/bash

cd /var/lib/jenkins
wget http://192.168.33.18:8080/jnlpJars/jenkins-cli.jar
java -jar jenkins-cli.jar -s http://192.168.33.18:8080  login --username <username> --password <password>

java -jar jenkins-cli.jar -s http://192.168.33.18:8080 create-job <job-name>< /home/vagrant/config.xml

java -jar jenkins-cli.jar -s http://192.168.33.18:8080 build <job-name>
