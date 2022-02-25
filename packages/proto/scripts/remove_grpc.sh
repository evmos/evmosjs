#!/bin/bash
echo $PWD
for file in $(find src/proto -type f)
do
    line=$(grep -n '@grpc/grpc-js' $file | cut -f1 -d':')
    if [[ $line -gt 0 ]];
    then
        echo "Processing file... $file"
        sed -i '' "${line}d" ${file}
        functions=$(grep -n 'interface GrpcUnaryServiceInterface' $file | cut -f1 -d':')
        sed -i '' "${functions},\$d" ${file}
        echo '}' >> $file
    fi
    sed -i '' '1s#^#/* eslint-disable */\n#' $file
    sed -i '' '1s#^#// @ts-nocheck\n#' $file
done
