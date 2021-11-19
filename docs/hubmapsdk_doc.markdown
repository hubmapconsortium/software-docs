<!--
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: home
-->
![hubmap logo](dark%20hubmap%20logo.PNG)
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
### 1. SDK Overview


This document covers the HuBMAP SDK that provides an interface to the functions that can be accessed through the HuBMAP API's. These API's include Entity-Api, Search-Api, UUID-Api, and Ingest-API. Each API has its own module contained within the hubmap_sdk package. Details for using the individual sdk's are provided in their respective sections below.  

#### 1.1 Getting Started
The HuBMAP SDK takes the form of a python client library. This library (hubmap_sdk) can be installed via pip with the command
```bash
pip install hubmap-sdk 
```

#### 1.2 Requirements
hubmap_sdk has the following requirements:
```bash
certifi==2021.10.8
chardet==4.0.0
idna==2.10
requests==2.25.1
urllib3==1.26.7
```



---
### 2. Entity SDK
#### 2.1 Entity SDK Overview
The entity sdk may be used to access any functionality from the Entity API. In order to use the entity sdk, 
the hubmap_sdk package needs to either be imported with 

```python
import hubmap_sdk
```

or the entity sdk class may be directly imported with

```python
from hubmap_sdk.entitysdk import EntitySdk
```

In order to use any of the entity sdk methods, create an instance of the entity sdk class. This class accepts 2 
arguments, both of which are optional. The first is "token". Token is a Globus Groups token. If there is no such token, 
only public accessible methods will be reachable. Methods that require special access will be indicated below. 

Depending on whether a token is given or, if one is given, which user groups the provided token belongs in, some or all functionality in certain methods will 
remain inaccessible. These too will be detailed in each method's outline below. Validation of Globus tokens is performed 
when the entity api is called. If, for example, a method that requires a token is used but there is no token
given, the entity api will return an error detailing the problem. This will also happen if a token is provided that is 
invalid, or if the token given is valid but is not part of the necessary user group to access part or all of a method.

If no token is given, it is assumed that there is no token. 

The next argument is service_url. The Entity Api has several servers: Dev, Test, Stage, and Production. It is also 
possible to run the entity api locally. service_url is where the chosen instance of Entity Api is selected. If none is
provided, the production server will be used automatically. Be certain there are no typos in the service url. The urls 
for the different servers are as follows: 

* Dev: https://entity-api.hubmapconsortium.org/
* Test: https://entity-api.test.hubmapconsortium.org/
* Stage: https://entity-api.stage.hubmapconsortium.org/
* Production: https://entity-api.hubmapconsortium.org/

If using a local instance of Entity Api, by default the port used is 5002. Therefore "localhost:5002" would be used for
service_url. 

Once this entity sdk instance is created, it will be used for each method. Creating an entity sdk instance will look 
like the following:

```python
from hubmap_sdk import EntitySdk

#In this example, the token and service url are being retrieved from a configuration file.
url = app.config['DEV_URL']
token = app.config['GLOBUS_TOKEN'] 


entity_instance = EntitySdk(token, url)
```

Each of the major entity types recognized by the Entity Api is modeled with its own class in the hubmap sdk.
These include:
* Donor
* Dataset
* Sample
* Collection
* Upload

Several methods in the entity api will return an instance of these classes; particularly methods that retrieve entities 
or create entities. The Entity Api itself simply returns dictionaries with the properties of these entities, and the 
hubmap_sdk creates these class instances to allow developers to have a workable object to use. For example, if the 
method "get_endpoint_by_id" is used (this endpoint is detailed below) and the id supplied is for a donor entity, rather
than returning a dictionary with the properties of that donor, an object of the class donor is returned.

#### 2.2 Entity Sdk Methods 

The following entity sdk methods each correspond with an endpoint inside the entity api. 

##### Get Status

<table>

