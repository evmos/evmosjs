FROM golang:1.20.0-bullseye AS build-env

WORKDIR /go/src/github.com/evmos/

RUN git clone "https://github.com/evmos/evmos.git"

WORKDIR /go/src/github.com/evmos/evmos

RUN apt-get update -y

RUN make build

FROM golang:1.20.0-bullseye

RUN apt-get update \
&& apt-get install jq=1.6-2.1 -y --no-install-recommends \
&& apt-get clean \
&& rm -rf /var/lib/apt/lists/*

WORKDIR /go/src/github.com/evmos/evmos

COPY ./init-node.sh .

# perms to make init-node.sh executable
RUN chmod +x init-node.sh

COPY --from=build-env /go/src/github.com/evmos/evmos/build/evmosd /usr/bin/evmosd

EXPOSE 1317 8545

CMD ["sh", "./init-node.sh"]
