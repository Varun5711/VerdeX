(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/database.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
"use strict"; //# sourceMappingURL=database.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/base64.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "byteLength",
    ()=>byteLength,
    "fromByteArray",
    ()=>fromByteArray,
    "fromByteArrayUrlSafeNoPadding",
    ()=>fromByteArrayUrlSafeNoPadding,
    "toByteArray",
    ()=>toByteArray
]);
"use strict";
var lookup = [];
var revLookup = [];
var Arr = Uint8Array;
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for(var i = 0, len = code.length; i < len; ++i){
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
}
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(b64) {
    var len = b64.length;
    if (len % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
    }
    var validLen = b64.indexOf("=");
    if (validLen === -1) validLen = len;
    var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
    return [
        validLen,
        placeHoldersLen
    ];
}
function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(_b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i;
    for(i = 0; i < len; i += 4){
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
    }
    return arr;
}
function tripletToBase64(num) {
    return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for(var i = start; i < end; i += 3){
        tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (uint8[i + 2] & 255);
        output.push(tripletToBase64(tmp));
    }
    return output.join("");
}
function fromByteArray(uint8) {
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3;
    var parts = [];
    var maxChunkLength = 16383;
    for(var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength){
        parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
    }
    if (extraBytes === 1) {
        tmp = uint8[len - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
    } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
    }
    return parts.join("");
}
function fromByteArrayUrlSafeNoPadding(uint8) {
    return fromByteArray(uint8).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
} //# sourceMappingURL=base64.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/common/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSimpleObject",
    ()=>isSimpleObject,
    "parseArgs",
    ()=>parseArgs,
    "validateDeploymentUrl",
    ()=>validateDeploymentUrl
]);
"use strict";
function parseArgs(args) {
    if (args === void 0) {
        return {};
    }
    if (!isSimpleObject(args)) {
        throw new Error("The arguments to a Convex function must be an object. Received: ".concat(args));
    }
    return args;
}
function validateDeploymentUrl(deploymentUrl) {
    if (typeof deploymentUrl === "undefined") {
        throw new Error("Client created with undefined deployment address. If you used an environment variable, check that it's set.");
    }
    if (typeof deploymentUrl !== "string") {
        throw new Error("Invalid deployment address: found ".concat(deploymentUrl, '".'));
    }
    if (!(deploymentUrl.startsWith("http:") || deploymentUrl.startsWith("https:"))) {
        throw new Error('Invalid deployment address: Must start with "https://" or "http://". Found "'.concat(deploymentUrl, '".'));
    }
    try {
        new URL(deploymentUrl);
    } catch (e) {
        throw new Error('Invalid deployment address: "'.concat(deploymentUrl, '" is not a valid URL. If you believe this URL is correct, use the `skipConvexDeploymentUrlCheck` option to bypass this.'));
    }
    if (deploymentUrl.endsWith(".convex.site")) {
        throw new Error('Invalid deployment address: "'.concat(deploymentUrl, '" ends with .convex.site, which is used for HTTP Actions. Convex deployment URLs typically end with .convex.cloud? If you believe this URL is correct, use the `skipConvexDeploymentUrlCheck` option to bypass this.'));
    }
}
function isSimpleObject(value) {
    var // Objects generated from other contexts (e.g. across Node.js `vm` modules) will not satisfy the previous
    // conditions but are still simple objects.
    _prototype_constructor;
    const isObject = typeof value === "object";
    const prototype = Object.getPrototypeOf(value);
    const isSimple = prototype === null || prototype === Object.prototype || (prototype === null || prototype === void 0 ? void 0 : (_prototype_constructor = prototype.constructor) === null || _prototype_constructor === void 0 ? void 0 : _prototype_constructor.name) === "Object";
    return isObject && isSimple;
} //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/value.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "base64ToBigInt",
    ()=>base64ToBigInt,
    "bigIntToBase64",
    ()=>bigIntToBase64,
    "convexOrUndefinedToJson",
    ()=>convexOrUndefinedToJson,
    "convexToJson",
    ()=>convexToJson,
    "jsonToConvex",
    ()=>jsonToConvex,
    "modernBase64ToBigInt",
    ()=>modernBase64ToBigInt,
    "modernBigIntToBase64",
    ()=>modernBigIntToBase64,
    "patchValueToJson",
    ()=>patchValueToJson,
    "slowBase64ToBigInt",
    ()=>slowBase64ToBigInt,
    "slowBigIntToBase64",
    ()=>slowBigIntToBase64,
    "stringifyValueForError",
    ()=>stringifyValueForError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/base64.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/common/index.js [app-client] (ecmascript)");