<tr><td>Description</td><td>Get status will print and return the current build, version, and neo4j connection status of the Entity Api.</td></tr>
<tr><td>Arguments</td><td>None</td></tr>
<tr><td>Outputs</td><td>This method will print the version, build, and neo4j connection status to the terminal. It will be formatted as "'version': '{version}', 'build': '{build}', 'neo4j_connection': '{neo4j_connection}'". Additionally, the complete response from entity api will be returned as a dictionary.</td></tr>
<tr><td>Error Handling</td><td>Most methods will raise an exception if either Entity Api returns an error code (http status code 300 or greater) or if the connection fails altogether. Because of the nature of the get status method, if either of these occur, an exception will not be raised, rather the exception or error message from Entity Api will be printed to the terminal and returned.</td></tr>
<tr><td>Authorizations</td><td>This method requires no token</td></tr>

</table>

Example:

```python
status_object = entitysdk_instance.get_status()
```
Output:

```
'version: '{version}' , build: '{build}', neo4j_connecton: '{neo4j_connection}'
```






##### Get Ancestor Organs

<table>

<tr><td>Description</td><td colspan="2">Takes an id (HuBMAP id or UUID) for a sample or dataset and will return a list of organs that are ancestors to the given sample or Dataset.</td></tr>
<tr><td rowspan="2">Arguments</td><td rowspan="2">identifier</td><td>Optional: No</td></tr><tr><td> Type: String</td></tr>
<tr><td>Output</td><td colspan="2">The output of this method is a list containing objects of the class Sample. These sample objects are the organs that are ancestors to the given sample or dataset</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The get ancestor organs method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raised also.</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of the HuBMAP-Read group, only organs that are public will be returned.</td></tr>

</table>

Example

```python
hubmap_id = "HBM123.ABCD.456"
organs_list = entitysdk_instance.get_ancestor_organs(hubmap_id)
print(f"The output is of type {type(organs_list)}")
print(f"The elements in the list are of the type {type(organs_list[0])}")
```
Output:

```
organs_list is of type <class 'list'>
The elements in the list are of the type <class 'hubmap_sdk.entitysdk.Sample'>
```








##### Get Entity by ID

<table>
<tr><td>Description</td><td colspan="2">Takes an id (HuBMAP id or UUID) for an entity and returns an instance of the class corresponding to the given id.</td></tr>
<tr><td rowspan="2">Arguments</td><td rowspan="2">identifier</td><td>Optional: No</td></tr><tr><td>Type: String</td></tr>
<tr><td>Output</td><td colspan="2">This method outputs an instance of one of the entity classes. This class will correspond with the class of the entity given by the identifier</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The get entity by id method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raise as well.</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of HuBMAP-Read group, only entities that are public will be returned</td></tr>

</table>

Example:

```python
hubmap_id = "HBM123.ABCD.456"
new_sample = entitysdk_instance.get_entity_by_id(hubmap_id)
print(f"new_sample is of the type {new_sample}")
```
Output:

```
new_sample is of the type <class 'hubmap_sdk.entitysdk.Sample'>
```




##### Get Entity Provenance 

<table>

<tr><td>Description</td><td colspan="2">Takes in an id (HuBMAP ID or UUID) and returns a dictionary with the provenance tree above the given ID. Optionally accepts an integer "depth" which will limit the size of the returned tree.</td></tr>
<tr><td rowspan="4">Arguments</td><td rowspan="2">identifier</td><td>Optional: No</td></tr><tr><td>Type: String</td></tr><tr><td rowspan="2">depth</td><td>Optional: Yes</td></tr><tr><td>Type: Integer</td></tr>
<tr><td>Output</td><td colspan="2">This method outputs a dictionary containing the complete provenance tree above the given id. </td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The get entity provenance method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raise as well.</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of HuBMAP-Read group, only provenance trees for entities that are public will be returned</td></tr>

</table>

Example:

```python
tree_depth = 4
hubmap_id = "HBM123.ABCD.456"
provenance = entitysdk_instance.get_entity_provenance(hubmap_id, tree_depth)
print(f"The type of the returned provenance is {type(provenance)}")
```

Output

```
The type of the returned provenance is <class 'dict'>
```




##### Get Entity Types

<table>

