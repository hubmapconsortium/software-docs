#HuBMAP Software Documentation

This repository contains the documentation hosted at https://software.docs.hubmapconsortium.org.

### Contents

  - `/src/`- any source code used to generate the hosted documents (not directly published)
  - `/docker/` - The files to create a docker image which can be run locally to test the site.  This image is built and available from DockerHub as `hubmap/github-pages-server`
  - `/docs/` - Contains the markdown files that are hosted as html by GitHuB Pages.
  - `/docs/templates` The html templates used by GitHub Pages to wrap the markdown.  At the top of the markdown file insert one of the following to include the menus and styling provided by the templates`
```
---
layout: page
---
  or
---
layout: home
---
```

### Testing locally with docker

The docker image built out of the `/docker` directory provides a local server to mimic the GitHub Pages server.  This image has been built and pushed to DockerHub.  To run it you must mount a local copy of the `/software-docs/` repo as a volume in the container as the volume `/software-docs/` and expose port 4000 locally.  The runlocal.sh script is provided to help with this.  You must have docker installed and running.

To test this repository locally using the  docker image execute the runlocal.sh script included in this directory like:
   `./runlocal.sh /full/absolute/path/to/the/downloaded/repository`

When the container is running correctly you'll be able to navigate to `https://localhost:4000/` in a local browser.
