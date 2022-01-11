---
layout: page
---
### Getting Started with the HuBMAP Command Line Transfer

The HuBMAP Command Line Transfer utility allows users to install multiple files and directories from Globus at once via 
a manifest file. 


This document covers installation of the HuBMAP CLT along with other required steps to get started. 


#### Globus Prerequisites 

In order to download any content from Globus, users must install **_Globus Connect Personal_** on their device. This 
creates a globus "Endpoint" locally. Downloads take the form of transfers from the desired Collection to the endpoint 
created on the local machine. Instructions on installing **_Globus Connect Personal_** can be found <a href="https://www.globus.org/globus-connect-personal">Here</a>

During setup, users will have the opportunity to name their Endpoint and login with their Globus Credentials

#### Installing the HuBMAP CLT

The HuBMAP CLT is available through the PYPI repository and can be installed with a simple pip command. 

```bash
pip install hubmap-clt
```

This will also install other requirements to use hubmap-clt such as the globus command line tool. 

The globus command line tool is a separate tool from **_Globus Connect Personal_**. It is likely that users may have to
log in separately through **_Globus CLI_**. To see if a user is currently logged in, use the command:

```bash
globus whoami
```

If a user is logged in, their username will be displayed. If not logged in, users will be prompted to login with the
following command: 

```bash
globus login
```

The Globus login screen will open in the default web browser. Follow login instructions. 

#### Using the HuBMAP CLT

At this point, user should be setup and ready to use the Hubmap Command Line Transfer tool. Detailed instructions of 
its usage can be found [here](using-hubmap-clt.html)