<tr><td>Description</td><td>This method returns a list of all available entity types as defined in the <a href="https://raw.githubusercontent.com/hubmapconsortium/entity-api/test-release/entity-api-spec.yaml">Schema Yaml</a>  </td></tr>
<tr><td>Arguments</td><td>None</td></tr>
<tr><td>Outputs</td><td>This method outputs a list. The list contains each entity type defined in the schema. Each is represented as a string</td></tr>
<tr><td>Error Handling</td><td>If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The get entity types method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raise as well.</td></tr>
<tr><td>Authorization</td><td>No token is required for this method. If a token is provided and it is invalid, an exception will be raised.</td></tr>

</table>

Example:

```python
list_of_entity_types = entitysdk_instance.get_entity_types()
print(f"The type for list_of_entity_types is {type(list_of_entity_types)}")
print(f"The type for items in the list is {type(list_of_entity_types[0])}")
```

Output:

```
The type for list_of_entity_types is <class 'list'>
The type for items in the list is <class 'str'>
```





##### Get Entities by Type

<table>

<tr><td>Description</td><td colspan="2">Takes as input an entity type and returns a list of all entities within that given type. Acceptable values for entity type are the entities defined in the <a href="https://raw.githubusercontent.com/hubmapconsortium/entity-api/test-release/entity-api-spec.yaml">Schema Yaml</a></td></tr>
<tr><td rowspan="2">Arguments</td><td rowspan="2">entity_type</td><td>Optional: No</td></tr><tr><td>Type: String</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs a list. This list contains objects of the class given by entity_type</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The get entities by type method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raise as well.</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of HuBMAP-Read group, only entities that are public will be returned</td></tr>

</table>

Example:

```python
entity_type = "uploads"
list_of_uploads = entitysdk_instance.get_entities_by_type(entity_type)
print(f"The type for list_of_entity_types is {type(list_of_uploads)}")
print(f"The type for items in the list is {type(list_of_uploads[0])}")
```

Output:

```
The type for list_of_entity_types is <class 'list'>
The type for items in the list is <class 'Upload'>
```





##### Get Collection

<table>

<tr><td>Description</td><td colspan="2">Takes as input identifier (HuBMAP id or UUID) for a collection and returns an instance of the collection class corresponding to the identifier given</td></tr>
<tr><td rowspan="2">Arguments</td><td rowspan="2">identifier</td><td>Optional: No</td></tr><tr><td>Type: String</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs an instance of the collection class.</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The get collection method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raise as well.</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of HuBMAP-Read group, only collections that are public will be returned</td></tr>

</table>

Example:

```python
hubmap_id = "HBM123.ABCD.456"
new_collection = entitysdk_instance.get_collection(hubmap_id)
print(f"The type for new_collection is {type(new_collection)}")
```

Output:

```
The type for new_collection is <class 'Collection'>
```





##### Get Collections 

<table>

<tr><td>Description</td><td>Returns a list of all public collections. If a valid token is given that is part of the HuBMAP-Read group, both published and unpublished collections will be returned</td></tr>
<tr><td>Arguments</td><td>None</td></tr>
<tr><td>Outputs</td><td>This method outputs a list. The list contains objects of the class Collections.</td></tr>
<tr><td>Error Handling</td><td>If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The get collections method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raise as well.</td></tr>
<tr><td>Authorization</td><td>No token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of HuBMAP-Read group, only collections that are public will be returned</td></tr>

</table>

Example:

```python
collections_list = entitysdk_instance.get_collections()
print(f"The type for collections_list is {type(collections_list)}")
print(f"The type for items in the list is {type(collections_list[0])}")
```

Output:

```
The type for collections_list is <class 'list'>
The type for items in the list is <class 'Collection'>
```





##### Create Multiple Samples

<table>

<tr><td>Description</td><td colspan="2">Creates multiple samples from the same source. Accepts a dictionary containing the information of the given entity and an integer designating how many samples to create. Returns a list of the newly created sample objects. 'direct_ancestor_uuid' is a required field in the dictionary. An example of a valid call would be: create_multiple_samples(5, data) where data is the dictionary containing the information about the new entities. A token is required.</td></tr>
<tr><td rowspan="4">Arguments</td><td rowspan="2">count</td><td>Optional: No</td></tr><tr><td>Type: Integer</td></tr><tr><td rowspan="2">data</td><td>Optional: No</td></tr><tr><td>Type: Dictionary</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs a list. This list contains objects of the class Sample</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The create multiple samples method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raise as well.</td></tr>
<tr><td>Authorization</td><td colspan="2">A token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or one is provided but is not in the HuBMAP-Read group, an exception will be raised.</td></tr>

