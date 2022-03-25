#!/bin/bash
echo $PWD
for file in $(find src/proto -type f)
do
    echo "Processing file... $file"
    # Note go from last to first to avoid modifing the indexes when deleting
    lines=$(grep -n '* as dependency_' $file | cut -f1 -d':' | tail -r)
    i=$(grep -n '* as dependency_' $file | cut -f1 -d':' | wc -l)
    i=$((i+0))
    for dep in $lines
    do
        uses=$(grep -n "dependency_$i" $file | wc -l)
        uses=$((uses+0))
        if [ $uses -lt 2 ]
        then
        echo "Removing dependency_$i..."
        sed -i '' "${dep}d" ${file}
        fi
        i=$((i-1))
    done
done