"use strict";
;
;
const LITTLE_ENDIAN = true;
const MIN_INT64 = BigInt("-9223372036854775808");
const MAX_INT64 = BigInt("9223372036854775807");
const ZERO = BigInt("0");
const EIGHT = BigInt("8");
const TWOFIFTYSIX = BigInt("256");
function isSpecial(n) {
    return Number.isNaN(n) || !Number.isFinite(n) || Object.is(n, -0);
}
function slowBigIntToBase64(value) {
    if (value < ZERO) {
        value -= MIN_INT64 + MIN_INT64;
    }
    let hex = value.toString(16);
    if (hex.length % 2 === 1) hex = "0" + hex;
    const bytes = new Uint8Array(new ArrayBuffer(8));
    let i = 0;
    for (const hexByte of hex.match(/.{2}/g).reverse()){
        bytes.set([
            parseInt(hexByte, 16)
        ], i++);
        value >>= EIGHT;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromByteArray"](bytes);
}
function slowBase64ToBigInt(encoded) {
    const integerBytes = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toByteArray"](encoded);
    if (integerBytes.byteLength !== 8) {
        throw new Error("Received ".concat(integerBytes.byteLength, " bytes, expected 8 for $integer"));
    }
    let value = ZERO;
    let power = ZERO;
    for (const byte of integerBytes){
        value += BigInt(byte) * TWOFIFTYSIX ** power;
        power++;
    }
    if (value > MAX_INT64) {
        value += MIN_INT64 + MIN_INT64;
    }
    return value;
}
function modernBigIntToBase64(value) {
    if (value < MIN_INT64 || MAX_INT64 < value) {
        throw new Error("BigInt ".concat(value, " does not fit into a 64-bit signed integer."));
    }
    const buffer = new ArrayBuffer(8);
    new DataView(buffer).setBigInt64(0, value, true);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromByteArray"](new Uint8Array(buffer));
}
function modernBase64ToBigInt(encoded) {
    const integerBytes = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toByteArray"](encoded);
    if (integerBytes.byteLength !== 8) {
        throw new Error("Received ".concat(integerBytes.byteLength, " bytes, expected 8 for $integer"));
    }
    const intBytesView = new DataView(integerBytes.buffer);
    return intBytesView.getBigInt64(0, true);
}
const bigIntToBase64 = DataView.prototype.setBigInt64 ? modernBigIntToBase64 : slowBigIntToBase64;
const base64ToBigInt = DataView.prototype.getBigInt64 ? modernBase64ToBigInt : slowBase64ToBigInt;
const MAX_IDENTIFIER_LEN = 1024;
function validateObjectField(k) {
    if (k.length > MAX_IDENTIFIER_LEN) {
        throw new Error("Field name ".concat(k, " exceeds maximum field name length ").concat(MAX_IDENTIFIER_LEN, "."));
    }
    if (k.startsWith("$")) {
        throw new Error("Field name ".concat(k, " starts with a '$', which is reserved."));
    }
    for(let i = 0; i < k.length; i += 1){
        const charCode = k.charCodeAt(i);
        if (charCode < 32 || charCode >= 127) {
            throw new Error("Field name ".concat(k, " has invalid character '").concat(k[i], "': Field names can only contain non-control ASCII characters"));
        }
    }
}
function jsonToConvex(value) {
    if (value === null) {
        return value;
    }
    if (typeof value === "boolean") {
        return value;
    }
    if (typeof value === "number") {
        return value;
    }
    if (typeof value === "string") {
        return value;
    }
    if (Array.isArray(value)) {
        return value.map((value2)=>jsonToConvex(value2));
    }
    if (typeof value !== "object") {
        throw new Error("Unexpected type of ".concat(value));
    }
    const entries = Object.entries(value);
    if (entries.length === 1) {
        const key = entries[0][0];
        if (key === "$bytes") {
            if (typeof value.$bytes !== "string") {
                throw new Error("Malformed $bytes field on ".concat(value));
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toByteArray"](value.$bytes).buffer;
        }
        if (key === "$integer") {
            if (typeof value.$integer !== "string") {
                throw new Error("Malformed $integer field on ".concat(value));
            }
            return base64ToBigInt(value.$integer);
        }
        if (key === "$float") {
            if (typeof value.$float !== "string") {
                throw new Error("Malformed $float field on ".concat(value));
            }
            const floatBytes = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toByteArray"](value.$float);
            if (floatBytes.byteLength !== 8) {
                throw new Error("Received ".concat(floatBytes.byteLength, " bytes, expected 8 for $float"));
            }
            const floatBytesView = new DataView(floatBytes.buffer);
            const float = floatBytesView.getFloat64(0, LITTLE_ENDIAN);
            if (!isSpecial(float)) {
                throw new Error("Float ".concat(float, " should be encoded as a number"));
            }
            return float;
        }
        if (key === "$set") {
            throw new Error("Received a Set which is no longer supported as a Convex type.");
        }
        if (key === "$map") {
            throw new Error("Received a Map which is no longer supported as a Convex type.");
        }
    }
    const out = {};
    for (const [k, v] of Object.entries(value)){
        validateObjectField(k);
        out[k] = jsonToConvex(v);
    }
    return out;
}
function stringifyValueForError(value) {
    return JSON.stringify(value, (_key, value2)=>{
        if (value2 === void 0) {
            return "undefined";
        }
        if (typeof value2 === "bigint") {
            return "".concat(value2.toString(), "n");
        }
        return value2;
    });
}
function convexToJsonInternal(value, originalValue, context, includeTopLevelUndefined) {
    if (value === void 0) {
        const contextText = context && " (present at path ".concat(context, " in original object ").concat(stringifyValueForError(originalValue), ")");
        throw new Error("undefined is not a valid Convex value".concat(contextText, ". To learn about Convex's supported types, see https://docs.convex.dev/using/types."));
    }
    if (value === null) {
        return value;
    }
    if (typeof value === "bigint") {
        if (value < MIN_INT64 || MAX_INT64 < value) {
            throw new Error("BigInt ".concat(value, " does not fit into a 64-bit signed integer."));
        }
        return {
            $integer: bigIntToBase64(value)
        };
    }
    if (typeof value === "number") {
        if (isSpecial(value)) {
            const buffer = new ArrayBuffer(8);
            new DataView(buffer).setFloat64(0, value, LITTLE_ENDIAN);
            return {
                $float: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromByteArray"](new Uint8Array(buffer))
            };
        } else {
            return value;
        }
    }
    if (typeof value === "boolean") {
        return value;
    }
    if (typeof value === "string") {
        return value;
    }
    if (value instanceof ArrayBuffer) {
        return {
            $bytes: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromByteArray"](new Uint8Array(value))
        };
    }
    if (Array.isArray(value)) {
        return value.map((value2, i)=>convexToJsonInternal(value2, originalValue, context + "[".concat(i, "]"), false));
    }
    if (value instanceof Set) {
        throw new Error(errorMessageForUnsupportedType(context, "Set", [
            ...value
        ], originalValue));
    }
    if (value instanceof Map) {
        throw new Error(errorMessageForUnsupportedType(context, "Map", [
            ...value
        ], originalValue));
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSimpleObject"])(value)) {
        var _value_constructor;
        const theType = value === null || value === void 0 ? void 0 : (_value_constructor = value.constructor) === null || _value_constructor === void 0 ? void 0 : _value_constructor.name;
        const typeName = theType ? "".concat(theType, " ") : "";
        throw new Error(errorMessageForUnsupportedType(context, typeName, value, originalValue));
    }
    const out = {};
    const entries = Object.entries(value);
    entries.sort((param, param1)=>{
        let [k1, _v1] = param, [k2, _v2] = param1;
        return k1 === k2 ? 0 : k1 < k2 ? -1 : 1;
    });
    for (const [k, v] of entries){
        if (v !== void 0) {
            validateObjectField(k);
            out[k] = convexToJsonInternal(v, originalValue, context + ".".concat(k), false);
        } else if (includeTopLevelUndefined) {
            validateObjectField(k);
            out[k] = convexOrUndefinedToJsonInternal(v, originalValue, context + ".".concat(k));
        }
    }
    return out;
}
function errorMessageForUnsupportedType(context, typeName, value, originalValue) {
    if (context) {
        return "".concat(typeName).concat(stringifyValueForError(value), " is not a supported Convex type (present at path ").concat(context, " in original object ").concat(stringifyValueForError(originalValue), "). To learn about Convex's supported types, see https://docs.convex.dev/using/types.");
    } else {
        return "".concat(typeName).concat(stringifyValueForError(value), " is not a supported Convex type.");
    }
}
function convexOrUndefinedToJsonInternal(value, originalValue, context) {
    if (value === void 0) {
        return {
            $undefined: null
        };
    } else {
        if (originalValue === void 0) {
            throw new Error("Programming error. Current value is ".concat(stringifyValueForError(value), " but original value is undefined"));
        }
        return convexToJsonInternal(value, originalValue, context, false);
    }
}
function convexToJson(value) {
    return convexToJsonInternal(value, value, "", false);
}
function convexOrUndefinedToJson(value) {
    return convexOrUndefinedToJsonInternal(value, value, "");
}
function patchValueToJson(value) {
    return convexToJsonInternal(value, value, "", true);
} //# sourceMappingURL=value.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/validators.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VAny",
    ()=>VAny,
    "VArray",
    ()=>VArray,
    "VBoolean",
    ()=>VBoolean,
    "VBytes",
    ()=>VBytes,
    "VFloat64",
    ()=>VFloat64,
    "VId",
    ()=>VId,
    "VInt64",
    ()=>VInt64,
    "VLiteral",
    ()=>VLiteral,
    "VNull",
    ()=>VNull,
    "VObject",
    ()=>VObject,
    "VRecord",
    ()=>VRecord,
    "VString",
    ()=>VString,
    "VUnion",
    ()=>VUnion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/value.js [app-client] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
class BaseValidator {
    /** @deprecated - use isOptional instead */ get optional() {
        return this.isOptional === "optional" ? true : false;
    }
    constructor({ isOptional }){
        /**
     * Only for TypeScript, the TS type of the JS values validated
     * by this validator.
     */ __publicField(this, "type");
        /**
     * Only for TypeScript, if this an Object validator, then
     * this is the TS type of its property names.
     */ __publicField(this, "fieldPaths");
        /**
     * Whether this is an optional Object property value validator.
     */ __publicField(this, "isOptional");
        /**
     * Always `"true"`.
     */ __publicField(this, "isConvexValidator");
        this.isOptional = isOptional;
        this.isConvexValidator = true;
    }
}
class VId extends BaseValidator {
    /** @internal */ get json() {
        return {
            type: "id",
            tableName: this.tableName
        };
    }
    /** @internal */ asOptional() {
        return new VId({
            isOptional: "optional",
            tableName: this.tableName
        });
    }
    /**
   * Usually you'd use `v.id(tableName)` instead.
   */ constructor({ isOptional, tableName }){
        super({
            isOptional
        });
        /**
     * The name of the table that the validated IDs must belong to.
     */ __publicField(this, "tableName");
        /**
     * The kind of validator, `"id"`.
     */ __publicField(this, "kind", "id");
        if (typeof tableName !== "string") {
            throw new Error("v.id(tableName) requires a string");
        }
        this.tableName = tableName;
    }
}
class VFloat64 extends BaseValidator {
    /** @internal */ get json() {
        return {
            type: "number"
        };
    }
    /** @internal */ asOptional() {
        return new VFloat64({
            isOptional: "optional"
        });
    }
    constructor(){
        super(...arguments);
        /**
     * The kind of validator, `"float64"`.
     */ __publicField(this, "kind", "float64");
    }
}
class VInt64 extends BaseValidator {
    /** @internal */ get json() {
        return {
            type: "bigint"
        };
    }
    /** @internal */ asOptional() {
        return new VInt64({
            isOptional: "optional"
        });
    }
    constructor(){
        super(...arguments);
        /**
     * The kind of validator, `"int64"`.
     */ __publicField(this, "kind", "int64");
    }
}
class VBoolean extends BaseValidator {
    /** @internal */ get json() {
        return {
            type: this.kind
        };
    }
    /** @internal */ asOptional() {
        return new VBoolean({
            isOptional: "optional"
        });
    }
    constructor(){
        super(...arguments);
        /**
     * The kind of validator, `"boolean"`.
     */ __publicField(this, "kind", "boolean");
    }
}
class VBytes extends BaseValidator {
    /** @internal */ get json() {
        return {
            type: this.kind
        };
    }
    /** @internal */ asOptional() {
        return new VBytes({
            isOptional: "optional"
        });
    }
    constructor(){
        super(...arguments);
        /**
     * The kind of validator, `"bytes"`.
     */ __publicField(this, "kind", "bytes");
    }
}
class VString extends BaseValidator {
    /** @internal */ get json() {
        return {
            type: this.kind
        };
    }
    /** @internal */ asOptional() {
        return new VString({
            isOptional: "optional"
        });
    }
    constructor(){
        super(...arguments);
        /**
     * The kind of validator, `"string"`.
     */ __publicField(this, "kind", "string");
    }
}
class VNull extends BaseValidator {
    /** @internal */ get json() {
        return {
            type: this.kind
        };
    }
    /** @internal */ asOptional() {
        return new VNull({
            isOptional: "optional"
        });
    }
    constructor(){
        super(...arguments);
        /**
     * The kind of validator, `"null"`.
     */ __publicField(this, "kind", "null");
    }
}
class VAny extends BaseValidator {
    /** @internal */ get json() {
        return {
            type: this.kind
        };
    }
    /** @internal */ asOptional() {
        return new VAny({
            isOptional: "optional"
        });
    }
    constructor(){
        super(...arguments);
        /**
     * The kind of validator, `"any"`.
     */ __publicField(this, "kind", "any");
    }
}
class VObject extends BaseValidator {
    /** @internal */ get json() {
        return {
            type: this.kind,
            value: globalThis.Object.fromEntries(globalThis.Object.entries(this.fields).map((param)=>{
                let [k, v] = param;
                return [
                    k,
                    {
                        fieldType: v.json,
                        optional: v.isOptional === "optional" ? true : false
                    }
                ];
            }))
        };
    }
    /** @internal */ asOptional() {
        return new VObject({
            isOptional: "optional",
            fields: this.fields
        });
    }
    /**
   * Usually you'd use `v.object({ ... })` instead.
   */ constructor({ isOptional, fields }){
        super({
            isOptional
        });
        /**
     * An object with the validator for each property.
     */ __publicField(this, "fields");
        /**
     * The kind of validator, `"object"`.
     */ __publicField(this, "kind", "object");
        globalThis.Object.values(fields).forEach((v)=>{
            if (!v.isConvexValidator) {
                throw new Error("v.object() entries must be valiators");
            }
        });
        this.fields = fields;
    }
}
class VLiteral extends BaseValidator {
    /** @internal */ get json() {
        return {
            type: this.kind,
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexToJson"])(this.value)
        };
    }
    /** @internal */ asOptional() {
        return new VLiteral({
            isOptional: "optional",
            value: this.value
        });
    }
    /**
   * Usually you'd use `v.literal(value)` instead.
   */ constructor({ isOptional, value }){
        super({
            isOptional
        });
        /**
     * The value that the validated values must be equal to.
     */ __publicField(this, "value");
        /**
     * The kind of validator, `"literal"`.
     */ __publicField(this, "kind", "literal");
        if (typeof value !== "string" && typeof value !== "boolean" && typeof value !== "number" && typeof value !== "bigint") {
            throw new Error("v.literal(value) must be a string, number, or boolean");
        }
        this.value = value;
    }
}
class VArray extends BaseValidator {
    /** @internal */ get json() {
        return {
            type: this.kind,
            value: this.element.json
        };
    }
    /** @internal */ asOptional() {
        return new VArray({
            isOptional: "optional",
            element: this.element
        });
    }
    /**
   * Usually you'd use `v.array(element)` instead.
   */ constructor({ isOptional, element }){
        super({
            isOptional
        });
        /**
     * The validator for the elements of the array.
     */ __publicField(this, "element");
        /**
     * The kind of validator, `"array"`.
     */ __publicField(this, "kind", "array");
        this.element = element;
    }
}
class VRecord extends BaseValidator {
    /** @internal */ get json() {
        return {
            type: this.kind,
            // This cast is needed because TypeScript thinks the key type is too wide
            keys: this.key.json,
            values: {
                fieldType: this.value.json,
                optional: false
            }
        };
    }
    /** @internal */ asOptional() {
        return new VRecord({
            isOptional: "optional",
            key: this.key,
            value: this.value
        });
    }
    /**
   * Usually you'd use `v.record(key, value)` instead.
   */ constructor({ isOptional, key, value }){
        super({
            isOptional
        });
        /**
     * The validator for the keys of the record.
     */ __publicField(this, "key");
        /**
     * The validator for the values of the record.
     */ __publicField(this, "value");
        /**
     * The kind of validator, `"record"`.
     */ __publicField(this, "kind", "record");
        if (key.isOptional === "optional") {
            throw new Error("Record validator cannot have optional keys");
        }
        if (value.isOptional === "optional") {
            throw new Error("Record validator cannot have optional values");
        }
        if (!key.isConvexValidator || !value.isConvexValidator) {
            throw new Error("Key and value of v.record() but be validators");
        }
        this.key = key;
        this.value = value;
    }
}
class VUnion extends BaseValidator {
    /** @internal */ get json() {
        return {
            type: this.kind,
            value: this.members.map((v)=>v.json)
        };
    }
    /** @internal */ asOptional() {
        return new VUnion({
            isOptional: "optional",
            members: this.members
        });
    }
    /**
   * Usually you'd use `v.union(...members)` instead.
   */ constructor({ isOptional, members }){
        super({
            isOptional
        });
        /**
     * The array of validators, one of which must match the value.
     */ __publicField(this, "members");
        /**
     * The kind of validator, `"union"`.
     */ __publicField(this, "kind", "union");
        members.forEach((member)=>{
            if (!member.isConvexValidator) {
                throw new Error("All members of v.union() must be validators");
            }
        });
        this.members = members;
    }
} //# sourceMappingURL=validators.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/validator.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "asObjectValidator",
    ()=>asObjectValidator,
    "isValidator",
    ()=>isValidator,
    "v",
    ()=>v
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/validators.js [app-client] (ecmascript)");
"use strict";
;
function isValidator(v2) {
    return !!v2.isConvexValidator;
}
function asObjectValidator(obj) {
    if (isValidator(obj)) {
        return obj;
    } else {
        return v.object(obj);
    }
}
const v = {
    /**
   * Validates that the value corresponds to an ID of a document in given table.
   * @param tableName The name of the table.
   */ id: (tableName)=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VId"]({
            isOptional: "required",
            tableName
        });
    },
    /**
   * Validates that the value is of type Null.
   */ null: ()=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VNull"]({
            isOptional: "required"
        });
    },
    /**
   * Validates that the value is of Convex type Float64 (Number in JS).
   *
   * Alias for `v.float64()`
   */ number: ()=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VFloat64"]({
            isOptional: "required"
        });
    },
    /**
   * Validates that the value is of Convex type Float64 (Number in JS).
   */ float64: ()=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VFloat64"]({
            isOptional: "required"
        });
    },
    /**
   * @deprecated Use `v.int64()` instead
   */ bigint: ()=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VInt64"]({
            isOptional: "required"
        });
    },
    /**
   * Validates that the value is of Convex type Int64 (BigInt in JS).
   */ int64: ()=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VInt64"]({
            isOptional: "required"
        });
    },
    /**
   * Validates that the value is of type Boolean.
   */ boolean: ()=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VBoolean"]({
            isOptional: "required"
        });
    },
    /**
   * Validates that the value is of type String.
   */ string: ()=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VString"]({
            isOptional: "required"
        });
    },
    /**
   * Validates that the value is of Convex type Bytes (constructed in JS via `ArrayBuffer`).
   */ bytes: ()=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VBytes"]({
            isOptional: "required"
        });
    },
    /**
   * Validates that the value is equal to the given literal value.
   * @param literal The literal value to compare against.
   */ literal: (literal)=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VLiteral"]({
            isOptional: "required",
            value: literal
        });
    },
    /**
   * Validates that the value is an Array of the given element type.
   * @param element The validator for the elements of the array.
   */ array: (element)=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VArray"]({
            isOptional: "required",
            element
        });
    },
    /**
   * Validates that the value is an Object with the given properties.
   * @param fields An object specifying the validator for each property.
   */ object: (fields)=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VObject"]({
            isOptional: "required",
            fields
        });
    },
    /**
   * Validates that the value is a Record with keys and values that match the given types.
   * @param keys The validator for the keys of the record. This cannot contain string literals.
   * @param values The validator for the values of the record.
   */ record: (keys, values)=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VRecord"]({
            isOptional: "required",
            key: keys,
            value: values
        });
    },
    /**
   * Validates that the value matches one of the given validators.
   * @param members The validators to match against.
   */ union: function() {
        for(var _len = arguments.length, members = new Array(_len), _key = 0; _key < _len; _key++){
            members[_key] = arguments[_key];
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VUnion"]({
            isOptional: "required",
            members
        });
    },
    /**
   * Does not validate the value.
   */ any: ()=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VAny"]({
            isOptional: "required"
        });
    },
    /**
   * Allows not specifying a value for a property in an Object.
   * @param value The property value validator to make optional.
   *
   * ```typescript
   * const objectWithOptionalFields = v.object({
   *   requiredField: v.string(),
   *   optionalField: v.optional(v.string()),
   * });
   * ```
   */ optional: (value)=>{
        return value.asOptional();
    }
}; //# sourceMappingURL=validator.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/errors.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConvexError",
    ()=>ConvexError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/value.js [app-client] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
