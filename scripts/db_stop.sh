#!/bin/bash
docker stop carto-postgis
if [ $? -eq 0 ]; then
   echo 'Container for DB carto-postgis stopped'
else
   echo 'Could not stop container carto-posgis, run a docker ps -a to check'
fi
docker ps -a | grep 'carto-postgis'
