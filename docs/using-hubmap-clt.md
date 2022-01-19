---
layout: page
---
### Using the HuBMAP CLT


The HuBMAP Command Line Transfer utility provides the functionality to download HuBMAP data of individual files and directories across multiple datasets at one time by specifying all downloaded data files and directories in a single manifest file.

This document covers usage of the HuBMAP CLT. Detailed instructions for installing hubmap-clt as well as other first 
time setup can be found [here](install-hubmap-clt.html).

#### Manifest File 

A manifest file is required for usage of the hubmab-clt. This simple text file will contain the dataset id and the path
to the dataset separated by a space, one line for each file or directory to download. for example:

```
HBM123.ABCD.456 /metadata.tsv   #download the metadata.tsv file for dataset HBM123.ABCD.456
HBM345.ABCD.456 /               #download all files in the dataset HBM345.ABCD.456
HBM378.HDGT.837 /extras         #download the extras directory from dataset HBM378.HDGT.837
```
See below for more examples of [manifest files](#manfiles).

#### Login
A one-time login is required for any download session.  For any non-public data, you must login with your HuBMAP authorized account, for publically available data you can log in with any account accepted on the login for (Google and OrCID accepted) as well.  To login issue the following command on the command line:

```
hubmap-clt login
```

#### Example of usage

Having prepared or downloaded a manifest.txt file, logged in and having verified that the local GCP endpoint is running (see [below](#gcp)), the hubma-clt can be used with the following command:

```bash
hubmap-clt manifest.txt
```

where manifest.txt is the file containing the resources to be downloaded and their locations. Depending on where the 
manifest file is located, the path to the file may be necessary along with the filename in the argument. For example:

```bash
hubmap-clt ~/Documents/manifest.txt 
```

The files/directories will be transferred to your Downloads directory by default, you can specify an optional sub-directory under your local user directory to download the data to. Like:

```bash
hubmap-clt manifest.txt data/hubmap/rna-seq
```


<a name="gcp"></a>#### Note about Globus Connect Personal

In order to transfer data to the local machine, the **_Globus Connect Personal (GCP)_** endpoint must be up and running. Refer
to the installation guide if this has not yet been set up. The `hubmap-clt` command will alert you if an instance of GCP is not running.  Please see the documentation at Globus to intall or run it [here](https://www.globus.org/globus-connect-personal)

<a name="manfiles"></a>#### Manifest File Examples

Download the cell by gene matrix for multiple single nuclei RNA sequencing datasets:
```
HBM744.FNLN.846 /expr.h5ad
HBM658.VPJK.669 /expr.h5ad
HBM592.RPKF.946 /expr.h5ad
HBM363.TBHH.346 /expr.h5ad
HBM322.XJQZ.894 /expr.h5ad
HBM749.MTJC.865 /expr.h5ad
HBM722.TVXP.469 /expr.h5ad
HBM223.JQLM.452 /expr.h5ad
HBM524.KHPH.599 /expr.h5ad
```