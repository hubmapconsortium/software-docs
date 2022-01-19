---
layout: page
---
### Installing and Getting Started with the HuBMAP Command Line Transfer

The HuBMAP Command Line Transfer utility provides the functionality to download HuBMAP data of individual files and directories across multiple datasets at one time by specifying all downloaded data files and directories in a single manifest file.

This document covers installation of the HuBMAP CLT along with the Globus Connect Personal endpoint which is required to download data from HuBMAP.


#### Globus Prerequisites 

In order to download any content from Globus, users must install **_Globus Connect Personal_** on their device. This 
creates a globus "Endpoint" locally. Downloads take the form of transfers from the desired Collection to the endpoint 
created on the local machine. Instructions on installing **_Globus Connect Personal_** can be found <a href="https://www.globus.org/globus-connect-personal">Here</a>

During setup, users will have the opportunity to name their Endpoint and login with their Globus Credentials

#### Installing the HuBMAP CLT

The HuBMAP CLT is available as a Python package.
  - Python 3 is required to run the HuBMAP CLT, an installer for it can be downloaded [here](https://www.python.org/downloads/).
  - It is recommended that you create a new Python virtual environment first with `python3 -m venv /path/to/new/virtual/environment`, more information on Python virtual environments is available [here](https://docs.python.org/3/library/venv.html).
  - To install the HuBMAP CLT run the pip command shown below after installing Python and creating and activating a new Python virtual environment.

```bash
pip install hubmap-clt
```

This will also install other requirements needed by the the HuBMAP CLT including the Globus [Command Line Tool](https://docs.globus.org/cli/)

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
its usage can be found [here](using-hubmap-clt.html).
