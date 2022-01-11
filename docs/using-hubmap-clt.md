---
layout: page
---
### Using the HuBMAP CLT


The HuBMAP Command Line Transfer utility allows users to install multiple files and directories from Globus at once via
a manifest file.

This document covers usage of the HuBMAP CLT. Detailed instructions for installing hubmap-clt as well as other first 
time setup can be found [here](install-hubmap-clt.html)

#### Manifest File 

A manifest file is required for usage of the hubmab-clt. This simple text file will contain the dataset id and the path
to the dataset separated by a space. Example:

```bash
HBM123.ABCD.456 /consortium/TMC/hubmap 
```

where the manifest.txt file will have one line for each dataset. 

#### Globus Connect Personal

In order to transfer data to the local machine, the **_Globus Connect Personal_** endpoint must be up and running. Refer
to the installation guide if this has not yet been set up. To see if the endpoint is currently running and connected, 
run the following command from the same directory where the **_Globus Connect Personal_** was installed:

```bash
./globusconnectpersonal -status
```

If the endpoint is not currently running and connected, it can be started with the following command:

```bash
./globusconnectpersonal -start &
```

Once the endpoint is running, hubmap-clt may be used.

#### Example of usage

Having prepared or downloaded a manifest.txt file, and having verified that the local endpoint is running, the hubma-clt
can be used with the following command:

```bash
hubmap-clt transfer manifest.txt
```

where manifest.txt is the file containing the resources to be downloaded and their locations. Depending on where the 
manifest file is located, the path to the file may be necessary along with the filename in the argument. For example:

```bash
hubmap-clt transfer ~/Documents/manifest.txt 
```

The files/directories will be transferred to the Downloads directory by default.  