;
const IDENTIFYING_FIELD = Symbol.for("ConvexError");
class ConvexError extends (_b = Error, _a = IDENTIFYING_FIELD, _b) {
    constructor(data){
        super(typeof data === "string" ? data : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringifyValueForError"])(data));
        __publicField(this, "name", "ConvexError");
        __publicField(this, "data");
        __publicField(this, _a, true);
        this.data = data;
    }
} //# sourceMappingURL=errors.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/compare_utf8.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "compareUTF8",
    ()=>compareUTF8,
    "greaterThan",
    ()=>greaterThan,
    "greaterThanEq",
    ()=>greaterThanEq,
    "lessThan",
    ()=>lessThan,
    "lessThanEq",
    ()=>lessThanEq,
    "utf16LengthForCodePoint",
    ()=>utf16LengthForCodePoint
]);
"use strict";
function compareUTF8(a, b) {
    const aLength = a.length;
    const bLength = b.length;
    const length = Math.min(aLength, bLength);
    for(let i = 0; i < length;){
        const aCodePoint = a.codePointAt(i);
        const bCodePoint = b.codePointAt(i);
        if (aCodePoint !== bCodePoint) {
            if (aCodePoint < 128 && bCodePoint < 128) {
                return aCodePoint - bCodePoint;
            }
            const aLength2 = utf8Bytes(aCodePoint, aBytes);
            const bLength2 = utf8Bytes(bCodePoint, bBytes);
            return compareArrays(aBytes, aLength2, bBytes, bLength2);
        }
        i += utf16LengthForCodePoint(aCodePoint);
    }
    return aLength - bLength;
}
function compareArrays(a, aLength, b, bLength) {
    const length = Math.min(aLength, bLength);
    for(let i = 0; i < length; i++){
        const aValue = a[i];
        const bValue = b[i];
        if (aValue !== bValue) {
            return aValue - bValue;
        }
    }
    return aLength - bLength;
}
function utf16LengthForCodePoint(aCodePoint) {
    return aCodePoint > 65535 ? 2 : 1;
}
const arr = ()=>Array.from({
        length: 4
    }, ()=>0);
const aBytes = arr();
const bBytes = arr();
function utf8Bytes(codePoint, bytes) {
    if (codePoint < 128) {
        bytes[0] = codePoint;
        return 1;
    }
    let count;
    let offset;
    if (codePoint <= 2047) {
        count = 1;
        offset = 192;
    } else if (codePoint <= 65535) {
        count = 2;
        offset = 224;
    } else if (codePoint <= 1114111) {
        count = 3;
        offset = 240;
    } else {
        throw new Error("Invalid code point");
    }
    bytes[0] = (codePoint >> 6 * count) + offset;
    let i = 1;
    for(; count > 0; count--){
        const temp = codePoint >> 6 * (count - 1);
        bytes[i++] = 128 | temp & 63;
    }
    return i;
}
function greaterThan(a, b) {
    return compareUTF8(a, b) > 0;
}
function greaterThanEq(a, b) {
    return compareUTF8(a, b) >= 0;
}
function lessThan(a, b) {
    return compareUTF8(a, b) < 0;
}
function lessThanEq(a, b) {
    return compareUTF8(a, b) <= 0;
} //# sourceMappingURL=compare_utf8.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/compare.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "compareValues",
    ()=>compareValues
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$compare_utf8$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/compare_utf8.js [app-client] (ecmascript)");
"use strict";
;
function compareValues(k1, k2) {
    return compareAsTuples(makeComparable(k1), makeComparable(k2));
}
function compareAsTuples(a, b) {
    if (a[0] === b[0]) {
        return compareSameTypeValues(a[1], b[1]);
    } else if (a[0] < b[0]) {
        return -1;
    }
    return 1;
}
function compareSameTypeValues(v1, v2) {
    if (v1 === void 0 || v1 === null) {
        return 0;
    }
    if (typeof v1 === "number") {
        if (typeof v2 !== "number") {
            throw new Error("Unexpected type ".concat(v2));
        }
        return compareNumbers(v1, v2);
    }
    if (typeof v1 === "string") {
        if (typeof v2 !== "string") {
            throw new Error("Unexpected type ".concat(v2));
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$compare_utf8$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareUTF8"])(v1, v2);
    }
    if (typeof v1 === "bigint" || typeof v1 === "boolean" || typeof v1 === "string") {
        return v1 < v2 ? -1 : v1 === v2 ? 0 : 1;
    }
    if (!Array.isArray(v1) || !Array.isArray(v2)) {
        throw new Error("Unexpected type ".concat(v1));
    }
    for(let i = 0; i < v1.length && i < v2.length; i++){
        const cmp = compareAsTuples(v1[i], v2[i]);
        if (cmp !== 0) {
            return cmp;
        }
    }
    if (v1.length < v2.length) {
        return -1;
    }
    if (v1.length > v2.length) {
        return 1;
    }
    return 0;
}
function compareNumbers(v1, v2) {
    if (isNaN(v1) || isNaN(v2)) {
        const buffer1 = new ArrayBuffer(8);
        const buffer2 = new ArrayBuffer(8);
        new DataView(buffer1).setFloat64(0, v1, /* little-endian */ true);
        new DataView(buffer2).setFloat64(0, v2, /* little-endian */ true);
        const v1Bits = BigInt(new DataView(buffer1).getBigInt64(0, /* little-endian */ true));
        const v2Bits = BigInt(new DataView(buffer2).getBigInt64(0, /* little-endian */ true));
        const v1Sign = (v1Bits & 0x8000000000000000n) !== 0n;
        const v2Sign = (v2Bits & 0x8000000000000000n) !== 0n;
        if (isNaN(v1) !== isNaN(v2)) {
            if (isNaN(v1)) {
                return v1Sign ? -1 : 1;
            }
            return v2Sign ? 1 : -1;
        }
        if (v1Sign !== v2Sign) {
            return v1Sign ? -1 : 1;
        }
        return v1Bits < v2Bits ? -1 : v1Bits === v2Bits ? 0 : 1;
    }
    if (Object.is(v1, v2)) {
        return 0;
    }
    if (Object.is(v1, -0)) {
        return Object.is(v2, 0) ? -1 : -Math.sign(v2);
    }
    if (Object.is(v2, -0)) {
        return Object.is(v1, 0) ? 1 : Math.sign(v1);
    }
    return v1 < v2 ? -1 : 1;
}
function makeComparable(v) {
    if (v === void 0) {
        return [
            0,
            void 0
        ];
    }
    if (v === null) {
        return [
            1,
            null
        ];
    }
    if (typeof v === "bigint") {
        return [
            2,
            v
        ];
    }
    if (typeof v === "number") {
        return [
            3,
            v
        ];
    }
    if (typeof v === "boolean") {
        return [
            4,
            v
        ];
    }
    if (typeof v === "string") {
        return [
            5,
            v
        ];
    }
    if (v instanceof ArrayBuffer) {
        return [
            6,
            Array.from(new Uint8Array(v)).map(makeComparable)
        ];
    }
    if (Array.isArray(v)) {
        return [
            7,
            v.map(makeComparable)
        ];
    }
    const keys = Object.keys(v).sort();
    const pojo = keys.map((k)=>[
            k,
            v[k]
        ]);
    return [
        8,
        pojo.map(makeComparable)
    ];
} //# sourceMappingURL=compare.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/value.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/validator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/base64.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$compare$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/compare.js [app-client] (ecmascript)"); //# sourceMappingURL=index.js.map
"use strict";
;
;
;
;
;
;
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "version",
    ()=>version
]);
"use strict";
const version = "1.26.2"; //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/syscall.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "performAsyncSyscall",
    ()=>performAsyncSyscall,
    "performJsSyscall",
    ()=>performJsSyscall,
    "performSyscall",
    ()=>performSyscall
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/value.js [app-client] (ecmascript)");
"use strict";
;
;
function performSyscall(op, arg) {
    if (typeof Convex === "undefined" || Convex.syscall === void 0) {
        throw new Error("The Convex database and auth objects are being used outside of a Convex backend. Did you mean to use `useQuery` or `useMutation` to call a Convex function?");
    }
    const resultStr = Convex.syscall(op, JSON.stringify(arg));
    return JSON.parse(resultStr);
}
async function performAsyncSyscall(op, arg) {
    if (typeof Convex === "undefined" || Convex.asyncSyscall === void 0) {
        throw new Error("The Convex database and auth objects are being used outside of a Convex backend. Did you mean to use `useQuery` or `useMutation` to call a Convex function?");
    }
    let resultStr;
    try {
        resultStr = await Convex.asyncSyscall(op, JSON.stringify(arg));
    } catch (e) {
        if (e.data !== void 0) {
            const rethrown = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConvexError"](e.message);
            rethrown.data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsonToConvex"])(e.data);
            throw rethrown;
        }
        throw new Error(e.message);
    }
    return JSON.parse(resultStr);
}
function performJsSyscall(op, arg) {
    if (typeof Convex === "undefined" || Convex.jsSyscall === void 0) {
        throw new Error("The Convex database and auth objects are being used outside of a Convex backend. Did you mean to use `useQuery` or `useMutation` to call a Convex function?");
    }
    return Convex.jsSyscall(op, arg);
} //# sourceMappingURL=syscall.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/functionName.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functionName",
    ()=>functionName
]);
"use strict";
const functionName = Symbol.for("functionName"); //# sourceMappingURL=functionName.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/components/paths.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractReferencePath",
    ()=>extractReferencePath,
    "getFunctionAddress",
    ()=>getFunctionAddress,
    "isFunctionHandle",
    ()=>isFunctionHandle,
    "setReferencePath",
    ()=>setReferencePath,
    "toReferencePath",
    ()=>toReferencePath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$functionName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/functionName.js [app-client] (ecmascript)");
"use strict";
;
const toReferencePath = Symbol.for("toReferencePath");
function setReferencePath(obj, value) {
    obj[toReferencePath] = value;
}
function extractReferencePath(reference) {
    var _reference_toReferencePath;
    return (_reference_toReferencePath = reference[toReferencePath]) !== null && _reference_toReferencePath !== void 0 ? _reference_toReferencePath : null;
}
function isFunctionHandle(s) {
    return s.startsWith("function://");
}
function getFunctionAddress(functionReference) {
    let functionAddress;
    if (typeof functionReference === "string") {
        if (isFunctionHandle(functionReference)) {
            functionAddress = {
                functionHandle: functionReference
            };
        } else {
            functionAddress = {
                name: functionReference
            };
        }
    } else if (functionReference[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$functionName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functionName"]]) {
        functionAddress = {
            name: functionReference[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$functionName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functionName"]]
        };
    } else {
        const referencePath = extractReferencePath(functionReference);
        if (!referencePath) {
            throw new Error("".concat(functionReference, " is not a functionReference"));
        }
        functionAddress = {
            reference: referencePath
        };
    }
    return functionAddress;
} //# sourceMappingURL=paths.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/actions_impl.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setupActionCalls",
    ()=>setupActionCalls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/value.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/syscall.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/common/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/components/paths.js [app-client] (ecmascript)");
"use strict";
;
;
;
;
;
function syscallArgs(requestId, functionReference, args) {
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFunctionAddress"])(functionReference);
    return {
        ...address,
        args: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexToJson"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseArgs"])(args)),
        version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"],
        requestId
    };
}
function setupActionCalls(requestId) {
    return {
        runQuery: async (query, args)=>{
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/actions/query", syscallArgs(requestId, query, args));
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsonToConvex"])(result);
        },
        runMutation: async (mutation, args)=>{
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/actions/mutation", syscallArgs(requestId, mutation, args));
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsonToConvex"])(result);
        },
        runAction: async (action, args)=>{
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/actions/action", syscallArgs(requestId, action, args));
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsonToConvex"])(result);
        }
    };
} //# sourceMappingURL=actions_impl.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/vector_search.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FilterExpression",
    ()=>FilterExpression
]);
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class FilterExpression {
    /**
   * @internal
   */ constructor(){
        // Property for nominal type support.
        __publicField(this, "_isExpression");
        // Property to distinguish expressions by the type they resolve to.
        __publicField(this, "_value");
    }
} //# sourceMappingURL=vector_search.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/validate.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "validateArg",
    ()=>validateArg,
    "validateArgIsInteger",
    ()=>validateArgIsInteger,
    "validateArgIsNonNegativeInteger",
    ()=>validateArgIsNonNegativeInteger
]);
"use strict";
function validateArg(arg, idx, method, argName) {
    if (arg === void 0) {
        throw new TypeError("Must provide arg ".concat(idx, " `").concat(argName, "` to `").concat(method, "`"));
    }
}
function validateArgIsInteger(arg, idx, method, argName) {
    if (!Number.isInteger(arg)) {
        throw new TypeError("Arg ".concat(idx, " `").concat(argName, "` to `").concat(method, "` must be an integer"));
    }
}
function validateArgIsNonNegativeInteger(arg, idx, method, argName) {
    if (!Number.isInteger(arg) || arg < 0) {
        throw new TypeError("Arg ".concat(idx, " `").concat(argName, "` to `").concat(method, "` must be a non-negative integer"));
    }
} //# sourceMappingURL=validate.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/vector_search_impl.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExpressionImpl",
    ()=>ExpressionImpl,
    "VectorQueryImpl",
    ()=>VectorQueryImpl,
    "filterBuilderImpl",
    ()=>filterBuilderImpl,
    "serializeExpression",
    ()=>serializeExpression,
    "setupActionVectorSearch",
    ()=>setupActionVectorSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/syscall.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$vector_search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/vector_search.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/validate.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/value.js [app-client] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
