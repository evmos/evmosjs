yarn unlink "@evmos/address-converter"
yarn unlink "@evmos/eip712"
yarn unlink "@evmos/proto"
yarn unlink "@evmos/provider"
yarn unlink "@evmos/transactions"

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
yarn link "@evmos/address-converter"
yarn link "@evmos/eip712"
yarn link "@evmos/proto"
yarn link "@evmos/provider"
yarn link "@evmos/transactions"
