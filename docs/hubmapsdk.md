---
layout: page
---
### SDK Overview


This document covers the HuBMAP SDK. The SDK provides an interface to the functions accessible through the HuBMAP API's. These API's include Entity-Api, Search-Api, UUID-Api, and Ingest-API. Each API has its own module contained within the hubmap_sdk package.   

#### Getting Started
The HuBMAP SDK takes the form of a python client library. This library (hubmap_sdk) can be installed via pip with the command
```bash
pip install hubmap-sdk 
```

#### Requirements
hubmap_sdk has the following requirements:
```bash
certifi<=2021.10.8
chardet<=4.0.0
idna<=2.10
requests<=2.25.1
urllib3<=1.26.7
```



---
### Modules

Each module within the hubmap_sdk contains a class corresponding to its respective HuBMAP API. This class is what gives access to the functionality of its given API. Follow the links below to learn more about each module including how to get started and a breakdown of each of its methods:

* [Entity SDK](entitysdk.html)
* [Search SDK](searchsdk.html)

