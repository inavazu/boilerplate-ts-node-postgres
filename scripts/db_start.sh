#!/bin/bash
docker start carto-postgis
if [ $? -eq 0 ]; then
   echo 'Container for DB carto-postgis already existed'
else
   echo 'Creating container for DB carto-postgis'
   docker run --name carto-postgis -p 5432:5432 -e POSTGRES_PASSWORD=mypassword -v ${HOME}/dev/carto/postgres-data/:/var/lib/postgresql/data -d postgis/postgis
fi
 echo 'Container for DB carto-postgis up and ready'
 docker ps -a | grep 'carto-postgis'