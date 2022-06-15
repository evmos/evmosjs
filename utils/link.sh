yarn unlink "@astraprotocol/address-converter"
yarn unlink "@astraprotocol/eip712"
yarn unlink "@astraprotocol/proto"
yarn unlink "@astraprotocol/provider"
yarn unlink "@astraprotocol/transactions"

cd ..
cd packages/address-converter
yarn unlink
yarn link
cd ../eip712
yarn unlink
yarn link
cd ../proto
yarn unlink
yarn link
cd ../provider
yarn unlink
yarn link
cd ../transactions
yarn unlink
yarn link
cd ..
cd utils
yarn link "@astraprotocol/address-converter"
yarn link "@astraprotocol/eip712"
yarn link "@astraprotocol/proto"
yarn link "@astraprotocol/provider"
yarn link "@astraprotocol/transactions"
