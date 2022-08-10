yarn unlink "@tharsis/address-converter"
yarn unlink "@tharsis/eip712"
yarn unlink "@tharsis/proto"
yarn unlink "@tharsis/provider"
yarn unlink "@tharsis/transactions"

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
yarn link "@tharsis/address-converter"
yarn link "@tharsis/eip712"
yarn link "@tharsis/proto"
yarn link "@tharsis/provider"
yarn link "@tharsis/transactions"