</table>

Example:

```python
count = 5
data = {"specimen_type": "blood", "protocol_url": "https://dx.doi.org/99.9999/protocols.io.abcdefg", "direct_ancestor_uuid": "99999999999999999999999999999999"}
list_of_samples = entitysdk_instance.create_multiple_samples(count, data)
print(f"The type for list_of_entity_types is {type(list_of_samples)}")
print(f"The type for items in the list is {type(list_of_samples[0])}")
```

Output:

```
The type for list_of_samples is <class 'list'>
The type for items in the list is <class 'Sample'>
```





##### Create Entity

<table>

<tr><td>Description</td><td colspan="2">Creates a new entity of a specified type. Takes as input a dictionary containing the details of the new entity and entity type.</td></tr>
<tr><td rowspan="4">Arguments</td><td rowspan="2">entity_type</td><td>Optional: No</td></tr><tr><td>Type: String</td></tr><tr><td rowspan="2">data</td><td>Optional: No</td></tr><tr><td>Type: Dictionary</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs an instance of a class given by entity_type.</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The create entity method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raise as well.</td></tr>
<tr><td>Authorization</td><td colspan="2">A token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or one is provided but is not in the HuBMAP-Read group, an exception will be raised.</td></tr>

</table>

Example:

```python
entity_type: "sample"
data = {"specimen_type": "blood", "protocol_url": "https://dx.doi.org/99.9999/protocols.io.abcdefg", "direct_ancestor_uuid": "99999999999999999999999999999999"}
new_sample = entitysdk_instance.create_entity(entity_type, data)
print(f"The type for new_sample is {type(new_sample)}")
```

Output:

```
The type for new_sample is <class 'Sample'>
```





##### Update Entity 

<table>

<tr><td>Description</td><td colspan="2">Updates an existing entity. Takes as input an id (HuBMAP id or UUID) to an existing entity anda dictionary containing the properties either to add to or replace in the given entity. Returns an instance of the class corresponding with the given entity to reflect the new changes</td></tr>
<tr><td rowspan="4">Arguments</td><td rowspan="2">identifier</td><td>Optional: No</td></tr><tr><td>Type: String</td></tr><tr><td rowspan="2">data</td><td>Optional: No</td></tr><tr><td>Type: Dictionary</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs an instance of a class corresponding to the class of the entity given by its id.</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The update entity method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raise as well.</td></tr>
<tr><td>Authorization</td><td colspan="2">A token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or one is provided but is not in the HuBMAP-Read group, an exception will be raised.</td></tr>

</table>

Example:

```python
hubmap_id = "HBM123.ABCD.456"
data = {"specimen_type": "blood", "protocol_url": "https://dx.doi.org/99.9999/protocols.io.abcdefg", "direct_ancestor_uuid": "99999999999999999999999999999999"}
updated_sample = entitysdk_instance.update_entity(hubmap_id, data)
print(f"The type for updated_sample is {type(updated_sample)}")
```

Output:

```
The type for updated_sample is <class 'Sample'>
```





##### Get Ancestors

<table>

<tr><td>Description</td><td colspan="2">Takes an id (HuBMAP id or UUID) for an entity and returns all of that entity's ancestors as a list. </td></tr>
<tr><td rowspan="2">Arguments</td><td rowspan="2">identifier</td><td>Optional: No</td></tr><tr><td>Type: String</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs a list of dictionaries. Each dictionary contains the information of an ancestor of the given id.</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The get ancestors entity method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raise as well.</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of HuBMAP-Read group, only entities that are public will be returned</td></tr>

</table>

Example:

