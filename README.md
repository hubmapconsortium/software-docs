# This repo has MOVED!
The repository has been replaced by the new [HuBMAP Documentation Repository](https://github.com/hubmapconsortium/documentation/) please use this repository instead.

# HuBMAP Software Documentation
This repository contains the documentation hosted via GitHub Pages at https://software.docs.hubmapconsortium.org.

## Contents
- `/src/`- Any source code used to generate the hosted documents (not directly published)
- `/docs/` - Contains the markdown files that are hosted as html by GitHub Pages.
- `/docker/` - The files to create a docker image which can be run locally to test the site. This image is built and available from DockerHub as `hubmap/github-pages-server`

## Working with submodule

This repository relies on the [data_submission_guide](https://github.com/x-atlas-consortia/data_submission_guide) as a submodule to function. The
file `.gitmodules` contains the configuration for the URL and specific branch of the submodule that is to be used. Once
you already have cloned this repository and switched to the target branch, to load the latest `data_submission_guide` submodule:

```
git submodule update --init --remote
```

## Mimicking GitHub Pages Locally
The docker image built out of the `/docker` directory provides a local server to mimic the GitHub Pages server. This image has been built and pushed to DockerHub.
To run it you must mount a local copy of the `/documentation/` repo as a volume in the container as the volume `/software-docs/` and expose port `4000` locally.
The `run.sh` script is provided to help with this. You must have docker installed and running.

To test this repository locally using the docker image execute the `run.sh` script included in this directory like:

`sh ./run.sh /full/absolute/path/to/the/downloaded/repository`
When the container is running correctly you'll be able to navigate to https://localhost:4000/ in a local browser.

## Layouts
There are 3 layouts available within `docs/_layouts/`
1. home.html
2. page.html
3. default.html (This layout auto generates Table of Contents, Breadcrumbs and offers additional functionality as described below.)

## Usage
- Save your documentation files in the `docs/` directory.
- Properly name the documents and directories as path names are used to automatically generate the `Breadcrumbs` when the `layout: default` is used
- Properly use H headings, in their correct rankings as these are pulled from the documents to automatically generate the `Table of Contents`
- For convenience, within `docs/lang/en.json`, you are free to change the text:
  - And links of the `menu` property without having to rebuild the html files. The `menu` property is an array of objects in format of `{name: "Link name", href: "/link-url"}`
  - Of the `breadcrumbRoot` property without having to rebuild the html files. The change here will appear on the `Breadcrumbs` component. If you remove this property, no root will be included.
  - Of the `sidebars` property without having to rebuild the html files. These `sidebars` determine are for setting custom Table of Contents per document instead of the automatically generated one. Configure the `sidebars` property with a key that is the value of location.pathname or the base path of the .md within `docs`. Each pathname is an object with keys `items` (array of objects) and `isCascading` (boolean). Setting isCascading to true means that any subsequent docs within the pathname subdirectories will also have the same Table of Contents.

## Development
Only need to set this up if there is a need to add new functionality, features, styles to the templates such as _layouts/default.html. 
To view `/docs` as they'd appear on GitHub pages, see [mimicking GitHub pages](#mimicking-github-pages-locally).
### Install
```bash
cd documentation
npm i .
```

### Run Dev Server
```bash
npm start
```
Open [http://localhost:3005](http://localhost:3005) with your browser to see the result.   
*Note:* This is only for viewing the styles, layouts and JS functionality generated through `/src` changes, ideally should set up the docker server for mimicking of GitHub pages to test fully.  
[See Below: Mimicking GitHub Pages Locally](#mimicking-github-pages-locally)
### CSS
```
npm run css # builds CSS files to `/docs/css/main.css` and copies to `./docs/_site` GitHub build folder
```

### JS
```
npm run js # builds Js files to `/docs/js/main.js` and copies to `./docs/_site` GitHub build folder
```

### html
```
npm run html # builds the PUG layout and pages to `/docs[/_layouts]`
```

### Build All
```
npm run build # builds all of the above
```
Serve `docs` folder locally.   
Should have `serve` module installed after running `npm i .`  
*Note:* This is only for viewing the styles, layouts and JS functionality generated through `/src` changes, ideally should set up the docker server for mimicking of GitHub pages to test fully.  
[See Below: Mimicking GitHub Pages Locally](#mimicking-github-pages-locally)
```
serve ./docs 
```
## Coding Conventions
- Do use dash casing to separate words for directories in `docs`:
    - correct: `foo-who/` , incorrect: `foo_who/`
- Please set up prettier in your IDE to keep code formatting consistent or just follow the prettier rules as described in `./package.json`
- Do follow any additional code formatting and styles as seen in the project
