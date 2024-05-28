---
layout: page
---
# HuBMAP APIs

The following five APIs, available as RESTful web services, are availble which support data ingest, querying and delivery of metadata. Data delivery is available via the [Globus Transfer Service](https://www.globus.org/data-transfer) and [Globus Transfer API](https://docs.globus.org/api/transfer/).  See the [HuBMAP IDs](#HUBMAPIDS) section below for information about the ids used by the HuBMAP APIs.


### Ingest API
The Ingest API supports writing data and metadata to HuBMAP. It is used when Tissue Mapping Centers (TMCs) contribute data and also to deposit derived data resulting from the execution of pipelines.
- [GitHub](https://github.com/hubmapconsortium/ingest-ui) 
- [Smart API](https://smart-api.info/ui/5a6bea1158d2652743c7a201fdb1c44d)

### UUID API
The UUID API supports all donor and tissue sample registration and submission of data and collection of provenance information via the Ingest UI. The Ingest UI is a web user interface used by the Tissue Mapping Centers (TMCs) when contributing raw and derived data which result from the execution of pipelines.
- [GitHub](https://github.com/hubmapconsortium/uuid-api)


### Search & Index API
The Search & Index API supports searching and reindexing of HuBMAP metadata and data. The /search endpoint returns sets of data entities matching specifi ed queries for Donors, Tissue Samples and Datasets. The /reindex endpoint is used internally to index new and changed entities, this endpoint is not accessible externally, but only from other APIs that create, update or delete entities.
- [GitHub](https://github.com/hubmapconsortium/search-api)
- [Smart API](https://smart-api.info/ui/7aaf02b838022d564da776b03f357158)

### Ontology/UBKG API
The Ontology API accesses an instance of a **Unified Biomedical Knowledge Graph** (UBKG), a neo4j knowledge graph that links infomation from a variety of biomedical vocabulary systems. The HuBMAP instance of UBKG includes HuBMAP's **application ontology** that represents the HuBMAP operational model. 

- [UBKG](https://ubkg.docs.xconsortia.org/), including links to relevant GitHub repositories
- [Smart API](https://smart-api.info/ui/96e5b5c0b0efeef5b93ea98ac2794837)

### Entity API
The Entity API returns information about HuBMAP data entities (Figure 3). 

Examples of Entity endpoints are as follows:
 - /entities/types: return valid entity types
 - /entities/{identifer}: return specific entities
 - /entities/types/{type_code}: return UUIDs by entity type
 - /entities/{identifier}/provenance: return provenance
   data for entity

**Figure 3.**
<img src="https://drive.google.com/file/d/14aAyTItvm3teFB5jUX5TVGRpW4oit99b/view?usp=sharing" alt="An example HuBMAP entity graph">

In general, a donor and organ are required in the provenance hierarchy where tissue samples (such as blocks and samples) can be organized based on several different tissue sample types.

- [GitHub](https://github.com/hubmapconsortium/entity-api) 
- [Smart API](https://smart-api.info/ui/0065e419668f3336a40d1f5ab89c6ba3)

## <a id="HRA"></a> Human Reference Atlas (HRA) APIs
HuBMAP produces the Human Reference Atlas (HRA), see <https://humanatlas.io/>, which provies a comprehensive, high-resolution, three-dimensional atlas of all the cells in the healthy human body. The Human Reference Atlas provides standard terminologies and data structures for describing specimens, biological structures, and spatial positions linked to existing ontologies. In addition to user interfaces, querying of the HRA is available via APIs.

### CCF API
The CCF API returns reference information about the HRA and information about experimental data registered with the HRA.

- [GitHub](https://github.com/hubmapconsortium/ccf-ui)
- [Interactive API Documentation](https://ccf-api.hubmapconsortium.org/#/)

### HRA via SPARQL
The HRA is published as an RDF knowledge graph and may be queried using a multitude of available libraries. It is published at several prominent biomedical ontology websites including OLS and BioPortal.

- [Ontology Lookup Service (OLS)](https://www.ebi.ac.uk/ols/ontologies/ccf)
- [BioPortal](https://bioportal.bioontology.org/ontologies/CCF)
- CCF-GRLC API, A repository of useful HRA SPARQL queries wrapped into a standard (OpenAPI) restful service. 
    - [GitHub](https://github.com/hubmapconsortium/ccf-grlc/)
    - [CCF Queries](http://grlc.io/api/hubmapconsortium/ccf-grlc/ccf/)
    - [Ubergraph Queries](http://grlc.io/api/hubmapconsortium/ccf-grlc/ubergraph/)
- [More useful SPARQL queries](https://triplydb.com/BruceWHerrII/-/stories/CCFOWL-v201-Paper)

## <a id="HUBMAPIDS"></a> Identifiers used in HuBMAP and the APIs

HuBMAP uses three different kinds of identifiers:

### HuBMAP ID

HuBMAP IDs are "human readable" identifiers that are used when displaying information about HuBMAP entities such as Donors, Tissue Samples, Datasets, Collections.

- Example: `HBM123.ABCD.456` 
- Used for identification of HuBMAP entities and referencing in HuBMAP context, e.g. in the portal UI, slides, human-human communication, etc.
- These identifiers can be used in the APIs to query portal UI and APIs
- There is a one-to-one mapping between HuBMAP IDs and UUIDs, with all HuBMAP IDs guaranteed to having a corresponding UUID, though not all UUIDs have a corresponding HuBMAP ID.

### UUID
HuBMAP UUIDs are intended for use internally in software and data storage.  They are intended for use by software and systems only and not human readable.

- These ids are 32 digit hexadecimal numbers. Example: `0123456789abcdef0123456789abcdef`
- Used for software implementation and data storage.
- These identifiers can be used to query the APIs and data portal.

### DOI
Digital Object Identifiers (DOIs) are generated for published hubmap data and allow for permanent references outside of HuBMAP.

- Example: `10.1234/HBM123.ABCD.456` 
- Used for referencing outside HuBMAP context, in particular for use as references in publications.
- Displayed as: `doi:10.1234/HBM.123.ABCD.456`
- Linked to: `https://doi.org/10.1234/HBM.123.ABCD.456`
- Not all HuBMAP IDs are registered as DOIs, primarily published (public) Datasets and Collections of datasets have DOIs.
