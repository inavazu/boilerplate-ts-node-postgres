#!/bin/bash
function readJson {  
  UNAMESTR=`uname`
  if [[ "$UNAMESTR" == 'Linux' ]]; then
    SED_EXTENDED='-r'
  elif [[ "$UNAMESTR" == 'Darwin' ]]; then
    SED_EXTENDED='-E'
  fi; 

  VALUE=`grep -m 1 "\"${2}\"" ${1} | sed ${SED_EXTENDED} 's/^ *//;s/.*: *"//;s/",?//'`

  if [ ! "$VALUE" ]; then
    echo "Error: Cannot find \"${2}\" in ${1}" >&2;
    exit 1;
  else
    echo $VALUE ;
  fi; 
}

versionFromJson=`readJson ./package.json node` || exit 1;
version="${versionFromJson:1}"
echo "Package.json version $version"

currentVersion=$(node -v)
currentVersion="${currentVersion:1}"
echo "Current node version ${currentVersion}"

if [ "$version" = "$currentVersion" ]; then
  echo "OK: Node versions match with ${currentVersion}" ;
else
  echo "Error: Node versions do not match" >&2;
  exit 1;
fi;
