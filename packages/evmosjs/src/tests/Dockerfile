FROM tharsishq/evmos:latest

RUN apt-get update \
&& apt-get install jq=1.6-2.1 -y --no-install-recommends \
&& apt-get clean \
&& rm -rf /var/lib/apt/lists/*

WORKDIR /go/src/github.com/evmos/evmos

COPY ./init-node.sh .

# perms to make init-node.sh executable
RUN chmod +x init-node.sh

EXPOSE 1317 8545 26657

CMD ["sh", "./init-node.sh"]