;
;
;
;
function setupActionVectorSearch(requestId) {
    return async (tableName, indexName, query)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(tableName, 1, "vectorSearch", "tableName");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(indexName, 2, "vectorSearch", "indexName");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(query, 3, "vectorSearch", "query");
        if (!query.vector || !Array.isArray(query.vector) || query.vector.length === 0) {
            throw Error("`vector` must be a non-empty Array in vectorSearch");
        }
        return await new VectorQueryImpl(requestId, tableName + "." + indexName, query).collect();
    };
}
class VectorQueryImpl {
    async collect() {
        if (this.state.type === "consumed") {
            throw new Error("This query is closed and can't emit any more values.");
        }
        const query = this.state.query;
        this.state = {
            type: "consumed"
        };
        const { results } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/actions/vectorSearch", {
            requestId: this.requestId,
            version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"],
            query
        });
        return results;
    }
    constructor(requestId, indexName, query){
        __publicField(this, "requestId");
        __publicField(this, "state");
        this.requestId = requestId;
        const filters = query.filter ? serializeExpression(query.filter(filterBuilderImpl)) : null;
        this.state = {
            type: "preparing",
            query: {
                indexName,
                limit: query.limit,
                vector: query.vector,
                expressions: filters
            }
        };
    }
}
class ExpressionImpl extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$vector_search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FilterExpression"] {
    serialize() {
        return this.inner;
    }
    constructor(inner){
        super();
        __publicField(this, "inner");
        this.inner = inner;
    }
}
function serializeExpression(expr) {
    if (expr instanceof ExpressionImpl) {
        return expr.serialize();
    } else {
        return {
            $literal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexOrUndefinedToJson"])(expr)
        };
    }
}
const filterBuilderImpl = {
    //  Comparisons  /////////////////////////////////////////////////////////////
    eq (fieldName, value) {
        if (typeof fieldName !== "string") {
            throw new Error("The first argument to `q.eq` must be a field name.");
        }
        return new ExpressionImpl({
            $eq: [
                serializeExpression(new ExpressionImpl({
                    $field: fieldName
                })),
                serializeExpression(value)
            ]
        });
    },
    //  Logic  ///////////////////////////////////////////////////////////////////
    or () {
        for(var _len = arguments.length, exprs = new Array(_len), _key = 0; _key < _len; _key++){
            exprs[_key] = arguments[_key];
        }
        return new ExpressionImpl({
            $or: exprs.map(serializeExpression)
        });
    }
}; //# sourceMappingURL=vector_search_impl.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/authentication_impl.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setupAuth",
    ()=>setupAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/syscall.js [app-client] (ecmascript)");
"use strict";
;
function setupAuth(requestId) {
    return {
        getUserIdentity: async ()=>{
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/getUserIdentity", {
                requestId
            });
        }
    };
} //# sourceMappingURL=authentication_impl.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/filter_builder.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Expression",
    ()=>Expression
]);
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class Expression {
    /**
   * @internal
   */ constructor(){
        // Property for nominal type support.
        __publicField(this, "_isExpression");
        // Property to distinguish expressions by the type they resolve to.
        __publicField(this, "_value");
    }
} //# sourceMappingURL=filter_builder.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/filter_builder_impl.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExpressionImpl",
    ()=>ExpressionImpl,
    "filterBuilderImpl",
    ()=>filterBuilderImpl,
    "serializeExpression",
    ()=>serializeExpression
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/value.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$filter_builder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/filter_builder.js [app-client] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
;
class ExpressionImpl extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$filter_builder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Expression"] {
    serialize() {
        return this.inner;
    }
    constructor(inner){
        super();
        __publicField(this, "inner");
        this.inner = inner;
    }
}
function serializeExpression(expr) {
    if (expr instanceof ExpressionImpl) {
        return expr.serialize();
    } else {
        return {
            $literal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexOrUndefinedToJson"])(expr)
        };
    }
}
const filterBuilderImpl = {
    //  Comparisons  /////////////////////////////////////////////////////////////
    eq (l, r) {
        return new ExpressionImpl({
            $eq: [
                serializeExpression(l),
                serializeExpression(r)
            ]
        });
    },
    neq (l, r) {
        return new ExpressionImpl({
            $neq: [
                serializeExpression(l),
                serializeExpression(r)
            ]
        });
    },
    lt (l, r) {
        return new ExpressionImpl({
            $lt: [
                serializeExpression(l),
                serializeExpression(r)
            ]
        });
    },
    lte (l, r) {
        return new ExpressionImpl({
            $lte: [
                serializeExpression(l),
                serializeExpression(r)
            ]
        });
    },
    gt (l, r) {
        return new ExpressionImpl({
            $gt: [
                serializeExpression(l),
                serializeExpression(r)
            ]
        });
    },
    gte (l, r) {
        return new ExpressionImpl({
            $gte: [
                serializeExpression(l),
                serializeExpression(r)
            ]
        });
    },
    //  Arithmetic  //////////////////////////////////////////////////////////////
    add (l, r) {
        return new ExpressionImpl({
            $add: [
                serializeExpression(l),
                serializeExpression(r)
            ]
        });
    },
    sub (l, r) {
        return new ExpressionImpl({
            $sub: [
                serializeExpression(l),
                serializeExpression(r)
            ]
        });
    },
    mul (l, r) {
        return new ExpressionImpl({
            $mul: [
                serializeExpression(l),
                serializeExpression(r)
            ]
        });
    },
    div (l, r) {
        return new ExpressionImpl({
            $div: [
                serializeExpression(l),
                serializeExpression(r)
            ]
        });
    },
    mod (l, r) {
        return new ExpressionImpl({
            $mod: [
                serializeExpression(l),
                serializeExpression(r)
            ]
        });
    },
    neg (x) {
        return new ExpressionImpl({
            $neg: serializeExpression(x)
        });
    },
    //  Logic  ///////////////////////////////////////////////////////////////////
    and () {
        for(var _len = arguments.length, exprs = new Array(_len), _key = 0; _key < _len; _key++){
            exprs[_key] = arguments[_key];
        }
        return new ExpressionImpl({
            $and: exprs.map(serializeExpression)
        });
    },
    or () {
        for(var _len = arguments.length, exprs = new Array(_len), _key = 0; _key < _len; _key++){
            exprs[_key] = arguments[_key];
        }
        return new ExpressionImpl({
            $or: exprs.map(serializeExpression)
        });
    },
    not (x) {
        return new ExpressionImpl({
            $not: serializeExpression(x)
        });
    },
    //  Other  ///////////////////////////////////////////////////////////////////
    field (fieldPath) {
        return new ExpressionImpl({
            $field: fieldPath
        });
    }
}; //# sourceMappingURL=filter_builder_impl.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/index_range_builder.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IndexRange",
    ()=>IndexRange
]);
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class IndexRange {
    /**
   * @internal
   */ constructor(){
        // Property for nominal type support.
        __publicField(this, "_isIndexRange");
    }
} //# sourceMappingURL=index_range_builder.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/index_range_builder_impl.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IndexRangeBuilderImpl",
    ()=>IndexRangeBuilderImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/value.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$index_range_builder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/index_range_builder.js [app-client] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
;
class IndexRangeBuilderImpl extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$index_range_builder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IndexRange"] {
    static new() {
        return new IndexRangeBuilderImpl([]);
    }
    consume() {
        if (this.isConsumed) {
            throw new Error("IndexRangeBuilder has already been used! Chain your method calls like `q => q.eq(...).eq(...)`. See https://docs.convex.dev/using/indexes");
        }
        this.isConsumed = true;
    }
    eq(fieldName, value) {
        this.consume();
        return new IndexRangeBuilderImpl(this.rangeExpressions.concat({
            type: "Eq",
            fieldPath: fieldName,
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexOrUndefinedToJson"])(value)
        }));
    }
    gt(fieldName, value) {
        this.consume();
        return new IndexRangeBuilderImpl(this.rangeExpressions.concat({
            type: "Gt",
            fieldPath: fieldName,
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexOrUndefinedToJson"])(value)
        }));
    }
    gte(fieldName, value) {
        this.consume();
        return new IndexRangeBuilderImpl(this.rangeExpressions.concat({
            type: "Gte",
            fieldPath: fieldName,
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexOrUndefinedToJson"])(value)
        }));
    }
    lt(fieldName, value) {
        this.consume();
        return new IndexRangeBuilderImpl(this.rangeExpressions.concat({
            type: "Lt",
            fieldPath: fieldName,
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexOrUndefinedToJson"])(value)
        }));
    }
    lte(fieldName, value) {
        this.consume();
        return new IndexRangeBuilderImpl(this.rangeExpressions.concat({
            type: "Lte",
            fieldPath: fieldName,
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexOrUndefinedToJson"])(value)
        }));
    }
    export() {
        this.consume();
        return this.rangeExpressions;
    }
    constructor(rangeExpressions){
        super();
        __publicField(this, "rangeExpressions");
        __publicField(this, "isConsumed");
        this.rangeExpressions = rangeExpressions;
        this.isConsumed = false;
    }
} //# sourceMappingURL=index_range_builder_impl.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/search_filter_builder.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchFilter",
    ()=>SearchFilter
]);
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class SearchFilter {
    /**
   * @internal
   */ constructor(){
        // Property for nominal type support.
        __publicField(this, "_isSearchFilter");
    }
} //# sourceMappingURL=search_filter_builder.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/search_filter_builder_impl.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchFilterBuilderImpl",
    ()=>SearchFilterBuilderImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/value.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$search_filter_builder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/search_filter_builder.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/validate.js [app-client] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
;
;
class SearchFilterBuilderImpl extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$search_filter_builder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchFilter"] {
    static new() {
        return new SearchFilterBuilderImpl([]);
    }
    consume() {
        if (this.isConsumed) {
            throw new Error("SearchFilterBuilder has already been used! Chain your method calls like `q => q.search(...).eq(...)`.");
        }
        this.isConsumed = true;
    }
    search(fieldName, query) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(fieldName, 1, "search", "fieldName");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(query, 2, "search", "query");
        this.consume();
        return new SearchFilterBuilderImpl(this.filters.concat({
            type: "Search",
            fieldPath: fieldName,
            value: query
        }));
    }
    eq(fieldName, value) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(fieldName, 1, "eq", "fieldName");
        if (arguments.length !== 2) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(value, 2, "search", "value");
        }
        this.consume();
        return new SearchFilterBuilderImpl(this.filters.concat({
            type: "Eq",
            fieldPath: fieldName,
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexOrUndefinedToJson"])(value)
        }));
    }
    export() {
        this.consume();
        return this.filters;
    }
    constructor(filters){
        super();
        __publicField(this, "filters");
        __publicField(this, "isConsumed");
        this.filters = filters;
        this.isConsumed = false;
    }
} //# sourceMappingURL=search_filter_builder_impl.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/query_impl.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueryImpl",
    ()=>QueryImpl,
    "QueryInitializerImpl",
    ()=>QueryInitializerImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/value.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/syscall.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$filter_builder_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/filter_builder_impl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$index_range_builder_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/index_range_builder_impl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$search_filter_builder_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/search_filter_builder_impl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/validate.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/index.js [app-client] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