```python
hubmap_id = "HBM123.ABCD.456"
list_of_ancestors = entitysdk_instance.get_ancestors(hubmap_id)
print(f"The type for list_of_ancestors is {type(list_of_ancestors)}")
```

Output:

```
The type for list_of_ancestors is <class 'list'>
```





##### Get Descendants

<table>

<tr><td>Description</td><td colspan="2">Takes an id (HuBMAP id or UUID) for an entity and returns all of that entity's descendants as a list. </td></tr>
<tr><td rowspan="2">Arguments</td><td rowspan="2">identifier</td><td>Optional: No</td></tr><tr><td>Type: String</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs a list of dictionaries. Each dictionary contains the information of a descendant of the given id.</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The get descendants entity method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raise as well.</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of HuBMAP-Read group, only entities that are public will be returned</td></tr>

</table>

Example:

```python
hubmap_id = "HBM123.ABCD.456"
list_of_descendants = entitysdk_instance.get_descendants(hubmap_id)
print(f"The type for list_of_descendants is {type(list_of_descendants)}")
```

Output:

```
The type for list_of_descendants is <class 'list'>
```





##### Get Parents

<table>

<tr><td>Description</td><td colspan="2">Takes an id (HuBMAP id or UUID) for an entity and returns all of that entity's parents as a list. </td></tr>
<tr><td rowspan="2">Arguments</td><td rowspan="2">identifier</td><td>Optional: No</td></tr><tr><td>Type: String</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs a list of dictionaries. Each dictionary contains the information of a parent of the given id.</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The get parents entity method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raise as well.</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of HuBMAP-Read group, only entities that are public will be returned</td></tr>

</table>

Example:

```python
hubmap_id = "HBM123.ABCD.456"
list_of_parents = entitysdk_instance.get_parents(hubmap_id)
print(f"The type for list_of_parents is {type(list_of_parents)}")
```

Output:

```
The type for list_of_parents is <class 'list'>
```





##### Get Children

<table>

<tr><td>Description</td><td colspan="2">Takes an id (HuBMAP id or UUID) for an entity and returns all of that entity's children as a list. </td></tr>
<tr><td rowspan="2">Arguments</td><td rowspan="2">identifier</td><td>Optional: No</td></tr><tr><td>Type: String</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs a list of dictionaries. Each dictionary contains the information of a child of the given id. </td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The get children entity method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raise as well.</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of HuBMAP-Read group, only entities that are public will be returned</td></tr>

</table>

Example:

```python
hubmap_id = "HBM123.ABCD.456"
list_of_children = entitysdk_instance.get_children(hubmap_id)
print(f"The type for list_of_children is {type(list_of_children)}")
```

Output:

```
The type for list_of_children is <class 'list'>
```





##### Get Previous Revisions

<table>

<tr><td>Description</td><td colspan="2">Takes an id (HuBMAP id or UUID) for an entity and returns all of that entity's previous revisions as a list. </td></tr>
<tr><td rowspan="2">Arguments</td><td rowspan="2">identifier</td><td>Optional: No</td></tr><tr><td>Type: String</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs a list of dictionaries. Each dictionary contains the information of a previous revision of the given id. </td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The get previous revisions entity method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raise as well.</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of HuBMAP-Read group, only entities that are public will be returned</td></tr>

</table>

Example:

```python
hubmap_id = "HBM123.ABCD.456"
list_of_previous_revisions = entitysdk_instance.get_previous_revisions(hubmap_id)
print(f"The type for list_of_previous_revisions is {type(list_of_previous_revisions)}")
```

Output:

```
The type for list_of_previous_revisions is <class 'list'>
```





##### Get Next Revisions

<table>

<tr><td>Description</td><td colspan="2">Takes an id (HuBMAP id or UUID) for an entity and returns all of that entity's next revisions as a list. </td></tr>
<tr><td rowspan="2">Arguments</td><td rowspan="2">identifier</td><td>Optional: No</td></tr><tr><td>Type: String</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs a list of dictionaries. Each dictionary contains the information of a next revision of the given id. </td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The get next revisions entity method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raise as well.</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of HuBMAP-Read group, only entities that are public will be returned</td></tr>

</table>

Example:

