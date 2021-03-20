#/usr/bin/env/sh
#set -e
#
#components="server client"
#
#for component in $components
#do
#    printf "\n\nInstalling dependencies: $component\n"
#    cd $component
#    npm install
#    cd ..
#done
cp node_modules/jose/package.json node_modules/jose/package.json.old
cp -r node_modules/jose/dist/browser/* node_modules/jose
cp -f node_modules/jose/package.json.old node_modules/jose/package.json