;
;
;
;
;
;
const MAX_QUERY_OPERATORS = 256;
class QueryInitializerImpl {
    withIndex(indexName, indexRange) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(indexName, 1, "withIndex", "indexName");
        let rangeBuilder = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$index_range_builder_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IndexRangeBuilderImpl"].new();
        if (indexRange !== void 0) {
            rangeBuilder = indexRange(rangeBuilder);
        }
        return new QueryImpl({
            source: {
                type: "IndexRange",
                indexName: this.tableName + "." + indexName,
                range: rangeBuilder.export(),
                order: null
            },
            operators: []
        });
    }
    withSearchIndex(indexName, searchFilter) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(indexName, 1, "withSearchIndex", "indexName");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(searchFilter, 2, "withSearchIndex", "searchFilter");
        const searchFilterBuilder = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$search_filter_builder_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchFilterBuilderImpl"].new();
        return new QueryImpl({
            source: {
                type: "Search",
                indexName: this.tableName + "." + indexName,
                filters: searchFilter(searchFilterBuilder).export()
            },
            operators: []
        });
    }
    fullTableScan() {
        return new QueryImpl({
            source: {
                type: "FullTableScan",
                tableName: this.tableName,
                order: null
            },
            operators: []
        });
    }
    order(order) {
        return this.fullTableScan().order(order);
    }
    // This is internal API and should not be exposed to developers yet.
    async count() {
        const syscallJSON = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/count", {
            table: this.tableName
        });
        const syscallResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsonToConvex"])(syscallJSON);
        return syscallResult;
    }
    filter(predicate) {
        return this.fullTableScan().filter(predicate);
    }
    limit(n) {
        return this.fullTableScan().limit(n);
    }
    collect() {
        return this.fullTableScan().collect();
    }
    take(n) {
        return this.fullTableScan().take(n);
    }
    paginate(paginationOpts) {
        return this.fullTableScan().paginate(paginationOpts);
    }
    first() {
        return this.fullTableScan().first();
    }
    unique() {
        return this.fullTableScan().unique();
    }
    [Symbol.asyncIterator]() {
        return this.fullTableScan()[Symbol.asyncIterator]();
    }
    constructor(tableName){
        __publicField(this, "tableName");
        this.tableName = tableName;
    }
}
function throwClosedError(type) {
    throw new Error(type === "consumed" ? "This query is closed and can't emit any more values." : "This query has been chained with another operator and can't be reused.");
}
class QueryImpl {
    takeQuery() {
        if (this.state.type !== "preparing") {
            throw new Error("A query can only be chained once and can't be chained after iteration begins.");
        }
        const query = this.state.query;
        this.state = {
            type: "closed"
        };
        return query;
    }
    startQuery() {
        if (this.state.type === "executing") {
            throw new Error("Iteration can only begin on a query once.");
        }
        if (this.state.type === "closed" || this.state.type === "consumed") {
            throwClosedError(this.state.type);
        }
        const query = this.state.query;
        const { queryId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performSyscall"])("1.0/queryStream", {
            query,
            version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"]
        });
        this.state = {
            type: "executing",
            queryId
        };
        return queryId;
    }
    closeQuery() {
        if (this.state.type === "executing") {
            const queryId = this.state.queryId;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performSyscall"])("1.0/queryCleanup", {
                queryId
            });
        }
        this.state = {
            type: "consumed"
        };
    }
    order(order) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(order, 1, "order", "order");
        const query = this.takeQuery();
        if (query.source.type === "Search") {
            throw new Error("Search queries must always be in relevance order. Can not set order manually.");
        }
        if (query.source.order !== null) {
            throw new Error("Queries may only specify order at most once");
        }
        query.source.order = order;
        return new QueryImpl(query);
    }
    filter(predicate) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(predicate, 1, "filter", "predicate");
        const query = this.takeQuery();
        if (query.operators.length >= MAX_QUERY_OPERATORS) {
            throw new Error("Can't construct query with more than ".concat(MAX_QUERY_OPERATORS, " operators"));
        }
        query.operators.push({
            filter: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$filter_builder_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializeExpression"])(predicate(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$filter_builder_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filterBuilderImpl"]))
        });
        return new QueryImpl(query);
    }
    limit(n) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(n, 1, "limit", "n");
        const query = this.takeQuery();
        query.operators.push({
            limit: n
        });
        return new QueryImpl(query);
    }
    [Symbol.asyncIterator]() {
        this.startQuery();
        return this;
    }
    async next() {
        if (this.state.type === "closed" || this.state.type === "consumed") {
            throwClosedError(this.state.type);
        }
        const queryId = this.state.type === "preparing" ? this.startQuery() : this.state.queryId;
        const { value, done } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/queryStreamNext", {
            queryId
        });
        if (done) {
            this.closeQuery();
        }
        const convexValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsonToConvex"])(value);
        return {
            value: convexValue,
            done
        };
    }
    return() {
        this.closeQuery();
        return Promise.resolve({
            done: true,
            value: void 0
        });
    }
    async paginate(paginationOpts) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(paginationOpts, 1, "paginate", "options");
        if (typeof (paginationOpts === null || paginationOpts === void 0 ? void 0 : paginationOpts.numItems) !== "number" || paginationOpts.numItems < 0) {
            throw new Error("`options.numItems` must be a positive number. Received `".concat(paginationOpts === null || paginationOpts === void 0 ? void 0 : paginationOpts.numItems, "`."));
        }
        const query = this.takeQuery();
        const pageSize = paginationOpts.numItems;
        const cursor = paginationOpts.cursor;
        var _paginationOpts_endCursor;
        const endCursor = (_paginationOpts_endCursor = paginationOpts === null || paginationOpts === void 0 ? void 0 : paginationOpts.endCursor) !== null && _paginationOpts_endCursor !== void 0 ? _paginationOpts_endCursor : null;
        var _paginationOpts_maximumRowsRead;
        const maximumRowsRead = (_paginationOpts_maximumRowsRead = paginationOpts.maximumRowsRead) !== null && _paginationOpts_maximumRowsRead !== void 0 ? _paginationOpts_maximumRowsRead : null;
        const { page, isDone, continueCursor, splitCursor, pageStatus } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/queryPage", {
            query,
            cursor,
            endCursor,
            pageSize,
            maximumRowsRead,
            maximumBytesRead: paginationOpts.maximumBytesRead,
            version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"]
        });
        return {
            page: page.map((json)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsonToConvex"])(json)),
            isDone,
            continueCursor,
            splitCursor,
            pageStatus
        };
    }
    async collect() {
        const out = [];
        for await (const item of this){
            out.push(item);
        }
        return out;
    }
    async take(n) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(n, 1, "take", "n");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArgIsNonNegativeInteger"])(n, 1, "take", "n");
        return this.limit(n).collect();
    }
    async first() {
        const first_array = await this.take(1);
        return first_array.length === 0 ? null : first_array[0];
    }
    async unique() {
        const first_two_array = await this.take(2);
        if (first_two_array.length === 0) {
            return null;
        }
        if (first_two_array.length === 2) {
            throw new Error("unique() query returned more than one result from table ".concat(this.tableNameForErrorMessages, ":\n [").concat(first_two_array[0]._id, ", ").concat(first_two_array[1]._id, ", ...]"));
        }
        return first_two_array[0];
    }
    constructor(query){
        __publicField(this, "state");
        __publicField(this, "tableNameForErrorMessages");
        this.state = {
            type: "preparing",
            query
        };
        if (query.source.type === "FullTableScan") {
            this.tableNameForErrorMessages = query.source.tableName;
        } else {
            this.tableNameForErrorMessages = query.source.indexName.split(".")[0];
        }
    }
} //# sourceMappingURL=query_impl.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/database_impl.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setupReader",
    ()=>setupReader,
    "setupWriter",
    ()=>setupWriter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/value.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/syscall.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$query_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/query_impl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/validate.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/index.js [app-client] (ecmascript)");
"use strict";
;
;
;
;
;
;
async function get(table, id, isSystem) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(id, 1, "get", "id");
    if (typeof id !== "string") {
        throw new Error("Invalid argument `id` for `db.get`, expected string but got '".concat(typeof id, "': ").concat(id));
    }
    const args = {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexToJson"])(id),
        isSystem,
        version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"],
        table
    };
    const syscallJSON = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/get", args);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsonToConvex"])(syscallJSON);
}
function setupReader() {
    const reader = function() {
        let isSystem = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        return {
            get: async (arg0, arg1)=>{
                return arg1 !== void 0 ? await get(arg0, arg1, isSystem) : await get(void 0, arg0, isSystem);
            },
            query: (tableName)=>{
                return new TableReader(tableName, isSystem).query();
            },
            normalizeId: (tableName, id)=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(tableName, 1, "normalizeId", "tableName");
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(id, 2, "normalizeId", "id");
                const accessingSystemTable = tableName.startsWith("_");
                if (accessingSystemTable !== isSystem) {
                    throw new Error("".concat(accessingSystemTable ? "System" : "User", " tables can only be accessed from db.").concat(isSystem ? "" : "system.", "normalizeId()."));
                }
                const syscallJSON = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performSyscall"])("1.0/db/normalizeId", {
                    table: tableName,
                    idString: id
                });
                const syscallResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsonToConvex"])(syscallJSON);
                return syscallResult.id;
            },
            // We set the system reader on the next line
            system: null,
            table: (tableName)=>{
                return new TableReader(tableName, isSystem);
            }
        };
    };
    const { system: _, ...rest } = reader(true);
    const r = reader();
    r.system = rest;
    return r;
}
async function insert(tableName, value) {
    if (tableName.startsWith("_")) {
        throw new Error("System tables (prefixed with `_`) are read-only.");
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(tableName, 1, "insert", "table");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(value, 2, "insert", "value");
    const syscallJSON = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/insert", {
        table: tableName,
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexToJson"])(value)
    });
    const syscallResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsonToConvex"])(syscallJSON);
    return syscallResult._id;
}
async function patch(table, id, value) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(id, 1, "patch", "id");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(value, 2, "patch", "value");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/shallowMerge", {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexToJson"])(id),
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["patchValueToJson"])(value),
        table
    });
}
async function replace(table, id, value) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(id, 1, "replace", "id");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(value, 2, "replace", "value");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/replace", {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexToJson"])(id),
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexToJson"])(value),
        table
    });
}
async function delete_(table, id) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(id, 1, "delete", "id");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/remove", {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexToJson"])(id),
        table
    });
}
function setupWriter() {
    const reader = setupReader();
    return {
        get: reader.get,
        query: reader.query,
        normalizeId: reader.normalizeId,
        system: reader.system,
        insert: async (table, value)=>{
            return await insert(table, value);
        },
        patch: async (arg0, arg1, arg2)=>{
            return arg2 !== void 0 ? await patch(arg0, arg1, arg2) : await patch(void 0, arg0, arg1);
        },
        replace: async (arg0, arg1, arg2)=>{
            return arg2 !== void 0 ? await replace(arg0, arg1, arg2) : await replace(void 0, arg0, arg1);
        },
        delete: async (arg0, arg1)=>{
            return arg1 !== void 0 ? await delete_(arg0, arg1) : await delete_(void 0, arg0);
        },
        table: (tableName)=>{
            return new TableWriter(tableName, false);
        }
    };
}
class TableReader {
    async get(id) {
        return get(this.tableName, id, this.isSystem);
    }
    query() {
        const accessingSystemTable = this.tableName.startsWith("_");
        if (accessingSystemTable !== this.isSystem) {
            throw new Error("".concat(accessingSystemTable ? "System" : "User", " tables can only be accessed from db.").concat(this.isSystem ? "" : "system.", "query()."));
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$query_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryInitializerImpl"](this.tableName);
    }
    constructor(tableName, isSystem){
        this.tableName = tableName;
        this.isSystem = isSystem;
    }
}
class TableWriter extends TableReader {
    async insert(value) {
        return insert(this.tableName, value);
    }
    async patch(id, value) {
        return patch(this.tableName, id, value);
    }
    async replace(id, value) {
        return replace(this.tableName, id, value);
    }
    async delete(id) {
        return delete_(this.tableName, id);
    }
} //# sourceMappingURL=database_impl.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/scheduler_impl.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setupActionScheduler",
    ()=>setupActionScheduler,
    "setupMutationScheduler",
    ()=>setupMutationScheduler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/value.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/syscall.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/common/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/validate.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/components/paths.js [app-client] (ecmascript)");
"use strict";
;
;
;
;
;
;
function setupMutationScheduler() {
    return {
        runAfter: async (delayMs, functionReference, args)=>{
            const syscallArgs = runAfterSyscallArgs(delayMs, functionReference, args);
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/schedule", syscallArgs);
        },
        runAt: async (ms_since_epoch_or_date, functionReference, args)=>{
            const syscallArgs = runAtSyscallArgs(ms_since_epoch_or_date, functionReference, args);
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/schedule", syscallArgs);
        },
        cancel: async (id)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(id, 1, "cancel", "id");
            const args = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexToJson"])(id)
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/cancel_job", args);
        }
    };
}
function setupActionScheduler(requestId) {
    return {
        runAfter: async (delayMs, functionReference, args)=>{
            const syscallArgs = {
                requestId,
                ...runAfterSyscallArgs(delayMs, functionReference, args)
            };
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/actions/schedule", syscallArgs);
        },
        runAt: async (ms_since_epoch_or_date, functionReference, args)=>{
            const syscallArgs = {
                requestId,
                ...runAtSyscallArgs(ms_since_epoch_or_date, functionReference, args)
            };
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/actions/schedule", syscallArgs);
        },
        cancel: async (id)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(id, 1, "cancel", "id");
            const syscallArgs = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexToJson"])(id)
            };
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/actions/cancel_job", syscallArgs);
        }
    };
}
function runAfterSyscallArgs(delayMs, functionReference, args) {
    if (typeof delayMs !== "number") {
        throw new Error("`delayMs` must be a number");
    }
    if (!isFinite(delayMs)) {
        throw new Error("`delayMs` must be a finite number");
    }
    if (delayMs < 0) {
        throw new Error("`delayMs` must be non-negative");
    }
    const functionArgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseArgs"])(args);
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFunctionAddress"])(functionReference);
    const ts = (Date.now() + delayMs) / 1e3;
    return {
        ...address,
        ts,
        args: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexToJson"])(functionArgs),
        version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"]
    };
}
function runAtSyscallArgs(ms_since_epoch_or_date, functionReference, args) {
    let ts;
    if (ms_since_epoch_or_date instanceof Date) {
        ts = ms_since_epoch_or_date.valueOf() / 1e3;
    } else if (typeof ms_since_epoch_or_date === "number") {
        ts = ms_since_epoch_or_date / 1e3;
    } else {
        throw new Error("The invoke time must a Date or a timestamp");
    }
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFunctionAddress"])(functionReference);
    const functionArgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseArgs"])(args);
    return {
        ...address,
        ts,
        args: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexToJson"])(functionArgs),
        version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"]
    };
} //# sourceMappingURL=scheduler_impl.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/storage_impl.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setupStorageActionWriter",
    ()=>setupStorageActionWriter,
    "setupStorageReader",
    ()=>setupStorageReader,
    "setupStorageWriter",
    ()=>setupStorageWriter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/syscall.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/validate.js [app-client] (ecmascript)");
"use strict";
;
;
;
function setupStorageReader(requestId) {
    return {
        getUrl: async (storageId)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateArg"])(storageId, 1, "getUrl", "storageId");
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/storageGetUrl", {
                requestId,
                version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"],
                storageId
            });
        },
        getMetadata: async (storageId)=>{
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/storageGetMetadata", {
                requestId,
                version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"],
                storageId
            });
        }
    };
}
function setupStorageWriter(requestId) {
    const reader = setupStorageReader(requestId);
    return {
        generateUploadUrl: async ()=>{
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/storageGenerateUploadUrl", {
                requestId,
                version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"]
            });
        },
        delete: async (storageId)=>{
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/storageDelete", {
                requestId,
                version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"],
                storageId
            });
        },
        getUrl: reader.getUrl,
        getMetadata: reader.getMetadata
    };
}
function setupStorageActionWriter(requestId) {
    const writer = setupStorageWriter(requestId);
    return {
        ...writer,
        store: async (blob, options)=>{
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performJsSyscall"])("storage/storeBlob", {
                requestId,
                version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"],
                blob,
                options
            });
        },
        get: async (storageId)=>{
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performJsSyscall"])("storage/getBlob", {
                requestId,
                version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"],
                storageId
            });
        }
    };
} //# sourceMappingURL=storage_impl.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/registration_impl.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "actionGeneric",
    ()=>actionGeneric,
    "httpActionGeneric",
    ()=>httpActionGeneric,
    "internalActionGeneric",
    ()=>internalActionGeneric,
    "internalMutationGeneric",
    ()=>internalMutationGeneric,
    "internalQueryGeneric",
    ()=>internalQueryGeneric,
    "invokeFunction",
    ()=>invokeFunction,
    "mutationGeneric",
    ()=>mutationGeneric,
    "queryGeneric",
    ()=>queryGeneric,
    "validateReturnValue",
    ()=>validateReturnValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/value.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/validator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$actions_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/actions_impl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$vector_search_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/vector_search_impl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$authentication_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/authentication_impl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$database_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/database_impl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$query_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/query_impl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$scheduler_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/scheduler_impl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$storage_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/storage_impl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/common/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/syscall.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/components/paths.js [app-client] (ecmascript)");