```python
hubmap_id = "HBM123.ABCD.456"
list_of_next_revisions = entitysdk_instance.get_next_revisions(hubmap_id)
print(f"The type for list_of_next_revisions is {type(list_of_next_revisions)}")
```

Output:

```
The type for list_of_next_revisions is <class 'list'>
```





##### Add Datasets To Collection

<table>

<tr><td>Description</td><td colspan="2">Takes an id (HuBMAP id or UUID) for a collection and a list of dataset uuid's and connects each datset to the collection. The collection is then returned </td></tr>
<tr><td rowspan="4">Arguments</td><td rowspan="2">identifier</td><td>Optional: No</td></tr><tr><td>Type: String</td></tr><tr><td rowspan="2">list_of_datasets</td><td>Optional: No</td></tr><tr><td>Type: List</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs an instance of the class Collection corresponding to the given id</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The add datasets to collection method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raise as well.</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of HuBMAP-Read group, only entities that are public will be returned and both the collection and each of the datasets must be public, otherwise an exception will be raised </td></tr>

</table>

Example:

```python
hubmap_id = "HBM123.ABCD.456"
list_of_datasets = ["11111111111111111111111111111111", "22222222222222222222222222222222", "33333333333333333333333333333333"]
new_collection = entitysdk_instance.add_datasets_to_collection(hubmap_id, list_of_datasets)
print(f"The type for new_collection is {type(new_collection)}")
```

Output:

```
The type for new_collection is <class 'Collection'>
```





##### Get Globus Url

<table>

<tr><td>Description</td><td colspan="2">Takes an id (HuBMAP id or UUID) for an entity and returns that entity's globus url </td></tr>
<tr><td rowspan="2">Arguments</td><td rowspan="2">identifier</td><td>Optional: No</td></tr><tr><td> Type: String</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs a string containing the globus url</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The get globus url method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raise as well.</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of HuBMAP-Read group, only urls for entities that are public will be returned</td></tr>

</table>

Example:

```python
hubmap_id = "HBM123.ABCD.456"
globus_url = entitysdk_instance.get_globus_url(hubmap_id)
print(f"The type for globus_url is {type(globus_url)}")
```

Output:

```
The type for globus_url is <class 'str'>
```





##### Get Dataset Latest Revision

<table>
<tr><td>Description</td><td colspan="2">Takes an id (HuBMAP id or UUID) for a dataset and returns an instance of the class dataset corresponding with the latest revision of the dataset given by the id </td></tr>
<tr><td rowspan="2">Arguments</td><td rowspan="2">identifier</td><td>Optional: No</td></tr><tr><td> Type: String</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs an instance of the class Dataset. This Dataset object corresponds with the latest revision of the dataset of the given id</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The get dataset latest revision method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raise as well.</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of HuBMAP-Read group, only published datasets will be returned</td></tr>

</table>

Example:

```python
hubmap_id = "HBM123.ABCD.456"
latest_revision = entitysdk_instance.get_dataset_latest_revision(hubmap_id)
print(f"The type for latest_revision is {type(latest_revision)}")
```

Output:

```
The type for latest_revision is <class 'Dataset'>
```





##### Get Dataset Revision Number

<table>

<tr><td>Description</td><td colspan="2">Takes an id (HuBMAP id or UUID) for a dataset and returns the revision number of that dataset as an integer</td></tr>
<tr><td rowspan="2">Arguments</td><td rowspan="2">identifier</td><td>Optional: No</td></tr><tr><td> Type: String</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs an integer for the revision number of a given dataset</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The get dataset revision number method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raise as well.</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of HuBMAP-Read group, but the given id is for an unpublished dataset, an error will be raised</td></tr>

</table>

Example:

```python
hubmap_id = "HBM123.ABCD.456"
revision_number = entitysdk_instance.get_dataset_revision_number(hubmap_id)
print(f"The type for revision_number is {type(revision_number)}")
```

Output:

```
The type for revision_number is <class 'int'>
```





##### Retract Dataset

<table>

