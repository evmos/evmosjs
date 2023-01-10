#!/bin/bash
# NOTE: protoc is required

FOLDER=$(pwd)
I=$(pwd)/proto
DEST_TS=$(pwd)/src/proto/
mkdir -p $DEST_TS

# # This generates js protos (used for testing)
# DEST=$(pwd)/tests/proto/
# mkdir -p $DEST
# grpc_tools_node_protoc --proto_path=$I --js_out=import_style=commonjs,binary:$DEST --grpc_out=generate_package_definition:$DEST $(find $(pwd)/proto -iname "*.proto")

# This generates ts protos (used for src)
protoc \
--plugin=protoc-gen-ts=$(which protoc-gen-ts) \
--ts_out=$DEST_TS \
--proto_path=$I \
$(find $(pwd)/proto -iname "*.proto")
