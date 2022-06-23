yarn unlink "@astradefi/address-converter"
yarn unlink "@astradefi/eip712"
yarn unlink "@astradefi/proto"
yarn unlink "@astradefi/provider"
yarn unlink "@astradefi/transactions"

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
yarn link "@astradefi/address-converter"
yarn link "@astradefi/eip712"
yarn link "@astradefi/proto"
yarn link "@astradefi/provider"
yarn link "@astradefi/transactions"