<tr><td>Description</td><td colspan="2">Retracts a published dataset. Takes as input an id (HuBMAP id or UUID) for a dataset and a string "retraction_reason" and changes the field "sub_status" to "retracted" and sets "retraction_reason" to the string retraction_reason for the given dataset. The updated dataset is returned</td></tr>
<tr><td rowspan="4">Arguments</td><td rowspan="2">identifier</td><td>Optional: No</td></tr><tr><td>Type: String</td></tr><tr><td rowspan="2">retraction_reason</td><td>Optional: No</td></tr><tr><td>Type: String</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs an instance of the class Dataset corresponding to the retracted dataset</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The retract dataset method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raise as well.</td></tr>
<tr><td>Authorization</td><td colspan="2">A token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of HuBMAP-Data-Admin group, an exception will be raised</td></tr>

</table>

Example:

```python
hubmap_id = "HBM123.ABCD.456"
retraction_reason = "this dataset has been deprecated"
retracted_dataset = entitysdk_instance.retract_dataset(hubmap_id, retraction_reason)
print(f"The type for retracted_dataset is {type(retracted_dataset)}")
```

Output:

```
The type for retracted_dataset is <class 'Dataset'>
```





##### Get Revisions List

<table>

<tr><td>Description</td><td colspan="2">Takes as input an id (HuBMAP id or UUID) for a dataset and returns the list of all next or previous revisions of that dataset. It doesn't matter where in the list of revisions the given dataset is. For example, if the given dataset is the first revision of 5, or the 5th revision of 5, the output will be the same. Accepts an optional argument "include_dataset". By default this is false. If left unchanged, only the revision number and uuid will be included for each revision. If include_dataset is set to true, the full dataset will also be returned for each</td></tr>
<tr><td rowspan="4">Arguments</td><td rowspan="2">identifier</td><td>Optional: No</td></tr><tr><td>Type: String</td></tr><tr><td rowspan="2">include_dataset</td><td>Optional: Yes</td></tr><tr><td>Type: Bool</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs a list of dictionaries. Each dictionary contains the revision number integer, and the uuid of the dataset as a string. If include_dataset is set to true, then the complete dataset for each will be included as a dictionary as well in the form of a dataset object</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The get revisions list method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raise as well.</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of HuBMAP-Read group, only information for entities that are public will be returned</td></tr>

</table>

Example:

```python
hubmap_id = "HBM123.ABCD.456"
include_dataset=True
list_of_revisions = entitysdk_instance.get_revisions_list(hubmap_id, include_dataset)
print(f"The type for list_of_revisions is {type(list_of_revisions)}")
print(f"The type for item in list_of_revisions is {type(list_of_revisions[0])}")
```

Output:

```
The type for list_of_revisions is <class 'Dataset'>
The type for item in list_of_revisions is <class 'dict'>

```

##### Get Associated Organs 

<table>

<tr><td>Description</td><td colspan="2">Takes an id (HuBMAP id or UUID) for a dataset and returns the list of organs associated with the given dataset</td></tr>
<tr><td rowspan="2">Arguments</td><td rowspan="2">identifier</td><td>Optional: No</td></tr><tr><td> Type: String</td></tr>
<tr><td>Outputs</td><td colspan="2">This method outputs a list of Sample objects corresponding to the organs associated with the dataset given by id.</td></tr>
<tr><td>Error Handling</td><td colspan="2">If the response code from Entity Api is greater than 299, an exception will be raised. The exception message will be the response from the Entity API. The get associated organs by dataset method will return this response from the API, so if this exception is handled individually, this information can be used. If the request to the Entity Api fails, an exception will be raise as well.</td></tr>
<tr><td>Authorization</td><td colspan="2">No token is required for this method. If a token is provided and it is invalid, an exception will be raised. If a token is not provided, or if a valid token is provided and the token is not part of HuBMAP-Read group, only information for organs that are public will be returned</td></tr>

</table>

Example:

```python
hubmap_id = "HBM123.ABCD.456"
organs_list = entitysdk_instance.get_associated_organs_from_dataset(hubmap_id)
print(f"The type for organs_list is {type(organs_list)}")
```

Output:

```
The type for revision_number is <class 'list'>
```



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