"use strict";
;
;
;
;
;
;
;
;
;
;
;
;
async function invokeMutation(func, argsStr) {
    const requestId = "";
    const args = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsonToConvex"])(JSON.parse(argsStr));
    const mutationCtx = {
        db: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$database_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupWriter"])(),
        auth: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$authentication_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupAuth"])(requestId),
        storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$storage_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupStorageWriter"])(requestId),
        scheduler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$scheduler_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupMutationScheduler"])(),
        runQuery: (reference, args2)=>runUdf("query", reference, args2),
        runMutation: (reference, args2)=>runUdf("mutation", reference, args2)
    };
    const result = await invokeFunction(func, mutationCtx, args);
    validateReturnValue(result);
    return JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexToJson"])(result === void 0 ? null : result));
}
function validateReturnValue(v2) {
    if (v2 instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$query_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryInitializerImpl"] || v2 instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$query_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryImpl"]) {
        throw new Error("Return value is a Query. Results must be retrieved with `.collect()`, `.take(n), `.unique()`, or `.first()`.");
    }
}
async function invokeFunction(func, ctx, args) {
    let result;
    try {
        result = await Promise.resolve(func(ctx, ...args));
    } catch (thrown) {
        throw serializeConvexErrorData(thrown);
    }
    return result;
}
function dontCallDirectly(funcType, handler) {
    return (ctx, args)=>{
        globalThis.console.warn("Convex functions should not directly call other Convex functions. Consider calling a helper function instead. e.g. `export const foo = ".concat(funcType, "(...); await foo(ctx);` is not supported. See https://docs.convex.dev/production/best-practices/#use-helper-functions-to-write-shared-code"));
        return handler(ctx, args);
    };
}
function serializeConvexErrorData(thrown) {
    if (typeof thrown === "object" && thrown !== null && Symbol.for("ConvexError") in thrown) {
        const error = thrown;
        error.data = JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexToJson"])(error.data === void 0 ? null : error.data));
        error.ConvexErrorSymbol = Symbol.for("ConvexError");
        return error;
    } else {
        return thrown;
    }
}
function assertNotBrowser() {
    var _Object_getOwnPropertyDescriptor_get, _Object_getOwnPropertyDescriptor;
    if (typeof window === "undefined" || window.__convexAllowFunctionsInBrowser) {
        return;
    }
    var _Object_getOwnPropertyDescriptor_get_toString_includes;
    const isRealBrowser = (_Object_getOwnPropertyDescriptor_get_toString_includes = (_Object_getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor(globalThis, "window")) === null || _Object_getOwnPropertyDescriptor === void 0 ? void 0 : (_Object_getOwnPropertyDescriptor_get = _Object_getOwnPropertyDescriptor.get) === null || _Object_getOwnPropertyDescriptor_get === void 0 ? void 0 : _Object_getOwnPropertyDescriptor_get.toString().includes("[native code]")) !== null && _Object_getOwnPropertyDescriptor_get_toString_includes !== void 0 ? _Object_getOwnPropertyDescriptor_get_toString_includes : false;
    if (isRealBrowser) {
        console.error("Convex functions should not be imported in the browser. This will throw an error in future versions of `convex`. If this is a false negative, please report it to Convex support.");
    }
}
function strictReplacer(key, value) {
    if (value === void 0) {
        throw new Error("Cannot serialize validator value `undefined` for ".concat(key));
    }
    return value;
}
function exportArgs(functionDefinition) {
    return ()=>{
        let args = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].any();
        if (typeof functionDefinition === "object" && functionDefinition.args !== void 0) {
            args = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asObjectValidator"])(functionDefinition.args);
        }
        return JSON.stringify(args.json, strictReplacer);
    };
}
function exportReturns(functionDefinition) {
    return ()=>{
        let returns;
        if (typeof functionDefinition === "object" && functionDefinition.returns !== void 0) {
            returns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asObjectValidator"])(functionDefinition.returns);
        }
        return JSON.stringify(returns ? returns.json : null, strictReplacer);
    };
}
const mutationGeneric = (functionDefinition)=>{
    const handler = typeof functionDefinition === "function" ? functionDefinition : functionDefinition.handler;
    const func = dontCallDirectly("mutation", handler);
    assertNotBrowser();
    func.isMutation = true;
    func.isPublic = true;
    func.invokeMutation = (argsStr)=>invokeMutation(handler, argsStr);
    func.exportArgs = exportArgs(functionDefinition);
    func.exportReturns = exportReturns(functionDefinition);
    func._handler = handler;
    return func;
};
const internalMutationGeneric = (functionDefinition)=>{
    const handler = typeof functionDefinition === "function" ? functionDefinition : functionDefinition.handler;
    const func = dontCallDirectly("internalMutation", handler);
    assertNotBrowser();
    func.isMutation = true;
    func.isInternal = true;
    func.invokeMutation = (argsStr)=>invokeMutation(handler, argsStr);
    func.exportArgs = exportArgs(functionDefinition);
    func.exportReturns = exportReturns(functionDefinition);
    func._handler = handler;
    return func;
};
async function invokeQuery(func, argsStr) {
    const requestId = "";
    const args = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsonToConvex"])(JSON.parse(argsStr));
    const queryCtx = {
        db: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$database_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupReader"])(),
        auth: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$authentication_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupAuth"])(requestId),
        storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$storage_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupStorageReader"])(requestId),
        runQuery: (reference, args2)=>runUdf("query", reference, args2)
    };
    const result = await invokeFunction(func, queryCtx, args);
    validateReturnValue(result);
    return JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexToJson"])(result === void 0 ? null : result));
}
const queryGeneric = (functionDefinition)=>{
    const handler = typeof functionDefinition === "function" ? functionDefinition : functionDefinition.handler;
    const func = dontCallDirectly("query", handler);
    assertNotBrowser();
    func.isQuery = true;
    func.isPublic = true;
    func.invokeQuery = (argsStr)=>invokeQuery(handler, argsStr);
    func.exportArgs = exportArgs(functionDefinition);
    func.exportReturns = exportReturns(functionDefinition);
    func._handler = handler;
    return func;
};
const internalQueryGeneric = (functionDefinition)=>{
    const handler = typeof functionDefinition === "function" ? functionDefinition : functionDefinition.handler;
    const func = dontCallDirectly("internalQuery", handler);
    assertNotBrowser();
    func.isQuery = true;
    func.isInternal = true;
    func.invokeQuery = (argsStr)=>invokeQuery(handler, argsStr);
    func.exportArgs = exportArgs(functionDefinition);
    func.exportReturns = exportReturns(functionDefinition);
    func._handler = handler;
    return func;
};
async function invokeAction(func, requestId, argsStr) {
    const args = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsonToConvex"])(JSON.parse(argsStr));
    const calls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$actions_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupActionCalls"])(requestId);
    const ctx = {
        ...calls,
        auth: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$authentication_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupAuth"])(requestId),
        scheduler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$scheduler_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupActionScheduler"])(requestId),
        storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$storage_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupStorageActionWriter"])(requestId),
        vectorSearch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$vector_search_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupActionVectorSearch"])(requestId)
    };
    const result = await invokeFunction(func, ctx, args);
    return JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexToJson"])(result === void 0 ? null : result));
}
const actionGeneric = (functionDefinition)=>{
    const handler = typeof functionDefinition === "function" ? functionDefinition : functionDefinition.handler;
    const func = dontCallDirectly("action", handler);
    assertNotBrowser();
    func.isAction = true;
    func.isPublic = true;
    func.invokeAction = (requestId, argsStr)=>invokeAction(handler, requestId, argsStr);
    func.exportArgs = exportArgs(functionDefinition);
    func.exportReturns = exportReturns(functionDefinition);
    func._handler = handler;
    return func;
};
const internalActionGeneric = (functionDefinition)=>{
    const handler = typeof functionDefinition === "function" ? functionDefinition : functionDefinition.handler;
    const func = dontCallDirectly("internalAction", handler);
    assertNotBrowser();
    func.isAction = true;
    func.isInternal = true;
    func.invokeAction = (requestId, argsStr)=>invokeAction(handler, requestId, argsStr);
    func.exportArgs = exportArgs(functionDefinition);
    func.exportReturns = exportReturns(functionDefinition);
    func._handler = handler;
    return func;
};
async function invokeHttpAction(func, request) {
    const requestId = "";
    const calls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$actions_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupActionCalls"])(requestId);
    const ctx = {
        ...calls,
        auth: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$authentication_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupAuth"])(requestId),
        storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$storage_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupStorageActionWriter"])(requestId),
        scheduler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$scheduler_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupActionScheduler"])(requestId),
        vectorSearch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$vector_search_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupActionVectorSearch"])(requestId)
    };
    return await invokeFunction(func, ctx, [
        request
    ]);
}
const httpActionGeneric = (func)=>{
    const q = dontCallDirectly("httpAction", func);
    assertNotBrowser();
    q.isHttp = true;
    q.invokeHttpAction = (request)=>invokeHttpAction(func, request);
    q._handler = func;
    return q;
};
async function runUdf(udfType, f, args) {
    const queryArgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseArgs"])(args);
    const syscallArgs = {
        udfType,
        args: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexToJson"])(queryArgs),
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFunctionAddress"])(f)
    };
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/runUdf", syscallArgs);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsonToConvex"])(result);
} //# sourceMappingURL=registration_impl.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/pagination.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginationOptsValidator",
    ()=>paginationOptsValidator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/validator.js [app-client] (ecmascript)");
