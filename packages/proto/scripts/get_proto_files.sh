#!/bin/bash
MYFOLDER=$(pwd)

# Ethermint
mkdir -p proto
cd /tmp
git clone https://github.com/tharsis/ethermint/
cd ethermint/
cp -r ./proto/* $MYFOLDER/proto
cd /tmp
rm -rf ethermint

# Evmos
cd /tmp
git clone https://github.com/evmos/evmos/
cd evmos/
git checkout v10.0.0
cp -r ./proto/* $MYFOLDER/proto
cd /tmp
rm -rf evmos

cd /tmp
git clone https://github.com/cosmos/cosmos-sdk/
cd cosmos-sdk/
git checkout v0.46.7
cd third_party/proto
buf export buf.build/cosmos/cosmos-sdk:8cb30a2c4de74dc9bd8d260b1e75e176 --output .
cd ../..
cp -r ./proto/* $MYFOLDER/proto
cp -r ./third_party/proto/* $MYFOLDER/proto
cd /tmp
rm -rf cosmos-sdk
