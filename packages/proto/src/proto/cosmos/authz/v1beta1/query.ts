// @ts-nocheck
/* eslint-disable */
/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.19.4
 * source: cosmos/authz/v1beta1/query.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as dependency_2 from "./../../base/query/v1beta1/pagination";
import * as dependency_3 from "./authz";
import * as pb_1 from "google-protobuf";
export namespace cosmos.authz.v1beta1 {
    export class QueryGrantsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            granter?: string;
            grantee?: string;
            msg_type_url?: string;
            pagination?: dependency_2.cosmos.base.query.v1beta1.PageRequest;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("granter" in data && data.granter != undefined) {
                    this.granter = data.granter;
                }
                if ("grantee" in data && data.grantee != undefined) {
                    this.grantee = data.grantee;
                }
                if ("msg_type_url" in data && data.msg_type_url != undefined) {
                    this.msg_type_url = data.msg_type_url;
                }
                if ("pagination" in data && data.pagination != undefined) {
                    this.pagination = data.pagination;
                }
            }
        }
        get granter() {
            return pb_1.Message.getField(this, 1) as string;
        }
        set granter(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get grantee() {
            return pb_1.Message.getField(this, 2) as string;
        }
        set grantee(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        get msg_type_url() {
            return pb_1.Message.getField(this, 3) as string;
        }
        set msg_type_url(value: string) {
            pb_1.Message.setField(this, 3, value);
        }
        get pagination() {
            return pb_1.Message.getWrapperField(this, dependency_2.cosmos.base.query.v1beta1.PageRequest, 4) as dependency_2.cosmos.base.query.v1beta1.PageRequest;
        }
        set pagination(value: dependency_2.cosmos.base.query.v1beta1.PageRequest) {
            pb_1.Message.setWrapperField(this, 4, value);
        }
        static fromObject(data: {
            granter?: string;
            grantee?: string;
            msg_type_url?: string;
            pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }) {
            const message = new QueryGrantsRequest({});
            if (data.granter != null) {
                message.granter = data.granter;
            }
            if (data.grantee != null) {
                message.grantee = data.grantee;
            }
            if (data.msg_type_url != null) {
                message.msg_type_url = data.msg_type_url;
            }
            if (data.pagination != null) {
                message.pagination = dependency_2.cosmos.base.query.v1beta1.PageRequest.fromObject(data.pagination);
            }
            return message;
        }
        toObject() {
            const data: {
                granter?: string;
                grantee?: string;
                msg_type_url?: string;
                pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
            } = {};
            if (this.granter != null) {
                data.granter = this.granter;
            }
            if (this.grantee != null) {
                data.grantee = this.grantee;
            }
            if (this.msg_type_url != null) {
                data.msg_type_url = this.msg_type_url;
            }
            if (this.pagination != null) {
                data.pagination = this.pagination.toObject();
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (typeof this.granter === "string" && this.granter.length)
                writer.writeString(1, this.granter);
            if (typeof this.grantee === "string" && this.grantee.length)
                writer.writeString(2, this.grantee);
            if (typeof this.msg_type_url === "string" && this.msg_type_url.length)
                writer.writeString(3, this.msg_type_url);
            if (this.pagination !== undefined)
                writer.writeMessage(4, this.pagination, () => this.pagination.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryGrantsRequest {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryGrantsRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.granter = reader.readString();
                        break;
                    case 2:
                        message.grantee = reader.readString();
                        break;
                    case 3:
                        message.msg_type_url = reader.readString();
                        break;
                    case 4:
                        reader.readMessage(message.pagination, () => message.pagination = dependency_2.cosmos.base.query.v1beta1.PageRequest.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): QueryGrantsRequest {
            return QueryGrantsRequest.deserialize(bytes);
        }
    }
    export class QueryGrantsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            grants?: dependency_3.cosmos.authz.v1beta1.Grant[];
            pagination?: dependency_2.cosmos.base.query.v1beta1.PageResponse;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("grants" in data && data.grants != undefined) {
                    this.grants = data.grants;
                }
                if ("pagination" in data && data.pagination != undefined) {
                    this.pagination = data.pagination;
                }
            }
        }
        get grants() {
            return pb_1.Message.getRepeatedWrapperField(this, dependency_3.cosmos.authz.v1beta1.Grant, 1) as dependency_3.cosmos.authz.v1beta1.Grant[];
        }
        set grants(value: dependency_3.cosmos.authz.v1beta1.Grant[]) {
            pb_1.Message.setRepeatedWrapperField(this, 1, value);
        }
        get pagination() {
            return pb_1.Message.getWrapperField(this, dependency_2.cosmos.base.query.v1beta1.PageResponse, 2) as dependency_2.cosmos.base.query.v1beta1.PageResponse;
        }
        set pagination(value: dependency_2.cosmos.base.query.v1beta1.PageResponse) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        static fromObject(data: {
            grants?: ReturnType<typeof dependency_3.cosmos.authz.v1beta1.Grant.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }) {
            const message = new QueryGrantsResponse({});
            if (data.grants != null) {
                message.grants = data.grants.map(item => dependency_3.cosmos.authz.v1beta1.Grant.fromObject(item));
            }
            if (data.pagination != null) {
                message.pagination = dependency_2.cosmos.base.query.v1beta1.PageResponse.fromObject(data.pagination);
            }
            return message;
        }
        toObject() {
            const data: {
                grants?: ReturnType<typeof dependency_3.cosmos.authz.v1beta1.Grant.prototype.toObject>[];
                pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
            } = {};
            if (this.grants != null) {
                data.grants = this.grants.map((item: dependency_3.cosmos.authz.v1beta1.Grant) => item.toObject());
            }
            if (this.pagination != null) {
                data.pagination = this.pagination.toObject();
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.grants !== undefined)
                writer.writeRepeatedMessage(1, this.grants, (item: dependency_3.cosmos.authz.v1beta1.Grant) => item.serialize(writer));
            if (this.pagination !== undefined)
                writer.writeMessage(2, this.pagination, () => this.pagination.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryGrantsResponse {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryGrantsResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.grants, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_3.cosmos.authz.v1beta1.Grant.deserialize(reader), dependency_3.cosmos.authz.v1beta1.Grant));
                        break;
                    case 2:
                        reader.readMessage(message.pagination, () => message.pagination = dependency_2.cosmos.base.query.v1beta1.PageResponse.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): QueryGrantsResponse {
            return QueryGrantsResponse.deserialize(bytes);
        }
    }
}