"use strict";
;
const paginationOptsValidator = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].object({
    numItems: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].number(),
    cursor: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].union(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].null()),
    endCursor: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].union(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].null())),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].number()),
    maximumRowsRead: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].number()),
    maximumBytesRead: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].number())
}); //# sourceMappingURL=pagination.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/storage.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
"use strict"; //# sourceMappingURL=storage.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/api.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "anyApi",
    ()=>anyApi,
    "filterApi",
    ()=>filterApi,
    "getFunctionName",
    ()=>getFunctionName,
    "justActions",
    ()=>justActions,
    "justInternal",
    ()=>justInternal,
    "justMutations",
    ()=>justMutations,
    "justPaginatedQueries",
    ()=>justPaginatedQueries,
    "justPublic",
    ()=>justPublic,
    "justQueries",
    ()=>justQueries,
    "justSchedulable",
    ()=>justSchedulable,
    "makeFunctionReference",
    ()=>makeFunctionReference
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$functionName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/functionName.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/components/paths.js [app-client] (ecmascript)");
"use strict";
;
;
function getFunctionName(functionReference) {
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFunctionAddress"])(functionReference);
    if (address.name === void 0) {
        if (address.functionHandle !== void 0) {
            throw new Error('Expected function reference like "api.file.func" or "internal.file.func", but received function handle '.concat(address.functionHandle));
        } else if (address.reference !== void 0) {
            throw new Error('Expected function reference in the current component like "api.file.func" or "internal.file.func", but received reference '.concat(address.reference));
        }
        throw new Error('Expected function reference like "api.file.func" or "internal.file.func", but received '.concat(JSON.stringify(address)));
    }
    if (typeof functionReference === "string") return functionReference;
    const name = functionReference[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$functionName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functionName"]];
    if (!name) {
        throw new Error("".concat(functionReference, " is not a functionReference"));
    }
    return name;
}
function makeFunctionReference(name) {
    return {
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$functionName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functionName"]]: name
    };
}
function createApi() {
    let pathParts = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    const handler = {
        get (_, prop) {
            if (typeof prop === "string") {
                const newParts = [
                    ...pathParts,
                    prop
                ];
                return createApi(newParts);
            } else if (prop === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$functionName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functionName"]) {
                if (pathParts.length < 2) {
                    const found = [
                        "api",
                        ...pathParts
                    ].join(".");
                    throw new Error("API path is expected to be of the form `api.moduleName.functionName`. Found: `".concat(found, "`"));
                }
                const path = pathParts.slice(0, -1).join("/");
                const exportName = pathParts[pathParts.length - 1];
                if (exportName === "default") {
                    return path;
                } else {
                    return path + ":" + exportName;
                }
            } else if (prop === Symbol.toStringTag) {
                return "FunctionReference";
            } else {
                return void 0;
            }
        }
    };
    return new Proxy({}, handler);
}
function filterApi(api) {
    return api;
}
function justInternal(api) {
    return api;
}
function justPublic(api) {
    return api;
}
function justQueries(api) {
    return api;
}
function justMutations(api) {
    return api;
}
function justActions(api) {
    return api;
}
function justPaginatedQueries(api) {
    return api;
}
function justSchedulable(api) {
    return api;
}
const anyApi = createApi(); //# sourceMappingURL=api.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/cron.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Crons",
    ()=>Crons,
    "cronJobs",
    ()=>cronJobs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/common/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/value.js [app-client] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
;
;
const DAYS_OF_WEEK = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
];
const cronJobs = ()=>new Crons();
function validateIntervalNumber(n) {
    if (!Number.isInteger(n) || n <= 0) {
        throw new Error("Interval must be an integer greater than 0");
    }
}
function validatedDayOfMonth(n) {
    if (!Number.isInteger(n) || n < 1 || n > 31) {
        throw new Error("Day of month must be an integer from 1 to 31");
    }
    return n;
}
function validatedDayOfWeek(s) {
    if (!DAYS_OF_WEEK.includes(s)) {
        throw new Error('Day of week must be a string like "monday".');
    }
    return s;
}
function validatedHourOfDay(n) {
    if (!Number.isInteger(n) || n < 0 || n > 23) {
        throw new Error("Hour of day must be an integer from 0 to 23");
    }
    return n;
}
function validatedMinuteOfHour(n) {
    if (!Number.isInteger(n) || n < 0 || n > 59) {
        throw new Error("Minute of hour must be an integer from 0 to 59");
    }
    return n;
}
function validatedCronString(s) {
    return s;
}
function validatedCronIdentifier(s) {
    if (!s.match(/^[ -~]*$/)) {
        throw new Error("Invalid cron identifier ".concat(s, ": use ASCII letters that are not control characters"));
    }
    return s;
}
class Crons {
    /** @internal */ schedule(cronIdentifier, schedule, functionReference, args) {
        const cronArgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseArgs"])(args);
        validatedCronIdentifier(cronIdentifier);
        if (cronIdentifier in this.crons) {
            throw new Error("Cron identifier registered twice: ".concat(cronIdentifier));
        }
        this.crons[cronIdentifier] = {
            name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFunctionName"])(functionReference),
            args: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexToJson"])(cronArgs)
            ],
            schedule
        };
    }
    /**
   * Schedule a mutation or action to run at some interval.
   *
   * ```js
   * crons.interval("Clear presence data", {seconds: 30}, api.presence.clear);
   * ```
   *
   * @param identifier - A unique name for this scheduled job.
   * @param schedule - The time between runs for this scheduled job.
   * @param functionReference - A {@link FunctionReference} for the function
   * to schedule.
   * @param args - The arguments to the function.
   */ interval(cronIdentifier, schedule, functionReference) {
        for(var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++){
            args[_key - 3] = arguments[_key];
        }
        const s = schedule;
        const hasSeconds = +("seconds" in s && s.seconds !== void 0);
        const hasMinutes = +("minutes" in s && s.minutes !== void 0);
        const hasHours = +("hours" in s && s.hours !== void 0);
        const total = hasSeconds + hasMinutes + hasHours;
        if (total !== 1) {
            throw new Error("Must specify one of seconds, minutes, or hours");
        }
        if (hasSeconds) {
            validateIntervalNumber(schedule.seconds);
        } else if (hasMinutes) {
            validateIntervalNumber(schedule.minutes);
        } else if (hasHours) {
            validateIntervalNumber(schedule.hours);
        }
        this.schedule(cronIdentifier, {
            ...schedule,
            type: "interval"
        }, functionReference, ...args);
    }
    /**
   * Schedule a mutation or action to run on an hourly basis.
   *
   * ```js
   * crons.hourly(
   *   "Reset high scores",
   *   {
   *     minuteUTC: 30,
   *   },
   *   api.scores.reset
   * )
   * ```
   *
   * @param cronIdentifier - A unique name for this scheduled job.
   * @param schedule - What time (UTC) each day to run this function.
   * @param functionReference - A {@link FunctionReference} for the function
   * to schedule.
   * @param args - The arguments to the function.
   */ hourly(cronIdentifier, schedule, functionReference) {
        for(var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++){
            args[_key - 3] = arguments[_key];
        }
        const minuteUTC = validatedMinuteOfHour(schedule.minuteUTC);
        this.schedule(cronIdentifier, {
            minuteUTC,
            type: "hourly"
        }, functionReference, ...args);
    }
    /**
   * Schedule a mutation or action to run on a daily basis.
   *
   * ```js
   * crons.daily(
   *   "Reset high scores",
   *   {
   *     hourUTC: 17, // (9:30am Pacific/10:30am Daylight Savings Pacific)
   *     minuteUTC: 30,
   *   },
   *   api.scores.reset
   * )
   * ```
   *
   * @param cronIdentifier - A unique name for this scheduled job.
   * @param schedule - What time (UTC) each day to run this function.
   * @param functionReference - A {@link FunctionReference} for the function
   * to schedule.
   * @param args - The arguments to the function.
   */ daily(cronIdentifier, schedule, functionReference) {
        for(var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++){
            args[_key - 3] = arguments[_key];
        }
        const hourUTC = validatedHourOfDay(schedule.hourUTC);
        const minuteUTC = validatedMinuteOfHour(schedule.minuteUTC);
        this.schedule(cronIdentifier, {
            hourUTC,
            minuteUTC,
            type: "daily"
        }, functionReference, ...args);
    }
    /**
   * Schedule a mutation or action to run on a weekly basis.
   *
   * ```js
   * crons.weekly(
   *   "Weekly re-engagement email",
   *   {
   *     dayOfWeek: "Tuesday",
   *     hourUTC: 17, // (9:30am Pacific/10:30am Daylight Savings Pacific)
   *     minuteUTC: 30,
   *   },
   *   api.emails.send
   * )
   * ```
   *
   * @param cronIdentifier - A unique name for this scheduled job.
   * @param schedule - What day and time (UTC) each week to run this function.
   * @param functionReference - A {@link FunctionReference} for the function
   * to schedule.
   */ weekly(cronIdentifier, schedule, functionReference) {
        for(var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++){
            args[_key - 3] = arguments[_key];
        }
        const dayOfWeek = validatedDayOfWeek(schedule.dayOfWeek);
        const hourUTC = validatedHourOfDay(schedule.hourUTC);
        const minuteUTC = validatedMinuteOfHour(schedule.minuteUTC);
        this.schedule(cronIdentifier, {
            dayOfWeek,
            hourUTC,
            minuteUTC,
            type: "weekly"
        }, functionReference, ...args);
    }
    /**
   * Schedule a mutation or action to run on a monthly basis.
   *
   * Note that some months have fewer days than others, so e.g. a function
   * scheduled to run on the 30th will not run in February.
   *
   * ```js
   * crons.monthly(
   *   "Bill customers at ",
   *   {
   *     hourUTC: 17, // (9:30am Pacific/10:30am Daylight Savings Pacific)
   *     minuteUTC: 30,
   *     day: 1,
   *   },
   *   api.billing.billCustomers
   * )
   * ```
   *
   * @param cronIdentifier - A unique name for this scheduled job.
   * @param schedule - What day and time (UTC) each month to run this function.
   * @param functionReference - A {@link FunctionReference} for the function
   * to schedule.
   * @param args - The arguments to the function.
   */ monthly(cronIdentifier, schedule, functionReference) {
        for(var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++){
            args[_key - 3] = arguments[_key];
        }
        const day = validatedDayOfMonth(schedule.day);
        const hourUTC = validatedHourOfDay(schedule.hourUTC);
        const minuteUTC = validatedMinuteOfHour(schedule.minuteUTC);
        this.schedule(cronIdentifier, {
            day,
            hourUTC,
            minuteUTC,
            type: "monthly"
        }, functionReference, ...args);
    }
    /**
   * Schedule a mutation or action to run on a recurring basis.
   *
   * Like the unix command `cron`, Sunday is 0, Monday is 1, etc.
   *
   * ```
   *  ┌─ minute (0 - 59)
   *  │ ┌─ hour (0 - 23)
   *  │ │ ┌─ day of the month (1 - 31)
   *  │ │ │ ┌─ month (1 - 12)
   *  │ │ │ │ ┌─ day of the week (0 - 6) (Sunday to Saturday)
   * "* * * * *"
   * ```
   *
   * @param cronIdentifier - A unique name for this scheduled job.
   * @param cron - Cron string like `"15 7 * * *"` (Every day at 7:15 UTC)
   * @param functionReference - A {@link FunctionReference} for the function
   * to schedule.
   * @param args - The arguments to the function.
   */ cron(cronIdentifier, cron, functionReference) {
        for(var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++){
            args[_key - 3] = arguments[_key];
        }
        const c = validatedCronString(cron);
        this.schedule(cronIdentifier, {
            cron: c,
            type: "cron"
        }, functionReference, ...args);
    }
    /** @internal */ export() {
        return JSON.stringify(this.crons);
    }
    constructor(){
        __publicField(this, "crons");
        __publicField(this, "isCrons");
        this.isCrons = true;
        this.crons = {};
    }
} //# sourceMappingURL=cron.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/router.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HttpRouter",
    ()=>HttpRouter,
    "ROUTABLE_HTTP_METHODS",
    ()=>ROUTABLE_HTTP_METHODS,
    "httpRouter",
    ()=>httpRouter,
    "normalizeMethod",
    ()=>normalizeMethod
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/syscall.js [app-client] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
const ROUTABLE_HTTP_METHODS = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "OPTIONS",
    "PATCH"
];
function normalizeMethod(method) {
    if (method === "HEAD") return "GET";
    return method;
}
const httpRouter = ()=>new HttpRouter();
class HttpRouter {
    constructor(){
        __publicField(this, "exactRoutes", /* @__PURE__ */ new Map());
        __publicField(this, "prefixRoutes", /* @__PURE__ */ new Map());
        __publicField(this, "isRouter", true);
        /**
     * Specify an HttpAction to be used to respond to requests
     * for an HTTP method (e.g. "GET") and a path or pathPrefix.
     *
     * Paths must begin with a slash. Path prefixes must also end in a slash.
     *
     * ```js
     * // matches `/profile` (but not `/profile/`)
     * http.route({ path: "/profile", method: "GET", handler: getProfile})
     *
     * // matches `/profiles/`, `/profiles/abc`, and `/profiles/a/c/b` (but not `/profile`)
     * http.route({ pathPrefix: "/profile/", method: "GET", handler: getProfile})
     * ```
     */ __publicField(this, "route", (spec)=>{
            if (!spec.handler) throw new Error("route requires handler");
            if (!spec.method) throw new Error("route requires method");
            const { method, handler } = spec;
            if (!ROUTABLE_HTTP_METHODS.includes(method)) {
                throw new Error("'".concat(method, "' is not an allowed HTTP method (like GET, POST, PUT etc.)"));
            }
            if ("path" in spec) {
                if ("pathPrefix" in spec) {
                    throw new Error("Invalid httpRouter route: cannot contain both 'path' and 'pathPrefix'");
                }
                if (!spec.path.startsWith("/")) {
                    throw new Error("path '".concat(spec.path, "' does not start with a /"));
                }
                if (spec.path.startsWith("/.files/") || spec.path === "/.files") {
                    throw new Error("path '".concat(spec.path, "' is reserved"));
                }
                const methods = this.exactRoutes.has(spec.path) ? this.exactRoutes.get(spec.path) : /* @__PURE__ */ new Map();
                if (methods.has(method)) {
                    throw new Error("Path '".concat(spec.path, "' for method ").concat(method, " already in use"));
                }
                methods.set(method, handler);
                this.exactRoutes.set(spec.path, methods);
            } else if ("pathPrefix" in spec) {
                if (!spec.pathPrefix.startsWith("/")) {
                    throw new Error("pathPrefix '".concat(spec.pathPrefix, "' does not start with a /"));
                }
                if (!spec.pathPrefix.endsWith("/")) {
                    throw new Error("pathPrefix ".concat(spec.pathPrefix, " must end with a /"));
                }
                if (spec.pathPrefix.startsWith("/.files/")) {
                    throw new Error("pathPrefix '".concat(spec.pathPrefix, "' is reserved"));
                }
                const prefixes = this.prefixRoutes.get(method) || /* @__PURE__ */ new Map();
                if (prefixes.has(spec.pathPrefix)) {
                    throw new Error("".concat(spec.method, " pathPrefix ").concat(spec.pathPrefix, " is already defined"));
                }
                prefixes.set(spec.pathPrefix, handler);
                this.prefixRoutes.set(method, prefixes);
            } else {
                throw new Error("Invalid httpRouter route entry: must contain either field 'path' or 'pathPrefix'");
            }
        });
        /**
     * Returns a list of routed HTTP actions.
     *
     * These are used to populate the list of routes shown in the Functions page of the Convex dashboard.
     *
     * @returns - an array of [path, method, endpoint] tuples.
     */ __publicField(this, "getRoutes", ()=>{
            const exactPaths = [
                ...this.exactRoutes.keys()
            ].sort();
            const exact = exactPaths.flatMap((path)=>[
                    ...this.exactRoutes.get(path).keys()
                ].sort().map((method)=>[
                        path,
                        method,
                        this.exactRoutes.get(path).get(method)
                    ]));
            const prefixPathMethods = [
                ...this.prefixRoutes.keys()
            ].sort();
            const prefixes = prefixPathMethods.flatMap((method)=>[
                    ...this.prefixRoutes.get(method).keys()
                ].sort().map((pathPrefix)=>[
                        "".concat(pathPrefix, "*"),
                        method,
                        this.prefixRoutes.get(method).get(pathPrefix)
                    ]));
            return [
                ...exact,
                ...prefixes
            ];
        });
        /**
     * Returns the appropriate HTTP action and its routed request path and method.
     *
     * The path and method returned are used for logging and metrics, and should
     * match up with one of the routes returned by `getRoutes`.
     *
     * For example,
     *
     * ```js
     * http.route({ pathPrefix: "/profile/", method: "GET", handler: getProfile});
     *
     * http.lookup("/profile/abc", "GET") // returns [getProfile, "GET", "/profile/*"]
     *```
     *
     * @returns - a tuple [{@link PublicHttpAction}, method, path] or null.
     */ __publicField(this, "lookup", (path, method)=>{
            var _this_exactRoutes_get;
            method = normalizeMethod(method);
            const exactMatch = (_this_exactRoutes_get = this.exactRoutes.get(path)) === null || _this_exactRoutes_get === void 0 ? void 0 : _this_exactRoutes_get.get(method);
            if (exactMatch) return [
                exactMatch,
                method,
                path
            ];
            const prefixes = this.prefixRoutes.get(method) || /* @__PURE__ */ new Map();
            const prefixesSorted = [
                ...prefixes.entries()
            ].sort((param, param1)=>{
                let [prefixA, _a] = param, [prefixB, _b] = param1;
                return prefixB.length - prefixA.length;
            });
            for (const [pathPrefix, endpoint] of prefixesSorted){
                if (path.startsWith(pathPrefix)) {
                    return [
                        endpoint,
                        method,
                        "".concat(pathPrefix, "*")
                    ];
                }
            }
            return null;
        });
        /**
     * Given a JSON string representation of a Request object, return a Response
     * by routing the request and running the appropriate endpoint or returning
     * a 404 Response.
     *
     * @param argsStr - a JSON string representing a Request object.
     *
     * @returns - a Response object.
     */ __publicField(this, "runRequest", async (argsStr, requestRoute)=>{
            const request = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performJsSyscall"])("requestFromConvexJson", {
                convexJson: JSON.parse(argsStr)
            });
            let pathname = requestRoute;
            if (!pathname || typeof pathname !== "string") {
                pathname = new URL(request.url).pathname;
            }
            const method = request.method;
            const match = this.lookup(pathname, method);
            if (!match) {
                const response2 = new Response("No HttpAction routed for ".concat(pathname), {
                    status: 404
                });
                return JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performJsSyscall"])("convexJsonFromResponse", {
                    response: response2
                }));
            }
            const [endpoint, _method, _path] = match;
            const response = await endpoint.invokeHttpAction(request);
            return JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performJsSyscall"])("convexJsonFromResponse", {
                response
            }));
        });
    }
} //# sourceMappingURL=router.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/components/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "componentsGeneric",
    ()=>componentsGeneric,
    "createFunctionHandle",
    ()=>createFunctionHandle,
    "currentSystemUdfInComponent",
    ()=>currentSystemUdfInComponent,
    "defineApp",
    ()=>defineApp,
    "defineComponent",
    ()=>defineComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/value.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/syscall.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/components/paths.js [app-client] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
