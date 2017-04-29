#!/bin/bash

#sudo mv apache-tomcat-9.0.0.M17 tomcat9
echo "export CATALINA_HOME="/opt/tomcat9/apache-tomcat-9.0.0.M17"" >> /etc/environment
echo "export CATALINA_BASE="/opt/tomcat9/apache-tomcat-9.0.0.M17"" >> /etc/environment
echo "export JAVA_HOME="/usr/lib/jvm/java-8-oracle"" >> /etc/environment
echo "export JRE_HOME="/usr/lib/jvm/java-8-oracle/jre"" >> /etc/environment
source ~/.bashrc

