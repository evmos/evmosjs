// @ts-nocheck
/* eslint-disable */
/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.17.3
 * source: cosmos/authz/v1beta1/event.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as pb_1 from "google-protobuf";
export namespace cosmos.authz.v1beta1 {
    export class EventGrant extends pb_1.Message {
        constructor(data?: any[] | {
            msg_type_url?: string;
            granter?: string;
            grantee?: string;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("msg_type_url" in data && data.msg_type_url != undefined) {
                    this.msg_type_url = data.msg_type_url;
                }
                if ("granter" in data && data.granter != undefined) {
                    this.granter = data.granter;
                }
                if ("grantee" in data && data.grantee != undefined) {
                    this.grantee = data.grantee;
                }
            }
        }
        get msg_type_url() {
            return pb_1.Message.getField(this, 2) as string;
        }
        set msg_type_url(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        get granter() {
            return pb_1.Message.getField(this, 3) as string;
        }
        set granter(value: string) {
            pb_1.Message.setField(this, 3, value);
        }
        get grantee() {
            return pb_1.Message.getField(this, 4) as string;
        }
        set grantee(value: string) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data: {
            msg_type_url?: string;
            granter?: string;
            grantee?: string;
        }) {
            const message = new EventGrant({});
            if (data.msg_type_url != null) {
                message.msg_type_url = data.msg_type_url;
            }
            if (data.granter != null) {
                message.granter = data.granter;
            }
            if (data.grantee != null) {
                message.grantee = data.grantee;
            }
            return message;
        }
        toObject() {
            const data: {
                msg_type_url?: string;
                granter?: string;
                grantee?: string;
            } = {};
            if (this.msg_type_url != null) {
                data.msg_type_url = this.msg_type_url;
            }
            if (this.granter != null) {
                data.granter = this.granter;
            }
            if (this.grantee != null) {
                data.grantee = this.grantee;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (typeof this.msg_type_url === "string" && this.msg_type_url.length)
                writer.writeString(2, this.msg_type_url);
            if (typeof this.granter === "string" && this.granter.length)
                writer.writeString(3, this.granter);
            if (typeof this.grantee === "string" && this.grantee.length)
                writer.writeString(4, this.grantee);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): EventGrant {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new EventGrant();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 2:
                        message.msg_type_url = reader.readString();
                        break;
                    case 3:
                        message.granter = reader.readString();
                        break;
                    case 4:
                        message.grantee = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): EventGrant {
            return EventGrant.deserialize(bytes);
        }
    }
    export class EventRevoke extends pb_1.Message {
        constructor(data?: any[] | {
            msg_type_url?: string;
            granter?: string;
            grantee?: string;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("msg_type_url" in data && data.msg_type_url != undefined) {
                    this.msg_type_url = data.msg_type_url;
                }
                if ("granter" in data && data.granter != undefined) {
                    this.granter = data.granter;
                }
                if ("grantee" in data && data.grantee != undefined) {
                    this.grantee = data.grantee;
                }
            }
        }
        get msg_type_url() {
            return pb_1.Message.getField(this, 2) as string;
        }
        set msg_type_url(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        get granter() {
            return pb_1.Message.getField(this, 3) as string;
        }
        set granter(value: string) {
            pb_1.Message.setField(this, 3, value);
        }
        get grantee() {
            return pb_1.Message.getField(this, 4) as string;
        }
        set grantee(value: string) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data: {
            msg_type_url?: string;
            granter?: string;
            grantee?: string;
        }) {
            const message = new EventRevoke({});
            if (data.msg_type_url != null) {
                message.msg_type_url = data.msg_type_url;
            }
            if (data.granter != null) {
                message.granter = data.granter;
            }
            if (data.grantee != null) {
                message.grantee = data.grantee;
            }
            return message;
        }
        toObject() {
            const data: {
                msg_type_url?: string;
                granter?: string;
                grantee?: string;
            } = {};
            if (this.msg_type_url != null) {
                data.msg_type_url = this.msg_type_url;
            }
            if (this.granter != null) {
                data.granter = this.granter;
            }
            if (this.grantee != null) {
                data.grantee = this.grantee;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (typeof this.msg_type_url === "string" && this.msg_type_url.length)
                writer.writeString(2, this.msg_type_url);
            if (typeof this.granter === "string" && this.granter.length)
                writer.writeString(3, this.granter);
            if (typeof this.grantee === "string" && this.grantee.length)
                writer.writeString(4, this.grantee);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): EventRevoke {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new EventRevoke();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 2:
                        message.msg_type_url = reader.readString();
                        break;
                    case 3:
                        message.granter = reader.readString();
                        break;
                    case 4:
                        message.grantee = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): EventRevoke {
            return EventRevoke.deserialize(bytes);
        }
    }
}
