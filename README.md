# Smarter Advocacy

This cloud-native express/node.js microservice, is part of a set which comprise a 'Smarter Advocacy' capability. More details about this will follow soon.

# The microservice in this repo

The simple goal for this microservice is to offer a stateless generic capability, that automatically drives the other SmarterAdvocacy microservices (get-data and build-report) on a defined schedule.

**INPUT for this mciroservice:** 
- None presently, as which SmartAdvocacy endpoints/parameters and when, are currently hardcoded in Server.js. However, the plan was to store this configuration somewhere persistent (maybe as a document in Couch DB service, if persistence is added yo that service).

**OUTPUT of this mciroservice:**   
- documents stored in CouchDB containing JSON from the 'get-data' endpoint (like Twitter or YouTube) or JSON from the aggregated report generated form the 'build-report' endpoint. 

**For you to build and deploy:**  
- see [separate BLOG](https://medium.com/nikcanvin/how-to-develop-update-a-docker-microservice-in-a-git-repo-a6118da2d92f), for how to develop changes to this cloud-native express/node.js microservice in 4 simple steps.
- see [separate BLOG](https://medium.com/nikcanvin/how-to-build-a-docker-microservice-application-and-deploy-to-openshift-fdb0769f1b9f), for how to deploy the latest microservice into production (an OpenShift Kubernetes cluster).

**Overview of workflow:**  
![overview picture](images/overview.png?raw=true "Diagramatic overview of this picture")

**Notes:**
1. the plan was for this microservice to have an interface where users could create, update and remove new Smarter Advocacy 'campaigns' and start collecting data from Social Media channels, Web Site server metrics and download metrics.

...

![Codewind logo](images/codewind.png?raw=true "Codewind logo")

***This microservice was created and iteratively developed using [Codewind](https://www.eclipse.org/codewind/).***  
*Codewind is an open source plugin for Eclispe and VS Code IDEs, that simplifies and enhances development in containers by extending industry standard IDEs with features to write, debug, and deploy cloud-native applications.* 