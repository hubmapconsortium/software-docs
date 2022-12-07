#!/bin/bash
if [ -z "$1" ]
  then
    echo "    Must provide the absolute path to the local directory where software-docs was cloned."; echo "    Like ./runlocal.sh /users/myuser/projects/software-docs"; exit 1;
fi

if [ ! -d "$1" ]
  then
    echo "$1 must be a valid directory"; exit 1;
fi
    

docker run -it -p4000:4000 -v /Users/SHIREY/projects/hubmap/software-docs:/software-docs hubmap/github-pages-server