;
;
;
;
async function createFunctionHandle(functionReference) {
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFunctionAddress"])(functionReference);
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/createFunctionHandle", {
        ...address,
        version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"]
    });
}
class InstalledComponent {
    get exports() {
        return createExports(this._name, []);
    }
    constructor(definition, name){
        /**
     * @internal
     */ __publicField(this, "_definition");
        /**
     * @internal
     */ __publicField(this, "_name");
        this._definition = definition;
        this._name = name;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setReferencePath"])(this, "_reference/childComponent/".concat(name));
    }
}
function createExports(name, pathParts) {
    const handler = {
        get (_, prop) {
            if (typeof prop === "string") {
                const newParts = [
                    ...pathParts,
                    prop
                ];
                return createExports(name, newParts);
            } else if (prop === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toReferencePath"]) {
                let reference = "_reference/childComponent/".concat(name);
                for (const part of pathParts){
                    reference += "/".concat(part);
                }
                return reference;
            } else {
                return void 0;
            }
        }
    };
    return new Proxy({}, handler);
}
function use(definition, options) {
    const importedComponentDefinition = definition;
    if (typeof importedComponentDefinition.componentDefinitionPath !== "string") {
        throw new Error("Component definition does not have the required componentDefinitionPath property. This code only works in Convex runtime.");
    }
    const name = (options === null || options === void 0 ? void 0 : options.name) || // added recently
    importedComponentDefinition.defaultName || // can be removed once backend is out
    importedComponentDefinition.componentDefinitionPath.split("/").pop();
    this._childComponents.push([
        name,
        importedComponentDefinition,
        {}
    ]);
    return new InstalledComponent(definition, name);
}
function exportAppForAnalysis() {
    const definitionType = {
        type: "app"
    };
    const childComponents = serializeChildComponents(this._childComponents);
    return {
        definitionType,
        childComponents,
        httpMounts: {},
        exports: serializeExportTree(this._exportTree)
    };
}
function serializeExportTree(tree) {
    const branch = [];
    for (const [key, child] of Object.entries(tree)){
        let node;
        if (typeof child === "string") {
            node = {
                type: "leaf",
                leaf: child
            };
        } else {
            node = serializeExportTree(child);
        }
        branch.push([
            key,
            node
        ]);
    }
    return {
        type: "branch",
        branch
    };
}
function serializeChildComponents(childComponents) {
    return childComponents.map((param)=>{
        let [name, definition, p] = param;
        let args = null;
        if (p !== null) {
            args = [];
            for (const [name2, value] of Object.entries(p)){
                if (value !== void 0) {
                    args.push([
                        name2,
                        {
                            type: "value",
                            value: JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convexToJson"])(value))
                        }
                    ]);
                }
            }
        }
        const path = definition.componentDefinitionPath;
        if (!path) throw new Error("no .componentPath for component definition " + JSON.stringify(definition, null, 2));
        return {
            name,
            path,
            args
        };
    });
}
function exportComponentForAnalysis() {
    const args = Object.entries(this._args).map((param)=>{
        let [name, validator] = param;
        return [
            name,
            {
                type: "value",
                value: JSON.stringify(validator.json)
            }
        ];
    });
    const definitionType = {
        type: "childComponent",
        name: this._name,
        args
    };
    const childComponents = serializeChildComponents(this._childComponents);
    return {
        name: this._name,
        definitionType,
        childComponents,
        httpMounts: {},
        exports: serializeExportTree(this._exportTree)
    };
}
function defineComponent(name) {
    const ret = {
        _isRoot: false,
        _name: name,
        _args: {},
        _childComponents: [],
        _exportTree: {},
        _onInitCallbacks: {},
        export: exportComponentForAnalysis,
        use,
        // pretend to conform to ComponentDefinition, which temporarily expects __args
        ...{}
    };
    return ret;
}
function defineApp() {
    const ret = {
        _isRoot: true,
        _childComponents: [],
        _exportTree: {},
        export: exportAppForAnalysis,
        use
    };
    return ret;
}
function currentSystemUdfInComponent(componentId) {
    return {
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toReferencePath"]]: "_reference/currentSystemUdfInComponent/".concat(componentId)
    };
}
function createChildComponents(root, pathParts) {
    const handler = {
        get (_, prop) {
            if (typeof prop === "string") {
                const newParts = [
                    ...pathParts,
                    prop
                ];
                return createChildComponents(root, newParts);
            } else if (prop === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toReferencePath"]) {
                if (pathParts.length < 1) {
                    const found = [
                        root,
                        ...pathParts
                    ].join(".");
                    throw new Error("API path is expected to be of the form `".concat(root, ".childComponent.functionName`. Found: `").concat(found, "`"));
                }
                return "_reference/childComponent/" + pathParts.join("/");
            } else {
                return void 0;
            }
        }
    };
    return new Proxy({}, handler);
}
const componentsGeneric = ()=>createChildComponents("components", []); //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/schema.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SchemaDefinition",
    ()=>SchemaDefinition,
    "TableDefinition",
    ()=>TableDefinition,
    "defineSchema",
    ()=>defineSchema,
    "defineTable",
    ()=>defineTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/values/validator.js [app-client] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
class TableDefinition {
    /**
   * This API is experimental: it may change or disappear.
   *
   * Returns indexes defined on this table.
   * Intended for the advanced use cases of dynamically deciding which index to use for a query.
   * If you think you need this, please chime in on ths issue in the Convex JS GitHub repo.
   * https://github.com/get-convex/convex-js/issues/49
   */ " indexes"() {
        return this.indexes;
    }
    index(name, indexConfig) {
        if (Array.isArray(indexConfig)) {
            this.indexes.push({
                indexDescriptor: name,
                fields: indexConfig
            });
        } else if (indexConfig.staged) {
            this.stagedDbIndexes.push({
                indexDescriptor: name,
                fields: indexConfig.fields
            });
        } else {
            this.indexes.push({
                indexDescriptor: name,
                fields: indexConfig.fields
            });
        }
        return this;
    }
    searchIndex(name, indexConfig) {
        if (indexConfig.staged) {
            this.stagedSearchIndexes.push({
                indexDescriptor: name,
                searchField: indexConfig.searchField,
                filterFields: indexConfig.filterFields || []
            });
        } else {
            this.searchIndexes.push({
                indexDescriptor: name,
                searchField: indexConfig.searchField,
                filterFields: indexConfig.filterFields || []
            });
        }
        return this;
    }
    vectorIndex(name, indexConfig) {
        if (indexConfig.staged) {
            this.stagedVectorIndexes.push({
                indexDescriptor: name,
                vectorField: indexConfig.vectorField,
                dimensions: indexConfig.dimensions,
                filterFields: indexConfig.filterFields || []
            });
        } else {
            this.vectorIndexes.push({
                indexDescriptor: name,
                vectorField: indexConfig.vectorField,
                dimensions: indexConfig.dimensions,
                filterFields: indexConfig.filterFields || []
            });
        }
        return this;
    }
    /**
   * Work around for https://github.com/microsoft/TypeScript/issues/57035
   */ self() {
        return this;
    }
    /**
   * Export the contents of this definition.
   *
   * This is called internally by the Convex framework.
   * @internal
   */ export() {
        const documentType = this.validator.json;
        if (typeof documentType !== "object") {
            throw new Error("Invalid validator: please make sure that the parameter of `defineTable` is valid (see https://docs.convex.dev/database/schemas)");
        }
        return {
            indexes: this.indexes,
            stagedDbIndexes: this.stagedDbIndexes,
            searchIndexes: this.searchIndexes,
            stagedSearchIndexes: this.stagedSearchIndexes,
            vectorIndexes: this.vectorIndexes,
            stagedVectorIndexes: this.stagedVectorIndexes,
            documentType
        };
    }
    /**
   * @internal
   */ constructor(documentType){
        __publicField(this, "indexes");
        __publicField(this, "stagedDbIndexes");
        __publicField(this, "searchIndexes");
        __publicField(this, "stagedSearchIndexes");
        __publicField(this, "vectorIndexes");
        __publicField(this, "stagedVectorIndexes");
        // The type of documents stored in this table.
        __publicField(this, "validator");
        this.indexes = [];
        this.stagedDbIndexes = [];
        this.searchIndexes = [];
        this.stagedSearchIndexes = [];
        this.vectorIndexes = [];
        this.stagedVectorIndexes = [];
        this.validator = documentType;
    }
}
function defineTable(documentSchema) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidator"])(documentSchema)) {
        return new TableDefinition(documentSchema);
    } else {
        return new TableDefinition(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].object(documentSchema));
    }
}
class SchemaDefinition {
    /**
   * Export the contents of this definition.
   *
   * This is called internally by the Convex framework.
   * @internal
   */ export() {
        return JSON.stringify({
            tables: Object.entries(this.tables).map((param)=>{
                let [tableName, definition] = param;
                const { indexes, stagedDbIndexes, searchIndexes, stagedSearchIndexes, vectorIndexes, stagedVectorIndexes, documentType } = definition.export();
                return {
                    tableName,
                    indexes,
                    stagedDbIndexes,
                    searchIndexes,
                    stagedSearchIndexes,
                    vectorIndexes,
                    stagedVectorIndexes,
                    documentType
                };
            }),
            schemaValidation: this.schemaValidation
        });
    }
    /**
   * @internal
   */ constructor(tables, options){
        __publicField(this, "tables");
        __publicField(this, "strictTableNameTypes");
        __publicField(this, "schemaValidation");
        this.tables = tables;
        this.schemaValidation = (options === null || options === void 0 ? void 0 : options.schemaValidation) === void 0 ? true : options.schemaValidation;
    }
}
function defineSchema(schema, options) {
    return new SchemaDefinition(schema, options);
}
const _systemSchema = defineSchema({
    _scheduled_functions: defineTable({
        name: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].string(),
        args: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].array(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].any()),
        scheduledTime: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].float64(),
        completedTime: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].float64()),
        state: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].union(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].object({
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].literal("pending")
        }), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].object({
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].literal("inProgress")
        }), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].object({
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].literal("success")
        }), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].object({
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].literal("failed"),
            error: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].string()
        }), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].object({
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].literal("canceled")
        }))
    }),
    _storage: defineTable({
        sha256: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].string(),
        size: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].float64(),
        contentType: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v"].string())
    })
}); //# sourceMappingURL=schema.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/database.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$registration_impl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/impl/registration_impl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$pagination$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/pagination.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$search_filter_builder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/search_filter_builder.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/storage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$cron$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/cron.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$router$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/router.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/components/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$schema$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/convex/dist/esm/server/schema.js [app-client] (ecmascript)"); //# sourceMappingURL=index.js.map
"use strict";
;
;
;
;
;
;
;
;
;
;
;
;
}),
]);

//# sourceMappingURL=32d02_convex_dist_esm_de24f20c._.js.map