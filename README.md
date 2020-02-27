# File Mover Documentation

### Intended Users

* Way Engineering
* Way Mechanical
* Kirlin Way

### Summary

A Project Manager puts their project information in a Project Intake form in Smartsheet. The information is then transcribed into information for fields on the Smartsheet document. Operations will then review the information and allocate the job a Project Number. After allocating the job a number, the individual will then check the Project Approved box. This will then automate file creation for the new project, rename the file to the designated Number plus Job Name, and transfer the location of that file to the right folder. 

### Technologies
* SmartSheet API
* JavaScript
* Node.js 
* Ubuntu 

### Workflow

Information input through the Smartsheet form is taken through their proprietary REST API. The JSON that is sent from their API is then used to create new folders from a target spot over the network. Using fs, the code locates the field that references the company name in the Smartsheet document. After it finds the file, it copies all of its contents and is renamed to our default standard at Way. This file is then moved to its target location where it will reside. After the whole process is complete, a date is added to the Date Created category in the Smartsheet. This application is set to run over a VM to insure accuracy, procision, and realtime information. 
