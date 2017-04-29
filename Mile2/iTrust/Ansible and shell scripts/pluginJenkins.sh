#!/bin/bash

cd /var/lib/jenkins

java -jar jenkins-cli.jar -s http://192.168.33.37:8090  login --username admin --password 61f254c45a1c49fa8c44ad82789cd2f3


java -jar jenkins-cli.jar -s http://192.168.33.37:8090/ install-plugin ant
java -jar jenkins-cli.jar -s http://192.168.33.37:8090/ install-plugin build-timeout
java -jar jenkins-cli.jar -s http://192.168.33.37:8090/ install-plugin email-ext
java -jar jenkins-cli.jar -s http://192.168.33.37:8090/ install-plugin gradle
java -jar jenkins-cli.jar -s http://192.168.33.37:8090/ install-plugin github
java -jar jenkins-cli.jar -s http://192.168.33.37:8090/ install-plugin jacoco
java -jar jenkins-cli.jar -s http://192.168.33.37:8090/ install-plugin test-stability
java -jar jenkins-cli.jar -s http://192.168.33.37:8090/ install-plugin credentials
java -jar jenkins-cli.jar -s http://192.168.33.37:8090/ install-plugin test-results-analyzer
