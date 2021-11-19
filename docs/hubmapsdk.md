<!--
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: home
-->
![hubmap logo](images/dark_hubmap_logo.PNG)
# HuBMAP SDK

---

### Table of contents
1. [SDK Overview](#1-sdk-overview)
   1. [Getting Started](#11-getting-started)
   2. [Requirements](#12-requirements)
2. [Entity SDK](#2-entity-sdk)
   1. [Entity SDK Overview](#21-entity-sdk-overview)
   2. [Entity SDK Methods](#22-entity-sdk-methods)
      * [Get Status](#get-status)
      * [Get Ancestor Organs](#get-ancestor-organs)
      * [Get Entity by Id](#get-entity-by-id)
      * [Get Entity Provenance](#get-entity-provenance)
      * [Get Entity Types](#get-entity-types)
      * [Get Entities by Type](#get-entities-by-type)
      * [Get Collection](#get-collection)
      * [Get Collections](#get-collections)
      * [Create Multiple Samples](#create-multiple-samples)
      * [Create Entity](#create-entity)
      * [Update Entity](#update-entity)
      * [Get Ancestors](#get-ancestors)
      * [Get Descendants](#get-descendants)
      * [Get Parents](#get-parents)
      * [Get Children](#get-children)
      * [Get Previous Revisions](#get-previous-revisions)
      * [Get Next Revisions](#get-next-revisions)
      * [Add Datasets to Collectoin](#add-datasets-to-collection)
      * [Get Globus URL](#get-globus-url)
      * [Get Dataset Latest Revision](#get-dataset-latest-revision)
      * [Get Dataset Revision Number](#get-dataset-revision-number)
      * [Retract Dataset](#retract-dataset)
      * [Get Revisions List](#get-revisions-list)
3. [Search SDK](#2-search-sdk)
   1. [Search SDK Overview](#21-search-sdk-overview)
   2. [Search SDK Methods](#32-search-sdk-methods)
      * [Indices](#indices)
      * [Search](#search)
      * [Search by Index](#search-by-index)
      * [Count](#count)
      * [Count by Index](#count-by-index)
      * [Status](#status)
      * [Reindex](#reindex)
      * [Reindex All](#reindex-all)
      * [Assay Type](#assay-type)
      * [Assay Name](#assay-name)

---
### SDK Overview


This document covers the HuBMAP SDK that provides an interface to the functions that can be accessed through the HuBMAP API's. These API's include Entity-Api, Search-Api, UUID-Api, and Ingest-API. Each API has its own module contained within the hubmap_sdk package. Details for using the individual sdk's are provided in their respective sections below.  

#### Getting Started
The HuBMAP SDK takes the form of a python client library. This library (hubmap_sdk) can be installed via pip with the command
```bash
pip install hubmap-sdk 
```

#### Requirements
hubmap_sdk has the following requirements:
```bash
certifi==2021.10.8
chardet==4.0.0
idna==2.10
requests==2.25.1
urllib3==1.26.7
```



---
#### Entity SDK 

The Entity SDK is a class within the hubmap_sdk package used to interface with the Hubmap Entity API. The full documentation including how to use and a breakdown of all the methods inside Entity Sdk can be found [here](entitysdk.md)



---
### 3. Search SDK
#### 3.1 Search SDK Overview

The search sdk may be used to access any functionality from the Search API. In order to use the search sdk, the hubmap_sdk package will either need imported with 

```python
import hubmap_sdk
```

or the search sdk class maybe be directly imported with 

```python
from hubmap_sdk.searchsdk import SearchSdk
```

In order to use any of the search sdk methods, create an instance of the search sdk class. This class accepts 2 
arguments, both of which are optional. The first is "token". Token is a Globus Groups token. If there is no such token, 
only public accessible methods will be reachable. Methods that require special access will be indicated below. 

Depending on whether a token is given or, if one is given, which user groups the provided token belongs in, some or all functionality in certain methods will 
remain inaccessible. These too will be detailed in each method's outline below. Validation of Globus tokens is performed 
when the search api is called. If, for example, a method that requires a token is used but there is no token
given, the search api will return an error detailing the problem. This will also happen if a token is provided that is 
invalid, or if the token given is valid but is not part of the necessary user group to access part or all of a method.

If no token is given, it is assumed that there is no token. 

The next argument is service_url. The Search Api has several servers: Dev, Test, Stage, and Production. It is also 
possible to run the search api locally. service_url is where the chosen instance of Search Api is selected. If none is
provided, the production server will be used automatically. Be certain there are no typos in the service url. The urls 
for the different servers are as follows: 

* Dev: https://search-api.hubmapconsortium.org/
* Test: https://search-api.test.hubmapconsortium.org/
* Stage: https://search-api.stage.hubmapconsortium.org/
* Production: https://search.api.hubmapconsortium.org/

If using a local instance of Search Api, by default the port used is 5005. Therefore "localhost:5005" would be used for
service_url. 

Once this search sdk instance is created, it will be used for each method. Creating a search sdk instance will look 
like the following:

```python
from hubmap_sdk import SearchSdk

#In this example, the token and service url are being retrieved from a configuration file.
url = app.config['DEV_URL']
token = app.config['GLOBUS_TOKEN'] 


search_instance = SearchSdk(token, url)
```


#### 3.2 Search Sdk Methods 

The following search sdk methods each correspond with an endpoint inside the search api. 

##### Indices

<table>

<tr><td>Description</td><td>Indices will return a list of supported indices.</td></tr>
<tr><td>Arguments</td><td>None</td></tr>
<tr><td>Outputs</td><td>This method outputs a list of strings. Each string is a supported index</td></tr>
<tr><td>Error Handling</td><td>If the response code from Search Api is greater than 299, an exception will be raised. The exception message will be the response from the Search API. The indices method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Search Api fails, an exception will be raise as well</td></tr>
<tr><td>Authorizations</td><td>This method requires no token</td></tr>

</table>

Example:

```python
list_of_indices = searchsdk_instance.indices()
print(f"The type for list_of_indices is {type(list_of_indices)}")
print(f"The type for item in list_of_indices is {type(list_of_indices[0])}")
```
Output:

```
The type for list_of_indices is <class 'list'>
The type for item in list_of_indices is <class 'str'>
```

##### Search

<table>

<tr><td>Description</td><td colspan="2">Executes a search with body against ElasticSearch REST API without specifying an index. Takes an ElasticSearch query in the form of a dictionary</td></tr>
<tr><td rowspan="2">Arguments</td><td rowspan="2">data</td><td>Optional: No</td></tr><tr><td> Type: Dictionary</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs the results of the search query as a dictionary</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Search Api is greater than 299, an exception will be raised. The exception message will be the response from the Search API. The search method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Search Api fails, an exception will be raise as well</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of HuBMAP-Read group, only information for entities that are public will be returned</td></tr>

</table>

Example:

```python
searchbody = {
  "query": {
    "match": {
      "uuid": "99999999999999999999999999999999"
    }
  }
}
search_result = searchsdk_instance.search(searchbody)
print(f"The type for search_result is {type(search_result)}")
```
Output:

```
The type for search_result is <class 'dict'>
```

##### Search by Index

<table>

<tr><td>Description</td><td colspan="2">Executes a search with body against ElasticSearch REST API with a specified index. Takes an ElasticSearch query in the form of a dictionary and an index. Note: the index in URL is not he real index in Elasticsearch, it's that index without prefix</td></tr>
<tr><td rowspan="4">Arguments</td><td rowspan="2">data</td><td>Optional: No</td></tr><tr><td>Type: Dictionary</td></tr><tr><td rowspan="2">index</td><td>Optional: No</td></tr><tr><td>Type: String</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs the results of the search query as a dictionary</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Search Api is greater than 299, an exception will be raised. The exception message will be the response from the Search API. The search by index method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Search Api fails, an exception will be raise as well</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of HuBMAP-Read group, the entities index will be used by default</td></tr>

</table>

Example:

```python
searchbody = {
  "query": {
    "match": {
      "uuid": "99999999999999999999999999999999"
    }
  }
}
search_result = searchsdk_instance.search_by_index(searchbody, "entities")
print(f"The type for search_result is {type(search_result)}")
```
Output:

```
The type for search_result is <class 'dict'>
```

##### Count

<table>

<tr><td>Description</td><td colspan="2">Executes a 'count' query with body against ElasticSearch REST API without specifying an index. Takes an ElasticSearch query in the form of a dictionary</td></tr>
<tr><td rowspan="2">Arguments</td><td rowspan="2">data</td><td>Optional: No</td></tr><tr><td> Type: Dictionary</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs the results of the count query as a dictionary</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Search Api is greater than 299, an exception will be raised. The exception message will be the response from the Search API. The count method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Search Api fails, an exception will be raise as well</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of HuBMAP-Read group, only information for entities that are public will be returned</td></tr>

</table>

Example:

```python
searchbody = {
  "query": {
    "match": {
      "uuid": "99999999999999999999999999999999"
    }
  }
}
count_result = searchsdk_instance.count(searchbody)
print(f"The type for count_result is {type(search_result)}")
```
Output:

```
The type for count_result is <class 'dict'>
```

##### Count by Index

<table>

<tr><td>Description</td><td colspan="2">Executes a 'count' query with body against ElasticSearch REST API with a specified index. Takes an ElasticSearch query in the form of a dictionary and an index. Note: the index in URL is not he real index in Elasticsearch, it's that index without prefix</td></tr>
<tr><td rowspan="4">Arguments</td><td rowspan="2">data</td><td>Optional: No</td></tr><tr><td>Type: Dictionary</td></tr><tr><td rowspan="2">index</td><td>Optional: No</td></tr><tr><td>Type: String</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs the results of the count query as a dictionary</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Search Api is greater than 299, an exception will be raised. The exception message will be the response from the Search API. The count by index method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Search Api fails, an exception will be raise as well</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of HuBMAP-Read group, the entities index will be used by default</td></tr>

</table>

Example:

```python
searchbody = {
  "query": {
    "match": {
      "uuid": "99999999999999999999999999999999"
    }
  }
}
count_result = searchsdk_instance.count_by_index(searchbody, "entities")
print(f"The type for count_result is {type(count_result)}")
```
Output:

```
The type for count_result is <class 'dict'>
```

##### Status


<table>

<tr><td>Description</td><td>Get status will print and return the current build, elasticsearch connection, elasticsearch status, and version of the Search Api.</td></tr>
<tr><td>Arguments</td><td>None</td></tr>
<tr><td>Outputs</td><td>This method will print the version, build, and neo4j connection status to the terminal. It will be formatted as "'build': '{build}', 'elasticsearch_connection': '{elasticsearch_connection}', 'elasticsearch_status': '{elasticsearch_status}', 'version': '{version}'". Additionally, the complete response from search api will be returned as a dictionary.</td></tr>
<tr><td>Error Handling</td><td>Most methods will raise an exception if either Search Api returns an error code (http status code 300 or greater) or if the connection fails altogether. Because of the nature of the status method, if either of these occur, an exception will not be raised, rather the exception or error message from Search Api will be printed to the terminal and returned.</td></tr>
<tr><td>Authorizations</td><td>This method requires no token</td></tr>

</table>

Example:

```python
status_object = statussdk_instance.get_status()
```
Output:

```
'build: '{build}' , elasticsearch_connection: '{elasticsearch_connection}', elasticsearch_status: '{elasticsearch_status}', version: '{version}'
```

##### Reindex 


<table>

<tr><td>Description</td><td colspan="2">Performs a reindex in elasticsearch at a given uuid</td></tr>
<tr><td rowspan="2">Arguments</td><td rowspan="2">uuid</td><td>Optional: No</td></tr><tr><td> Type: String</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs a tuple that includes a message that a reindex request has been accepted by elasticsearch for the given uuid in the form of a string, as well as the status code integer returned. The response string will be: "Request of reindexing {uuid} accepted". A successful reindex request will have a status code of 202.</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Search Api is greater than 299, an exception will be raised. The exception message will be the response from the Search API. The reindex method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Search Api fails, an exception will be raise as well</td></tr>
<tr><td>Authorization</td><td colspan="2">A token is required for this method, however HuBMAP Data Admin group is not required for reindexing of individual uuid's.</td></tr>

</table>

Example:

```python
uuid = "99999999999999999999999999999999"
reindex_result = searchsdk_instance.reindex(uuid)
print(f"The type for reindex_result is {type(reindex_result)}")
print(f"The type for the success message is {type(reindex_result[0])}")
print(f"The type for the status code is {type(reindex_result[1])}")
```
Output:

```
The type for reindex_result is <class 'tuple'>
The type for the success message is <class 'str'>
The type for the status code is <class 'int'>
```

##### Reindex All

<table>

<tr><td>Description</td><td>Performs a live reindex in elasticsearch for all documents without first deleting and recreating the indices. This just deletes the old document and add the latest document of each entity (if still available)</td></tr>
<tr><td>Arguments</td><td>None</td></tr>
<tr><td>Outputs</td><td>This method outputs a tuple that includes a message that a reindex all request has been accepted by elasticsearch in the form of a string, as well as the status code integer returned. The response string will be: "Request of live reindex all documents accepted". A successful reindex all request will have a status code of 202.</td></tr>
<tr><td>Error Handling</td><td>If the response code from Search Api is greater than 299, an exception will be raised. The exception message will be the response from the Search API. The reindex all method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Search Api fails, an exception will be raise as well</td></tr>
<tr><td>Authorizations</td><td>This method requires a token. Token must belong to HuBMAP Data-Admin group access to be able to trigger a live reindex</td></tr>

</table>

Example:

```python
reindex_result = searchsdk_instance.reindex_all()
print(f"The type for reindex_result is {type(reindex_result)}")
print(f"The type for the success message is {type(reindex_result[0])}")
print(f"The type for the status code is {type(reindex_result[1])}")
```
Output:

```
The type for reindex_result is <class 'tuple'>
The type for the success message is <class 'str'>
The type for the status code is <class 'int'>
```

##### Assay Type

<table>

<tr><td>Description</td><td colspan="2">Returns all the dataset data or assay types information (code, description, etc.) defined from the <a href="https://github.com/hubmapconsortium/search-api/blob/test-release/src/search-schema/data/definitions/enums/assay_types.yaml">Assay Types Yaml</a>  </td></tr>
<tr><td rowspan="2">Arguments</td><td rowspan="2">key</td><td>Optional: No</td></tr><tr><td> Type: String</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs a dictionary with the assay type information.</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Search Api is greater than 299, an exception will be raised. The exception message will be the response from the Search API. The assay type method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Search Api fails, an exception will be raise as well</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided, however, it must be valid.</td></tr>

</table>

Example:

```python
key = 'simple'
assaytype_result = searchsdk_instance.assaytype(key)
print(f"The type for assaytype_result is {type(assaytype_result)}")
```
Output:
```
The type for assaytype_result is <class 'dict'>
```

##### Assay Name

<table>

<tr><td>Description</td><td colspan="2">Returns the dataset data or assay type information of a given assay name</td></tr>
<tr><td rowspan="2">Arguments</td><td rowspan="2">name</td><td>Optional: No</td></tr><tr><td> Type: String</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs a dictionary with the information for the given assay name.</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Search Api is greater than 299, an exception will be raised. The exception message will be the response from the Search API. The assay name method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Search Api fails, an exception will be raise as well</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided, however, it must be valid.</td></tr>

</table>

Example:

```python
name = 'AF_pyramid'
assayname_result = searchsdk_instance.assayname(name)
print(f"The type for assayname_result is {type(assayname_result)}")
```
Output:
```
The type for assayname_result is <class 'dict'>
```
