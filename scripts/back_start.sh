#!/bin/bash
docker start paystats-back
if [ $? -eq 0 ]; then
   echo 'Container for Back paystats-back already existed'
else
   echo 'Creating container for Back paystats-back'
   docker run --name paystats-back  --network="host" -p 5001:5001 -d paystats-back
fi
 echo 'Container for Back paystats-back up and ready'
 docker ps -a | grep 'paystats-back'