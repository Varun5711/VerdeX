(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    function useSyncExternalStore$2(subscribe, getSnapshot) {
        didWarnOld18Alpha || void 0 === React.startTransition || (didWarnOld18Alpha = !0, console.error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
        var value = getSnapshot();
        if (!didWarnUncachedGetSnapshot) {
            var cachedValue = getSnapshot();
            objectIs(value, cachedValue) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), didWarnUncachedGetSnapshot = !0);
        }
        cachedValue = useState({
            inst: {
                value: value,
                getSnapshot: getSnapshot
            }
        });
        var inst = cachedValue[0].inst, forceUpdate = cachedValue[1];
        useLayoutEffect({
            "useSyncExternalStore$2.useLayoutEffect": function() {
                inst.value = value;
                inst.getSnapshot = getSnapshot;
                checkIfSnapshotChanged(inst) && forceUpdate({
                    inst: inst
                });
            }
        }["useSyncExternalStore$2.useLayoutEffect"], [
            subscribe,
            value,
            getSnapshot
        ]);
        useEffect({
            "useSyncExternalStore$2.useEffect": function() {
                checkIfSnapshotChanged(inst) && forceUpdate({
                    inst: inst
                });
                return subscribe({
                    "useSyncExternalStore$2.useEffect": function() {
                        checkIfSnapshotChanged(inst) && forceUpdate({
                            inst: inst
                        });
                    }
                }["useSyncExternalStore$2.useEffect"]);
            }
        }["useSyncExternalStore$2.useEffect"], [
            subscribe
        ]);
        useDebugValue(value);
        return value;
    }
    function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
            var nextValue = latestGetSnapshot();
            return !objectIs(inst, nextValue);
        } catch (error) {
            return !0;
        }
    }
    function useSyncExternalStore$1(subscribe, getSnapshot) {
        return getSnapshot();
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var React = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue, didWarnOld18Alpha = !1, didWarnUncachedGetSnapshot = !1, shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
    exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
}();
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/use-sync-external-store/shim/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/src/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js [app-client] (ecmascript)");
}
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/dequal/lite/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dequal",
    ()=>dequal
]);
var has = Object.prototype.hasOwnProperty;
function dequal(foo, bar) {
    var ctor, len;
    if (foo === bar) return true;
    if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
        if (ctor === Date) return foo.getTime() === bar.getTime();
        if (ctor === RegExp) return foo.toString() === bar.toString();
        if (ctor === Array) {
            if ((len = foo.length) === bar.length) {
                while(len-- && dequal(foo[len], bar[len]));
            }
            return len === -1;
        }
        if (!ctor || typeof foo === 'object') {
            len = 0;
            for(ctor in foo){
                if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
                if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
            }
            return Object.keys(bar).length === len;
        }
    }
    return foo !== foo && bar !== bar;
}
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/dequal/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dequal",
    ()=>dequal
]);
var has = Object.prototype.hasOwnProperty;
function find(iter, tar, key) {
    for (key of iter.keys()){
        if (dequal(key, tar)) return key;
    }
}
function dequal(foo, bar) {
    var ctor, len, tmp;
    if (foo === bar) return true;
    if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
        if (ctor === Date) return foo.getTime() === bar.getTime();
        if (ctor === RegExp) return foo.toString() === bar.toString();
        if (ctor === Array) {
            if ((len = foo.length) === bar.length) {
                while(len-- && dequal(foo[len], bar[len]));
            }
            return len === -1;
        }
        if (ctor === Set) {
            if (foo.size !== bar.size) {
                return false;
            }
            for (len of foo){
                tmp = len;
                if (tmp && typeof tmp === 'object') {
                    tmp = find(bar, tmp);
                    if (!tmp) return false;
                }
                if (!bar.has(tmp)) return false;
            }
            return true;
        }
        if (ctor === Map) {
            if (foo.size !== bar.size) {
                return false;
            }
            for (len of foo){
                tmp = len[0];
                if (tmp && typeof tmp === 'object') {
                    tmp = find(bar, tmp);
                    if (!tmp) return false;
                }
                if (!dequal(len[1], bar.get(tmp))) {
                    return false;
                }
            }
            return true;
        }
        if (ctor === ArrayBuffer) {
            foo = new Uint8Array(foo);
            bar = new Uint8Array(bar);
        } else if (ctor === DataView) {
            if ((len = foo.byteLength) === bar.byteLength) {
                while(len-- && foo.getInt8(len) === bar.getInt8(len));
            }
            return len === -1;
        }
        if (ArrayBuffer.isView(foo)) {
            if ((len = foo.byteLength) === bar.byteLength) {
                while(len-- && foo[len] === bar[len]);
            }
            return len === -1;
        }
        if (!ctor || typeof foo === 'object') {
            len = 0;
            for(ctor in foo){
                if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
                if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
            }
            return Object.keys(bar).length === len;
        }
    }
    return foo !== foo && bar !== bar;
}
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/controlComponents.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/clerk-react/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$GU2XVMYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/clerk-react/dist/chunk-GU2XVMYI.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$internal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/clerk-react/dist/internal.mjs [app-client] (ecmascript) <locals>");
"use client";
;
;
;
;
 //# sourceMappingURL=controlComponents.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/controlComponents.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthenticateWithRedirectCallback",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$GU2XVMYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthenticateWithRedirectCallback"],
    "ClerkDegraded",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$GU2XVMYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClerkDegraded"],
    "ClerkFailed",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$GU2XVMYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClerkFailed"],
    "ClerkLoaded",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$GU2XVMYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClerkLoaded"],
    "ClerkLoading",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$GU2XVMYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClerkLoading"],
    "MultisessionAppSupport",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$GU2XVMYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MultisessionAppSupport"],
    "Protect",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$GU2XVMYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Protect"],
    "RedirectToCreateOrganization",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$GU2XVMYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RedirectToCreateOrganization"],
    "RedirectToOrganizationProfile",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$GU2XVMYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RedirectToOrganizationProfile"],
    "RedirectToSignIn",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$GU2XVMYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RedirectToSignIn"],
    "RedirectToSignUp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$GU2XVMYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RedirectToSignUp"],
    "RedirectToTasks",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$GU2XVMYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RedirectToTasks"],
    "RedirectToUserProfile",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$GU2XVMYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RedirectToUserProfile"],
    "SignedIn",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$GU2XVMYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignedIn"],
    "SignedOut",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$GU2XVMYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignedOut"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$controlComponents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/controlComponents.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$GU2XVMYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/clerk-react/dist/chunk-GU2XVMYI.mjs [app-client] (ecmascript)");
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/hooks/usePagesRouter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePagesRouter",
    ()=>usePagesRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$compat$2f$router$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/compat/router.js [app-client] (ecmascript)");
;
;
const usePagesRouter = ()=>{
    return {
        pagesRouter: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$compat$2f$router$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])()
    };
};
;
 //# sourceMappingURL=usePagesRouter.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/hooks/useEnforceCatchAllRoute.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEnforceCatchAllRoute",
    ()=>useEnforceCatchAllRoute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/utils/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$7HPDNZ3R$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/chunk-7HPDNZ3R.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/react/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$hooks$2f$usePagesRouter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/hooks/usePagesRouter.js [app-client] (ecmascript)");
;
;
;
;
;
const useEnforceCatchAllRoute = function(component, path, routing) {
    let requireSessionBeforeCheck = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
    const ref = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(0);
    const { pagesRouter } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$hooks$2f$usePagesRouter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePagesRouter"])();
    const { session, isLoaded } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$7HPDNZ3R$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isProductionEnvironment"])()) {
        return;
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "useEnforceCatchAllRoute.useEffect": ()=>{
            if (!isLoaded || routing && routing !== "path") {
                return;
            }
            if (requireSessionBeforeCheck && !session) {
                return;
            }
            const ac = new AbortController();
            const error = {
                "useEnforceCatchAllRoute.useEffect.error": ()=>{
                    const correctPath = pagesRouter ? "".concat(path, "/[[...index]].tsx") : "".concat(path, "/[[...rest]]/page.tsx");
                    throw new Error("\nClerk: The <".concat(component, '/> component is not configured correctly. The most likely reasons for this error are:\n\n1. The "').concat(path, '" route is not a catch-all route.\nIt is recommended to convert this route to a catch-all route, eg: "').concat(correctPath, '". Alternatively, you can update the <').concat(component, '/> component to use hash-based routing by setting the "routing" prop to "hash".\n\n2. The <').concat(component, '/> component is mounted in a catch-all route, but all routes under "').concat(path, '" are protected by the middleware.\nTo resolve this, ensure that the middleware does not protect the catch-all route or any of its children. If you are using the "createRouteMatcher" helper, consider adding "(.*)" to the end of the route pattern, eg: "').concat(path, '(.*)". For more information, see: https://clerk.com/docs/references/nextjs/clerk-middleware#create-route-matcher\n'));
                }
            }["useEnforceCatchAllRoute.useEffect.error"];
            if (pagesRouter) {
                if (!pagesRouter.pathname.match(/\[\[\.\.\..+]]/)) {
                    error();
                }
            } else {
                const check = {
                    "useEnforceCatchAllRoute.useEffect.check": async ()=>{
                        ref.current++;
                        if (ref.current > 1) {
                            return;
                        }
                        let res;
                        try {
                            const url = "".concat(window.location.origin).concat(window.location.pathname, "/").concat(component, "_clerk_catchall_check_").concat(Date.now());
                            res = await fetch(url, {
                                signal: ac.signal
                            });
                        } catch (e) {}
                        if ((res == null ? void 0 : res.status) === 404) {
                            error();
                        }
                    }
                }["useEnforceCatchAllRoute.useEffect.check"];
                void check();
            }
            return ({
                "useEnforceCatchAllRoute.useEffect": ()=>{
                    if (ref.current > 1) {
                        ac.abort();
                    }
                }
            })["useEnforceCatchAllRoute.useEffect"];
        }
    }["useEnforceCatchAllRoute.useEffect"], [
        isLoaded
    ]);
};
;
 //# sourceMappingURL=useEnforceCatchAllRoute.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/hooks/usePathnameWithoutCatchAll.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePathnameWithoutCatchAll",
    ()=>usePathnameWithoutCatchAll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$hooks$2f$usePagesRouter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/hooks/usePagesRouter.js [app-client] (ecmascript)");
;
;
;
const usePathnameWithoutCatchAll = ()=>{
    const pathRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef();
    const { pagesRouter } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$hooks$2f$usePagesRouter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePagesRouter"])();
    if (pagesRouter) {
        if (pathRef.current) {
            return pathRef.current;
        } else {
            pathRef.current = pagesRouter.pathname.replace(/\/\[\[\.\.\..*/, "");
            return pathRef.current;
        }
    }
    const usePathname = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/navigation.js [app-client] (ecmascript)").usePathname;
    const useParams = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/navigation.js [app-client] (ecmascript)").useParams;
    const pathname = usePathname() || "";
    const pathParts = pathname.split("/").filter(Boolean);
    const catchAllParams = Object.values(useParams() || {}).filter((v)=>Array.isArray(v)).flat(Infinity);
    if (pathRef.current) {
        return pathRef.current;
    } else {
        pathRef.current = "/".concat(pathParts.slice(0, pathParts.length - catchAllParams.length).join("/"));
        return pathRef.current;
    }
};
;
 //# sourceMappingURL=usePathnameWithoutCatchAll.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/hooks/useEnforceRoutingProps.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEnforceCorrectRoutingProps",
    ()=>useEnforceCorrectRoutingProps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$internal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/clerk-react/dist/internal.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$hooks$2f$useEnforceCatchAllRoute$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/hooks/useEnforceCatchAllRoute.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$hooks$2f$usePathnameWithoutCatchAll$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/hooks/usePathnameWithoutCatchAll.js [app-client] (ecmascript)");
;
;
;
;
function useEnforceCorrectRoutingProps(componentName, props) {
    let requireSessionBeforeCheck = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$hooks$2f$usePathnameWithoutCatchAll$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathnameWithoutCatchAll"])();
    const routingProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$internal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useRoutingProps"])(componentName, props, {
        path
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$hooks$2f$useEnforceCatchAllRoute$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnforceCatchAllRoute"])(componentName, path, routingProps.routing, requireSessionBeforeCheck);
    return routingProps;
}
;
 //# sourceMappingURL=useEnforceRoutingProps.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/uiComponents.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OrganizationProfile",
    ()=>OrganizationProfile,
    "SignIn",
    ()=>SignIn,
    "SignUp",
    ()=>SignUp,
    "UserProfile",
    ()=>UserProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/clerk-react/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$3664V5SS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/clerk-react/dist/chunk-3664V5SS.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$hooks$2f$useEnforceRoutingProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/hooks/useEnforceRoutingProps.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const UserProfile = Object.assign((props)=>{
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$3664V5SS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserProfile"], {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$hooks$2f$useEnforceRoutingProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnforceCorrectRoutingProps"])("UserProfile", props)
    });
}, {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$3664V5SS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserProfile"]
});
const OrganizationProfile = Object.assign((props)=>{
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$3664V5SS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrganizationProfile"], {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$hooks$2f$useEnforceRoutingProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnforceCorrectRoutingProps"])("OrganizationProfile", props)
    });
}, {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$3664V5SS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrganizationProfile"]
});
const SignIn = (props)=>{
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$3664V5SS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignIn"], {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$hooks$2f$useEnforceRoutingProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnforceCorrectRoutingProps"])("SignIn", props, false)
    });
};
const SignUp = (props)=>{
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$3664V5SS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignUp"], {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$hooks$2f$useEnforceRoutingProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnforceCorrectRoutingProps"])("SignUp", props, false)
    });
};
;
 //# sourceMappingURL=uiComponents.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/uiComponents.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "APIKeys",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$3664V5SS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APIKeys"],
    "CreateOrganization",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$3664V5SS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CreateOrganization"],
    "GoogleOneTap",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$3664V5SS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleOneTap"],
    "OrganizationList",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$3664V5SS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrganizationList"],
    "OrganizationProfile",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$uiComponents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["OrganizationProfile"],
    "OrganizationSwitcher",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$3664V5SS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrganizationSwitcher"],
    "PricingTable",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$3664V5SS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PricingTable"],
    "SignIn",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$uiComponents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignIn"],
    "SignInButton",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignInButton"],
    "SignInWithMetamaskButton",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignInWithMetamaskButton"],
    "SignOutButton",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignOutButton"],
    "SignUp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$uiComponents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignUp"],
    "SignUpButton",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignUpButton"],
    "TaskChooseOrganization",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$3664V5SS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskChooseOrganization"],
    "UserButton",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$3664V5SS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserButton"],
    "UserProfile",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$uiComponents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UserProfile"],
    "Waitlist",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$3664V5SS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Waitlist"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$uiComponents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/uiComponents.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$3664V5SS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/clerk-react/dist/chunk-3664V5SS.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/clerk-react/dist/index.mjs [app-client] (ecmascript) <locals>");
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/PromisifiedAuthProvider.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PromisifiedAuthProvider",
    ()=>PromisifiedAuthProvider,
    "usePromisifiedAuth",
    ()=>usePromisifiedAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/clerk-react/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$KVSNHZPC$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/clerk-react/dist/chunk-KVSNHZPC.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$internal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/clerk-react/dist/internal.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$compat$2f$router$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/compat/router.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const PromisifiedAuthContext = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createContext(null);
function PromisifiedAuthProvider(param) {
    let { authPromise, children } = param;
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(PromisifiedAuthContext.Provider, {
        value: authPromise
    }, children);
}
function usePromisifiedAuth() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const isPagesRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$compat$2f$router$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const valueFromContext = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useContext(PromisifiedAuthContext);
    let resolvedData = valueFromContext;
    if (valueFromContext && "then" in valueFromContext) {
        resolvedData = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].use(valueFromContext);
    }
    if (typeof window === "undefined") {
        if (isPagesRouter) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$KVSNHZPC$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useAuth"])(options);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$KVSNHZPC$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useDerivedAuth"])({
            ...resolvedData,
            ...options
        });
    } else {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$KVSNHZPC$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useAuth"])({
            ...resolvedData,
            ...options
        });
    }
}
;
 //# sourceMappingURL=PromisifiedAuthProvider.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/hooks.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/clerk-react/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/react/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$KVSNHZPC$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/clerk-react/dist/chunk-KVSNHZPC.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/clerk-react/dist/errors.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$IQKZKT6G$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/chunk-IQKZKT6G.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$PromisifiedAuthProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/PromisifiedAuthProvider.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
 //# sourceMappingURL=hooks.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/hooks.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmailLinkErrorCode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$IQKZKT6G$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmailLinkErrorCode"],
    "EmailLinkErrorCodeStatus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$IQKZKT6G$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmailLinkErrorCodeStatus"],
    "isClerkAPIResponseError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$IQKZKT6G$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isClerkAPIResponseError"],
    "isClerkRuntimeError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$IQKZKT6G$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isClerkRuntimeError"],
    "isEmailLinkError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$IQKZKT6G$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmailLinkError"],
    "isKnownError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$IQKZKT6G$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isKnownError"],
    "isMetamaskError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$IQKZKT6G$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMetamaskError"],
    "isReverificationCancelledError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$IQKZKT6G$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isReverificationCancelledError"],
    "useAuth",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$PromisifiedAuthProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePromisifiedAuth"],
    "useClerk",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClerk"],
    "useEmailLink",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$KVSNHZPC$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEmailLink"],
    "useOrganization",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOrganization"],
    "useOrganizationList",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOrganizationList"],
    "useReverification",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReverification"],
    "useSession",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"],
    "useSessionList",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSessionList"],
    "useSignIn",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$KVSNHZPC$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useSignIn"],
    "useSignUp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$KVSNHZPC$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useSignUp"],
    "useUser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/hooks.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/react/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$KVSNHZPC$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/clerk-react/dist/chunk-KVSNHZPC.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$IQKZKT6G$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/chunk-IQKZKT6G.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$PromisifiedAuthProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/PromisifiedAuthProvider.js [app-client] (ecmascript)");
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/hooks/useSafeLayoutEffect.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSafeLayoutEffect",
    ()=>useSafeLayoutEffect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const useSafeLayoutEffect = typeof window !== "undefined" ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useLayoutEffect : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect;
;
 //# sourceMappingURL=useSafeLayoutEffect.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/NextOptionsContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClerkNextOptionsProvider",
    ()=>ClerkNextOptionsProvider,
    "useClerkNextOptions",
    ()=>useClerkNextOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const ClerkNextOptionsCtx = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createContext(void 0);
ClerkNextOptionsCtx.displayName = "ClerkNextOptionsCtx";
const useClerkNextOptions = ()=>{
    const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useContext(ClerkNextOptionsCtx);
    return ctx == null ? void 0 : ctx.value;
};
const ClerkNextOptionsProvider = (props)=>{
    const { children, options } = props;
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(ClerkNextOptionsCtx.Provider, {
        value: {
            value: options
        }
    }, children);
};
;
 //# sourceMappingURL=NextOptionsContext.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/utils/clerk-js-script.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClerkJSScript",
    ()=>ClerkJSScript
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/clerk-react/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/react/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$internal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/clerk-react/dist/internal.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$ZIFNY2NJ$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/chunk-ZIFNY2NJ.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/script.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$NextOptionsContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/NextOptionsContext.js [app-client] (ecmascript)");
;
;
;
;
;
;
function ClerkJSScript(props) {
    const { publishableKey, clerkJSUrl, clerkJSVersion, clerkJSVariant, nonce } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$NextOptionsContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClerkNextOptions"])();
    const { domain, proxyUrl } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClerk"])();
    if (!publishableKey) {
        return null;
    }
    const options = {
        domain,
        proxyUrl,
        publishableKey,
        clerkJSUrl,
        clerkJSVersion,
        clerkJSVariant,
        nonce
    };
    const scriptUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$ZIFNY2NJ$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clerkJsScriptUrl"])(options);
    const Script = props.router === "app" ? "script" : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(Script, {
        src: scriptUrl,
        "data-clerk-js-script": true,
        async: true,
        defer: props.router === "pages" ? false : void 0,
        crossOrigin: "anonymous",
        strategy: props.router === "pages" ? "beforeInteractive" : void 0,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$ZIFNY2NJ$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildClerkJsScriptAttributes"])(options)
    });
}
;
 //# sourceMappingURL=clerk-js-script.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/server/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_URL",
    ()=>API_URL,
    "API_VERSION",
    ()=>API_VERSION,
    "CLERK_JS_URL",
    ()=>CLERK_JS_URL,
    "CLERK_JS_VERSION",
    ()=>CLERK_JS_VERSION,
    "DOMAIN",
    ()=>DOMAIN,
    "ENCRYPTION_KEY",
    ()=>ENCRYPTION_KEY,
    "IS_SATELLITE",
    ()=>IS_SATELLITE,
    "KEYLESS_DISABLED",
    ()=>KEYLESS_DISABLED,
    "MACHINE_SECRET_KEY",
    ()=>MACHINE_SECRET_KEY,
    "PROXY_URL",
    ()=>PROXY_URL,
    "PUBLISHABLE_KEY",
    ()=>PUBLISHABLE_KEY,
    "SDK_METADATA",
    ()=>SDK_METADATA,
    "SECRET_KEY",
    ()=>SECRET_KEY,
    "SIGN_IN_URL",
    ()=>SIGN_IN_URL,
    "SIGN_UP_URL",
    ()=>SIGN_UP_URL,
    "TELEMETRY_DEBUG",
    ()=>TELEMETRY_DEBUG,
    "TELEMETRY_DISABLED",
    ()=>TELEMETRY_DISABLED
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$apiUrlFromPublishableKey$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/apiUrlFromPublishableKey.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$BLFJDBCF$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/chunk-BLFJDBCF.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$underscore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/underscore.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$GGFRMWFO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/chunk-GGFRMWFO.mjs [app-client] (ecmascript)");
;
;
;
const CLERK_JS_VERSION = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_JS_VERSION || "";
const CLERK_JS_URL = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_JS_URL || "";
const API_VERSION = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.CLERK_API_VERSION || "v1";
const SECRET_KEY = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.CLERK_SECRET_KEY || "";
const MACHINE_SECRET_KEY = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.CLERK_MACHINE_SECRET_KEY || "";
const PUBLISHABLE_KEY = ("TURBOPACK compile-time value", "pk_test_ZWxlY3RyaWMtY2F0LTgxLmNsZXJrLmFjY291bnRzLmRldiQ") || "";
const ENCRYPTION_KEY = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.CLERK_ENCRYPTION_KEY || "";
const API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.CLERK_API_URL || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$BLFJDBCF$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiUrlFromPublishableKey"])(PUBLISHABLE_KEY);
const DOMAIN = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_DOMAIN || "";
const PROXY_URL = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_PROXY_URL || "";
const IS_SATELLITE = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$GGFRMWFO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTruthy"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_IS_SATELLITE) || false;
const SIGN_IN_URL = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "";
const SIGN_UP_URL = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "";
const SDK_METADATA = {
    name: "@clerk/nextjs",
    version: "6.31.6",
    environment: ("TURBOPACK compile-time value", "development")
};
const TELEMETRY_DISABLED = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$GGFRMWFO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTruthy"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_TELEMETRY_DISABLED);
const TELEMETRY_DEBUG = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$GGFRMWFO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTruthy"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_TELEMETRY_DEBUG);
const KEYLESS_DISABLED = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$GGFRMWFO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTruthy"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_KEYLESS_DISABLED) || false;
;
 //# sourceMappingURL=constants.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/utils/sdk-versions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isNext13",
    ()=>isNext13,
    "isNextWithUnstableServerActions",
    ()=>isNextWithUnstableServerActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$package$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/package.json (json)");
;
;
const isNext13 = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$package$2e$json__$28$json$29$__["default"].version.startsWith("13.");
const isNextWithUnstableServerActions = isNext13 || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$package$2e$json__$28$json$29$__["default"].version.startsWith("14.0");
;
 //# sourceMappingURL=sdk-versions.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/utils/feature-flags.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "canUseKeyless",
    ()=>canUseKeyless
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/utils/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$7HPDNZ3R$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/chunk-7HPDNZ3R.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/server/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$sdk$2d$versions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/utils/sdk-versions.js [app-client] (ecmascript)");
;
;
;
;
const canUseKeyless = !__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$sdk$2d$versions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNextWithUnstableServerActions"] && // Next.js will inline the value of 'development' or 'production' on the client bundle, so this is client-safe.
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$7HPDNZ3R$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDevelopmentEnvironment"])() && !__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KEYLESS_DISABLED"];
;
 //# sourceMappingURL=feature-flags.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/utils/mergeNextClerkPropsWithEnv.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mergeNextClerkPropsWithEnv",
    ()=>mergeNextClerkPropsWithEnv
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$underscore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/underscore.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$GGFRMWFO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/chunk-GGFRMWFO.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/server/constants.js [app-client] (ecmascript)");
;
;
;
const mergeNextClerkPropsWithEnv = (props)=>{
    var _a;
    return {
        ...props,
        publishableKey: props.publishableKey || ("TURBOPACK compile-time value", "pk_test_ZWxlY3RyaWMtY2F0LTgxLmNsZXJrLmFjY291bnRzLmRldiQ") || "",
        clerkJSUrl: props.clerkJSUrl || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_JS_URL,
        clerkJSVersion: props.clerkJSVersion || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_JS_VERSION,
        proxyUrl: props.proxyUrl || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_PROXY_URL || "",
        domain: props.domain || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_DOMAIN || "",
        isSatellite: props.isSatellite || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$GGFRMWFO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTruthy"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_IS_SATELLITE),
        signInUrl: props.signInUrl || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "",
        signUpUrl: props.signUpUrl || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "",
        signInForceRedirectUrl: props.signInForceRedirectUrl || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL || "",
        signUpForceRedirectUrl: props.signUpForceRedirectUrl || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL || "",
        signInFallbackRedirectUrl: props.signInFallbackRedirectUrl || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL || "",
        signUpFallbackRedirectUrl: props.signUpFallbackRedirectUrl || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL || "",
        afterSignInUrl: props.afterSignInUrl || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || "",
        afterSignUpUrl: props.afterSignUpUrl || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || "",
        newSubscriptionRedirectUrl: props.newSubscriptionRedirectUrl || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_CHECKOUT_CONTINUE_URL || "",
        telemetry: (_a = props.telemetry) != null ? _a : {
            disabled: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$GGFRMWFO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTruthy"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_TELEMETRY_DISABLED),
            debug: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$GGFRMWFO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTruthy"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLERK_TELEMETRY_DEBUG)
        },
        sdkMetadata: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SDK_METADATA"]
    };
};
;
 //# sourceMappingURL=mergeNextClerkPropsWithEnv.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/utils/router-telemetry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RouterTelemetry",
    ()=>RouterTelemetry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$telemetry$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/telemetry.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$G3F72QR7$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/chunk-G3F72QR7.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/react/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$hooks$2f$usePagesRouter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/hooks/usePagesRouter.js [app-client] (ecmascript)");
;
;
;
;
const RouterTelemetry = ()=>{
    var _a, _b;
    const clerk = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClerk"])();
    const { pagesRouter } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$hooks$2f$usePagesRouter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePagesRouter"])();
    (_b = clerk.telemetry) == null ? void 0 : _b.record((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$G3F72QR7$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventFrameworkMetadata"])({
        router: pagesRouter ? "pages" : "app",
        ...((_a = globalThis == null ? void 0 : globalThis.next) == null ? void 0 : _a.version) ? {
            nextjsVersion: globalThis.next.version
        } : {}
    }));
    return null;
};
;
 //# sourceMappingURL=router-telemetry.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/app-router/data:c9c226 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"7fd1952db97486e1e995e3476e383b99687ed0733d":"detectKeylessEnvDriftAction"},"Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/app-router/keyless-actions.js",""] */ __turbopack_context__.s([
    "detectKeylessEnvDriftAction",
    ()=>detectKeylessEnvDriftAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var detectKeylessEnvDriftAction = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("7fd1952db97486e1e995e3476e383b99687ed0733d", __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "detectKeylessEnvDriftAction"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4va2V5bGVzcy1hY3Rpb25zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuaW1wb3J0IHsgY29va2llcywgaGVhZGVycyB9IGZyb20gXCJuZXh0L2hlYWRlcnNcIjtcbmltcG9ydCB7IHJlZGlyZWN0LCBSZWRpcmVjdFR5cGUgfSBmcm9tIFwibmV4dC9uYXZpZ2F0aW9uXCI7XG5pbXBvcnQgeyBlcnJvclRocm93ZXIgfSBmcm9tIFwiLi4vc2VydmVyL2Vycm9yVGhyb3dlclwiO1xuaW1wb3J0IHsgZGV0ZWN0Q2xlcmtNaWRkbGV3YXJlIH0gZnJvbSBcIi4uL3NlcnZlci9oZWFkZXJzLXV0aWxzXCI7XG5pbXBvcnQgeyBnZXRLZXlsZXNzQ29va2llTmFtZSwgZ2V0S2V5bGVzc0Nvb2tpZVZhbHVlIH0gZnJvbSBcIi4uL3NlcnZlci9rZXlsZXNzXCI7XG5pbXBvcnQgeyBjYW5Vc2VLZXlsZXNzIH0gZnJvbSBcIi4uL3V0aWxzL2ZlYXR1cmUtZmxhZ3NcIjtcbmNvbnN0IGtleWxlc3NDb29raWVDb25maWcgPSB7XG4gIHNlY3VyZTogZmFsc2UsXG4gIGh0dHBPbmx5OiBmYWxzZSxcbiAgc2FtZVNpdGU6IFwibGF4XCJcbn07XG5hc3luYyBmdW5jdGlvbiBzeW5jS2V5bGVzc0NvbmZpZ0FjdGlvbihhcmdzKSB7XG4gIGNvbnN0IHsgY2xhaW1VcmwsIHB1Ymxpc2hhYmxlS2V5LCBzZWNyZXRLZXksIHJldHVyblVybCB9ID0gYXJncztcbiAgY29uc3QgY29va2llU3RvcmUgPSBhd2FpdCBjb29raWVzKCk7XG4gIGNvbnN0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChcImh0dHBzOi8vcGxhY2Vob2xkZXIuY29tXCIsIHsgaGVhZGVyczogYXdhaXQgaGVhZGVycygpIH0pO1xuICBjb25zdCBrZXlsZXNzID0gYXdhaXQgZ2V0S2V5bGVzc0Nvb2tpZVZhbHVlKChuYW1lKSA9PiB7XG4gICAgdmFyIF9hO1xuICAgIHJldHVybiAoX2EgPSBjb29raWVTdG9yZS5nZXQobmFtZSkpID09IG51bGwgPyB2b2lkIDAgOiBfYS52YWx1ZTtcbiAgfSk7XG4gIGNvbnN0IHBrc01hdGNoID0gKGtleWxlc3MgPT0gbnVsbCA/IHZvaWQgMCA6IGtleWxlc3MucHVibGlzaGFibGVLZXkpID09PSBwdWJsaXNoYWJsZUtleTtcbiAgY29uc3Qgc2tzTWF0Y2ggPSAoa2V5bGVzcyA9PSBudWxsID8gdm9pZCAwIDoga2V5bGVzcy5zZWNyZXRLZXkpID09PSBzZWNyZXRLZXk7XG4gIGlmIChwa3NNYXRjaCAmJiBza3NNYXRjaCkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb29raWVTdG9yZS5zZXQoXG4gICAgYXdhaXQgZ2V0S2V5bGVzc0Nvb2tpZU5hbWUoKSxcbiAgICBKU09OLnN0cmluZ2lmeSh7IGNsYWltVXJsLCBwdWJsaXNoYWJsZUtleSwgc2VjcmV0S2V5IH0pLFxuICAgIGtleWxlc3NDb29raWVDb25maWdcbiAgKTtcbiAgaWYgKGRldGVjdENsZXJrTWlkZGxld2FyZShyZXF1ZXN0KSkge1xuICAgIHJlZGlyZWN0KGAvY2xlcmstc3luYy1rZXlsZXNzP3JldHVyblVybD0ke3JldHVyblVybH1gLCBSZWRpcmVjdFR5cGUucmVwbGFjZSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHJldHVybjtcbn1cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZU9yUmVhZEtleWxlc3NBY3Rpb24oKSB7XG4gIGlmICghY2FuVXNlS2V5bGVzcykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGltcG9ydChcIi4uL3NlcnZlci9rZXlsZXNzLW5vZGUuanNcIikudGhlbigobSkgPT4gbS5jcmVhdGVPclJlYWRLZXlsZXNzKCkpLmNhdGNoKCgpID0+IG51bGwpO1xuICBpZiAoIXJlc3VsdCkge1xuICAgIGVycm9yVGhyb3dlci50aHJvd01pc3NpbmdQdWJsaXNoYWJsZUtleUVycm9yKCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgY29uc3QgeyBjbGVya0RldmVsb3BtZW50Q2FjaGUsIGNyZWF0ZUtleWxlc3NNb2RlTWVzc2FnZSB9ID0gYXdhaXQgaW1wb3J0KFwiLi4vc2VydmVyL2tleWxlc3MtbG9nLWNhY2hlLmpzXCIpO1xuICBjbGVya0RldmVsb3BtZW50Q2FjaGUgPT0gbnVsbCA/IHZvaWQgMCA6IGNsZXJrRGV2ZWxvcG1lbnRDYWNoZS5sb2coe1xuICAgIGNhY2hlS2V5OiByZXN1bHQucHVibGlzaGFibGVLZXksXG4gICAgbXNnOiBjcmVhdGVLZXlsZXNzTW9kZU1lc3NhZ2UocmVzdWx0KVxuICB9KTtcbiAgY29uc3QgeyBjbGFpbVVybCwgcHVibGlzaGFibGVLZXksIHNlY3JldEtleSwgYXBpS2V5c1VybCB9ID0gcmVzdWx0O1xuICB2b2lkIChhd2FpdCBjb29raWVzKCkpLnNldChcbiAgICBhd2FpdCBnZXRLZXlsZXNzQ29va2llTmFtZSgpLFxuICAgIEpTT04uc3RyaW5naWZ5KHsgY2xhaW1VcmwsIHB1Ymxpc2hhYmxlS2V5LCBzZWNyZXRLZXkgfSksXG4gICAga2V5bGVzc0Nvb2tpZUNvbmZpZ1xuICApO1xuICByZXR1cm4ge1xuICAgIGNsYWltVXJsLFxuICAgIHB1Ymxpc2hhYmxlS2V5LFxuICAgIGFwaUtleXNVcmxcbiAgfTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUtleWxlc3NBY3Rpb24oKSB7XG4gIGlmICghY2FuVXNlS2V5bGVzcykge1xuICAgIHJldHVybjtcbiAgfVxuICBhd2FpdCBpbXBvcnQoXCIuLi9zZXJ2ZXIva2V5bGVzcy1ub2RlLmpzXCIpLnRoZW4oKG0pID0+IG0ucmVtb3ZlS2V5bGVzcygpKS5jYXRjaCgoKSA9PiB7XG4gIH0pO1xuICByZXR1cm47XG59XG5hc3luYyBmdW5jdGlvbiBkZXRlY3RLZXlsZXNzRW52RHJpZnRBY3Rpb24oKSB7XG4gIGlmICghY2FuVXNlS2V5bGVzcykge1xuICAgIHJldHVybjtcbiAgfVxuICB0cnkge1xuICAgIGNvbnN0IHsgZGV0ZWN0S2V5bGVzc0VudkRyaWZ0IH0gPSBhd2FpdCBpbXBvcnQoXCIuLi9zZXJ2ZXIva2V5bGVzcy10ZWxlbWV0cnkuanNcIik7XG4gICAgYXdhaXQgZGV0ZWN0S2V5bGVzc0VudkRyaWZ0KCk7XG4gIH0gY2F0Y2gge1xuICB9XG59XG5leHBvcnQge1xuICBjcmVhdGVPclJlYWRLZXlsZXNzQWN0aW9uLFxuICBkZWxldGVLZXlsZXNzQWN0aW9uLFxuICBkZXRlY3RLZXlsZXNzRW52RHJpZnRBY3Rpb24sXG4gIHN5bmNLZXlsZXNzQ29uZmlnQWN0aW9uXG59O1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJnWEFtRkUifQ==
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/app-router/data:59e68b [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"7f70e3749a5a9c3c3b5a5298d7a1fce4f0a1dfa768":"invalidateCacheAction"},"Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/app-router/server-actions.js",""] */ __turbopack_context__.s([
    "invalidateCacheAction",
    ()=>invalidateCacheAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var invalidateCacheAction = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("7f70e3749a5a9c3c3b5a5298d7a1fce4f0a1dfa768", __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "invalidateCacheAction"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vc2VydmVyLWFjdGlvbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc2VydmVyXCI7XG5pbXBvcnQgeyBjb29raWVzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuYXN5bmMgZnVuY3Rpb24gaW52YWxpZGF0ZUNhY2hlQWN0aW9uKCkge1xuICB2b2lkIChhd2FpdCBjb29raWVzKCkpLmRlbGV0ZShgX19jbGVya19pbnZhbGlkYXRlX2NhY2hlX2Nvb2tpZV8ke0RhdGUubm93KCl9YCk7XG59XG5leHBvcnQge1xuICBpbnZhbGlkYXRlQ2FjaGVBY3Rpb25cbn07XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InlXQU1FIn0=
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/utils/removeBasePath.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "removeBasePath",
    ()=>removeBasePath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
;
function removeBasePath(to) {
    let destination = to;
    const basePath = ("TURBOPACK compile-time value", "");
    if (basePath && destination.startsWith(basePath)) //TURBOPACK unreachable
    ;
    return destination;
}
;
 //# sourceMappingURL=removeBasePath.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/app-router/client/useInternalNavFun.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useInternalNavFun",
    ()=>useInternalNavFun
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$removeBasePath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/utils/removeBasePath.js [app-client] (ecmascript)");
;
;
;
;
const getClerkNavigationObject = (name)=>{
    var _a, _b, _c;
    (_a = window.__clerk_internal_navigations) != null ? _a : window.__clerk_internal_navigations = {};
    (_c = (_b = window.__clerk_internal_navigations)[name]) != null ? _c : _b[name] = {};
    return window.__clerk_internal_navigations[name];
};
const useInternalNavFun = (props)=>{
    const { windowNav, routerNav, name } = props;
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    if (windowNav) {
        getClerkNavigationObject(name).fun = (to, opts)=>{
            return new Promise((res)=>{
                var _a, _b, _c;
                (_b = (_a = getClerkNavigationObject(name)).promisesBuffer) != null ? _b : _a.promisesBuffer = [];
                (_c = getClerkNavigationObject(name).promisesBuffer) == null ? void 0 : _c.push(res);
                startTransition(()=>{
                    var _a2, _b2, _c2;
                    if (((_a2 = opts == null ? void 0 : opts.__internal_metadata) == null ? void 0 : _a2.navigationType) === "internal") {
                        const state = ((_c2 = (_b2 = window.next) == null ? void 0 : _b2.version) != null ? _c2 : "") < "14.1.0" ? history.state : null;
                        windowNav(state, "", to);
                    } else {
                        routerNav((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$removeBasePath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeBasePath"])(to));
                    }
                });
            });
        };
    }
    const flushPromises = ()=>{
        var _a;
        (_a = getClerkNavigationObject(name).promisesBuffer) == null ? void 0 : _a.forEach((resolve)=>resolve());
        getClerkNavigationObject(name).promisesBuffer = [];
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useInternalNavFun.useEffect": ()=>{
            flushPromises();
            return flushPromises;
        }
    }["useInternalNavFun.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useInternalNavFun.useEffect": ()=>{
            if (!isPending) {
                flushPromises();
            }
        }
    }["useInternalNavFun.useEffect"], [
        pathname,
        isPending
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useInternalNavFun.useCallback": (to, metadata)=>{
            return getClerkNavigationObject(name).fun(to, metadata);
        }
    }["useInternalNavFun.useCallback"], []);
};
;
 //# sourceMappingURL=useInternalNavFun.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/app-router/client/useAwaitablePush.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAwaitablePush",
    ()=>useAwaitablePush
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$client$2f$useInternalNavFun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/app-router/client/useInternalNavFun.js [app-client] (ecmascript)");
"use client";
;
;
;
const useAwaitablePush = ()=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$client$2f$useInternalNavFun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInternalNavFun"])({
        windowNav: typeof window !== "undefined" ? window.history.pushState.bind(window.history) : void 0,
        routerNav: router.push.bind(router),
        name: "push"
    });
};
;
 //# sourceMappingURL=useAwaitablePush.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/app-router/client/useAwaitableReplace.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAwaitableReplace",
    ()=>useAwaitableReplace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$client$2f$useInternalNavFun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/app-router/client/useInternalNavFun.js [app-client] (ecmascript)");
"use client";
;
;
;
const useAwaitableReplace = ()=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$client$2f$useInternalNavFun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInternalNavFun"])({
        windowNav: typeof window !== "undefined" ? window.history.replaceState.bind(window.history) : void 0,
        routerNav: router.replace.bind(router),
        name: "replace"
    });
};
;
 //# sourceMappingURL=useAwaitableReplace.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/app-router/client/ClerkProvider.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientClerkProvider",
    ()=>ClientClerkProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/clerk-react/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/browser.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$JKSAJ6AV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/chunk-JKSAJ6AV.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$logger$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/logger.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$CYDR2ZSA$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/shared/dist/chunk-CYDR2ZSA.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$package$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/package.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$hooks$2f$useSafeLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/hooks/useSafeLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$NextOptionsContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/client-boundary/NextOptionsContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$clerk$2d$js$2d$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/utils/clerk-js-script.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$feature$2d$flags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/utils/feature-flags.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$mergeNextClerkPropsWithEnv$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/utils/mergeNextClerkPropsWithEnv.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$router$2d$telemetry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/utils/router-telemetry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$sdk$2d$versions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/utils/sdk-versions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$data$3a$c9c226__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/app-router/data:c9c226 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$data$3a$59e68b__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/app-router/data:59e68b [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$client$2f$useAwaitablePush$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/app-router/client/useAwaitablePush.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$client$2f$useAwaitableReplace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/app-router/client/useAwaitableReplace.js [app-client] (ecmascript)");
"use client";
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
;
;
;
;
;
;
;
const LazyCreateKeylessApplication = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/app-router/client/keyless-creator-reader.js [app-client] (ecmascript, async loader)").then((m)=>m.KeylessCreatorOrReader));
const NextClientClerkProvider = (props)=>{
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$sdk$2d$versions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNextWithUnstableServerActions"]) {
        const deprecationWarning = "Clerk:\nYour current Next.js version (".concat(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$package$2e$json__$28$json$29$__["default"].version, ') will be deprecated in the next major release of "@clerk/nextjs". Please upgrade to next@14.1.0 or later.');
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$JKSAJ6AV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inBrowser"])()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$CYDR2ZSA$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].warnOnce(deprecationWarning);
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$chunk$2d$CYDR2ZSA$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].logOnce("\n\x1b[43m----------\n".concat(deprecationWarning, "\n----------\x1b[0m\n"));
        }
    }
    const { __unstable_invokeMiddlewareOnAuthStateChange = true, children } = props;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const push = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$client$2f$useAwaitablePush$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAwaitablePush"])();
    const replace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$client$2f$useAwaitableReplace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAwaitableReplace"])();
    const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$hooks$2f$useSafeLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSafeLayoutEffect"])({
        "NextClientClerkProvider.useSafeLayoutEffect": ()=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$feature$2d$flags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canUseKeyless"]) {
                void (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$data$3a$c9c226__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["detectKeylessEnvDriftAction"])();
            }
        }
    }["NextClientClerkProvider.useSafeLayoutEffect"], []);
    const isNested = Boolean((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$NextOptionsContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClerkNextOptions"])());
    if (isNested) {
        return props.children;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NextClientClerkProvider.useEffect": ()=>{
            var _a;
            if (!isPending) {
                (_a = window.__clerk_internal_invalidateCachePromise) == null ? void 0 : _a.call(window);
            }
        }
    }["NextClientClerkProvider.useEffect"], [
        isPending
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$hooks$2f$useSafeLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSafeLayoutEffect"])({
        "NextClientClerkProvider.useSafeLayoutEffect": ()=>{
            window.__unstable__onBeforeSetActive = ({
                "NextClientClerkProvider.useSafeLayoutEffect": (intent)=>{
                    return new Promise({
                        "NextClientClerkProvider.useSafeLayoutEffect": (resolve)=>{
                            var _a;
                            window.__clerk_internal_invalidateCachePromise = resolve;
                            const nextVersion = ((_a = window == null ? void 0 : window.next) == null ? void 0 : _a.version) || "";
                            if (nextVersion.startsWith("13")) {
                                startTransition({
                                    "NextClientClerkProvider.useSafeLayoutEffect": ()=>{
                                        router.refresh();
                                    }
                                }["NextClientClerkProvider.useSafeLayoutEffect"]);
                            } else if (nextVersion.startsWith("15") && intent === "sign-out") {
                                resolve();
                            } else {
                                void (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$data$3a$59e68b__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["invalidateCacheAction"])().then({
                                    "NextClientClerkProvider.useSafeLayoutEffect": ()=>resolve()
                                }["NextClientClerkProvider.useSafeLayoutEffect"]);
                            }
                        }
                    }["NextClientClerkProvider.useSafeLayoutEffect"]);
                }
            })["NextClientClerkProvider.useSafeLayoutEffect"];
            window.__unstable__onAfterSetActive = ({
                "NextClientClerkProvider.useSafeLayoutEffect": ()=>{
                    if (__unstable_invokeMiddlewareOnAuthStateChange) {
                        return router.refresh();
                    }
                }
            })["NextClientClerkProvider.useSafeLayoutEffect"];
        }
    }["NextClientClerkProvider.useSafeLayoutEffect"], []);
    const mergedProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$mergeNextClerkPropsWithEnv$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeNextClerkPropsWithEnv"])({
        ...props,
        // @ts-expect-error Error because of the stricter types of internal `push`
        routerPush: push,
        // @ts-expect-error Error because of the stricter types of internal `replace`
        routerReplace: replace
    });
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$NextOptionsContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClerkNextOptionsProvider"], {
        options: mergedProps
    }, /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ClerkProvider"], {
        ...mergedProps
    }, /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$router$2d$telemetry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterTelemetry"], null), /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$clerk$2d$js$2d$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClerkJSScript"], {
        router: "app"
    }), children));
};
const ClientClerkProvider = (props)=>{
    const { children, disableKeyless = false, ...rest } = props;
    const safePublishableKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$mergeNextClerkPropsWithEnv$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeNextClerkPropsWithEnv"])(rest).publishableKey;
    if (safePublishableKey || !__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$feature$2d$flags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canUseKeyless"] || disableKeyless) {
        return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(NextClientClerkProvider, {
            ...rest
        }, children);
    }
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(LazyCreateKeylessApplication, null, /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(NextClientClerkProvider, {
        ...rest
    }, children));
};
;
 //# sourceMappingURL=ClerkProvider.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/app-router/client/keyless-cookie-sync.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KeylessCookieSync",
    ()=>KeylessCookieSync
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$feature$2d$flags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/utils/feature-flags.js [app-client] (ecmascript)");
"use client";
;
;
;
;
function KeylessCookieSync(props) {
    var _a;
    const segments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelectedLayoutSegments"])();
    const isNotFoundRoute = ((_a = segments[0]) == null ? void 0 : _a.startsWith("/_not-found")) || false;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "KeylessCookieSync.useEffect": ()=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$utils$2f$feature$2d$flags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canUseKeyless"] && !isNotFoundRoute) {
                void __turbopack_context__.A("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@clerk/nextjs/dist/esm/app-router/keyless-actions.js [app-client] (ecmascript, async loader)").then({
                    "KeylessCookieSync.useEffect": (m)=>m.syncKeylessConfigAction({
                            ...props,
                            // Preserve the current url and return back, once keys are synced in the middleware
                            returnUrl: window.location.href
                        })
                }["KeylessCookieSync.useEffect"]);
            }
        }
    }["KeylessCookieSync.useEffect"], [
        isNotFoundRoute
    ]);
    return props.children;
}
;
 //# sourceMappingURL=keyless-cookie-sync.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/shared/lib/router-context.shared-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RouterContext", {
    enumerable: true,
    get: function() {
        return RouterContext;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const RouterContext = _react.default.createContext(null);
if ("TURBOPACK compile-time truthy", 1) {
    RouterContext.displayName = 'RouterContext';
} //# sourceMappingURL=router-context.shared-runtime.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/client/compat/router.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useRouter", {
    enumerable: true,
    get: function() {
        return useRouter;
    }
});
const _react = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
const _routercontextsharedruntime = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/shared/lib/router-context.shared-runtime.js [app-client] (ecmascript)");
function useRouter() {
    return (0, _react.useContext)(_routercontextsharedruntime.RouterContext);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=router.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/next/compat/router.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/client/compat/router.js [app-client] (ecmascript)");
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/shared/lib/lazy-dynamic/dynamic-bailout-to-csr.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BailoutToCSR", {
    enumerable: true,
    get: function() {
        return BailoutToCSR;
    }
});
const _bailouttocsr = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-client] (ecmascript)");
function BailoutToCSR(param) {
    let { reason, children } = param;
    if (typeof window === 'undefined') {
        throw Object.defineProperty(new _bailouttocsr.BailoutToCSRError(reason), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    return children;
} //# sourceMappingURL=dynamic-bailout-to-csr.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/shared/lib/encode-uri-path.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "encodeURIPath", {
    enumerable: true,
    get: function() {
        return encodeURIPath;
    }
});
function encodeURIPath(file) {
    return file.split('/').map((p)=>encodeURIComponent(p)).join('/');
} //# sourceMappingURL=encode-uri-path.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/shared/lib/lazy-dynamic/preload-chunks.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PreloadChunks", {
    enumerable: true,
    get: function() {
        return PreloadChunks;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _reactdom = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
const _workasyncstorageexternal = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/server/app-render/work-async-storage.external.js [app-client] (ecmascript)");
const _encodeuripath = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/shared/lib/encode-uri-path.js [app-client] (ecmascript)");
function PreloadChunks(param) {
    let { moduleIds } = param;
    // Early return in client compilation and only load requestStore on server side
    if (typeof window !== 'undefined') {
        return null;
    }
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (workStore === undefined) {
        return null;
    }
    const allFiles = [];
    // Search the current dynamic call unique key id in react loadable manifest,
    // and find the corresponding CSS files to preload
    if (workStore.reactLoadableManifest && moduleIds) {
        const manifest = workStore.reactLoadableManifest;
        for (const key of moduleIds){
            if (!manifest[key]) continue;
            const chunks = manifest[key].files;
            allFiles.push(...chunks);
        }
    }
    if (allFiles.length === 0) {
        return null;
    }
    const dplId = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : '';
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: allFiles.map((chunk)=>{
            const href = workStore.assetPrefix + "/_next/" + (0, _encodeuripath.encodeURIPath)(chunk) + dplId;
            const isCss = chunk.endsWith('.css');
            // If it's stylesheet we use `precedence` o help hoist with React Float.
            // For stylesheets we actually need to render the CSS because nothing else is going to do it so it needs to be part of the component tree.
            // The `preload` for stylesheet is not optional.
            if (isCss) {
                return /*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                    // @ts-ignore
                    precedence: "dynamic",
                    href: href,
                    rel: "stylesheet",
                    as: "style"
                }, chunk);
            } else {
                // If it's script we use ReactDOM.preload to preload the resources
                (0, _reactdom.preload)(href, {
                    as: 'script',
                    fetchPriority: 'low'
                });
                return null;
            }
        })
    });
} //# sourceMappingURL=preload-chunks.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/shared/lib/lazy-dynamic/loadable.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
const _dynamicbailouttocsr = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/shared/lib/lazy-dynamic/dynamic-bailout-to-csr.js [app-client] (ecmascript)");
const _preloadchunks = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/shared/lib/lazy-dynamic/preload-chunks.js [app-client] (ecmascript)");
// Normalize loader to return the module as form { default: Component } for `React.lazy`.
// Also for backward compatible since next/dynamic allows to resolve a component directly with loader
// Client component reference proxy need to be converted to a module.
function convertModule(mod) {
    // Check "default" prop before accessing it, as it could be client reference proxy that could break it reference.
    // Cases:
    // mod: { default: Component }
    // mod: Component
    // mod: { default: proxy(Component) }
    // mod: proxy(Component)
    const hasDefault = mod && 'default' in mod;
    return {
        default: hasDefault ? mod.default : mod
    };
}
const defaultOptions = {
    loader: ()=>Promise.resolve(convertModule(()=>null)),
    loading: null,
    ssr: true
};
function Loadable(options) {
    const opts = {
        ...defaultOptions,
        ...options
    };
    const Lazy = /*#__PURE__*/ (0, _react.lazy)(()=>opts.loader().then(convertModule));
    const Loading = opts.loading;
    function LoadableComponent(props) {
        const fallbackElement = Loading ? /*#__PURE__*/ (0, _jsxruntime.jsx)(Loading, {
            isLoading: true,
            pastDelay: true,
            error: null
        }) : null;
        // If it's non-SSR or provided a loading component, wrap it in a suspense boundary
        const hasSuspenseBoundary = !opts.ssr || !!opts.loading;
        const Wrap = hasSuspenseBoundary ? _react.Suspense : _react.Fragment;
        const wrapProps = hasSuspenseBoundary ? {
            fallback: fallbackElement
        } : {};
        const children = opts.ssr ? /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
            children: [
                typeof window === 'undefined' ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_preloadchunks.PreloadChunks, {
                    moduleIds: opts.modules
                }) : null,
                /*#__PURE__*/ (0, _jsxruntime.jsx)(Lazy, {
                    ...props
                })
            ]
        }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_dynamicbailouttocsr.BailoutToCSR, {
            reason: "next/dynamic",
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(Lazy, {
                ...props
            })
        });
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(Wrap, {
            ...wrapProps,
            children: children
        });
    }
    LoadableComponent.displayName = 'LoadableComponent';
    return LoadableComponent;
}
const _default = Loadable; //# sourceMappingURL=loadable.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return dynamic;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _loadable = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/shared/lib/lazy-dynamic/loadable.js [app-client] (ecmascript)"));
function dynamic(dynamicOptions, options) {
    var _mergedOptions_loadableGenerated;
    const loadableOptions = {};
    if (typeof dynamicOptions === 'function') {
        loadableOptions.loader = dynamicOptions;
    }
    const mergedOptions = {
        ...loadableOptions,
        ...options
    };
    return (0, _loadable.default)({
        ...mergedOptions,
        modules: (_mergedOptions_loadableGenerated = mergedOptions.loadableGenerated) == null ? void 0 : _mergedOptions_loadableGenerated.modules
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-dynamic.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/next/package.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"name\":\"next\",\"version\":\"15.5.2\",\"description\":\"The React Framework\",\"main\":\"./dist/server/next.js\",\"license\":\"MIT\",\"repository\":\"vercel/next.js\",\"bugs\":\"https://github.com/vercel/next.js/issues\",\"homepage\":\"https://nextjs.org\",\"types\":\"index.d.ts\",\"files\":[\"dist\",\"app.js\",\"app.d.ts\",\"babel.js\",\"babel.d.ts\",\"client.js\",\"client.d.ts\",\"compat\",\"cache.js\",\"cache.d.ts\",\"config.js\",\"config.d.ts\",\"constants.js\",\"constants.d.ts\",\"document.js\",\"document.d.ts\",\"dynamic.js\",\"dynamic.d.ts\",\"error.js\",\"error.d.ts\",\"future\",\"legacy\",\"script.js\",\"script.d.ts\",\"server.js\",\"server.d.ts\",\"head.js\",\"head.d.ts\",\"image.js\",\"image.d.ts\",\"link.js\",\"link.d.ts\",\"form.js\",\"form.d.ts\",\"router.js\",\"router.d.ts\",\"jest.js\",\"jest.d.ts\",\"amp.js\",\"amp.d.ts\",\"og.js\",\"og.d.ts\",\"root-params.js\",\"root-params.d.ts\",\"types.d.ts\",\"types.js\",\"index.d.ts\",\"types/global.d.ts\",\"types/compiled.d.ts\",\"image-types/global.d.ts\",\"navigation-types/navigation.d.ts\",\"navigation-types/compat/navigation.d.ts\",\"font\",\"navigation.js\",\"navigation.d.ts\",\"headers.js\",\"headers.d.ts\",\"navigation-types\",\"web-vitals.js\",\"web-vitals.d.ts\",\"experimental/testing/server.js\",\"experimental/testing/server.d.ts\",\"experimental/testmode/playwright.js\",\"experimental/testmode/playwright.d.ts\",\"experimental/testmode/playwright/msw.js\",\"experimental/testmode/playwright/msw.d.ts\",\"experimental/testmode/proxy.js\",\"experimental/testmode/proxy.d.ts\"],\"bin\":{\"next\":\"./dist/bin/next\"},\"scripts\":{\"dev\":\"cross-env NEXT_SERVER_NO_MANGLE=1 taskr\",\"release\":\"taskr release\",\"build\":\"pnpm release\",\"prepublishOnly\":\"cd ../../ && turbo run build\",\"types\":\"tsc --project tsconfig.build.json --declaration --emitDeclarationOnly --stripInternal --declarationDir dist\",\"typescript\":\"tsec --noEmit\",\"ncc-compiled\":\"taskr ncc\",\"storybook\":\"BROWSER=none storybook dev -p 6006\",\"build-storybook\":\"storybook build\",\"test-storybook\":\"test-storybook\"},\"taskr\":{\"requires\":[\"./taskfile-webpack.js\",\"./taskfile-ncc.js\",\"./taskfile-swc.js\",\"./taskfile-watch.js\"]},\"dependencies\":{\"@next/env\":\"15.5.2\",\"@swc/helpers\":\"0.5.15\",\"caniuse-lite\":\"^1.0.30001579\",\"postcss\":\"8.4.31\",\"styled-jsx\":\"5.1.6\"},\"peerDependencies\":{\"@opentelemetry/api\":\"^1.1.0\",\"@playwright/test\":\"^1.51.1\",\"babel-plugin-react-compiler\":\"*\",\"react\":\"^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0\",\"react-dom\":\"^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0\",\"sass\":\"^1.3.0\"},\"peerDependenciesMeta\":{\"babel-plugin-react-compiler\":{\"optional\":true},\"sass\":{\"optional\":true},\"@opentelemetry/api\":{\"optional\":true},\"@playwright/test\":{\"optional\":true}},\"optionalDependencies\":{\"sharp\":\"^0.34.3\",\"@next/swc-darwin-arm64\":\"15.5.2\",\"@next/swc-darwin-x64\":\"15.5.2\",\"@next/swc-linux-arm64-gnu\":\"15.5.2\",\"@next/swc-linux-arm64-musl\":\"15.5.2\",\"@next/swc-linux-x64-gnu\":\"15.5.2\",\"@next/swc-linux-x64-musl\":\"15.5.2\",\"@next/swc-win32-arm64-msvc\":\"15.5.2\",\"@next/swc-win32-x64-msvc\":\"15.5.2\"},\"devDependencies\":{\"@ampproject/toolbox-optimizer\":\"2.8.3\",\"@babel/code-frame\":\"7.26.2\",\"@babel/core\":\"7.26.10\",\"@babel/eslint-parser\":\"7.24.6\",\"@babel/generator\":\"7.27.0\",\"@babel/plugin-syntax-bigint\":\"7.8.3\",\"@babel/plugin-syntax-dynamic-import\":\"7.8.3\",\"@babel/plugin-syntax-import-attributes\":\"7.26.0\",\"@babel/plugin-syntax-jsx\":\"7.25.9\",\"@babel/plugin-syntax-typescript\":\"7.25.4\",\"@babel/plugin-transform-class-properties\":\"7.25.9\",\"@babel/plugin-transform-export-namespace-from\":\"7.25.9\",\"@babel/plugin-transform-modules-commonjs\":\"7.26.3\",\"@babel/plugin-transform-numeric-separator\":\"7.25.9\",\"@babel/plugin-transform-object-rest-spread\":\"7.25.9\",\"@babel/plugin-transform-runtime\":\"7.26.10\",\"@babel/preset-env\":\"7.26.9\",\"@babel/preset-react\":\"7.26.3\",\"@babel/preset-typescript\":\"7.27.0\",\"@babel/runtime\":\"7.27.0\",\"@babel/traverse\":\"7.27.0\",\"@babel/types\":\"7.27.0\",\"@base-ui-components/react\":\"1.0.0-beta.2\",\"@capsizecss/metrics\":\"3.4.0\",\"@edge-runtime/cookies\":\"6.0.0\",\"@edge-runtime/ponyfill\":\"4.0.0\",\"@edge-runtime/primitives\":\"6.0.0\",\"@hapi/accept\":\"5.0.2\",\"@jest/transform\":\"29.5.0\",\"@jest/types\":\"29.5.0\",\"@mswjs/interceptors\":\"0.23.0\",\"@napi-rs/triples\":\"1.2.0\",\"@next/font\":\"15.5.2\",\"@next/polyfill-module\":\"15.5.2\",\"@next/polyfill-nomodule\":\"15.5.2\",\"@next/react-refresh-utils\":\"15.5.2\",\"@next/swc\":\"15.5.2\",\"@opentelemetry/api\":\"1.6.0\",\"@playwright/test\":\"1.51.1\",\"@rspack/core\":\"1.4.5\",\"@storybook/addon-a11y\":\"8.6.0\",\"@storybook/addon-essentials\":\"8.6.0\",\"@storybook/addon-interactions\":\"8.6.0\",\"@storybook/addon-webpack5-compiler-swc\":\"3.0.0\",\"@storybook/blocks\":\"8.6.0\",\"@storybook/react\":\"8.6.0\",\"@storybook/react-webpack5\":\"8.6.0\",\"@storybook/test\":\"8.6.0\",\"@storybook/test-runner\":\"0.21.0\",\"@swc/core\":\"1.11.24\",\"@swc/types\":\"0.1.7\",\"@taskr/clear\":\"1.1.0\",\"@taskr/esnext\":\"1.1.0\",\"@types/amphtml-validator\":\"1.0.0\",\"@types/babel__code-frame\":\"7.0.6\",\"@types/babel__core\":\"7.20.5\",\"@types/babel__generator\":\"7.27.0\",\"@types/babel__template\":\"7.4.4\",\"@types/babel__traverse\":\"7.20.7\",\"@types/bytes\":\"3.1.1\",\"@types/ci-info\":\"2.0.0\",\"@types/compression\":\"0.0.36\",\"@types/content-disposition\":\"0.5.4\",\"@types/content-type\":\"1.1.3\",\"@types/cookie\":\"0.3.3\",\"@types/cross-spawn\":\"6.0.0\",\"@types/debug\":\"4.1.5\",\"@types/express-serve-static-core\":\"4.17.33\",\"@types/fresh\":\"0.5.0\",\"@types/glob\":\"7.1.1\",\"@types/jsonwebtoken\":\"9.0.0\",\"@types/lodash\":\"4.14.198\",\"@types/lodash.curry\":\"4.1.6\",\"@types/path-to-regexp\":\"1.7.0\",\"@types/picomatch\":\"2.3.3\",\"@types/platform\":\"1.3.4\",\"@types/react\":\"19.0.8\",\"@types/react-dom\":\"19.0.3\",\"@types/react-is\":\"18.2.4\",\"@types/semver\":\"7.3.1\",\"@types/send\":\"0.14.4\",\"@types/shell-quote\":\"1.7.1\",\"@types/tar\":\"6.1.5\",\"@types/text-table\":\"0.2.1\",\"@types/ua-parser-js\":\"0.7.36\",\"@types/webpack-sources1\":\"npm:@types/webpack-sources@0.1.5\",\"@types/ws\":\"8.2.0\",\"@vercel/ncc\":\"0.34.0\",\"@vercel/nft\":\"0.27.1\",\"@vercel/turbopack-ecmascript-runtime\":\"*\",\"acorn\":\"8.14.0\",\"amphtml-validator\":\"1.0.38\",\"anser\":\"1.4.9\",\"arg\":\"4.1.0\",\"assert\":\"2.0.0\",\"async-retry\":\"1.2.3\",\"async-sema\":\"3.0.0\",\"axe-playwright\":\"2.0.3\",\"babel-loader\":\"10.0.0\",\"babel-plugin-react-compiler\":\"19.1.0-rc.2\",\"babel-plugin-transform-define\":\"2.0.0\",\"babel-plugin-transform-react-remove-prop-types\":\"0.4.24\",\"browserify-zlib\":\"0.2.0\",\"browserslist\":\"4.24.4\",\"buffer\":\"5.6.0\",\"busboy\":\"1.6.0\",\"bytes\":\"3.1.1\",\"ci-info\":\"watson/ci-info#f43f6a1cefff47fb361c88cf4b943fdbcaafe540\",\"cli-select\":\"1.1.2\",\"client-only\":\"0.0.1\",\"commander\":\"12.1.0\",\"comment-json\":\"3.0.3\",\"compression\":\"1.7.4\",\"conf\":\"5.0.0\",\"constants-browserify\":\"1.0.0\",\"content-disposition\":\"0.5.3\",\"content-type\":\"1.0.4\",\"cookie\":\"0.4.1\",\"cross-env\":\"6.0.3\",\"cross-spawn\":\"7.0.3\",\"crypto-browserify\":\"3.12.0\",\"css-loader\":\"7.1.2\",\"css.escape\":\"1.5.1\",\"cssnano-preset-default\":\"7.0.6\",\"data-uri-to-buffer\":\"3.0.1\",\"debug\":\"4.1.1\",\"devalue\":\"2.0.1\",\"domain-browser\":\"4.19.0\",\"edge-runtime\":\"4.0.1\",\"events\":\"3.3.0\",\"find-up\":\"4.1.0\",\"fresh\":\"0.5.2\",\"glob\":\"7.1.7\",\"gzip-size\":\"5.1.1\",\"http-proxy\":\"1.18.1\",\"http-proxy-agent\":\"5.0.0\",\"https-browserify\":\"1.0.0\",\"https-proxy-agent\":\"5.0.1\",\"icss-utils\":\"5.1.0\",\"ignore-loader\":\"0.1.2\",\"image-size\":\"1.2.1\",\"is-docker\":\"2.0.0\",\"is-wsl\":\"2.2.0\",\"jest-worker\":\"27.5.1\",\"json5\":\"2.2.3\",\"jsonwebtoken\":\"9.0.0\",\"loader-runner\":\"4.3.0\",\"loader-utils2\":\"npm:loader-utils@2.0.4\",\"loader-utils3\":\"npm:loader-utils@3.1.3\",\"lodash.curry\":\"4.1.1\",\"mini-css-extract-plugin\":\"2.4.4\",\"msw\":\"2.3.0\",\"nanoid\":\"3.1.32\",\"native-url\":\"0.3.4\",\"neo-async\":\"2.6.1\",\"node-html-parser\":\"5.3.3\",\"ora\":\"4.0.4\",\"os-browserify\":\"0.3.0\",\"p-limit\":\"3.1.0\",\"p-queue\":\"6.6.2\",\"path-browserify\":\"1.0.1\",\"path-to-regexp\":\"6.3.0\",\"picomatch\":\"4.0.1\",\"postcss-flexbugs-fixes\":\"5.0.2\",\"postcss-modules-extract-imports\":\"3.0.0\",\"postcss-modules-local-by-default\":\"4.2.0\",\"postcss-modules-scope\":\"3.0.0\",\"postcss-modules-values\":\"4.0.0\",\"postcss-preset-env\":\"7.4.3\",\"postcss-safe-parser\":\"6.0.0\",\"postcss-scss\":\"4.0.3\",\"postcss-value-parser\":\"4.2.0\",\"process\":\"0.11.10\",\"punycode\":\"2.1.1\",\"querystring-es3\":\"0.2.1\",\"raw-body\":\"2.4.1\",\"react-refresh\":\"0.12.0\",\"recast\":\"0.23.11\",\"regenerator-runtime\":\"0.13.4\",\"safe-stable-stringify\":\"2.5.0\",\"sass-loader\":\"15.0.0\",\"schema-utils2\":\"npm:schema-utils@2.7.1\",\"schema-utils3\":\"npm:schema-utils@3.0.0\",\"semver\":\"7.3.2\",\"send\":\"0.18.0\",\"server-only\":\"0.0.1\",\"setimmediate\":\"1.0.5\",\"shell-quote\":\"1.7.3\",\"source-map\":\"0.6.1\",\"source-map-loader\":\"5.0.0\",\"source-map08\":\"npm:source-map@0.8.0-beta.0\",\"stacktrace-parser\":\"0.1.10\",\"storybook\":\"8.6.0\",\"stream-browserify\":\"3.0.0\",\"stream-http\":\"3.1.1\",\"strict-event-emitter\":\"0.5.0\",\"string-hash\":\"1.1.3\",\"string_decoder\":\"1.3.0\",\"strip-ansi\":\"6.0.0\",\"style-loader\":\"4.0.0\",\"superstruct\":\"1.0.3\",\"tar\":\"6.1.15\",\"taskr\":\"1.1.0\",\"terser\":\"5.27.0\",\"terser-webpack-plugin\":\"5.3.9\",\"text-table\":\"0.2.0\",\"timers-browserify\":\"2.0.12\",\"tty-browserify\":\"0.0.1\",\"typescript\":\"5.8.2\",\"ua-parser-js\":\"1.0.35\",\"unistore\":\"3.4.1\",\"util\":\"0.12.4\",\"vm-browserify\":\"1.1.2\",\"watchpack\":\"2.4.0\",\"web-vitals\":\"4.2.1\",\"webpack\":\"5.98.0\",\"webpack-sources1\":\"npm:webpack-sources@1.4.3\",\"webpack-sources3\":\"npm:webpack-sources@3.2.3\",\"ws\":\"8.2.3\",\"zod\":\"3.25.76\",\"zod-validation-error\":\"3.4.0\"},\"keywords\":[\"react\",\"framework\",\"nextjs\",\"web\",\"server\",\"node\",\"front-end\",\"backend\",\"cli\",\"vercel\"],\"engines\":{\"node\":\"^18.18.0 || ^19.8.0 || >= 20.0.0\"}}"));}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/client/request-idle-callback.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    cancelIdleCallback: null,
    requestIdleCallback: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    cancelIdleCallback: function() {
        return cancelIdleCallback;
    },
    requestIdleCallback: function() {
        return requestIdleCallback;
    }
});
const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(cb) {
    let start = Date.now();
    return self.setTimeout(function() {
        cb({
            didTimeout: false,
            timeRemaining: function() {
                return Math.max(0, 50 - (Date.now() - start));
            }
        });
    }, 1);
};
const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(id) {
    return clearTimeout(id);
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=request-idle-callback.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/client/script.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    handleClientScriptLoad: null,
    initScriptLoader: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    handleClientScriptLoad: function() {
        return handleClientScriptLoad;
    },
    initScriptLoader: function() {
        return initScriptLoader;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _interop_require_wildcard = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _reactdom = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)"));
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _headmanagercontextsharedruntime = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/shared/lib/head-manager-context.shared-runtime.js [app-client] (ecmascript)");
const _setattributesfromprops = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/client/set-attributes-from-props.js [app-client] (ecmascript)");
const _requestidlecallback = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/client/request-idle-callback.js [app-client] (ecmascript)");
const ScriptCache = new Map();
const LoadCache = new Set();
const insertStylesheets = (stylesheets)=>{
    // Case 1: Styles for afterInteractive/lazyOnload with appDir injected via handleClientScriptLoad
    //
    // Using ReactDOM.preinit to feature detect appDir and inject styles
    // Stylesheets might have already been loaded if initialized with Script component
    // Re-inject styles here to handle scripts loaded via handleClientScriptLoad
    // ReactDOM.preinit handles dedup and ensures the styles are loaded only once
    if (_reactdom.default.preinit) {
        stylesheets.forEach((stylesheet)=>{
            _reactdom.default.preinit(stylesheet, {
                as: 'style'
            });
        });
        return;
    }
    // Case 2: Styles for afterInteractive/lazyOnload with pages injected via handleClientScriptLoad
    //
    // We use this function to load styles when appdir is not detected
    // TODO: Use React float APIs to load styles once available for pages dir
    if (typeof window !== 'undefined') {
        let head = document.head;
        stylesheets.forEach((stylesheet)=>{
            let link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = stylesheet;
            head.appendChild(link);
        });
    }
};
const loadScript = (props)=>{
    const { src, id, onLoad = ()=>{}, onReady = null, dangerouslySetInnerHTML, children = '', strategy = 'afterInteractive', onError, stylesheets } = props;
    const cacheKey = id || src;
    // Script has already loaded
    if (cacheKey && LoadCache.has(cacheKey)) {
        return;
    }
    // Contents of this script are already loading/loaded
    if (ScriptCache.has(src)) {
        LoadCache.add(cacheKey);
        // It is possible that multiple `next/script` components all have same "src", but has different "onLoad"
        // This is to make sure the same remote script will only load once, but "onLoad" are executed in order
        ScriptCache.get(src).then(onLoad, onError);
        return;
    }
    /** Execute after the script first loaded */ const afterLoad = ()=>{
        // Run onReady for the first time after load event
        if (onReady) {
            onReady();
        }
        // add cacheKey to LoadCache when load successfully
        LoadCache.add(cacheKey);
    };
    const el = document.createElement('script');
    const loadPromise = new Promise((resolve, reject)=>{
        el.addEventListener('load', function(e) {
            resolve();
            if (onLoad) {
                onLoad.call(this, e);
            }
            afterLoad();
        });
        el.addEventListener('error', function(e) {
            reject(e);
        });
    }).catch(function(e) {
        if (onError) {
            onError(e);
        }
    });
    if (dangerouslySetInnerHTML) {
        // Casting since lib.dom.d.ts doesn't have TrustedHTML yet.
        el.innerHTML = dangerouslySetInnerHTML.__html || '';
        afterLoad();
    } else if (children) {
        el.textContent = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
        afterLoad();
    } else if (src) {
        el.src = src;
        // do not add cacheKey into LoadCache for remote script here
        // cacheKey will be added to LoadCache when it is actually loaded (see loadPromise above)
        ScriptCache.set(src, loadPromise);
    }
    (0, _setattributesfromprops.setAttributesFromProps)(el, props);
    if (strategy === 'worker') {
        el.setAttribute('type', 'text/partytown');
    }
    el.setAttribute('data-nscript', strategy);
    // Load styles associated with this script
    if (stylesheets) {
        insertStylesheets(stylesheets);
    }
    document.body.appendChild(el);
};
function handleClientScriptLoad(props) {
    const { strategy = 'afterInteractive' } = props;
    if (strategy === 'lazyOnload') {
        window.addEventListener('load', ()=>{
            (0, _requestidlecallback.requestIdleCallback)(()=>loadScript(props));
        });
    } else {
        loadScript(props);
    }
}
function loadLazyScript(props) {
    if (document.readyState === 'complete') {
        (0, _requestidlecallback.requestIdleCallback)(()=>loadScript(props));
    } else {
        window.addEventListener('load', ()=>{
            (0, _requestidlecallback.requestIdleCallback)(()=>loadScript(props));
        });
    }
}
function addBeforeInteractiveToCache() {
    const scripts = [
        ...document.querySelectorAll('[data-nscript="beforeInteractive"]'),
        ...document.querySelectorAll('[data-nscript="beforePageRender"]')
    ];
    scripts.forEach((script)=>{
        const cacheKey = script.id || script.getAttribute('src');
        LoadCache.add(cacheKey);
    });
}
function initScriptLoader(scriptLoaderItems) {
    scriptLoaderItems.forEach(handleClientScriptLoad);
    addBeforeInteractiveToCache();
}
/**
 * Load a third-party scripts in an optimized way.
 *
 * Read more: [Next.js Docs: `next/script`](https://nextjs.org/docs/app/api-reference/components/script)
 */ function Script(props) {
    const { id, src = '', onLoad = ()=>{}, onReady = null, strategy = 'afterInteractive', onError, stylesheets, ...restProps } = props;
    // Context is available only during SSR
    let { updateScripts, scripts, getIsSsr, appDir, nonce } = (0, _react.useContext)(_headmanagercontextsharedruntime.HeadManagerContext);
    // if a nonce is explicitly passed to the script tag, favor that over the automatic handling
    nonce = restProps.nonce || nonce;
    /**
   * - First mount:
   *   1. The useEffect for onReady executes
   *   2. hasOnReadyEffectCalled.current is false, but the script hasn't loaded yet (not in LoadCache)
   *      onReady is skipped, set hasOnReadyEffectCalled.current to true
   *   3. The useEffect for loadScript executes
   *   4. hasLoadScriptEffectCalled.current is false, loadScript executes
   *      Once the script is loaded, the onLoad and onReady will be called by then
   *   [If strict mode is enabled / is wrapped in <OffScreen /> component]
   *   5. The useEffect for onReady executes again
   *   6. hasOnReadyEffectCalled.current is true, so entire effect is skipped
   *   7. The useEffect for loadScript executes again
   *   8. hasLoadScriptEffectCalled.current is true, so entire effect is skipped
   *
   * - Second mount:
   *   1. The useEffect for onReady executes
   *   2. hasOnReadyEffectCalled.current is false, but the script has already loaded (found in LoadCache)
   *      onReady is called, set hasOnReadyEffectCalled.current to true
   *   3. The useEffect for loadScript executes
   *   4. The script is already loaded, loadScript bails out
   *   [If strict mode is enabled / is wrapped in <OffScreen /> component]
   *   5. The useEffect for onReady executes again
   *   6. hasOnReadyEffectCalled.current is true, so entire effect is skipped
   *   7. The useEffect for loadScript executes again
   *   8. hasLoadScriptEffectCalled.current is true, so entire effect is skipped
   */ const hasOnReadyEffectCalled = (0, _react.useRef)(false);
    (0, _react.useEffect)(()=>{
        const cacheKey = id || src;
        if (!hasOnReadyEffectCalled.current) {
            // Run onReady if script has loaded before but component is re-mounted
            if (onReady && cacheKey && LoadCache.has(cacheKey)) {
                onReady();
            }
            hasOnReadyEffectCalled.current = true;
        }
    }, [
        onReady,
        id,
        src
    ]);
    const hasLoadScriptEffectCalled = (0, _react.useRef)(false);
    (0, _react.useEffect)(()=>{
        if (!hasLoadScriptEffectCalled.current) {
            if (strategy === 'afterInteractive') {
                loadScript(props);
            } else if (strategy === 'lazyOnload') {
                loadLazyScript(props);
            }
            hasLoadScriptEffectCalled.current = true;
        }
    }, [
        props,
        strategy
    ]);
    if (strategy === 'beforeInteractive' || strategy === 'worker') {
        if (updateScripts) {
            scripts[strategy] = (scripts[strategy] || []).concat([
                {
                    id,
                    src,
                    onLoad,
                    onReady,
                    onError,
                    ...restProps,
                    nonce
                }
            ]);
            updateScripts(scripts);
        } else if (getIsSsr && getIsSsr()) {
            // Script has already loaded during SSR
            LoadCache.add(id || src);
        } else if (getIsSsr && !getIsSsr()) {
            loadScript({
                ...props,
                nonce
            });
        }
    }
    // For the app directory, we need React Float to preload these scripts.
    if (appDir) {
        // Injecting stylesheets here handles beforeInteractive and worker scripts correctly
        // For other strategies injecting here ensures correct stylesheet order
        // ReactDOM.preinit handles loading the styles in the correct order,
        // also ensures the stylesheet is loaded only once and in a consistent manner
        //
        // Case 1: Styles for beforeInteractive/worker with appDir - handled here
        // Case 2: Styles for beforeInteractive/worker with pages dir - Not handled yet
        // Case 3: Styles for afterInteractive/lazyOnload with appDir - handled here
        // Case 4: Styles for afterInteractive/lazyOnload with pages dir - handled in insertStylesheets function
        if (stylesheets) {
            stylesheets.forEach((styleSrc)=>{
                _reactdom.default.preinit(styleSrc, {
                    as: 'style'
                });
            });
        }
        // Before interactive scripts need to be loaded by Next.js' runtime instead
        // of native <script> tags, because they no longer have `defer`.
        if (strategy === 'beforeInteractive') {
            if (!src) {
                // For inlined scripts, we put the content in `children`.
                if (restProps.dangerouslySetInnerHTML) {
                    // Casting since lib.dom.d.ts doesn't have TrustedHTML yet.
                    restProps.children = restProps.dangerouslySetInnerHTML.__html;
                    delete restProps.dangerouslySetInnerHTML;
                }
                return /*#__PURE__*/ (0, _jsxruntime.jsx)("script", {
                    nonce: nonce,
                    dangerouslySetInnerHTML: {
                        __html: "(self.__next_s=self.__next_s||[]).push(" + JSON.stringify([
                            0,
                            {
                                ...restProps,
                                id
                            }
                        ]) + ")"
                    }
                });
            } else {
                // @ts-ignore
                _reactdom.default.preload(src, restProps.integrity ? {
                    as: 'script',
                    integrity: restProps.integrity,
                    nonce,
                    crossOrigin: restProps.crossOrigin
                } : {
                    as: 'script',
                    nonce,
                    crossOrigin: restProps.crossOrigin
                });
                return /*#__PURE__*/ (0, _jsxruntime.jsx)("script", {
                    nonce: nonce,
                    dangerouslySetInnerHTML: {
                        __html: "(self.__next_s=self.__next_s||[]).push(" + JSON.stringify([
                            src,
                            {
                                ...restProps,
                                id
                            }
                        ]) + ")"
                    }
                });
            }
        } else if (strategy === 'afterInteractive') {
            if (src) {
                // @ts-ignore
                _reactdom.default.preload(src, restProps.integrity ? {
                    as: 'script',
                    integrity: restProps.integrity,
                    nonce,
                    crossOrigin: restProps.crossOrigin
                } : {
                    as: 'script',
                    nonce,
                    crossOrigin: restProps.crossOrigin
                });
            }
        }
    }
    return null;
}
Object.defineProperty(Script, '__nextScript', {
    value: true
});
const _default = Script;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=script.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/next/script.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/client/script.js [app-client] (ecmascript)");
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file must be bundled in the app's client layer, it shouldn't be directly
// imported by the server.
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    callServer: null,
    createServerReference: null,
    findSourceMapURL: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    callServer: function() {
        return _appcallserver.callServer;
    },
    createServerReference: function() {
        return _client.createServerReference;
    },
    findSourceMapURL: function() {
        return _appfindsourcemapurl.findSourceMapURL;
    }
});
const _appcallserver = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/client/app-call-server.js [app-client] (ecmascript)");
const _appfindsourcemapurl = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/client/app-find-source-map-url.js [app-client] (ecmascript)");
const _client = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react-server-dom-turbopack/client.js [app-client] (ecmascript)"); //# sourceMappingURL=action-client-wrapper.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/jwt-decode/build/esm/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvalidTokenError",
    ()=>InvalidTokenError,
    "jwtDecode",
    ()=>jwtDecode
]);
class InvalidTokenError extends Error {
}
InvalidTokenError.prototype.name = "InvalidTokenError";
function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).replace(/(.)/g, (m, p)=>{
        let code = p.charCodeAt(0).toString(16).toUpperCase();
        if (code.length < 2) {
            code = "0" + code;
        }
        return "%" + code;
    }));
}
function base64UrlDecode(str) {
    let output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch(output.length % 4){
        case 0:
            break;
        case 2:
            output += "==";
            break;
        case 3:
            output += "=";
            break;
        default:
            throw new Error("base64 string is not of the correct length");
    }
    try {
        return b64DecodeUnicode(output);
    } catch (err) {
        return atob(output);
    }
}
function jwtDecode(token, options) {
    if (typeof token !== "string") {
        throw new InvalidTokenError("Invalid token specified: must be a string");
    }
    options || (options = {});
    const pos = options.header === true ? 0 : 1;
    const part = token.split(".")[pos];
    if (typeof part !== "string") {
        throw new InvalidTokenError("Invalid token specified: missing part #".concat(pos + 1));
    }
    let decoded;
    try {
        decoded = base64UrlDecode(part);
    } catch (e) {
        throw new InvalidTokenError("Invalid token specified: invalid base64 for part #".concat(pos + 1, " (").concat(e.message, ")"));
    }
    try {
        return JSON.parse(decoded);
    } catch (e) {
        throw new InvalidTokenError("Invalid token specified: invalid json for part #".concat(pos + 1, " (").concat(e.message, ")"));
    }
}
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/actions/reconnect.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reconnect",
    ()=>reconnect
]);
let isReconnecting = false;
async function reconnect(config) {
    let parameters = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var _parameters_connectors;
    // If already reconnecting, do nothing
    if (isReconnecting) return [];
    isReconnecting = true;
    config.setState((x)=>({
            ...x,
            status: x.current ? 'reconnecting' : 'connecting'
        }));
    const connectors = [];
    if ((_parameters_connectors = parameters.connectors) === null || _parameters_connectors === void 0 ? void 0 : _parameters_connectors.length) {
        for (const connector_ of parameters.connectors){
            let connector;
            // "Register" connector if not already created
            if (typeof connector_ === 'function') connector = config._internal.connectors.setup(connector_);
            else connector = connector_;
            connectors.push(connector);
        }
    } else connectors.push(...config.connectors);
    // Try recently-used connectors first
    let recentConnectorId;
    try {
        var _config_storage;
        recentConnectorId = await ((_config_storage = config.storage) === null || _config_storage === void 0 ? void 0 : _config_storage.getItem('recentConnectorId'));
    } catch (e) {}
    const scores = {};
    for (const [, connection] of config.state.connections){
        scores[connection.connector.id] = 1;
    }
    if (recentConnectorId) scores[recentConnectorId] = 0;
    const sorted = Object.keys(scores).length > 0 ? [
        ...connectors
    ].sort((a, b)=>{
        var _scores_a_id, _scores_b_id;
        return ((_scores_a_id = scores[a.id]) !== null && _scores_a_id !== void 0 ? _scores_a_id : 10) - ((_scores_b_id = scores[b.id]) !== null && _scores_b_id !== void 0 ? _scores_b_id : 10);
    }) : connectors;
    // Iterate through each connector and try to connect
    let connected = false;
    const connections = [];
    const providers = [];
    for (const connector of sorted){
        const provider = await connector.getProvider().catch(()=>undefined);
        if (!provider) continue;
        // If we already have an instance of this connector's provider,
        // then we have already checked it (ie. injected connectors can
        // share the same `window.ethereum` instance, so we don't want to
        // connect to it again).
        if (providers.some((x)=>x === provider)) continue;
        const isAuthorized = await connector.isAuthorized();
        if (!isAuthorized) continue;
        const data = await connector.connect({
            isReconnecting: true
        }).catch(()=>null);
        if (!data) continue;
        connector.emitter.off('connect', config._internal.events.connect);
        connector.emitter.on('change', config._internal.events.change);
        connector.emitter.on('disconnect', config._internal.events.disconnect);
        config.setState((x)=>{
            const connections = new Map(connected ? x.connections : new Map()).set(connector.uid, {
                accounts: data.accounts,
                chainId: data.chainId,
                connector
            });
            return {
                ...x,
                current: connected ? x.current : connector.uid,
                connections
            };
        });
        connections.push({
            accounts: data.accounts,
            chainId: data.chainId,
            connector
        });
        providers.push(provider);
        connected = true;
    }
    // Prevent overwriting connected status from race condition
    if (config.state.status === 'reconnecting' || config.state.status === 'connecting') {
        // If connecting didn't succeed, set to disconnected
        if (!connected) config.setState((x)=>({
                ...x,
                connections: new Map(),
                current: null,
                status: 'disconnected'
            }));
        else config.setState((x)=>({
                ...x,
                status: 'connected'
            }));
    }
    isReconnecting = false;
    return connections;
} //# sourceMappingURL=reconnect.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/hydrate.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hydrate",
    ()=>hydrate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$reconnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/actions/reconnect.js [app-client] (ecmascript)");
;
function hydrate(config, parameters) {
    const { initialState, reconnectOnMount } = parameters;
    if (initialState && !config._internal.store.persist.hasHydrated()) config.setState({
        ...initialState,
        chainId: config.chains.some((x)=>x.id === initialState.chainId) ? initialState.chainId : config.chains[0].id,
        connections: reconnectOnMount ? initialState.connections : new Map(),
        status: reconnectOnMount ? 'reconnecting' : 'disconnected'
    });
    return {
        async onMount () {
            if (config._internal.ssr) {
                await config._internal.store.persist.rehydrate();
                if (config._internal.mipd) {
                    config._internal.connectors.setState((connectors)=>{
                        var _config__internal_mipd;
                        const rdnsSet = new Set();
                        for (const connector of connectors !== null && connectors !== void 0 ? connectors : []){
                            if (connector.rdns) {
                                const rdnsValues = Array.isArray(connector.rdns) ? connector.rdns : [
                                    connector.rdns
                                ];
                                for (const rdns of rdnsValues){
                                    rdnsSet.add(rdns);
                                }
                            }
                        }
                        const mipdConnectors = [];
                        var _config__internal_mipd_getProviders;
                        const providers = (_config__internal_mipd_getProviders = (_config__internal_mipd = config._internal.mipd) === null || _config__internal_mipd === void 0 ? void 0 : _config__internal_mipd.getProviders()) !== null && _config__internal_mipd_getProviders !== void 0 ? _config__internal_mipd_getProviders : [];
                        for (const provider of providers){
                            if (rdnsSet.has(provider.info.rdns)) continue;
                            const connectorFn = config._internal.connectors.providerDetailToConnector(provider);
                            const connector = config._internal.connectors.setup(connectorFn);
                            mipdConnectors.push(connector);
                        }
                        return [
                            ...connectors,
                            ...mipdConnectors
                        ];
                    });
                }
            }
            if (reconnectOnMount) (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$actions$2f$reconnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reconnect"])(config);
            else if (config.storage) // Reset connections that may have been hydrated from storage.
            config.setState((x)=>({
                    ...x,
                    connections: new Map()
                }));
        }
    };
} //# sourceMappingURL=hydrate.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/version.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "version",
    ()=>version
]);
const version = '2.20.3'; //# sourceMappingURL=version.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/utils/getVersion.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getVersion",
    ()=>getVersion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/version.js [app-client] (ecmascript)");
;
const getVersion = ()=>"@wagmi/core@".concat(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"]); //# sourceMappingURL=getVersion.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/errors/base.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseError",
    ()=>BaseError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$getVersion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/utils/getVersion.js [app-client] (ecmascript)");
var __classPrivateFieldGet = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BaseError_instances, _BaseError_walk;
;
class BaseError extends Error {
    get docsBaseUrl() {
        return 'https://wagmi.sh/core';
    }
    get version() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$getVersion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVersion"])();
    }
    walk(fn) {
        return __classPrivateFieldGet(this, _BaseError_instances, "m", _BaseError_walk).call(this, this, fn);
    }
    constructor(shortMessage, options = {}){
        var _options_cause;
        super();
        _BaseError_instances.add(this);
        Object.defineProperty(this, "details", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "docsPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "metaMessages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "shortMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'WagmiCoreError'
        });
        const details = options.cause instanceof BaseError ? options.cause.details : ((_options_cause = options.cause) === null || _options_cause === void 0 ? void 0 : _options_cause.message) ? options.cause.message : options.details;
        const docsPath = options.cause instanceof BaseError ? options.cause.docsPath || options.docsPath : options.docsPath;
        this.message = [
            shortMessage || 'An error occurred.',
            '',
            ...options.metaMessages ? [
                ...options.metaMessages,
                ''
            ] : [],
            ...docsPath ? [
                "Docs: ".concat(this.docsBaseUrl).concat(docsPath, ".html").concat(options.docsSlug ? "#".concat(options.docsSlug) : '')
            ] : [],
            ...details ? [
                "Details: ".concat(details)
            ] : [],
            "Version: ".concat(this.version)
        ].join('\n');
        if (options.cause) this.cause = options.cause;
        this.details = details;
        this.docsPath = docsPath;
        this.metaMessages = options.metaMessages;
        this.shortMessage = shortMessage;
    }
}
_BaseError_instances = new WeakSet(), _BaseError_walk = function _BaseError_walk(err, fn) {
    if (fn === null || fn === void 0 ? void 0 : fn(err)) return err;
    if (err.cause) return __classPrivateFieldGet(this, _BaseError_instances, "m", _BaseError_walk).call(this, err.cause, fn);
    return err;
}; //# sourceMappingURL=base.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/errors/config.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChainNotConfiguredError",
    ()=>ChainNotConfiguredError,
    "ConnectorAccountNotFoundError",
    ()=>ConnectorAccountNotFoundError,
    "ConnectorAlreadyConnectedError",
    ()=>ConnectorAlreadyConnectedError,
    "ConnectorChainMismatchError",
    ()=>ConnectorChainMismatchError,
    "ConnectorNotConnectedError",
    ()=>ConnectorNotConnectedError,
    "ConnectorNotFoundError",
    ()=>ConnectorNotFoundError,
    "ConnectorUnavailableReconnectingError",
    ()=>ConnectorUnavailableReconnectingError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/errors/base.js [app-client] (ecmascript)");
;
class ChainNotConfiguredError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(){
        super('Chain not configured.');
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'ChainNotConfiguredError'
        });
    }
}
class ConnectorAlreadyConnectedError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(){
        super('Connector already connected.');
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'ConnectorAlreadyConnectedError'
        });
    }
}
class ConnectorNotConnectedError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(){
        super('Connector not connected.');
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'ConnectorNotConnectedError'
        });
    }
}
class ConnectorNotFoundError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(){
        super('Connector not found.');
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'ConnectorNotFoundError'
        });
    }
}
class ConnectorAccountNotFoundError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ address, connector }){
        super('Account "'.concat(address, '" not found for connector "').concat(connector.name, '".'));
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'ConnectorAccountNotFoundError'
        });
    }
}
class ConnectorChainMismatchError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ connectionChainId, connectorChainId }){
        super("The current chain of the connector (id: ".concat(connectorChainId, ") does not match the connection's chain (id: ").concat(connectionChainId, ")."), {
            metaMessages: [
                "Current Chain ID:  ".concat(connectorChainId),
                "Expected Chain ID: ".concat(connectionChainId)
            ]
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'ConnectorChainMismatchError'
        });
    }
}
class ConnectorUnavailableReconnectingError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ connector }){
        super('Connector "'.concat(connector.name, '" unavailable while reconnecting.'), {
            details: [
                'During the reconnection step, the only connector methods guaranteed to be available are: `id`, `name`, `type`, `uid`.',
                'All other methods are not guaranteed to be available until reconnection completes and connectors are fully restored.',
                'This error commonly occurs for connectors that asynchronously inject after reconnection has already started.'
            ].join(' ')
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'ConnectorUnavailableReconnectingError'
        });
    }
} //# sourceMappingURL=config.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/errors/connector.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProviderNotFoundError",
    ()=>ProviderNotFoundError,
    "SwitchChainNotSupportedError",
    ()=>SwitchChainNotSupportedError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/errors/base.js [app-client] (ecmascript)");
;
class ProviderNotFoundError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(){
        super('Provider not found.');
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'ProviderNotFoundError'
        });
    }
}
class SwitchChainNotSupportedError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ connector }){
        super('"'.concat(connector.name, '" does not support programmatic chain switching.'));
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'SwitchChainNotSupportedError'
        });
    }
} //# sourceMappingURL=connector.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/connectors/createConnector.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createConnector",
    ()=>createConnector
]);
function createConnector(createConnectorFn) {
    return createConnectorFn;
} //# sourceMappingURL=createConnector.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/connectors/injected.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "injected",
    ()=>injected
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/address/getAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withRetry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/promise/withRetry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/promise/withTimeout.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/errors/config.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$connector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/errors/connector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$createConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/connectors/createConnector.js [app-client] (ecmascript)");
;
;
;
;
injected.type = 'injected';
function injected() {
    let parameters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const { shimDisconnect = true, unstable_shimAsyncInject } = parameters;
    function getTarget() {
        const target = parameters.target;
        if (typeof target === 'function') {
            const result = target();
            if (result) return result;
        }
        if (typeof target === 'object') return target;
        var _targetMap_target;
        if (typeof target === 'string') return {
            ...(_targetMap_target = targetMap[target]) !== null && _targetMap_target !== void 0 ? _targetMap_target : {
                id: target,
                name: "".concat(target[0].toUpperCase()).concat(target.slice(1)),
                provider: "is".concat(target[0].toUpperCase()).concat(target.slice(1))
            }
        };
        return {
            id: 'injected',
            name: 'Injected',
            provider (window1) {
                return window1 === null || window1 === void 0 ? void 0 : window1.ethereum;
            }
        };
    }
    let accountsChanged;
    let chainChanged;
    let connect;
    let disconnect;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$createConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createConnector"])((config)=>({
            get icon () {
                return getTarget().icon;
            },
            get id () {
                return getTarget().id;
            },
            get name () {
                return getTarget().name;
            },
            /** @deprecated */ get supportsSimulation () {
                return true;
            },
            type: injected.type,
            async setup () {
                const provider = await this.getProvider();
                // Only start listening for events if `target` is set, otherwise `injected()` will also receive events
                if ((provider === null || provider === void 0 ? void 0 : provider.on) && parameters.target) {
                    if (!connect) {
                        connect = this.onConnect.bind(this);
                        provider.on('connect', connect);
                    }
                    // We shouldn't need to listen for `'accountsChanged'` here since the `'connect'` event should suffice (and wallet shouldn't be connected yet).
                    // Some wallets, like MetaMask, do not implement the `'connect'` event and overload `'accountsChanged'` instead.
                    if (!accountsChanged) {
                        accountsChanged = this.onAccountsChanged.bind(this);
                        provider.on('accountsChanged', accountsChanged);
                    }
                }
            },
            async connect () {
                let { chainId, isReconnecting } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                const provider = await this.getProvider();
                if (!provider) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$connector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderNotFoundError"]();
                let accounts = [];
                if (isReconnecting) accounts = await this.getAccounts().catch(()=>[]);
                else if (shimDisconnect) {
                    // Attempt to show another prompt for selecting account if `shimDisconnect` flag is enabled
                    try {
                        var _permissions__caveats__value, _permissions__caveats_, _permissions__caveats, _permissions_;
                        const permissions = await provider.request({
                            method: 'wallet_requestPermissions',
                            params: [
                                {
                                    eth_accounts: {}
                                }
                            ]
                        });
                        accounts = (_permissions_ = permissions[0]) === null || _permissions_ === void 0 ? void 0 : (_permissions__caveats = _permissions_.caveats) === null || _permissions__caveats === void 0 ? void 0 : (_permissions__caveats_ = _permissions__caveats[0]) === null || _permissions__caveats_ === void 0 ? void 0 : (_permissions__caveats__value = _permissions__caveats_.value) === null || _permissions__caveats__value === void 0 ? void 0 : _permissions__caveats__value.map((x)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(x));
                        // `'wallet_requestPermissions'` can return a different order of accounts than `'eth_accounts'`
                        // switch to `'eth_accounts'` ordering if more than one account is connected
                        // https://github.com/wevm/wagmi/issues/4140
                        if (accounts.length > 0) {
                            const sortedAccounts = await this.getAccounts();
                            accounts = sortedAccounts;
                        }
                    } catch (err) {
                        const error = err;
                        // Not all injected providers support `wallet_requestPermissions` (e.g. MetaMask iOS).
                        // Only bubble up error if user rejects request
                        if (error.code === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"].code) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](error);
                        // Or prompt is already open
                        if (error.code === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResourceUnavailableRpcError"].code) throw error;
                    }
                }
                try {
                    var _config_storage, _config_storage1;
                    if (!(accounts === null || accounts === void 0 ? void 0 : accounts.length) && !isReconnecting) {
                        const requestedAccounts = await provider.request({
                            method: 'eth_requestAccounts'
                        });
                        accounts = requestedAccounts.map((x)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(x));
                    }
                    // Manage EIP-1193 event listeners
                    // https://eips.ethereum.org/EIPS/eip-1193#events
                    if (connect) {
                        provider.removeListener('connect', connect);
                        connect = undefined;
                    }
                    if (!accountsChanged) {
                        accountsChanged = this.onAccountsChanged.bind(this);
                        provider.on('accountsChanged', accountsChanged);
                    }
                    if (!chainChanged) {
                        chainChanged = this.onChainChanged.bind(this);
                        provider.on('chainChanged', chainChanged);
                    }
                    if (!disconnect) {
                        disconnect = this.onDisconnect.bind(this);
                        provider.on('disconnect', disconnect);
                    }
                    // Switch to chain if provided
                    let currentChainId = await this.getChainId();
                    if (chainId && currentChainId !== chainId) {
                        const chain = await this.switchChain({
                            chainId
                        }).catch((error)=>{
                            if (error.code === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"].code) throw error;
                            return {
                                id: currentChainId
                            };
                        });
                        var _chain_id;
                        currentChainId = (_chain_id = chain === null || chain === void 0 ? void 0 : chain.id) !== null && _chain_id !== void 0 ? _chain_id : currentChainId;
                    }
                    // Remove disconnected shim if it exists
                    if (shimDisconnect) await ((_config_storage = config.storage) === null || _config_storage === void 0 ? void 0 : _config_storage.removeItem("".concat(this.id, ".disconnected")));
                    // Add connected shim if no target exists
                    if (!parameters.target) await ((_config_storage1 = config.storage) === null || _config_storage1 === void 0 ? void 0 : _config_storage1.setItem('injected.connected', true));
                    return {
                        accounts,
                        chainId: currentChainId
                    };
                } catch (err) {
                    const error = err;
                    if (error.code === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"].code) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](error);
                    if (error.code === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResourceUnavailableRpcError"].code) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResourceUnavailableRpcError"](error);
                    throw error;
                }
            },
            async disconnect () {
                var _config_storage;
                const provider = await this.getProvider();
                if (!provider) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$connector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderNotFoundError"]();
                // Manage EIP-1193 event listeners
                if (chainChanged) {
                    provider.removeListener('chainChanged', chainChanged);
                    chainChanged = undefined;
                }
                if (disconnect) {
                    provider.removeListener('disconnect', disconnect);
                    disconnect = undefined;
                }
                if (!connect) {
                    connect = this.onConnect.bind(this);
                    provider.on('connect', connect);
                }
                // Experimental support for MetaMask disconnect
                // https://github.com/MetaMask/metamask-improvement-proposals/blob/main/MIPs/mip-2.md
                try {
                    // Adding timeout as not all wallets support this method and can hang
                    // https://github.com/wevm/wagmi/issues/4064
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withTimeout"])(()=>// TODO: Remove explicit type for viem@3
                        provider.request({
                            // `'wallet_revokePermissions'` added in `viem@2.10.3`
                            method: 'wallet_revokePermissions',
                            params: [
                                {
                                    eth_accounts: {}
                                }
                            ]
                        }), {
                        timeout: 100
                    });
                } catch (e) {}
                // Add shim signalling connector is disconnected
                if (shimDisconnect) {
                    var _config_storage1;
                    await ((_config_storage1 = config.storage) === null || _config_storage1 === void 0 ? void 0 : _config_storage1.setItem("".concat(this.id, ".disconnected"), true));
                }
                if (!parameters.target) await ((_config_storage = config.storage) === null || _config_storage === void 0 ? void 0 : _config_storage.removeItem('injected.connected'));
            },
            async getAccounts () {
                const provider = await this.getProvider();
                if (!provider) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$connector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderNotFoundError"]();
                const accounts = await provider.request({
                    method: 'eth_accounts'
                });
                return accounts.map((x)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(x));
            },
            async getChainId () {
                const provider = await this.getProvider();
                if (!provider) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$connector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderNotFoundError"]();
                const hexChainId = await provider.request({
                    method: 'eth_chainId'
                });
                return Number(hexChainId);
            },
            async getProvider () {
                if (typeof window === 'undefined') return undefined;
                let provider;
                const target = getTarget();
                if (typeof target.provider === 'function') provider = target.provider(window);
                else if (typeof target.provider === 'string') provider = findProvider(window, target.provider);
                else provider = target.provider;
                // Some wallets do not conform to EIP-1193 (e.g. Trust Wallet)
                // https://github.com/wevm/wagmi/issues/3526#issuecomment-1912683002
                if (provider && !provider.removeListener) {
                    // Try using `off` handler if it exists, otherwise noop
                    if ('off' in provider && typeof provider.off === 'function') provider.removeListener = provider.off;
                    else provider.removeListener = ()=>{};
                }
                return provider;
            },
            async isAuthorized () {
                try {
                    var _config_storage;
                    const isDisconnected = shimDisconnect && await ((_config_storage = config.storage) === null || _config_storage === void 0 ? void 0 : _config_storage.getItem("".concat(this.id, ".disconnected")));
                    if (isDisconnected) return false;
                    // Don't allow injected connector to connect if no target is set and it hasn't already connected
                    // (e.g. flag in storage is not set). This prevents a targetless injected connector from connecting
                    // automatically whenever there is a targeted connector configured.
                    if (!parameters.target) {
                        var _config_storage1;
                        const connected = await ((_config_storage1 = config.storage) === null || _config_storage1 === void 0 ? void 0 : _config_storage1.getItem('injected.connected'));
                        if (!connected) return false;
                    }
                    const provider = await this.getProvider();
                    if (!provider) {
                        if (unstable_shimAsyncInject !== undefined && unstable_shimAsyncInject !== false) {
                            // If no provider is found, check for async injection
                            // https://github.com/wevm/references/issues/167
                            // https://github.com/MetaMask/detect-provider
                            const handleEthereum = async ()=>{
                                if (typeof window !== 'undefined') window.removeEventListener('ethereum#initialized', handleEthereum);
                                const provider = await this.getProvider();
                                return !!provider;
                            };
                            const timeout = typeof unstable_shimAsyncInject === 'number' ? unstable_shimAsyncInject : 1_000;
                            const res = await Promise.race([
                                ...typeof window !== 'undefined' ? [
                                    new Promise((resolve)=>window.addEventListener('ethereum#initialized', ()=>resolve(handleEthereum()), {
                                            once: true
                                        }))
                                ] : [],
                                new Promise((resolve)=>setTimeout(()=>resolve(handleEthereum()), timeout))
                            ]);
                            if (res) return true;
                        }
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$connector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderNotFoundError"]();
                    }
                    // Use retry strategy as some injected wallets (e.g. MetaMask) fail to
                    // immediately resolve JSON-RPC requests on page load.
                    const accounts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withRetry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withRetry"])(()=>this.getAccounts());
                    return !!accounts.length;
                } catch (e) {
                    return false;
                }
            },
            async switchChain (param) {
                let { addEthereumChainParameter, chainId } = param;
                const provider = await this.getProvider();
                if (!provider) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$connector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderNotFoundError"]();
                const chain = config.chains.find((x)=>x.id === chainId);
                if (!chain) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchChainError"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainNotConfiguredError"]());
                const promise = new Promise((resolve)=>{
                    const listener = (data)=>{
                        if ('chainId' in data && data.chainId === chainId) {
                            config.emitter.off('change', listener);
                            resolve();
                        }
                    };
                    config.emitter.on('change', listener);
                });
                try {
                    await Promise.all([
                        provider.request({
                            method: 'wallet_switchEthereumChain',
                            params: [
                                {
                                    chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberToHex"])(chainId)
                                }
                            ]
                        })// During `'wallet_switchEthereumChain'`, MetaMask makes a `'net_version'` RPC call to the target chain.
                        // If this request fails, MetaMask does not emit the `'chainChanged'` event, but will still switch the chain.
                        // To counter this behavior, we request and emit the current chain ID to confirm the chain switch either via
                        // this callback or an externally emitted `'chainChanged'` event.
                        // https://github.com/MetaMask/metamask-extension/issues/24247
                        .then(async ()=>{
                            const currentChainId = await this.getChainId();
                            if (currentChainId === chainId) config.emitter.emit('change', {
                                chainId
                            });
                        }),
                        promise
                    ]);
                    return chain;
                } catch (err) {
                    var // Unwrapping for MetaMask Mobile
                    // https://github.com/MetaMask/metamask-mobile/issues/2944#issuecomment-976988719
                    _error_data_originalError, _error_data;
                    const error = err;
                    // Indicates chain is not added to provider
                    if (error.code === 4902 || (error === null || error === void 0 ? void 0 : (_error_data = error.data) === null || _error_data === void 0 ? void 0 : (_error_data_originalError = _error_data.originalError) === null || _error_data_originalError === void 0 ? void 0 : _error_data_originalError.code) === 4902) {
                        try {
                            var _addEthereumChainParameter_rpcUrls, _chain_rpcUrls_default;
                            var _chain_blockExplorers;
                            const { default: blockExplorer, ...blockExplorers } = (_chain_blockExplorers = chain.blockExplorers) !== null && _chain_blockExplorers !== void 0 ? _chain_blockExplorers : {};
                            let blockExplorerUrls;
                            if (addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.blockExplorerUrls) blockExplorerUrls = addEthereumChainParameter.blockExplorerUrls;
                            else if (blockExplorer) blockExplorerUrls = [
                                blockExplorer.url,
                                ...Object.values(blockExplorers).map((x)=>x.url)
                            ];
                            let rpcUrls;
                            var _chain_rpcUrls_default_http_;
                            if (addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : (_addEthereumChainParameter_rpcUrls = addEthereumChainParameter.rpcUrls) === null || _addEthereumChainParameter_rpcUrls === void 0 ? void 0 : _addEthereumChainParameter_rpcUrls.length) rpcUrls = addEthereumChainParameter.rpcUrls;
                            else rpcUrls = [
                                (_chain_rpcUrls_default_http_ = (_chain_rpcUrls_default = chain.rpcUrls.default) === null || _chain_rpcUrls_default === void 0 ? void 0 : _chain_rpcUrls_default.http[0]) !== null && _chain_rpcUrls_default_http_ !== void 0 ? _chain_rpcUrls_default_http_ : ''
                            ];
                            var _addEthereumChainParameter_chainName, _addEthereumChainParameter_nativeCurrency;
                            const addEthereumChain = {
                                blockExplorerUrls,
                                chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberToHex"])(chainId),
                                chainName: (_addEthereumChainParameter_chainName = addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.chainName) !== null && _addEthereumChainParameter_chainName !== void 0 ? _addEthereumChainParameter_chainName : chain.name,
                                iconUrls: addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.iconUrls,
                                nativeCurrency: (_addEthereumChainParameter_nativeCurrency = addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.nativeCurrency) !== null && _addEthereumChainParameter_nativeCurrency !== void 0 ? _addEthereumChainParameter_nativeCurrency : chain.nativeCurrency,
                                rpcUrls
                            };
                            await Promise.all([
                                provider.request({
                                    method: 'wallet_addEthereumChain',
                                    params: [
                                        addEthereumChain
                                    ]
                                }).then(async ()=>{
                                    const currentChainId = await this.getChainId();
                                    if (currentChainId === chainId) config.emitter.emit('change', {
                                        chainId
                                    });
                                    else throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](new Error('User rejected switch after adding network.'));
                                }),
                                promise
                            ]);
                            return chain;
                        } catch (error) {
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](error);
                        }
                    }
                    if (error.code === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"].code) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](error);
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchChainError"](error);
                }
            },
            async onAccountsChanged (accounts) {
                // Disconnect if there are no accounts
                if (accounts.length === 0) this.onDisconnect();
                else if (config.emitter.listenerCount('connect')) {
                    var _config_storage;
                    const chainId = (await this.getChainId()).toString();
                    this.onConnect({
                        chainId
                    });
                    // Remove disconnected shim if it exists
                    if (shimDisconnect) await ((_config_storage = config.storage) === null || _config_storage === void 0 ? void 0 : _config_storage.removeItem("".concat(this.id, ".disconnected")));
                } else config.emitter.emit('change', {
                    accounts: accounts.map((x)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(x))
                });
            },
            onChainChanged (chain) {
                const chainId = Number(chain);
                config.emitter.emit('change', {
                    chainId
                });
            },
            async onConnect (connectInfo) {
                const accounts = await this.getAccounts();
                if (accounts.length === 0) return;
                const chainId = Number(connectInfo.chainId);
                config.emitter.emit('connect', {
                    accounts,
                    chainId
                });
                // Manage EIP-1193 event listeners
                const provider = await this.getProvider();
                if (provider) {
                    if (connect) {
                        provider.removeListener('connect', connect);
                        connect = undefined;
                    }
                    if (!accountsChanged) {
                        accountsChanged = this.onAccountsChanged.bind(this);
                        provider.on('accountsChanged', accountsChanged);
                    }
                    if (!chainChanged) {
                        chainChanged = this.onChainChanged.bind(this);
                        provider.on('chainChanged', chainChanged);
                    }
                    if (!disconnect) {
                        disconnect = this.onDisconnect.bind(this);
                        provider.on('disconnect', disconnect);
                    }
                }
            },
            async onDisconnect (error) {
                const provider = await this.getProvider();
                // If MetaMask emits a `code: 1013` error, wait for reconnection before disconnecting
                // https://github.com/MetaMask/providers/pull/120
                if (error && error.code === 1013) {
                    if (provider && !!(await this.getAccounts()).length) return;
                }
                // No need to remove `${this.id}.disconnected` from storage because `onDisconnect` is typically
                // only called when the wallet is disconnected through the wallet's interface, meaning the wallet
                // actually disconnected and we don't need to simulate it.
                config.emitter.emit('disconnect');
                // Manage EIP-1193 event listeners
                if (provider) {
                    if (chainChanged) {
                        provider.removeListener('chainChanged', chainChanged);
                        chainChanged = undefined;
                    }
                    if (disconnect) {
                        provider.removeListener('disconnect', disconnect);
                        disconnect = undefined;
                    }
                    if (!connect) {
                        connect = this.onConnect.bind(this);
                        provider.on('connect', connect);
                    }
                }
            }
        }));
}
const targetMap = {
    coinbaseWallet: {
        id: 'coinbaseWallet',
        name: 'Coinbase Wallet',
        provider (window1) {
            if (window1 === null || window1 === void 0 ? void 0 : window1.coinbaseWalletExtension) return window1.coinbaseWalletExtension;
            return findProvider(window1, 'isCoinbaseWallet');
        }
    },
    metaMask: {
        id: 'metaMask',
        name: 'MetaMask',
        provider (window1) {
            return findProvider(window1, (provider)=>{
                if (!provider.isMetaMask) return false;
                // Brave tries to make itself look like MetaMask
                // Could also try RPC `web3_clientVersion` if following is unreliable
                if (provider.isBraveWallet && !provider._events && !provider._state) return false;
                // Other wallets that try to look like MetaMask
                const flags = [
                    'isApexWallet',
                    'isAvalanche',
                    'isBitKeep',
                    'isBlockWallet',
                    'isKuCoinWallet',
                    'isMathWallet',
                    'isOkxWallet',
                    'isOKExWallet',
                    'isOneInchIOSWallet',
                    'isOneInchAndroidWallet',
                    'isOpera',
                    'isPhantom',
                    'isPortal',
                    'isRabby',
                    'isTokenPocket',
                    'isTokenary',
                    'isUniswapWallet',
                    'isZerion'
                ];
                for (const flag of flags)if (provider[flag]) return false;
                return true;
            });
        }
    },
    phantom: {
        id: 'phantom',
        name: 'Phantom',
        provider (window1) {
            var _window_phantom, _window_phantom1;
            if (window1 === null || window1 === void 0 ? void 0 : (_window_phantom = window1.phantom) === null || _window_phantom === void 0 ? void 0 : _window_phantom.ethereum) return (_window_phantom1 = window1.phantom) === null || _window_phantom1 === void 0 ? void 0 : _window_phantom1.ethereum;
            return findProvider(window1, 'isPhantom');
        }
    }
};
function findProvider(window1, select) {
    function isProvider(provider) {
        if (typeof select === 'function') return select(provider);
        if (typeof select === 'string') return provider[select];
        return true;
    }
    const ethereum = window1.ethereum;
    if (ethereum === null || ethereum === void 0 ? void 0 : ethereum.providers) return ethereum.providers.find((provider)=>isProvider(provider));
    if (ethereum && isProvider(ethereum)) return ethereum;
    return undefined;
} //# sourceMappingURL=injected.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/createEmitter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Emitter",
    ()=>Emitter,
    "createEmitter",
    ()=>createEmitter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$eventemitter3$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/eventemitter3/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$eventemitter3$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EventEmitter$3e$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/eventemitter3/index.js [app-client] (ecmascript) <export default as EventEmitter>");
;
class Emitter {
    on(eventName, fn) {
        this._emitter.on(eventName, fn);
    }
    once(eventName, fn) {
        this._emitter.once(eventName, fn);
    }
    off(eventName, fn) {
        this._emitter.off(eventName, fn);
    }
    emit(eventName) {
        for(var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
            params[_key - 1] = arguments[_key];
        }
        const data = params[0];
        this._emitter.emit(eventName, {
            uid: this.uid,
            ...data
        });
    }
    listenerCount(eventName) {
        return this._emitter.listenerCount(eventName);
    }
    constructor(uid){
        Object.defineProperty(this, "uid", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: uid
        });
        Object.defineProperty(this, "_emitter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$eventemitter3$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EventEmitter$3e$__["EventEmitter"]()
        });
    }
}
function createEmitter(uid) {
    return new Emitter(uid);
} //# sourceMappingURL=createEmitter.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/utils/deserialize.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deserialize",
    ()=>deserialize
]);
function deserialize(value, reviver) {
    return JSON.parse(value, (key, value_)=>{
        let value = value_;
        if ((value === null || value === void 0 ? void 0 : value.__type) === 'bigint') value = BigInt(value.value);
        if ((value === null || value === void 0 ? void 0 : value.__type) === 'Map') value = new Map(value.value);
        var _reviver;
        return (_reviver = reviver === null || reviver === void 0 ? void 0 : reviver(key, value)) !== null && _reviver !== void 0 ? _reviver : value;
    });
} //# sourceMappingURL=deserialize.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/utils/serialize.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Get the reference key for the circular value
 *
 * @param keys the keys to build the reference key from
 * @param cutoff the maximum number of keys to include
 * @returns the reference key
 */ __turbopack_context__.s([
    "serialize",
    ()=>serialize
]);
function getReferenceKey(keys, cutoff) {
    return keys.slice(0, cutoff).join('.') || '.';
}
/**
 * Faster `Array.prototype.indexOf` implementation build for slicing / splicing
 *
 * @param array the array to match the value in
 * @param value the value to match
 * @returns the matching index, or -1
 */ function getCutoff(array, value) {
    const { length } = array;
    for(let index = 0; index < length; ++index){
        if (array[index] === value) {
            return index + 1;
        }
    }
    return 0;
}
/**
 * Create a replacer method that handles circular values
 *
 * @param [replacer] a custom replacer to use for non-circular values
 * @param [circularReplacer] a custom replacer to use for circular methods
 * @returns the value to stringify
 */ function createReplacer(replacer, circularReplacer) {
    const hasReplacer = typeof replacer === 'function';
    const hasCircularReplacer = typeof circularReplacer === 'function';
    const cache = [];
    const keys = [];
    return function replace(key, value) {
        if (typeof value === 'object') {
            if (cache.length) {
                const thisCutoff = getCutoff(cache, this);
                if (thisCutoff === 0) {
                    cache[cache.length] = this;
                } else {
                    cache.splice(thisCutoff);
                    keys.splice(thisCutoff);
                }
                keys[keys.length] = key;
                const valueCutoff = getCutoff(cache, value);
                if (valueCutoff !== 0) {
                    return hasCircularReplacer ? circularReplacer.call(this, key, value, getReferenceKey(keys, valueCutoff)) : "[ref=".concat(getReferenceKey(keys, valueCutoff), "]");
                }
            } else {
                cache[0] = value;
                keys[0] = key;
            }
        }
        return hasReplacer ? replacer.call(this, key, value) : value;
    };
}
function serialize(value, replacer, indent, circularReplacer) {
    return JSON.stringify(value, createReplacer((key, value_)=>{
        let value = value_;
        if (typeof value === 'bigint') value = {
            __type: 'bigint',
            value: value_.toString()
        };
        if (value instanceof Map) value = {
            __type: 'Map',
            value: Array.from(value_.entries())
        };
        var _replacer;
        return (_replacer = replacer === null || replacer === void 0 ? void 0 : replacer(key, value)) !== null && _replacer !== void 0 ? _replacer : value;
    }, circularReplacer), indent !== null && indent !== void 0 ? indent : undefined);
} //# sourceMappingURL=serialize.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/createStorage.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createStorage",
    ()=>createStorage,
    "getDefaultStorage",
    ()=>getDefaultStorage,
    "noopStorage",
    ()=>noopStorage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$deserialize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/utils/deserialize.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$serialize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/utils/serialize.js [app-client] (ecmascript)");
;
;
function createStorage(parameters) {
    const { deserialize = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$deserialize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deserialize"], key: prefix = 'wagmi', serialize = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$serialize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serialize"], storage = noopStorage } = parameters;
    function unwrap(value) {
        if (value instanceof Promise) return value.then((x)=>x).catch(()=>null);
        return value;
    }
    return {
        ...storage,
        key: prefix,
        async getItem (key, defaultValue) {
            const value = storage.getItem("".concat(prefix, ".").concat(key));
            const unwrapped = await unwrap(value);
            var _deserialize;
            if (unwrapped) return (_deserialize = deserialize(unwrapped)) !== null && _deserialize !== void 0 ? _deserialize : null;
            return defaultValue !== null && defaultValue !== void 0 ? defaultValue : null;
        },
        async setItem (key, value) {
            const storageKey = "".concat(prefix, ".").concat(key);
            if (value === null) await unwrap(storage.removeItem(storageKey));
            else await unwrap(storage.setItem(storageKey, serialize(value)));
        },
        async removeItem (key) {
            await unwrap(storage.removeItem("".concat(prefix, ".").concat(key)));
        }
    };
}
const noopStorage = {
    getItem: ()=>null,
    setItem: ()=>{},
    removeItem: ()=>{}
};
function getDefaultStorage() {
    const storage = (()=>{
        if (typeof window !== 'undefined' && window.localStorage) return window.localStorage;
        return noopStorage;
    })();
    return {
        getItem (key) {
            return storage.getItem(key);
        },
        removeItem (key) {
            storage.removeItem(key);
        },
        setItem (key, value) {
            try {
                storage.setItem(key, value);
            // silence errors by default (QuotaExceededError, SecurityError, etc.)
            } catch (e) {}
        }
    };
} //# sourceMappingURL=createStorage.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/utils/uid.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "uid",
    ()=>uid
]);
const size = 256;
let index = size;
let buffer;
function uid() {
    let length = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 11;
    if (!buffer || index + length > size * 2) {
        buffer = '';
        index = 0;
        for(let i = 0; i < size; i++){
            buffer += (256 + Math.random() * 256 | 0).toString(16).substring(1);
        }
    }
    return buffer.substring(index, index++ + length);
} //# sourceMappingURL=uid.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/createConfig.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createConfig",
    ()=>createConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$mipd$2f$dist$2f$esm$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/mipd/dist/esm/store.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/clients/createClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$node_modules$2f$zustand$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/node_modules/zustand/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$injected$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/connectors/injected.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createEmitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/createEmitter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/createStorage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/errors/config.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$uid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/utils/uid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/version.js [app-client] (ecmascript)");
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
function createConfig(parameters) {
    const { multiInjectedProviderDiscovery = true, storage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStorage"])({
        storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultStorage"])()
    }), syncConnectedChain = true, ssr = false, ...rest } = parameters;
    /////////////////////////////////////////////////////////////////////////////////////////////////
    // Set up connectors, clients, etc.
    /////////////////////////////////////////////////////////////////////////////////////////////////
    const mipd = typeof window !== 'undefined' && multiInjectedProviderDiscovery ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$mipd$2f$dist$2f$esm$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStore"])() : undefined;
    const chains = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$node_modules$2f$zustand$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStore"])(()=>rest.chains);
    const connectors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$node_modules$2f$zustand$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStore"])(()=>{
        const collection = [];
        const rdnsSet = new Set();
        var _rest_connectors;
        for (const connectorFns of (_rest_connectors = rest.connectors) !== null && _rest_connectors !== void 0 ? _rest_connectors : []){
            const connector = setup(connectorFns);
            collection.push(connector);
            if (!ssr && connector.rdns) {
                const rdnsValues = typeof connector.rdns === 'string' ? [
                    connector.rdns
                ] : connector.rdns;
                for (const rdns of rdnsValues){
                    rdnsSet.add(rdns);
                }
            }
        }
        if (!ssr && mipd) {
            const providers = mipd.getProviders();
            for (const provider of providers){
                if (rdnsSet.has(provider.info.rdns)) continue;
                collection.push(setup(providerDetailToConnector(provider)));
            }
        }
        return collection;
    });
    function setup(connectorFn) {
        var _connector_setup;
        // Set up emitter with uid and add to connector so they are "linked" together.
        const emitter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createEmitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEmitter"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$uid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uid"])());
        const connector = {
            ...connectorFn({
                emitter,
                chains: chains.getState(),
                storage,
                transports: rest.transports
            }),
            emitter,
            uid: emitter.uid
        };
        // Start listening for `connect` events on connector setup
        // This allows connectors to "connect" themselves without user interaction (e.g. MetaMask's "Manually connect to current site")
        emitter.on('connect', connect);
        (_connector_setup = connector.setup) === null || _connector_setup === void 0 ? void 0 : _connector_setup.call(connector);
        return connector;
    }
    function providerDetailToConnector(providerDetail) {
        const { info } = providerDetail;
        const provider = providerDetail.provider;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$injected$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["injected"])({
            target: {
                ...info,
                id: info.rdns,
                provider
            }
        });
    }
    const clients = new Map();
    function getClient() {
        let config = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var _config_chainId;
        const chainId = (_config_chainId = config.chainId) !== null && _config_chainId !== void 0 ? _config_chainId : store.getState().chainId;
        const chain = chains.getState().find((x)=>x.id === chainId);
        // chainId specified and not configured
        if (config.chainId && !chain) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainNotConfiguredError"]();
        {
            const client = clients.get(store.getState().chainId);
            if (client && !chain) return client;
            if (!chain) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainNotConfiguredError"]();
        }
        // If a memoized client exists for a chain id, use that.
        {
            const client = clients.get(chainId);
            if (client) return client;
        }
        let client;
        if (rest.client) client = rest.client({
            chain
        });
        else {
            const chainId = chain.id;
            const chainIds = chains.getState().map((x)=>x.id);
            // Grab all properties off `rest` and resolve for use in `createClient`
            const properties = {};
            const entries = Object.entries(rest);
            for (const [key, value] of entries){
                if (key === 'chains' || key === 'client' || key === 'connectors' || key === 'transports') continue;
                if (typeof value === 'object') {
                    // check if value is chainId-specific since some values can be objects
                    // e.g. { batch: { multicall: { batchSize: 1024 } } }
                    if (chainId in value) properties[key] = value[chainId];
                    else {
                        // check if value is chainId-specific, but does not have value for current chainId
                        const hasChainSpecificValue = chainIds.some((x)=>x in value);
                        if (hasChainSpecificValue) continue;
                        properties[key] = value;
                    }
                } else properties[key] = value;
            }
            var _properties_batch;
            client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])({
                ...properties,
                chain,
                batch: (_properties_batch = properties.batch) !== null && _properties_batch !== void 0 ? _properties_batch : {
                    multicall: true
                },
                transport: (parameters)=>rest.transports[chainId]({
                        ...parameters,
                        connectors
                    })
            });
        }
        clients.set(chainId, client);
        return client;
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////
    // Create store
    /////////////////////////////////////////////////////////////////////////////////////////////////
    function getInitialState() {
        return {
            chainId: chains.getState()[0].id,
            connections: new Map(),
            current: null,
            status: 'disconnected'
        };
    }
    let currentVersion;
    const prefix = '0.0.0-canary-';
    var _version_split_;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"].startsWith(prefix)) currentVersion = Number.parseInt(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"].replace(prefix, ''));
    else currentVersion = Number.parseInt((_version_split_ = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"].split('.')[0]) !== null && _version_split_ !== void 0 ? _version_split_ : '0');
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$node_modules$2f$zustand$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStore"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeWithSelector"])(// only use persist middleware if storage exists
    storage ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])(getInitialState, {
        migrate (persistedState, version) {
            if (version === currentVersion) return persistedState;
            const initialState = getInitialState();
            const chainId = validatePersistedChainId(persistedState, initialState.chainId);
            return {
                ...initialState,
                chainId
            };
        },
        name: 'store',
        partialize (state) {
            // Only persist "critical" store properties to preserve storage size.
            return {
                connections: {
                    __type: 'Map',
                    value: Array.from(state.connections.entries()).map((param)=>{
                        let [key, connection] = param;
                        const { id, name, type, uid } = connection.connector;
                        const connector = {
                            id,
                            name,
                            type,
                            uid
                        };
                        return [
                            key,
                            {
                                ...connection,
                                connector
                            }
                        ];
                    })
                },
                chainId: state.chainId,
                current: state.current
            };
        },
        merge (persistedState, currentState) {
            // `status` should not be persisted as it messes with reconnection
            if (typeof persistedState === 'object' && persistedState && 'status' in persistedState) delete persistedState.status;
            // Make sure persisted `chainId` is valid
            const chainId = validatePersistedChainId(persistedState, currentState.chainId);
            return {
                ...currentState,
                ...persistedState,
                chainId
            };
        },
        skipHydration: ssr,
        storage: storage,
        version: currentVersion
    }) : getInitialState));
    store.setState(getInitialState());
    function validatePersistedChainId(persistedState, defaultChainId) {
        return persistedState && typeof persistedState === 'object' && 'chainId' in persistedState && typeof persistedState.chainId === 'number' && chains.getState().some((x)=>x.id === persistedState.chainId) ? persistedState.chainId : defaultChainId;
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////
    // Subscribe to changes
    /////////////////////////////////////////////////////////////////////////////////////////////////
    // Update default chain when connector chain changes
    if (syncConnectedChain) store.subscribe((param)=>{
        let { connections, current } = param;
        var _connections_get;
        return current ? (_connections_get = connections.get(current)) === null || _connections_get === void 0 ? void 0 : _connections_get.chainId : undefined;
    }, (chainId)=>{
        // If chain is not configured, then don't switch over to it.
        const isChainConfigured = chains.getState().some((x)=>x.id === chainId);
        if (!isChainConfigured) return;
        return store.setState((x)=>({
                ...x,
                chainId: chainId !== null && chainId !== void 0 ? chainId : x.chainId
            }));
    });
    // EIP-6963 subscribe for new wallet providers
    mipd === null || mipd === void 0 ? void 0 : mipd.subscribe((providerDetails)=>{
        const connectorIdSet = new Set();
        const connectorRdnsSet = new Set();
        for (const connector of connectors.getState()){
            connectorIdSet.add(connector.id);
            if (connector.rdns) {
                const rdnsValues = typeof connector.rdns === 'string' ? [
                    connector.rdns
                ] : connector.rdns;
                for (const rdns of rdnsValues){
                    connectorRdnsSet.add(rdns);
                }
            }
        }
        const newConnectors = [];
        for (const providerDetail of providerDetails){
            if (connectorRdnsSet.has(providerDetail.info.rdns)) continue;
            const connector = setup(providerDetailToConnector(providerDetail));
            if (connectorIdSet.has(connector.id)) continue;
            newConnectors.push(connector);
        }
        if (storage && !store.persist.hasHydrated()) return;
        connectors.setState((x)=>[
                ...x,
                ...newConnectors
            ], true);
    });
    /////////////////////////////////////////////////////////////////////////////////////////////////
    // Emitter listeners
    /////////////////////////////////////////////////////////////////////////////////////////////////
    function change(data) {
        store.setState((x)=>{
            const connection = x.connections.get(data.uid);
            if (!connection) return x;
            var _data_accounts, _data_chainId;
            return {
                ...x,
                connections: new Map(x.connections).set(data.uid, {
                    accounts: (_data_accounts = data.accounts) !== null && _data_accounts !== void 0 ? _data_accounts : connection.accounts,
                    chainId: (_data_chainId = data.chainId) !== null && _data_chainId !== void 0 ? _data_chainId : connection.chainId,
                    connector: connection.connector
                })
            };
        });
    }
    function connect(data) {
        // Disable handling if reconnecting/connecting
        if (store.getState().status === 'connecting' || store.getState().status === 'reconnecting') return;
        store.setState((x)=>{
            const connector = connectors.getState().find((x)=>x.uid === data.uid);
            if (!connector) return x;
            if (connector.emitter.listenerCount('connect')) connector.emitter.off('connect', change);
            if (!connector.emitter.listenerCount('change')) connector.emitter.on('change', change);
            if (!connector.emitter.listenerCount('disconnect')) connector.emitter.on('disconnect', disconnect);
            return {
                ...x,
                connections: new Map(x.connections).set(data.uid, {
                    accounts: data.accounts,
                    chainId: data.chainId,
                    connector: connector
                }),
                current: data.uid,
                status: 'connected'
            };
        });
    }
    function disconnect(data) {
        store.setState((x)=>{
            const connection = x.connections.get(data.uid);
            if (connection) {
                const connector = connection.connector;
                if (connector.emitter.listenerCount('change')) connection.connector.emitter.off('change', change);
                if (connector.emitter.listenerCount('disconnect')) connection.connector.emitter.off('disconnect', disconnect);
                if (!connector.emitter.listenerCount('connect')) connection.connector.emitter.on('connect', connect);
            }
            x.connections.delete(data.uid);
            if (x.connections.size === 0) return {
                ...x,
                connections: new Map(),
                current: null,
                status: 'disconnected'
            };
            const nextConnection = x.connections.values().next().value;
            return {
                ...x,
                connections: new Map(x.connections),
                current: nextConnection.connector.uid
            };
        });
    }
    return {
        get chains () {
            return chains.getState();
        },
        get connectors () {
            return connectors.getState();
        },
        storage,
        getClient,
        get state () {
            return store.getState();
        },
        setState (value) {
            let newState;
            if (typeof value === 'function') newState = value(store.getState());
            else newState = value;
            // Reset state if it got set to something not matching the base state
            const initialState = getInitialState();
            if (typeof newState !== 'object') newState = initialState;
            const isCorrupt = Object.keys(initialState).some((x)=>!(x in newState));
            if (isCorrupt) newState = initialState;
            store.setState(newState, true);
        },
        subscribe (selector, listener, options) {
            return store.subscribe(selector, listener, options ? {
                ...options,
                fireImmediately: options.emitImmediately
            } : undefined);
        },
        _internal: {
            mipd,
            async revalidate () {
                // Check connections to see if they are still active
                const state = store.getState();
                const connections = state.connections;
                let current = state.current;
                for (const [, connection] of connections){
                    const connector = connection.connector;
                    // check if `connect.isAuthorized` exists
                    // partial connectors in storage do not have it
                    const isAuthorized = connector.isAuthorized ? await connector.isAuthorized() : false;
                    if (isAuthorized) continue;
                    // Remove stale connection
                    connections.delete(connector.uid);
                    if (current === connector.uid) current = null;
                }
                // set connections
                store.setState((x)=>({
                        ...x,
                        connections,
                        current
                    }));
            },
            store,
            ssr: Boolean(ssr),
            syncConnectedChain,
            transports: rest.transports,
            chains: {
                setState (value) {
                    const nextChains = typeof value === 'function' ? value(chains.getState()) : value;
                    if (nextChains.length === 0) return;
                    return chains.setState(nextChains, true);
                },
                subscribe (listener) {
                    return chains.subscribe(listener);
                }
            },
            connectors: {
                providerDetailToConnector,
                setup: setup,
                setState (value) {
                    return connectors.setState(typeof value === 'function' ? value(connectors.getState()) : value, true);
                },
                subscribe (listener) {
                    return connectors.subscribe(listener);
                }
            },
            events: {
                change,
                connect,
                disconnect
            }
        }
    };
} //# sourceMappingURL=createConfig.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/utils/extractRpcUrls.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractRpcUrls",
    ()=>extractRpcUrls
]);
function extractRpcUrls(parameters) {
    var _parameters_transports_chain_id, _parameters_transports, _transport_value;
    const { chain } = parameters;
    const fallbackUrl = chain.rpcUrls.default.http[0];
    if (!parameters.transports) return [
        fallbackUrl
    ];
    const transport = (_parameters_transports = parameters.transports) === null || _parameters_transports === void 0 ? void 0 : (_parameters_transports_chain_id = _parameters_transports[chain.id]) === null || _parameters_transports_chain_id === void 0 ? void 0 : _parameters_transports_chain_id.call(_parameters_transports, {
        chain
    });
    const transports = (transport === null || transport === void 0 ? void 0 : (_transport_value = transport.value) === null || _transport_value === void 0 ? void 0 : _transport_value.transports) || [
        transport
    ];
    return transports.map((param)=>{
        let { value } = param;
        return (value === null || value === void 0 ? void 0 : value.url) || fallbackUrl;
    });
} //# sourceMappingURL=extractRpcUrls.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/wagmi/dist/esm/hydrate.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Hydrate",
    ()=>Hydrate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$hydrate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/hydrate.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
function Hydrate(parameters) {
    const { children, config, initialState, reconnectOnMount = true } = parameters;
    const { onMount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$hydrate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hydrate"])(config, {
        initialState,
        reconnectOnMount
    });
    // Hydrate for non-SSR
    if (!config._internal.ssr) onMount();
    // Hydrate for SSR
    const active = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    // biome-ignore lint/correctness/useExhaustiveDependencies: `queryKey` not required
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Hydrate.useEffect": ()=>{
            if (!active.current) return;
            if (!config._internal.ssr) return;
            onMount();
            return ({
                "Hydrate.useEffect": ()=>{
                    active.current = false;
                }
            })["Hydrate.useEffect"];
        }
    }["Hydrate.useEffect"], []);
    return children;
} //# sourceMappingURL=hydrate.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/wagmi/dist/esm/context.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WagmiContext",
    ()=>WagmiContext,
    "WagmiProvider",
    ()=>WagmiProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hydrate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/wagmi/dist/esm/hydrate.js [app-client] (ecmascript)");
'use client';
;
;
const WagmiContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function WagmiProvider(parameters) {
    const { children, config } = parameters;
    const props = {
        value: config
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hydrate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Hydrate"], parameters, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(WagmiContext.Provider, props, children));
} //# sourceMappingURL=context.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/stringify.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "stringify",
    ()=>stringify
]);
const stringify = (value, replacer, space)=>JSON.stringify(value, (key, value_)=>{
        const value = typeof value_ === 'bigint' ? value_.toString() : value_;
        return typeof replacer === 'function' ? replacer(key, value) : value;
    }, space); //# sourceMappingURL=stringify.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/version.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "version",
    ()=>version
]);
const version = '2.36.0'; //# sourceMappingURL=version.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseError",
    ()=>BaseError,
    "setErrorConfig",
    ()=>setErrorConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/version.js [app-client] (ecmascript)");
;
let errorConfig = {
    getDocsUrl: (param)=>{
        let { docsBaseUrl, docsPath = '', docsSlug } = param;
        return docsPath ? "".concat(docsBaseUrl !== null && docsBaseUrl !== void 0 ? docsBaseUrl : 'https://viem.sh').concat(docsPath).concat(docsSlug ? "#".concat(docsSlug) : '') : undefined;
    },
    version: "viem@".concat(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"])
};
function setErrorConfig(config) {
    errorConfig = config;
}
class BaseError extends Error {
    walk(fn) {
        return walk(this, fn);
    }
    constructor(shortMessage, args = {}){
        var _errorConfig_getDocsUrl;
        const details = (()=>{
            var _args_cause;
            if (args.cause instanceof BaseError) return args.cause.details;
            if ((_args_cause = args.cause) === null || _args_cause === void 0 ? void 0 : _args_cause.message) return args.cause.message;
            return args.details;
        })();
        const docsPath = (()=>{
            if (args.cause instanceof BaseError) return args.cause.docsPath || args.docsPath;
            return args.docsPath;
        })();
        const docsUrl = (_errorConfig_getDocsUrl = errorConfig.getDocsUrl) === null || _errorConfig_getDocsUrl === void 0 ? void 0 : _errorConfig_getDocsUrl.call(errorConfig, {
            ...args,
            docsPath
        });
        const message = [
            shortMessage || 'An error occurred.',
            '',
            ...args.metaMessages ? [
                ...args.metaMessages,
                ''
            ] : [],
            ...docsUrl ? [
                "Docs: ".concat(docsUrl)
            ] : [],
            ...details ? [
                "Details: ".concat(details)
            ] : [],
            ...errorConfig.version ? [
                "Version: ".concat(errorConfig.version)
            ] : []
        ].join('\n');
        super(message, args.cause ? {
            cause: args.cause
        } : undefined);
        Object.defineProperty(this, "details", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "docsPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "metaMessages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "shortMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "version", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'BaseError'
        });
        this.details = details;
        this.docsPath = docsPath;
        this.metaMessages = args.metaMessages;
        var _args_name;
        this.name = (_args_name = args.name) !== null && _args_name !== void 0 ? _args_name : this.name;
        this.shortMessage = shortMessage;
        this.version = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"];
    }
}
function walk(err, fn) {
    if (fn === null || fn === void 0 ? void 0 : fn(err)) return err;
    if (err && typeof err === 'object' && 'cause' in err && err.cause !== undefined) return walk(err.cause, fn);
    return fn ? null : err;
} //# sourceMappingURL=base.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getContractAddress",
    ()=>getContractAddress,
    "getUrl",
    ()=>getUrl
]);
const getContractAddress = (address)=>address;
const getUrl = (url)=>url; //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/request.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HttpRequestError",
    ()=>HttpRequestError,
    "RpcRequestError",
    ()=>RpcRequestError,
    "SocketClosedError",
    ()=>SocketClosedError,
    "TimeoutError",
    ()=>TimeoutError,
    "WebSocketRequestError",
    ()=>WebSocketRequestError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/stringify.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/utils.js [app-client] (ecmascript)");
;
;
;
class HttpRequestError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ body, cause, details, headers, status, url }){
        super('HTTP request failed.', {
            cause,
            details,
            metaMessages: [
                status && "Status: ".concat(status),
                "URL: ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUrl"])(url)),
                body && "Request body: ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(body))
            ].filter(Boolean),
            name: 'HttpRequestError'
        });
        Object.defineProperty(this, "body", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.body = body;
        this.headers = headers;
        this.status = status;
        this.url = url;
    }
}
class WebSocketRequestError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ body, cause, details, url }){
        super('WebSocket request failed.', {
            cause,
            details,
            metaMessages: [
                "URL: ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUrl"])(url)),
                body && "Request body: ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(body))
            ].filter(Boolean),
            name: 'WebSocketRequestError'
        });
    }
}
class RpcRequestError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ body, error, url }){
        super('RPC Request failed.', {
            cause: error,
            details: error.message,
            metaMessages: [
                "URL: ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUrl"])(url)),
                "Request body: ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(body))
            ],
            name: 'RpcRequestError'
        });
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.code = error.code;
        this.data = error.data;
    }
}
class SocketClosedError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ url } = {}){
        super('The socket has been closed.', {
            metaMessages: [
                url && "URL: ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUrl"])(url))
            ].filter(Boolean),
            name: 'SocketClosedError'
        });
    }
}
class TimeoutError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ body, url }){
        super('The request took too long to respond.', {
            details: 'The request timed out.',
            metaMessages: [
                "URL: ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUrl"])(url)),
                "Request body: ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(body))
            ],
            name: 'TimeoutError'
        });
    }
} //# sourceMappingURL=request.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/transport.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UrlRequiredError",
    ()=>UrlRequiredError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)");
;
class UrlRequiredError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(){
        super('No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.', {
            docsPath: '/docs/clients/intro',
            name: 'UrlRequiredError'
        });
    }
} //# sourceMappingURL=transport.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/promise/withResolvers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** @internal */ __turbopack_context__.s([
    "withResolvers",
    ()=>withResolvers
]);
function withResolvers() {
    let resolve = ()=>undefined;
    let reject = ()=>undefined;
    const promise = new Promise((resolve_, reject_)=>{
        resolve = resolve_;
        reject = reject_;
    });
    return {
        promise,
        resolve,
        reject
    };
} //# sourceMappingURL=withResolvers.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/promise/createBatchScheduler.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBatchScheduler",
    ()=>createBatchScheduler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withResolvers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/promise/withResolvers.js [app-client] (ecmascript)");
;
const schedulerCache = /*#__PURE__*/ new Map();
function createBatchScheduler(param) {
    let { fn, id, shouldSplitBatch, wait = 0, sort } = param;
    const exec = async ()=>{
        const scheduler = getScheduler();
        flush();
        const args = scheduler.map((param)=>{
            let { args } = param;
            return args;
        });
        if (args.length === 0) return;
        fn(args).then((data)=>{
            if (sort && Array.isArray(data)) data.sort(sort);
            for(let i = 0; i < scheduler.length; i++){
                const { resolve } = scheduler[i];
                resolve === null || resolve === void 0 ? void 0 : resolve([
                    data[i],
                    data
                ]);
            }
        }).catch((err)=>{
            for(let i = 0; i < scheduler.length; i++){
                const { reject } = scheduler[i];
                reject === null || reject === void 0 ? void 0 : reject(err);
            }
        });
    };
    const flush = ()=>schedulerCache.delete(id);
    const getBatchedArgs = ()=>getScheduler().map((param)=>{
            let { args } = param;
            return args;
        });
    const getScheduler = ()=>schedulerCache.get(id) || [];
    const setScheduler = (item)=>schedulerCache.set(id, [
            ...getScheduler(),
            item
        ]);
    return {
        flush,
        async schedule (args) {
            const { promise, resolve, reject } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withResolvers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withResolvers"])();
            const split = shouldSplitBatch === null || shouldSplitBatch === void 0 ? void 0 : shouldSplitBatch([
                ...getBatchedArgs(),
                args
            ]);
            if (split) exec();
            const hasActiveScheduler = getScheduler().length > 0;
            if (hasActiveScheduler) {
                setScheduler({
                    args,
                    resolve,
                    reject
                });
                return promise;
            }
            setScheduler({
                args,
                resolve,
                reject
            });
            setTimeout(exec, wait);
            return promise;
        }
    };
} //# sourceMappingURL=createBatchScheduler.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/promise/withTimeout.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "withTimeout",
    ()=>withTimeout
]);
function withTimeout(fn, param) {
    let { errorInstance = new Error('timed out'), timeout, signal } = param;
    return new Promise((resolve, reject)=>{
        ;
        (async ()=>{
            let timeoutId;
            try {
                const controller = new AbortController();
                if (timeout > 0) {
                    timeoutId = setTimeout(()=>{
                        if (signal) {
                            controller.abort();
                        } else {
                            reject(errorInstance);
                        }
                    }, timeout); // need to cast because bun globals.d.ts overrides @types/node
                }
                resolve(await fn({
                    signal: (controller === null || controller === void 0 ? void 0 : controller.signal) || null
                }));
            } catch (err) {
                if ((err === null || err === void 0 ? void 0 : err.name) === 'AbortError') reject(errorInstance);
                reject(err);
            } finally{
                clearTimeout(timeoutId);
            }
        })();
    });
} //# sourceMappingURL=withTimeout.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/rpc/id.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "idCache",
    ()=>idCache
]);
function createIdStore() {
    return {
        current: 0,
        take () {
            return this.current++;
        },
        reset () {
            this.current = 0;
        }
    };
}
const idCache = /*#__PURE__*/ createIdStore(); //# sourceMappingURL=id.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/rpc/http.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getHttpRpcClient",
    ()=>getHttpRpcClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/request.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/promise/withTimeout.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/stringify.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$rpc$2f$id$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/rpc/id.js [app-client] (ecmascript)");
;
;
;
;
function getHttpRpcClient(url) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return {
        async request (params) {
            var _options_timeout;
            const { body, onRequest = options.onRequest, onResponse = options.onResponse, timeout = (_options_timeout = options.timeout) !== null && _options_timeout !== void 0 ? _options_timeout : 10_000 } = params;
            var _options_fetchOptions, _params_fetchOptions;
            const fetchOptions = {
                ...(_options_fetchOptions = options.fetchOptions) !== null && _options_fetchOptions !== void 0 ? _options_fetchOptions : {},
                ...(_params_fetchOptions = params.fetchOptions) !== null && _params_fetchOptions !== void 0 ? _params_fetchOptions : {}
            };
            const { headers, method, signal: signal_ } = fetchOptions;
            try {
                var _response_headers_get;
                const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withTimeout"])(async (param)=>{
                    let { signal } = param;
                    var _body_id;
                    const init = {
                        ...fetchOptions,
                        body: Array.isArray(body) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(body.map((body)=>{
                            var _body_id;
                            return {
                                jsonrpc: '2.0',
                                id: (_body_id = body.id) !== null && _body_id !== void 0 ? _body_id : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$rpc$2f$id$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["idCache"].take(),
                                ...body
                            };
                        })) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])({
                            jsonrpc: '2.0',
                            id: (_body_id = body.id) !== null && _body_id !== void 0 ? _body_id : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$rpc$2f$id$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["idCache"].take(),
                            ...body
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                            ...headers
                        },
                        method: method || 'POST',
                        signal: signal_ || (timeout > 0 ? signal : null)
                    };
                    const request = new Request(url, init);
                    var _ref;
                    const args = (_ref = await (onRequest === null || onRequest === void 0 ? void 0 : onRequest(request, init))) !== null && _ref !== void 0 ? _ref : {
                        ...init,
                        url
                    };
                    var _args_url;
                    const response = await fetch((_args_url = args.url) !== null && _args_url !== void 0 ? _args_url : url, args);
                    return response;
                }, {
                    errorInstance: new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TimeoutError"]({
                        body,
                        url
                    }),
                    timeout,
                    signal: true
                });
                if (onResponse) await onResponse(response);
                let data;
                if ((_response_headers_get = response.headers.get('Content-Type')) === null || _response_headers_get === void 0 ? void 0 : _response_headers_get.startsWith('application/json')) data = await response.json();
                else {
                    data = await response.text();
                    try {
                        data = JSON.parse(data || '{}');
                    } catch (err) {
                        if (response.ok) throw err;
                        data = {
                            error: data
                        };
                    }
                }
                if (!response.ok) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HttpRequestError"]({
                        body,
                        details: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(data.error) || response.statusText,
                        headers: response.headers,
                        status: response.status,
                        url
                    });
                }
                return data;
            } catch (err) {
                if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HttpRequestError"]) throw err;
                if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TimeoutError"]) throw err;
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HttpRequestError"]({
                    body,
                    cause: err,
                    url
                });
            }
        }
    };
} //# sourceMappingURL=http.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/rpc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AtomicReadyWalletRejectedUpgradeError",
    ()=>AtomicReadyWalletRejectedUpgradeError,
    "AtomicityNotSupportedError",
    ()=>AtomicityNotSupportedError,
    "BundleTooLargeError",
    ()=>BundleTooLargeError,
    "ChainDisconnectedError",
    ()=>ChainDisconnectedError,
    "DuplicateIdError",
    ()=>DuplicateIdError,
    "InternalRpcError",
    ()=>InternalRpcError,
    "InvalidInputRpcError",
    ()=>InvalidInputRpcError,
    "InvalidParamsRpcError",
    ()=>InvalidParamsRpcError,
    "InvalidRequestRpcError",
    ()=>InvalidRequestRpcError,
    "JsonRpcVersionUnsupportedError",
    ()=>JsonRpcVersionUnsupportedError,
    "LimitExceededRpcError",
    ()=>LimitExceededRpcError,
    "MethodNotFoundRpcError",
    ()=>MethodNotFoundRpcError,
    "MethodNotSupportedRpcError",
    ()=>MethodNotSupportedRpcError,
    "ParseRpcError",
    ()=>ParseRpcError,
    "ProviderDisconnectedError",
    ()=>ProviderDisconnectedError,
    "ProviderRpcError",
    ()=>ProviderRpcError,
    "ResourceNotFoundRpcError",
    ()=>ResourceNotFoundRpcError,
    "ResourceUnavailableRpcError",
    ()=>ResourceUnavailableRpcError,
    "RpcError",
    ()=>RpcError,
    "SwitchChainError",
    ()=>SwitchChainError,
    "TransactionRejectedRpcError",
    ()=>TransactionRejectedRpcError,
    "UnauthorizedProviderError",
    ()=>UnauthorizedProviderError,
    "UnknownBundleIdError",
    ()=>UnknownBundleIdError,
    "UnknownRpcError",
    ()=>UnknownRpcError,
    "UnsupportedChainIdError",
    ()=>UnsupportedChainIdError,
    "UnsupportedNonOptionalCapabilityError",
    ()=>UnsupportedNonOptionalCapabilityError,
    "UnsupportedProviderMethodError",
    ()=>UnsupportedProviderMethodError,
    "UserRejectedRequestError",
    ()=>UserRejectedRequestError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/request.js [app-client] (ecmascript)");
;
;
const unknownErrorCode = -1;
class RpcError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(cause, { code, docsPath, metaMessages, name, shortMessage }){
        super(shortMessage, {
            cause,
            docsPath,
            metaMessages: metaMessages || (cause === null || cause === void 0 ? void 0 : cause.metaMessages),
            name: name || 'RpcError'
        });
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = name || cause.name;
        this.code = cause instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RpcRequestError"] ? cause.code : code !== null && code !== void 0 ? code : unknownErrorCode;
    }
}
class ProviderRpcError extends RpcError {
    constructor(cause, options){
        super(cause, options);
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.data = options.data;
    }
}
class ParseRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: ParseRpcError.code,
            name: 'ParseRpcError',
            shortMessage: 'Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.'
        });
    }
}
Object.defineProperty(ParseRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32700
});
class InvalidRequestRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: InvalidRequestRpcError.code,
            name: 'InvalidRequestRpcError',
            shortMessage: 'JSON is not a valid request object.'
        });
    }
}
Object.defineProperty(InvalidRequestRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32600
});
class MethodNotFoundRpcError extends RpcError {
    constructor(cause, { method } = {}){
        super(cause, {
            code: MethodNotFoundRpcError.code,
            name: 'MethodNotFoundRpcError',
            shortMessage: "The method".concat(method ? ' "'.concat(method, '"') : '', " does not exist / is not available.")
        });
    }
}
Object.defineProperty(MethodNotFoundRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32601
});
class InvalidParamsRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: InvalidParamsRpcError.code,
            name: 'InvalidParamsRpcError',
            shortMessage: [
                'Invalid parameters were provided to the RPC method.',
                'Double check you have provided the correct parameters.'
            ].join('\n')
        });
    }
}
Object.defineProperty(InvalidParamsRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32602
});
class InternalRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: InternalRpcError.code,
            name: 'InternalRpcError',
            shortMessage: 'An internal error was received.'
        });
    }
}
Object.defineProperty(InternalRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32603
});
class InvalidInputRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: InvalidInputRpcError.code,
            name: 'InvalidInputRpcError',
            shortMessage: [
                'Missing or invalid parameters.',
                'Double check you have provided the correct parameters.'
            ].join('\n')
        });
    }
}
Object.defineProperty(InvalidInputRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32000
});
class ResourceNotFoundRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: ResourceNotFoundRpcError.code,
            name: 'ResourceNotFoundRpcError',
            shortMessage: 'Requested resource not found.'
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'ResourceNotFoundRpcError'
        });
    }
}
Object.defineProperty(ResourceNotFoundRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32001
});
class ResourceUnavailableRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: ResourceUnavailableRpcError.code,
            name: 'ResourceUnavailableRpcError',
            shortMessage: 'Requested resource not available.'
        });
    }
}
Object.defineProperty(ResourceUnavailableRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32002
});
class TransactionRejectedRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: TransactionRejectedRpcError.code,
            name: 'TransactionRejectedRpcError',
            shortMessage: 'Transaction creation failed.'
        });
    }
}
Object.defineProperty(TransactionRejectedRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32003
});
class MethodNotSupportedRpcError extends RpcError {
    constructor(cause, { method } = {}){
        super(cause, {
            code: MethodNotSupportedRpcError.code,
            name: 'MethodNotSupportedRpcError',
            shortMessage: "Method".concat(method ? ' "'.concat(method, '"') : '', " is not supported.")
        });
    }
}
Object.defineProperty(MethodNotSupportedRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32004
});
class LimitExceededRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: LimitExceededRpcError.code,
            name: 'LimitExceededRpcError',
            shortMessage: 'Request exceeds defined limit.'
        });
    }
}
Object.defineProperty(LimitExceededRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32005
});
class JsonRpcVersionUnsupportedError extends RpcError {
    constructor(cause){
        super(cause, {
            code: JsonRpcVersionUnsupportedError.code,
            name: 'JsonRpcVersionUnsupportedError',
            shortMessage: 'Version of JSON-RPC protocol is not supported.'
        });
    }
}
Object.defineProperty(JsonRpcVersionUnsupportedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32006
});
class UserRejectedRequestError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: UserRejectedRequestError.code,
            name: 'UserRejectedRequestError',
            shortMessage: 'User rejected the request.'
        });
    }
}
Object.defineProperty(UserRejectedRequestError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4001
});
class UnauthorizedProviderError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: UnauthorizedProviderError.code,
            name: 'UnauthorizedProviderError',
            shortMessage: 'The requested method and/or account has not been authorized by the user.'
        });
    }
}
Object.defineProperty(UnauthorizedProviderError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4100
});
class UnsupportedProviderMethodError extends ProviderRpcError {
    constructor(cause, { method } = {}){
        super(cause, {
            code: UnsupportedProviderMethodError.code,
            name: 'UnsupportedProviderMethodError',
            shortMessage: "The Provider does not support the requested method".concat(method ? ' " '.concat(method, '"') : '', ".")
        });
    }
}
Object.defineProperty(UnsupportedProviderMethodError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4200
});
class ProviderDisconnectedError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: ProviderDisconnectedError.code,
            name: 'ProviderDisconnectedError',
            shortMessage: 'The Provider is disconnected from all chains.'
        });
    }
}
Object.defineProperty(ProviderDisconnectedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4900
});
class ChainDisconnectedError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: ChainDisconnectedError.code,
            name: 'ChainDisconnectedError',
            shortMessage: 'The Provider is not connected to the requested chain.'
        });
    }
}
Object.defineProperty(ChainDisconnectedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4901
});
class SwitchChainError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: SwitchChainError.code,
            name: 'SwitchChainError',
            shortMessage: 'An error occurred when attempting to switch chain.'
        });
    }
}
Object.defineProperty(SwitchChainError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4902
});
class UnsupportedNonOptionalCapabilityError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: UnsupportedNonOptionalCapabilityError.code,
            name: 'UnsupportedNonOptionalCapabilityError',
            shortMessage: 'This Wallet does not support a capability that was not marked as optional.'
        });
    }
}
Object.defineProperty(UnsupportedNonOptionalCapabilityError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5700
});
class UnsupportedChainIdError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: UnsupportedChainIdError.code,
            name: 'UnsupportedChainIdError',
            shortMessage: 'This Wallet does not support the requested chain ID.'
        });
    }
}
Object.defineProperty(UnsupportedChainIdError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5710
});
class DuplicateIdError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: DuplicateIdError.code,
            name: 'DuplicateIdError',
            shortMessage: 'There is already a bundle submitted with this ID.'
        });
    }
}
Object.defineProperty(DuplicateIdError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5720
});
class UnknownBundleIdError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: UnknownBundleIdError.code,
            name: 'UnknownBundleIdError',
            shortMessage: 'This bundle id is unknown / has not been submitted'
        });
    }
}
Object.defineProperty(UnknownBundleIdError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5730
});
class BundleTooLargeError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: BundleTooLargeError.code,
            name: 'BundleTooLargeError',
            shortMessage: 'The call bundle is too large for the Wallet to process.'
        });
    }
}
Object.defineProperty(BundleTooLargeError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5740
});
class AtomicReadyWalletRejectedUpgradeError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: AtomicReadyWalletRejectedUpgradeError.code,
            name: 'AtomicReadyWalletRejectedUpgradeError',
            shortMessage: 'The Wallet can support atomicity after an upgrade, but the user rejected the upgrade.'
        });
    }
}
Object.defineProperty(AtomicReadyWalletRejectedUpgradeError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5750
});
class AtomicityNotSupportedError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: AtomicityNotSupportedError.code,
            name: 'AtomicityNotSupportedError',
            shortMessage: 'The wallet does not support atomic execution but the request requires it.'
        });
    }
}
Object.defineProperty(AtomicityNotSupportedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5760
});
class UnknownRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            name: 'UnknownRpcError',
            shortMessage: 'An unknown RPC error occurred.'
        });
    }
} //# sourceMappingURL=rpc.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/encoding.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IntegerOutOfRangeError",
    ()=>IntegerOutOfRangeError,
    "InvalidBytesBooleanError",
    ()=>InvalidBytesBooleanError,
    "InvalidHexBooleanError",
    ()=>InvalidHexBooleanError,
    "InvalidHexValueError",
    ()=>InvalidHexValueError,
    "SizeOverflowError",
    ()=>SizeOverflowError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)");
;
class IntegerOutOfRangeError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ max, min, signed, size, value }){
        super('Number "'.concat(value, '" is not in safe ').concat(size ? "".concat(size * 8, "-bit ").concat(signed ? 'signed' : 'unsigned', " ") : '', "integer range ").concat(max ? "(".concat(min, " to ").concat(max, ")") : "(above ".concat(min, ")")), {
            name: 'IntegerOutOfRangeError'
        });
    }
}
class InvalidBytesBooleanError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(bytes){
        super('Bytes value "'.concat(bytes, '" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.'), {
            name: 'InvalidBytesBooleanError'
        });
    }
}
class InvalidHexBooleanError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(hex){
        super('Hex value "'.concat(hex, '" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).'), {
            name: 'InvalidHexBooleanError'
        });
    }
}
class InvalidHexValueError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(value){
        super('Hex value "'.concat(value, '" is an odd length (').concat(value.length, "). It must be an even length."), {
            name: 'InvalidHexValueError'
        });
    }
}
class SizeOverflowError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ givenSize, maxSize }){
        super("Size cannot exceed ".concat(maxSize, " bytes. Given size: ").concat(givenSize, " bytes."), {
            name: 'SizeOverflowError'
        });
    }
} //# sourceMappingURL=encoding.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/data.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvalidBytesLengthError",
    ()=>InvalidBytesLengthError,
    "SizeExceedsPaddingSizeError",
    ()=>SizeExceedsPaddingSizeError,
    "SliceOffsetOutOfBoundsError",
    ()=>SliceOffsetOutOfBoundsError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)");
;
class SliceOffsetOutOfBoundsError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ offset, position, size }){
        super("Slice ".concat(position === 'start' ? 'starting' : 'ending', ' at offset "').concat(offset, '" is out-of-bounds (size: ').concat(size, ")."), {
            name: 'SliceOffsetOutOfBoundsError'
        });
    }
}
class SizeExceedsPaddingSizeError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ size, targetSize, type }){
        super("".concat(type.charAt(0).toUpperCase()).concat(type.slice(1).toLowerCase(), " size (").concat(size, ") exceeds padding size (").concat(targetSize, ")."), {
            name: 'SizeExceedsPaddingSizeError'
        });
    }
}
class InvalidBytesLengthError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ size, targetSize, type }){
        super("".concat(type.charAt(0).toUpperCase()).concat(type.slice(1).toLowerCase(), " is expected to be ").concat(targetSize, " ").concat(type, " long, but is ").concat(size, " ").concat(type, " long."), {
            name: 'InvalidBytesLengthError'
        });
    }
} //# sourceMappingURL=data.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/data/pad.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pad",
    ()=>pad,
    "padBytes",
    ()=>padBytes,
    "padHex",
    ()=>padHex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/data.js [app-client] (ecmascript)");
;
function pad(hexOrBytes) {
    let { dir, size = 32 } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (typeof hexOrBytes === 'string') return padHex(hexOrBytes, {
        dir,
        size
    });
    return padBytes(hexOrBytes, {
        dir,
        size
    });
}
function padHex(hex_) {
    let { dir, size = 32 } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (size === null) return hex_;
    const hex = hex_.replace('0x', '');
    if (hex.length > size * 2) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SizeExceedsPaddingSizeError"]({
        size: Math.ceil(hex.length / 2),
        targetSize: size,
        type: 'hex'
    });
    return "0x".concat(hex[dir === 'right' ? 'padEnd' : 'padStart'](size * 2, '0'));
}
function padBytes(bytes) {
    let { dir, size = 32 } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (size === null) return bytes;
    if (bytes.length > size) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SizeExceedsPaddingSizeError"]({
        size: bytes.length,
        targetSize: size,
        type: 'bytes'
    });
    const paddedBytes = new Uint8Array(size);
    for(let i = 0; i < size; i++){
        const padEnd = dir === 'right';
        paddedBytes[padEnd ? i : size - i - 1] = bytes[padEnd ? i : bytes.length - i - 1];
    }
    return paddedBytes;
} //# sourceMappingURL=pad.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/data/isHex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isHex",
    ()=>isHex
]);
function isHex(value) {
    let { strict = true } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!value) return false;
    if (typeof value !== 'string') return false;
    return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith('0x');
} //# sourceMappingURL=isHex.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/data/size.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "size",
    ()=>size
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/data/isHex.js [app-client] (ecmascript)");
;
function size(value) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(value, {
        strict: false
    })) return Math.ceil((value.length - 2) / 2);
    return value.length;
} //# sourceMappingURL=size.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/data/trim.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "trim",
    ()=>trim
]);
function trim(hexOrBytes) {
    let { dir = 'left' } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let data = typeof hexOrBytes === 'string' ? hexOrBytes.replace('0x', '') : hexOrBytes;
    let sliceLength = 0;
    for(let i = 0; i < data.length - 1; i++){
        if (data[dir === 'left' ? i : data.length - i - 1].toString() === '0') sliceLength++;
        else break;
    }
    data = dir === 'left' ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
    if (typeof hexOrBytes === 'string') {
        if (data.length === 1 && dir === 'right') data = "".concat(data, "0");
        return "0x".concat(data.length % 2 === 1 ? "0".concat(data) : data);
    }
    return data;
} //# sourceMappingURL=trim.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/encoding/toBytes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "boolToBytes",
    ()=>boolToBytes,
    "hexToBytes",
    ()=>hexToBytes,
    "numberToBytes",
    ()=>numberToBytes,
    "stringToBytes",
    ()=>stringToBytes,
    "toBytes",
    ()=>toBytes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/data/isHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/data/pad.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/encoding/fromHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
;
;
;
;
;
const encoder = /*#__PURE__*/ new TextEncoder();
function toBytes(value) {
    let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (typeof value === 'number' || typeof value === 'bigint') return numberToBytes(value, opts);
    if (typeof value === 'boolean') return boolToBytes(value, opts);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(value)) return hexToBytes(value, opts);
    return stringToBytes(value, opts);
}
function boolToBytes(value) {
    let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const bytes = new Uint8Array(1);
    bytes[0] = Number(value);
    if (typeof opts.size === 'number') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertSize"])(bytes, {
            size: opts.size
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])(bytes, {
            size: opts.size
        });
    }
    return bytes;
}
// We use very optimized technique to convert hex string to byte array
const charCodeMap = {
    zero: 48,
    nine: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102
};
function charCodeToBase16(char) {
    if (char >= charCodeMap.zero && char <= charCodeMap.nine) return char - charCodeMap.zero;
    if (char >= charCodeMap.A && char <= charCodeMap.F) return char - (charCodeMap.A - 10);
    if (char >= charCodeMap.a && char <= charCodeMap.f) return char - (charCodeMap.a - 10);
    return undefined;
}
function hexToBytes(hex_) {
    let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let hex = hex_;
    if (opts.size) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertSize"])(hex, {
            size: opts.size
        });
        hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])(hex, {
            dir: 'right',
            size: opts.size
        });
    }
    let hexString = hex.slice(2);
    if (hexString.length % 2) hexString = "0".concat(hexString);
    const length = hexString.length / 2;
    const bytes = new Uint8Array(length);
    for(let index = 0, j = 0; index < length; index++){
        const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
        const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
        if (nibbleLeft === undefined || nibbleRight === undefined) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"]('Invalid byte sequence ("'.concat(hexString[j - 2]).concat(hexString[j - 1], '" in "').concat(hexString, '").'));
        }
        bytes[index] = nibbleLeft * 16 + nibbleRight;
    }
    return bytes;
}
function numberToBytes(value, opts) {
    const hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberToHex"])(value, opts);
    return hexToBytes(hex);
}
function stringToBytes(value) {
    let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const bytes = encoder.encode(value);
    if (typeof opts.size === 'number') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertSize"])(bytes, {
            size: opts.size
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])(bytes, {
            dir: 'right',
            size: opts.size
        });
    }
    return bytes;
} //# sourceMappingURL=toBytes.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/encoding/fromHex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assertSize",
    ()=>assertSize,
    "fromHex",
    ()=>fromHex,
    "hexToBigInt",
    ()=>hexToBigInt,
    "hexToBool",
    ()=>hexToBool,
    "hexToNumber",
    ()=>hexToNumber,
    "hexToString",
    ()=>hexToString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/encoding.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/data/size.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/data/trim.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/encoding/toBytes.js [app-client] (ecmascript)");
;
;
;
;
function assertSize(hexOrBytes, param) {
    let { size } = param;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["size"])(hexOrBytes) > size) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SizeOverflowError"]({
        givenSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["size"])(hexOrBytes),
        maxSize: size
    });
}
function fromHex(hex, toOrOpts) {
    const opts = typeof toOrOpts === 'string' ? {
        to: toOrOpts
    } : toOrOpts;
    const to = opts.to;
    if (to === 'number') return hexToNumber(hex, opts);
    if (to === 'bigint') return hexToBigInt(hex, opts);
    if (to === 'string') return hexToString(hex, opts);
    if (to === 'boolean') return hexToBool(hex, opts);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexToBytes"])(hex, opts);
}
function hexToBigInt(hex) {
    let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const { signed } = opts;
    if (opts.size) assertSize(hex, {
        size: opts.size
    });
    const value = BigInt(hex);
    if (!signed) return value;
    const size = (hex.length - 2) / 2;
    const max = (1n << BigInt(size) * 8n - 1n) - 1n;
    if (value <= max) return value;
    return value - BigInt("0x".concat('f'.padStart(size * 2, 'f'))) - 1n;
}
function hexToBool(hex_) {
    let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let hex = hex_;
    if (opts.size) {
        assertSize(hex, {
            size: opts.size
        });
        hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trim"])(hex);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trim"])(hex) === '0x00') return false;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trim"])(hex) === '0x01') return true;
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidHexBooleanError"](hex);
}
function hexToNumber(hex) {
    let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return Number(hexToBigInt(hex, opts));
}
function hexToString(hex) {
    let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexToBytes"])(hex);
    if (opts.size) {
        assertSize(bytes, {
            size: opts.size
        });
        bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trim"])(bytes, {
            dir: 'right'
        });
    }
    return new TextDecoder().decode(bytes);
} //# sourceMappingURL=fromHex.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "boolToHex",
    ()=>boolToHex,
    "bytesToHex",
    ()=>bytesToHex,
    "numberToHex",
    ()=>numberToHex,
    "stringToHex",
    ()=>stringToHex,
    "toHex",
    ()=>toHex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/encoding.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/data/pad.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/encoding/fromHex.js [app-client] (ecmascript)");
;
;
;
const hexes = /*#__PURE__*/ Array.from({
    length: 256
}, (_v, i)=>i.toString(16).padStart(2, '0'));
function toHex(value) {
    let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (typeof value === 'number' || typeof value === 'bigint') return numberToHex(value, opts);
    if (typeof value === 'string') {
        return stringToHex(value, opts);
    }
    if (typeof value === 'boolean') return boolToHex(value, opts);
    return bytesToHex(value, opts);
}
function boolToHex(value) {
    let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const hex = "0x".concat(Number(value));
    if (typeof opts.size === 'number') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertSize"])(hex, {
            size: opts.size
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])(hex, {
            size: opts.size
        });
    }
    return hex;
}
function bytesToHex(value) {
    let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let string = '';
    for(let i = 0; i < value.length; i++){
        string += hexes[value[i]];
    }
    const hex = "0x".concat(string);
    if (typeof opts.size === 'number') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertSize"])(hex, {
            size: opts.size
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])(hex, {
            dir: 'right',
            size: opts.size
        });
    }
    return hex;
}
function numberToHex(value_) {
    let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const { signed, size } = opts;
    const value = BigInt(value_);
    let maxValue;
    if (size) {
        if (signed) maxValue = (1n << BigInt(size) * 8n - 1n) - 1n;
        else maxValue = 2n ** (BigInt(size) * 8n) - 1n;
    } else if (typeof value_ === 'number') {
        maxValue = BigInt(Number.MAX_SAFE_INTEGER);
    }
    const minValue = typeof maxValue === 'bigint' && signed ? -maxValue - 1n : 0;
    if (maxValue && value > maxValue || value < minValue) {
        const suffix = typeof value_ === 'bigint' ? 'n' : '';
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IntegerOutOfRangeError"]({
            max: maxValue ? "".concat(maxValue).concat(suffix) : undefined,
            min: "".concat(minValue).concat(suffix),
            signed,
            size,
            value: "".concat(value_).concat(suffix)
        });
    }
    const hex = "0x".concat((signed && value < 0 ? (1n << BigInt(size * 8)) + BigInt(value) : value).toString(16));
    if (size) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])(hex, {
        size
    });
    return hex;
}
const encoder = /*#__PURE__*/ new TextEncoder();
function stringToHex(value_) {
    let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const value = encoder.encode(value_);
    return bytesToHex(value, opts);
} //# sourceMappingURL=toHex.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/lru.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Map with a LRU (Least recently used) policy.
 *
 * @link https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU
 */ __turbopack_context__.s([
    "LruMap",
    ()=>LruMap
]);
class LruMap extends Map {
    get(key) {
        const value = super.get(key);
        if (super.has(key) && value !== undefined) {
            this.delete(key);
            super.set(key, value);
        }
        return value;
    }
    set(key, value) {
        super.set(key, value);
        if (this.maxSize && this.size > this.maxSize) {
            const firstKey = this.keys().next().value;
            if (firstKey) this.delete(firstKey);
        }
        return this;
    }
    constructor(size){
        super();
        Object.defineProperty(this, "maxSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.maxSize = size;
    }
} //# sourceMappingURL=lru.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/promise/withDedupe.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "promiseCache",
    ()=>promiseCache,
    "withDedupe",
    ()=>withDedupe
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$lru$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/lru.js [app-client] (ecmascript)");
;
const promiseCache = /*#__PURE__*/ new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$lru$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LruMap"](8192);
function withDedupe(fn, param) {
    let { enabled = true, id } = param;
    if (!enabled || !id) return fn();
    if (promiseCache.get(id)) return promiseCache.get(id);
    const promise = fn().finally(()=>promiseCache.delete(id));
    promiseCache.set(id, promise);
    return promise;
} //# sourceMappingURL=withDedupe.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/wait.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wait",
    ()=>wait
]);
async function wait(time) {
    return new Promise((res)=>setTimeout(res, time));
} //# sourceMappingURL=wait.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/promise/withRetry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "withRetry",
    ()=>withRetry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$wait$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/wait.js [app-client] (ecmascript)");
;
function withRetry(fn) {
    let { delay: delay_ = 100, retryCount = 2, shouldRetry = ()=>true } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return new Promise((resolve, reject)=>{
        const attemptRetry = async function() {
            let { count = 0 } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            const retry = async (param)=>{
                let { error } = param;
                const delay = typeof delay_ === 'function' ? delay_({
                    count,
                    error
                }) : delay_;
                if (delay) await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$wait$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wait"])(delay);
                attemptRetry({
                    count: count + 1
                });
            };
            try {
                const data = await fn();
                resolve(data);
            } catch (err) {
                if (count < retryCount && await shouldRetry({
                    count,
                    error: err
                })) return retry({
                    error: err
                });
                reject(err);
            }
        };
        attemptRetry();
    });
} //# sourceMappingURL=withRetry.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/buildRequest.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildRequest",
    ()=>buildRequest,
    "shouldRetry",
    ()=>shouldRetry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/request.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withDedupe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/promise/withDedupe.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withRetry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/promise/withRetry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/stringify.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
function buildRequest(request) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return async function(args) {
        let overrideOptions = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var _methods_exclude;
        const { dedupe = false, methods, retryDelay = 150, retryCount = 3, uid } = {
            ...options,
            ...overrideOptions
        };
        const { method } = args;
        if (methods === null || methods === void 0 ? void 0 : (_methods_exclude = methods.exclude) === null || _methods_exclude === void 0 ? void 0 : _methods_exclude.includes(method)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MethodNotSupportedRpcError"](new Error('method not supported'), {
            method
        });
        if ((methods === null || methods === void 0 ? void 0 : methods.include) && !methods.include.includes(method)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MethodNotSupportedRpcError"](new Error('method not supported'), {
            method
        });
        const requestId = dedupe ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringToHex"])("".concat(uid, ".").concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(args))) : undefined;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withDedupe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withDedupe"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withRetry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withRetry"])(async ()=>{
                try {
                    return await request(args);
                } catch (err_) {
                    const err = err_;
                    switch(err.code){
                        // -32700
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseRpcError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseRpcError"](err);
                        // -32600
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidRequestRpcError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidRequestRpcError"](err);
                        // -32601
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MethodNotFoundRpcError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MethodNotFoundRpcError"](err, {
                                method: args.method
                            });
                        // -32602
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidParamsRpcError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidParamsRpcError"](err);
                        // -32603
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InternalRpcError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InternalRpcError"](err);
                        // -32000
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidInputRpcError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidInputRpcError"](err);
                        // -32001
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResourceNotFoundRpcError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResourceNotFoundRpcError"](err);
                        // -32002
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResourceUnavailableRpcError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResourceUnavailableRpcError"](err);
                        // -32003
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TransactionRejectedRpcError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TransactionRejectedRpcError"](err);
                        // -32004
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MethodNotSupportedRpcError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MethodNotSupportedRpcError"](err, {
                                method: args.method
                            });
                        // -32005
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LimitExceededRpcError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LimitExceededRpcError"](err);
                        // -32006
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcVersionUnsupportedError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcVersionUnsupportedError"](err);
                        // 4001
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](err);
                        // 4100
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnauthorizedProviderError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnauthorizedProviderError"](err);
                        // 4200
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnsupportedProviderMethodError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnsupportedProviderMethodError"](err);
                        // 4900
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderDisconnectedError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderDisconnectedError"](err);
                        // 4901
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainDisconnectedError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainDisconnectedError"](err);
                        // 4902
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchChainError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchChainError"](err);
                        // 5700
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnsupportedNonOptionalCapabilityError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnsupportedNonOptionalCapabilityError"](err);
                        // 5710
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnsupportedChainIdError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnsupportedChainIdError"](err);
                        // 5720
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DuplicateIdError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DuplicateIdError"](err);
                        // 5730
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnknownBundleIdError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnknownBundleIdError"](err);
                        // 5740
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BundleTooLargeError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BundleTooLargeError"](err);
                        // 5750
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AtomicReadyWalletRejectedUpgradeError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AtomicReadyWalletRejectedUpgradeError"](err);
                        // 5760
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AtomicityNotSupportedError"].code:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AtomicityNotSupportedError"](err);
                        // CAIP-25: User Rejected Error
                        // https://docs.walletconnect.com/2.0/specs/clients/sign/error-codes#rejected-caip-25
                        case 5000:
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](err);
                        default:
                            if (err_ instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"]) throw err_;
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnknownRpcError"](err);
                    }
                }
            }, {
                delay: (param)=>{
                    let { count, error } = param;
                    // If we find a Retry-After header, let's retry after the given time.
                    if (error && error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HttpRequestError"]) {
                        var _error_headers;
                        const retryAfter = error === null || error === void 0 ? void 0 : (_error_headers = error.headers) === null || _error_headers === void 0 ? void 0 : _error_headers.get('Retry-After');
                        if (retryAfter === null || retryAfter === void 0 ? void 0 : retryAfter.match(/\d/)) return Number.parseInt(retryAfter, 10) * 1000;
                    }
                    // Otherwise, let's retry with an exponential backoff.
                    return ~~(1 << count) * retryDelay;
                },
                retryCount,
                shouldRetry: (param)=>{
                    let { error } = param;
                    return shouldRetry(error);
                }
            }), {
            enabled: dedupe,
            id: requestId
        });
    };
}
function shouldRetry(error) {
    if ('code' in error && typeof error.code === 'number') {
        if (error.code === -1) return true; // Unknown error
        if (error.code === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LimitExceededRpcError"].code) return true;
        if (error.code === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InternalRpcError"].code) return true;
        return false;
    }
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HttpRequestError"] && error.status) {
        // Forbidden
        if (error.status === 403) return true;
        // Request Timeout
        if (error.status === 408) return true;
        // Request Entity Too Large
        if (error.status === 413) return true;
        // Too Many Requests
        if (error.status === 429) return true;
        // Internal Server Error
        if (error.status === 500) return true;
        // Bad Gateway
        if (error.status === 502) return true;
        // Service Unavailable
        if (error.status === 503) return true;
        // Gateway Timeout
        if (error.status === 504) return true;
        return false;
    }
    return true;
} //# sourceMappingURL=buildRequest.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/uid.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "uid",
    ()=>uid
]);
const size = 256;
let index = size;
let buffer;
function uid() {
    let length = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 11;
    if (!buffer || index + length > size * 2) {
        buffer = '';
        index = 0;
        for(let i = 0; i < size; i++){
            buffer += (256 + Math.random() * 256 | 0).toString(16).substring(1);
        }
    }
    return buffer.substring(index, index++ + length);
} //# sourceMappingURL=uid.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/clients/transports/createTransport.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createTransport",
    ()=>createTransport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$buildRequest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/buildRequest.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$uid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/uid.js [app-client] (ecmascript)");
;
;
function createTransport(param, value) {
    let { key, methods, name, request, retryCount = 3, retryDelay = 150, timeout, type } = param;
    const uid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$uid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uid"])();
    return {
        config: {
            key,
            methods,
            name,
            request,
            retryCount,
            retryDelay,
            timeout,
            type
        },
        request: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$buildRequest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildRequest"])(request, {
            methods,
            retryCount,
            retryDelay,
            uid
        }),
        value
    };
} //# sourceMappingURL=createTransport.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/clients/transports/http.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "http",
    ()=>http
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/request.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$transport$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/transport.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$createBatchScheduler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/promise/createBatchScheduler.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$rpc$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/rpc/http.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$createTransport$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/clients/transports/createTransport.js [app-client] (ecmascript)");
;
;
;
;
;
function http(/** URL of the JSON-RPC API. Defaults to the chain's public RPC URL. */ url) {
    let config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const { batch, fetchOptions, key = 'http', methods, name = 'HTTP JSON-RPC', onFetchRequest, onFetchResponse, retryDelay, raw } = config;
    return (param)=>{
        let { chain, retryCount: retryCount_, timeout: timeout_ } = param;
        const { batchSize = 1000, wait = 0 } = typeof batch === 'object' ? batch : {};
        var _config_retryCount;
        const retryCount = (_config_retryCount = config.retryCount) !== null && _config_retryCount !== void 0 ? _config_retryCount : retryCount_;
        var _ref;
        const timeout = (_ref = timeout_ !== null && timeout_ !== void 0 ? timeout_ : config.timeout) !== null && _ref !== void 0 ? _ref : 10_000;
        const url_ = url || (chain === null || chain === void 0 ? void 0 : chain.rpcUrls.default.http[0]);
        if (!url_) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$transport$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UrlRequiredError"]();
        const rpcClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$rpc$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHttpRpcClient"])(url_, {
            fetchOptions,
            onRequest: onFetchRequest,
            onResponse: onFetchResponse,
            timeout
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$createTransport$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTransport"])({
            key,
            methods,
            name,
            async request (param) {
                let { method, params } = param;
                const body = {
                    method,
                    params
                };
                const { schedule } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$createBatchScheduler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBatchScheduler"])({
                    id: url_,
                    wait,
                    shouldSplitBatch (requests) {
                        return requests.length > batchSize;
                    },
                    fn: (body)=>rpcClient.request({
                            body
                        }),
                    sort: (a, b)=>a.id - b.id
                });
                const fn = async (body)=>batch ? schedule(body) : [
                        await rpcClient.request({
                            body
                        })
                    ];
                const [{ error, result }] = await fn(body);
                if (raw) return {
                    error,
                    result
                };
                if (error) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RpcRequestError"]({
                    body,
                    error,
                    url: url_
                });
                return result;
            },
            retryCount,
            retryDelay,
            timeout,
            type: 'http'
        }, {
            fetchOptions,
            url: url_
        });
    };
} //# sourceMappingURL=http.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/accounts/utils/parseAccount.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseAccount",
    ()=>parseAccount
]);
function parseAccount(account) {
    if (typeof account === 'string') return {
        address: account,
        type: 'json-rpc'
    };
    return account;
} //# sourceMappingURL=parseAccount.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/clients/createClient.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient,
    "rpcSchema",
    ()=>rpcSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$utils$2f$parseAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/accounts/utils/parseAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$uid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/uid.js [app-client] (ecmascript)");
;
;
function createClient(parameters) {
    const { batch, chain, ccipRead, key = 'base', name = 'Base Client', type = 'base' } = parameters;
    var _parameters_experimental_blockTag;
    const experimental_blockTag = (_parameters_experimental_blockTag = parameters.experimental_blockTag) !== null && _parameters_experimental_blockTag !== void 0 ? _parameters_experimental_blockTag : typeof (chain === null || chain === void 0 ? void 0 : chain.experimental_preconfirmationTime) === 'number' ? 'pending' : undefined;
    var _chain_blockTime;
    const blockTime = (_chain_blockTime = chain === null || chain === void 0 ? void 0 : chain.blockTime) !== null && _chain_blockTime !== void 0 ? _chain_blockTime : 12_000;
    const defaultPollingInterval = Math.min(Math.max(Math.floor(blockTime / 2), 500), 4_000);
    var _parameters_pollingInterval;
    const pollingInterval = (_parameters_pollingInterval = parameters.pollingInterval) !== null && _parameters_pollingInterval !== void 0 ? _parameters_pollingInterval : defaultPollingInterval;
    var _parameters_cacheTime;
    const cacheTime = (_parameters_cacheTime = parameters.cacheTime) !== null && _parameters_cacheTime !== void 0 ? _parameters_cacheTime : pollingInterval;
    const account = parameters.account ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$utils$2f$parseAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAccount"])(parameters.account) : undefined;
    const { config, request, value } = parameters.transport({
        chain,
        pollingInterval
    });
    const transport = {
        ...config,
        ...value
    };
    const client = {
        account,
        batch,
        cacheTime,
        ccipRead,
        chain,
        key,
        name,
        pollingInterval,
        request,
        transport,
        type,
        uid: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$uid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uid"])(),
        ...experimental_blockTag ? {
            experimental_blockTag
        } : {}
    };
    function extend(base) {
        return (extendFn)=>{
            const extended = extendFn(base);
            for(const key in client)delete extended[key];
            const combined = {
                ...base,
                ...extended
            };
            return Object.assign(combined, {
                extend: extend(combined)
            });
        };
    }
    return Object.assign(client, {
        extend: extend(client)
    });
}
function rpcSchema() {
    return null;
} //# sourceMappingURL=createClient.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/address.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvalidAddressError",
    ()=>InvalidAddressError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)");
;
class InvalidAddressError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ address }){
        super('Address "'.concat(address, '" is invalid.'), {
            metaMessages: [
                '- Address must be a hex value of 20 bytes (40 hex characters).',
                '- Address must match its checksum counterpart.'
            ],
            name: 'InvalidAddressError'
        });
    }
} //# sourceMappingURL=address.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/hash/keccak256.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "keccak256",
    ()=>keccak256
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@noble/hashes/esm/sha3.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/data/isHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/encoding/toBytes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
;
;
;
;
function keccak256(value, to_) {
    const to = to_ || 'hex';
    const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak_256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(value, {
        strict: false
    }) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBytes"])(value) : value);
    if (to === 'bytes') return bytes;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(bytes);
} //# sourceMappingURL=keccak256.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/address/isAddress.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isAddress",
    ()=>isAddress,
    "isAddressCache",
    ()=>isAddressCache
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$lru$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/lru.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/address/getAddress.js [app-client] (ecmascript)");
;
;
const addressRegex = /^0x[a-fA-F0-9]{40}$/;
const isAddressCache = /*#__PURE__*/ new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$lru$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LruMap"](8192);
function isAddress(address, options) {
    const { strict = true } = options !== null && options !== void 0 ? options : {};
    const cacheKey = "".concat(address, ".").concat(strict);
    if (isAddressCache.has(cacheKey)) return isAddressCache.get(cacheKey);
    const result = (()=>{
        if (!addressRegex.test(address)) return false;
        if (address.toLowerCase() === address) return true;
        if (strict) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checksumAddress"])(address) === address;
        return true;
    })();
    isAddressCache.set(cacheKey, result);
    return result;
} //# sourceMappingURL=isAddress.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/address/getAddress.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checksumAddress",
    ()=>checksumAddress,
    "getAddress",
    ()=>getAddress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/encoding/toBytes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/hash/keccak256.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$lru$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/lru.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/address/isAddress.js [app-client] (ecmascript)");
;
;
;
;
;
const checksumAddressCache = /*#__PURE__*/ new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$lru$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LruMap"](8192);
function checksumAddress(address_, /**
 * Warning: EIP-1191 checksum addresses are generally not backwards compatible with the
 * wider Ethereum ecosystem, meaning it will break when validated against an application/tool
 * that relies on EIP-55 checksum encoding (checksum without chainId).
 *
 * It is highly recommended to not use this feature unless you
 * know what you are doing.
 *
 * See more: https://github.com/ethereum/EIPs/issues/1121
 */ chainId) {
    if (checksumAddressCache.has("".concat(address_, ".").concat(chainId))) return checksumAddressCache.get("".concat(address_, ".").concat(chainId));
    const hexAddress = chainId ? "".concat(chainId).concat(address_.toLowerCase()) : address_.substring(2).toLowerCase();
    const hash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringToBytes"])(hexAddress), 'bytes');
    const address = (chainId ? hexAddress.substring("".concat(chainId, "0x").length) : hexAddress).split('');
    for(let i = 0; i < 40; i += 2){
        if (hash[i >> 1] >> 4 >= 8 && address[i]) {
            address[i] = address[i].toUpperCase();
        }
        if ((hash[i >> 1] & 0x0f) >= 8 && address[i + 1]) {
            address[i + 1] = address[i + 1].toUpperCase();
        }
    }
    const result = "0x".concat(address.join(''));
    checksumAddressCache.set("".concat(address_, ".").concat(chainId), result);
    return result;
}
function getAddress(address, /**
 * Warning: EIP-1191 checksum addresses are generally not backwards compatible with the
 * wider Ethereum ecosystem, meaning it will break when validated against an application/tool
 * that relies on EIP-55 checksum encoding (checksum without chainId).
 *
 * It is highly recommended to not use this feature unless you
 * know what you are doing.
 *
 * See more: https://github.com/ethereum/EIPs/issues/1121
 */ chainId) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAddress"])(address, {
        strict: false
    })) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidAddressError"]({
        address
    });
    return checksumAddress(address, chainId);
} //# sourceMappingURL=getAddress.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/chain/defineChain.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defineChain",
    ()=>defineChain
]);
function defineChain(chain) {
    return {
        formatters: undefined,
        fees: undefined,
        serializers: undefined,
        ...chain
    };
} //# sourceMappingURL=defineChain.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/chains/definitions/holesky.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "holesky",
    ()=>holesky
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$chain$2f$defineChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/chain/defineChain.js [app-client] (ecmascript)");
;
const holesky = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$chain$2f$defineChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])({
    id: 17000,
    name: 'Holesky',
    nativeCurrency: {
        name: 'Holesky Ether',
        symbol: 'ETH',
        decimals: 18
    },
    rpcUrls: {
        default: {
            http: [
                'https://ethereum-holesky-rpc.publicnode.com'
            ]
        }
    },
    blockExplorers: {
        default: {
            name: 'Etherscan',
            url: 'https://holesky.etherscan.io',
            apiUrl: 'https://api-holesky.etherscan.io/api'
        }
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 77
        },
        ensUniversalResolver: {
            address: '0xeeeeeeee14d718c2b47d9923deab1335e144eeee',
            blockCreated: 4_295_055
        }
    },
    testnet: true
}); //# sourceMappingURL=holesky.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/mipd/dist/esm/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Announces an EIP-1193 Provider.
 */ __turbopack_context__.s([
    "announceProvider",
    ()=>announceProvider,
    "requestProviders",
    ()=>requestProviders
]);
function announceProvider(detail) {
    const event = new CustomEvent('eip6963:announceProvider', {
        detail: Object.freeze(detail)
    });
    window.dispatchEvent(event);
    const handler = ()=>window.dispatchEvent(event);
    window.addEventListener('eip6963:requestProvider', handler);
    return ()=>window.removeEventListener('eip6963:requestProvider', handler);
}
function requestProviders(listener) {
    if (typeof window === 'undefined') return;
    const handler = (event)=>listener(event.detail);
    window.addEventListener('eip6963:announceProvider', handler);
    window.dispatchEvent(new CustomEvent('eip6963:requestProvider'));
    return ()=>window.removeEventListener('eip6963:announceProvider', handler);
} //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/mipd/dist/esm/store.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createStore",
    ()=>createStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$mipd$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/mipd/dist/esm/utils.js [app-client] (ecmascript)");
;
function createStore() {
    const listeners = new Set();
    let providerDetails = [];
    const request = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$mipd$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestProviders"])((providerDetail)=>{
            if (providerDetails.some((param)=>{
                let { info } = param;
                return info.uuid === providerDetail.info.uuid;
            })) return;
            providerDetails = [
                ...providerDetails,
                providerDetail
            ];
            listeners.forEach((listener)=>listener(providerDetails, {
                    added: [
                        providerDetail
                    ]
                }));
        });
    let unwatch = request();
    return {
        _listeners () {
            return listeners;
        },
        clear () {
            listeners.forEach((listener)=>listener([], {
                    removed: [
                        ...providerDetails
                    ]
                }));
            providerDetails = [];
        },
        destroy () {
            this.clear();
            listeners.clear();
            unwatch === null || unwatch === void 0 ? void 0 : unwatch();
        },
        findProvider (param) {
            let { rdns } = param;
            return providerDetails.find((providerDetail)=>providerDetail.info.rdns === rdns);
        },
        getProviders () {
            return providerDetails;
        },
        reset () {
            this.clear();
            unwatch === null || unwatch === void 0 ? void 0 : unwatch();
            unwatch = request();
        },
        subscribe (listener) {
            let { emitImmediately } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            listeners.add(listener);
            if (emitImmediately) listener(providerDetails, {
                added: providerDetails
            });
            return ()=>listeners.delete(listener);
        }
    };
} //# sourceMappingURL=store.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "combine",
    ()=>combine,
    "createJSONStorage",
    ()=>createJSONStorage,
    "devtools",
    ()=>devtools,
    "persist",
    ()=>persist,
    "redux",
    ()=>redux,
    "subscribeWithSelector",
    ()=>subscribeWithSelector
]);
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/node_modules/zustand/esm/middleware.mjs")}`;
    }
};
const reduxImpl = (reducer, initial)=>(set, _get, api)=>{
        api.dispatch = (action)=>{
            set((state)=>reducer(state, action), false, action);
            return action;
        };
        api.dispatchFromDevtools = true;
        return {
            dispatch: function() {
                for(var _len = arguments.length, a = new Array(_len), _key = 0; _key < _len; _key++){
                    a[_key] = arguments[_key];
                }
                return api.dispatch(...a);
            },
            ...initial
        };
    };
const redux = reduxImpl;
const trackedConnections = /* @__PURE__ */ new Map();
const getTrackedConnectionState = (name)=>{
    const api = trackedConnections.get(name);
    if (!api) return {};
    return Object.fromEntries(Object.entries(api.stores).map((param)=>{
        let [key, api2] = param;
        return [
            key,
            api2.getState()
        ];
    }));
};
const extractConnectionInformation = (store, extensionConnector, options)=>{
    if (store === void 0) {
        return {
            type: "untracked",
            connection: extensionConnector.connect(options)
        };
    }
    const existingConnection = trackedConnections.get(options.name);
    if (existingConnection) {
        return {
            type: "tracked",
            store,
            ...existingConnection
        };
    }
    const newConnection = {
        connection: extensionConnector.connect(options),
        stores: {}
    };
    trackedConnections.set(options.name, newConnection);
    return {
        type: "tracked",
        store,
        ...newConnection
    };
};
const devtoolsImpl = function(fn) {
    let devtoolsOptions = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return (set, get, api)=>{
        const { enabled, anonymousActionType, store, ...options } = devtoolsOptions;
        let extensionConnector;
        try {
            extensionConnector = (enabled != null ? enabled : (__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
        } catch (e) {}
        if (!extensionConnector) {
            return fn(set, get, api);
        }
        const { connection, ...connectionInformation } = extractConnectionInformation(store, extensionConnector, options);
        let isRecording = true;
        api.setState = (state, replace, nameOrAction)=>{
            const r = set(state, replace);
            if (!isRecording) return r;
            const action = nameOrAction === void 0 ? {
                type: anonymousActionType || "anonymous"
            } : typeof nameOrAction === "string" ? {
                type: nameOrAction
            } : nameOrAction;
            if (store === void 0) {
                connection == null ? void 0 : connection.send(action, get());
                return r;
            }
            connection == null ? void 0 : connection.send({
                ...action,
                type: "".concat(store, "/").concat(action.type)
            }, {
                ...getTrackedConnectionState(options.name),
                [store]: api.getState()
            });
            return r;
        };
        const setStateFromDevtools = function() {
            for(var _len = arguments.length, a = new Array(_len), _key = 0; _key < _len; _key++){
                a[_key] = arguments[_key];
            }
            const originalIsRecording = isRecording;
            isRecording = false;
            set(...a);
            isRecording = originalIsRecording;
        };
        const initialState = fn(api.setState, get, api);
        if (connectionInformation.type === "untracked") {
            connection == null ? void 0 : connection.init(initialState);
        } else {
            connectionInformation.stores[connectionInformation.store] = api;
            connection == null ? void 0 : connection.init(Object.fromEntries(Object.entries(connectionInformation.stores).map((param)=>{
                let [key, store2] = param;
                return [
                    key,
                    key === connectionInformation.store ? initialState : store2.getState()
                ];
            })));
        }
        if (api.dispatchFromDevtools && typeof api.dispatch === "function") {
            let didWarnAboutReservedActionType = false;
            const originalDispatch = api.dispatch;
            api.dispatch = function() {
                for(var _len = arguments.length, a = new Array(_len), _key = 0; _key < _len; _key++){
                    a[_key] = arguments[_key];
                }
                if ((__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production" && a[0].type === "__setState" && !didWarnAboutReservedActionType) {
                    console.warn('[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.');
                    didWarnAboutReservedActionType = true;
                }
                originalDispatch(...a);
            };
        }
        connection.subscribe((message)=>{
            var _a;
            switch(message.type){
                case "ACTION":
                    if (typeof message.payload !== "string") {
                        console.error("[zustand devtools middleware] Unsupported action format");
                        return;
                    }
                    return parseJsonThen(message.payload, (action)=>{
                        if (action.type === "__setState") {
                            if (store === void 0) {
                                setStateFromDevtools(action.state);
                                return;
                            }
                            if (Object.keys(action.state).length !== 1) {
                                console.error('\n                    [zustand devtools middleware] Unsupported __setState action format.\n                    When using \'store\' option in devtools(), the \'state\' should have only one key, which is a value of \'store\' that was passed in devtools(),\n                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }\n                    ');
                            }
                            const stateFromDevtools = action.state[store];
                            if (stateFromDevtools === void 0 || stateFromDevtools === null) {
                                return;
                            }
                            if (JSON.stringify(api.getState()) !== JSON.stringify(stateFromDevtools)) {
                                setStateFromDevtools(stateFromDevtools);
                            }
                            return;
                        }
                        if (!api.dispatchFromDevtools) return;
                        if (typeof api.dispatch !== "function") return;
                        api.dispatch(action);
                    });
                case "DISPATCH":
                    switch(message.payload.type){
                        case "RESET":
                            setStateFromDevtools(initialState);
                            if (store === void 0) {
                                return connection == null ? void 0 : connection.init(api.getState());
                            }
                            return connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
                        case "COMMIT":
                            if (store === void 0) {
                                connection == null ? void 0 : connection.init(api.getState());
                                return;
                            }
                            return connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
                        case "ROLLBACK":
                            return parseJsonThen(message.state, (state)=>{
                                if (store === void 0) {
                                    setStateFromDevtools(state);
                                    connection == null ? void 0 : connection.init(api.getState());
                                    return;
                                }
                                setStateFromDevtools(state[store]);
                                connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
                            });
                        case "JUMP_TO_STATE":
                        case "JUMP_TO_ACTION":
                            return parseJsonThen(message.state, (state)=>{
                                if (store === void 0) {
                                    setStateFromDevtools(state);
                                    return;
                                }
                                if (JSON.stringify(api.getState()) !== JSON.stringify(state[store])) {
                                    setStateFromDevtools(state[store]);
                                }
                            });
                        case "IMPORT_STATE":
                            {
                                const { nextLiftedState } = message.payload;
                                const lastComputedState = (_a = nextLiftedState.computedStates.slice(-1)[0]) == null ? void 0 : _a.state;
                                if (!lastComputedState) return;
                                if (store === void 0) {
                                    setStateFromDevtools(lastComputedState);
                                } else {
                                    setStateFromDevtools(lastComputedState[store]);
                                }
                                connection == null ? void 0 : connection.send(null, // FIXME no-any
                                nextLiftedState);
                                return;
                            }
                        case "PAUSE_RECORDING":
                            return isRecording = !isRecording;
                    }
                    return;
            }
        });
        return initialState;
    };
};
const devtools = devtoolsImpl;
const parseJsonThen = (stringified, f)=>{
    let parsed;
    try {
        parsed = JSON.parse(stringified);
    } catch (e) {
        console.error("[zustand devtools middleware] Could not parse the received json", e);
    }
    if (parsed !== void 0) f(parsed);
};
const subscribeWithSelectorImpl = (fn)=>(set, get, api)=>{
        const origSubscribe = api.subscribe;
        api.subscribe = (selector, optListener, options)=>{
            let listener = selector;
            if (optListener) {
                const equalityFn = (options == null ? void 0 : options.equalityFn) || Object.is;
                let currentSlice = selector(api.getState());
                listener = (state)=>{
                    const nextSlice = selector(state);
                    if (!equalityFn(currentSlice, nextSlice)) {
                        const previousSlice = currentSlice;
                        optListener(currentSlice = nextSlice, previousSlice);
                    }
                };
                if (options == null ? void 0 : options.fireImmediately) {
                    optListener(currentSlice, currentSlice);
                }
            }
            return origSubscribe(listener);
        };
        const initialState = fn(set, get, api);
        return initialState;
    };
const subscribeWithSelector = subscribeWithSelectorImpl;
const combine = (initialState, create)=>function() {
        for(var _len = arguments.length, a = new Array(_len), _key = 0; _key < _len; _key++){
            a[_key] = arguments[_key];
        }
        return Object.assign({}, initialState, create(...a));
    };
function createJSONStorage(getStorage, options) {
    let storage;
    try {
        storage = getStorage();
    } catch (e) {
        return;
    }
    const persistStorage = {
        getItem: (name)=>{
            var _a;
            const parse = (str2)=>{
                if (str2 === null) {
                    return null;
                }
                return JSON.parse(str2, options == null ? void 0 : options.reviver);
            };
            const str = (_a = storage.getItem(name)) != null ? _a : null;
            if (str instanceof Promise) {
                return str.then(parse);
            }
            return parse(str);
        },
        setItem: (name, newValue)=>storage.setItem(name, JSON.stringify(newValue, options == null ? void 0 : options.replacer)),
        removeItem: (name)=>storage.removeItem(name)
    };
    return persistStorage;
}
const toThenable = (fn)=>(input)=>{
        try {
            const result = fn(input);
            if (result instanceof Promise) {
                return result;
            }
            return {
                then (onFulfilled) {
                    return toThenable(onFulfilled)(result);
                },
                catch (_onRejected) {
                    return this;
                }
            };
        } catch (e) {
            return {
                then (_onFulfilled) {
                    return this;
                },
                catch (onRejected) {
                    return toThenable(onRejected)(e);
                }
            };
        }
    };
const persistImpl = (config, baseOptions)=>(set, get, api)=>{
        let options = {
            storage: createJSONStorage(()=>localStorage),
            partialize: (state)=>state,
            version: 0,
            merge: (persistedState, currentState)=>({
                    ...currentState,
                    ...persistedState
                }),
            ...baseOptions
        };
        let hasHydrated = false;
        const hydrationListeners = /* @__PURE__ */ new Set();
        const finishHydrationListeners = /* @__PURE__ */ new Set();
        let storage = options.storage;
        if (!storage) {
            return config(function() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                console.warn("[zustand persist middleware] Unable to update item '".concat(options.name, "', the given storage is currently unavailable."));
                set(...args);
            }, get, api);
        }
        const setItem = ()=>{
            const state = options.partialize({
                ...get()
            });
            return storage.setItem(options.name, {
                state,
                version: options.version
            });
        };
        const savedSetState = api.setState;
        api.setState = (state, replace)=>{
            savedSetState(state, replace);
            void setItem();
        };
        const configResult = config(function() {
            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                args[_key] = arguments[_key];
            }
            set(...args);
            void setItem();
        }, get, api);
        api.getInitialState = ()=>configResult;
        let stateFromStorage;
        const hydrate = ()=>{
            var _a, _b;
            if (!storage) return;
            hasHydrated = false;
            hydrationListeners.forEach((cb)=>{
                var _a2;
                return cb((_a2 = get()) != null ? _a2 : configResult);
            });
            const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get()) != null ? _a : configResult)) || void 0;
            return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue)=>{
                if (deserializedStorageValue) {
                    if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
                        if (options.migrate) {
                            return [
                                true,
                                options.migrate(deserializedStorageValue.state, deserializedStorageValue.version)
                            ];
                        }
                        console.error("State loaded from storage couldn't be migrated since no migrate function was provided");
                    } else {
                        return [
                            false,
                            deserializedStorageValue.state
                        ];
                    }
                }
                return [
                    false,
                    void 0
                ];
            }).then((migrationResult)=>{
                var _a2;
                const [migrated, migratedState] = migrationResult;
                stateFromStorage = options.merge(migratedState, (_a2 = get()) != null ? _a2 : configResult);
                set(stateFromStorage, true);
                if (migrated) {
                    return setItem();
                }
            }).then(()=>{
                postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
                stateFromStorage = get();
                hasHydrated = true;
                finishHydrationListeners.forEach((cb)=>cb(stateFromStorage));
            }).catch((e)=>{
                postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
            });
        };
        api.persist = {
            setOptions: (newOptions)=>{
                options = {
                    ...options,
                    ...newOptions
                };
                if (newOptions.storage) {
                    storage = newOptions.storage;
                }
            },
            clearStorage: ()=>{
                storage == null ? void 0 : storage.removeItem(options.name);
            },
            getOptions: ()=>options,
            rehydrate: ()=>hydrate(),
            hasHydrated: ()=>hasHydrated,
            onHydrate: (cb)=>{
                hydrationListeners.add(cb);
                return ()=>{
                    hydrationListeners.delete(cb);
                };
            },
            onFinishHydration: (cb)=>{
                finishHydrationListeners.add(cb);
                return ()=>{
                    finishHydrationListeners.delete(cb);
                };
            }
        };
        if (!options.skipHydration) {
            hydrate();
        }
        return stateFromStorage || configResult;
    };
const persist = persistImpl;
;
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/node_modules/zustand/esm/vanilla.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createStore",
    ()=>createStore
]);
const createStoreImpl = (createState)=>{
    let state;
    const listeners = /* @__PURE__ */ new Set();
    const setState = (partial, replace)=>{
        const nextState = typeof partial === "function" ? partial(state) : partial;
        if (!Object.is(nextState, state)) {
            const previousState = state;
            state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
            listeners.forEach((listener)=>listener(state, previousState));
        }
    };
    const getState = ()=>state;
    const getInitialState = ()=>initialState;
    const subscribe = (listener)=>{
        listeners.add(listener);
        return ()=>listeners.delete(listener);
    };
    const api = {
        setState,
        getState,
        getInitialState,
        subscribe
    };
    const initialState = state = createState(setState, getState, api);
    return api;
};
const createStore = (createState)=>createState ? createStoreImpl(createState) : createStoreImpl;
;
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@noble/hashes/esm/_u64.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Internal helpers for u64. BigUint64Array is too slow as per 2025, so we implement it using Uint32Array.
 * @todo re-check https://issues.chromium.org/issues/42212588
 * @module
 */ __turbopack_context__.s([
    "add",
    ()=>add,
    "add3H",
    ()=>add3H,
    "add3L",
    ()=>add3L,
    "add4H",
    ()=>add4H,
    "add4L",
    ()=>add4L,
    "add5H",
    ()=>add5H,
    "add5L",
    ()=>add5L,
    "default",
    ()=>__TURBOPACK__default__export__,
    "fromBig",
    ()=>fromBig,
    "rotlBH",
    ()=>rotlBH,
    "rotlBL",
    ()=>rotlBL,
    "rotlSH",
    ()=>rotlSH,
    "rotlSL",
    ()=>rotlSL,
    "rotr32H",
    ()=>rotr32H,
    "rotr32L",
    ()=>rotr32L,
    "rotrBH",
    ()=>rotrBH,
    "rotrBL",
    ()=>rotrBL,
    "rotrSH",
    ()=>rotrSH,
    "rotrSL",
    ()=>rotrSL,
    "shrSH",
    ()=>shrSH,
    "shrSL",
    ()=>shrSL,
    "split",
    ()=>split,
    "toBig",
    ()=>toBig
]);
const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
const _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n) {
    let le = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    if (le) return {
        h: Number(n & U32_MASK64),
        l: Number(n >> _32n & U32_MASK64)
    };
    return {
        h: Number(n >> _32n & U32_MASK64) | 0,
        l: Number(n & U32_MASK64) | 0
    };
}
function split(lst) {
    let le = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    const len = lst.length;
    let Ah = new Uint32Array(len);
    let Al = new Uint32Array(len);
    for(let i = 0; i < len; i++){
        const { h, l } = fromBig(lst[i], le);
        [Ah[i], Al[i]] = [
            h,
            l
        ];
    }
    return [
        Ah,
        Al
    ];
}
const toBig = (h, l)=>BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
// for Shift in [0, 32)
const shrSH = (h, _l, s)=>h >>> s;
const shrSL = (h, l, s)=>h << 32 - s | l >>> s;
// Right rotate for Shift in [1, 32)
const rotrSH = (h, l, s)=>h >>> s | l << 32 - s;
const rotrSL = (h, l, s)=>h << 32 - s | l >>> s;
// Right rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotrBH = (h, l, s)=>h << 64 - s | l >>> s - 32;
const rotrBL = (h, l, s)=>h >>> s - 32 | l << 64 - s;
// Right rotate for shift===32 (just swaps l&h)
const rotr32H = (_h, l)=>l;
const rotr32L = (h, _l)=>h;
// Left rotate for Shift in [1, 32)
const rotlSH = (h, l, s)=>h << s | l >>> 32 - s;
const rotlSL = (h, l, s)=>l << s | h >>> 32 - s;
// Left rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotlBH = (h, l, s)=>l << s - 32 | h >>> 64 - s;
const rotlBL = (h, l, s)=>h << s - 32 | l >>> 64 - s;
// JS uses 32-bit signed integers for bitwise operations which means we cannot
// simple take carry out of low bit sum by shift, we need to use division.
function add(Ah, Al, Bh, Bl) {
    const l = (Al >>> 0) + (Bl >>> 0);
    return {
        h: Ah + Bh + (l / 2 ** 32 | 0) | 0,
        l: l | 0
    };
}
// Addition with more than 2 elements
const add3L = (Al, Bl, Cl)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
const add3H = (low, Ah, Bh, Ch)=>Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
const add4L = (Al, Bl, Cl, Dl)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
const add4H = (low, Ah, Bh, Ch, Dh)=>Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
const add5L = (Al, Bl, Cl, Dl, El)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
const add5H = (low, Ah, Bh, Ch, Dh, Eh)=>Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
;
// prettier-ignore
const u64 = {
    fromBig,
    split,
    toBig,
    shrSH,
    shrSL,
    rotrSH,
    rotrSL,
    rotrBH,
    rotrBL,
    rotr32H,
    rotr32L,
    rotlSH,
    rotlSL,
    rotlBH,
    rotlBL,
    add,
    add3L,
    add3H,
    add4L,
    add4H,
    add5H,
    add5L
};
const __TURBOPACK__default__export__ = u64;
 //# sourceMappingURL=_u64.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@noble/hashes/esm/crypto.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "crypto",
    ()=>crypto
]);
const crypto = typeof globalThis === 'object' && 'crypto' in globalThis ? globalThis.crypto : undefined; //# sourceMappingURL=crypto.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@noble/hashes/esm/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Utilities for hex, bytes, CSPRNG.
 * @module
 */ /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ // We use WebCrypto aka globalThis.crypto, which exists in browsers and node.js 16+.
// node.js versions earlier than v19 don't declare it in global scope.
// For node.js, package.json#exports field mapping rewrites import
// from `crypto` to `cryptoNode`, which imports native module.
// Makes the utils un-importable in browsers without a bundler.
// Once node.js 18 is deprecated (2025-04-30), we can just drop the import.
__turbopack_context__.s([
    "Hash",
    ()=>Hash,
    "abytes",
    ()=>abytes,
    "aexists",
    ()=>aexists,
    "ahash",
    ()=>ahash,
    "anumber",
    ()=>anumber,
    "aoutput",
    ()=>aoutput,
    "asyncLoop",
    ()=>asyncLoop,
    "byteSwap",
    ()=>byteSwap,
    "byteSwap32",
    ()=>byteSwap32,
    "byteSwapIfBE",
    ()=>byteSwapIfBE,
    "bytesToHex",
    ()=>bytesToHex,
    "bytesToUtf8",
    ()=>bytesToUtf8,
    "checkOpts",
    ()=>checkOpts,
    "clean",
    ()=>clean,
    "concatBytes",
    ()=>concatBytes,
    "createHasher",
    ()=>createHasher,
    "createOptHasher",
    ()=>createOptHasher,
    "createView",
    ()=>createView,
    "createXOFer",
    ()=>createXOFer,
    "hexToBytes",
    ()=>hexToBytes,
    "isBytes",
    ()=>isBytes,
    "isLE",
    ()=>isLE,
    "kdfInputToBytes",
    ()=>kdfInputToBytes,
    "nextTick",
    ()=>nextTick,
    "randomBytes",
    ()=>randomBytes,
    "rotl",
    ()=>rotl,
    "rotr",
    ()=>rotr,
    "swap32IfBE",
    ()=>swap32IfBE,
    "swap8IfBE",
    ()=>swap8IfBE,
    "toBytes",
    ()=>toBytes,
    "u32",
    ()=>u32,
    "u8",
    ()=>u8,
    "utf8ToBytes",
    ()=>utf8ToBytes,
    "wrapConstructor",
    ()=>wrapConstructor,
    "wrapConstructorWithOpts",
    ()=>wrapConstructorWithOpts,
    "wrapXOFConstructorWithOpts",
    ()=>wrapXOFConstructorWithOpts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@noble/hashes/esm/crypto.js [app-client] (ecmascript)");
;
function isBytes(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === 'Uint8Array';
}
function anumber(n) {
    if (!Number.isSafeInteger(n) || n < 0) throw new Error('positive integer expected, got ' + n);
}
function abytes(b) {
    for(var _len = arguments.length, lengths = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        lengths[_key - 1] = arguments[_key];
    }
    if (!isBytes(b)) throw new Error('Uint8Array expected');
    if (lengths.length > 0 && !lengths.includes(b.length)) throw new Error('Uint8Array expected of length ' + lengths + ', got length=' + b.length);
}
function ahash(h) {
    if (typeof h !== 'function' || typeof h.create !== 'function') throw new Error('Hash should be wrapped by utils.createHasher');
    anumber(h.outputLen);
    anumber(h.blockLen);
}
function aexists(instance) {
    let checkFinished = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    if (instance.destroyed) throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished) throw new Error('Hash#digest() has already been called');
}
function aoutput(out, instance) {
    abytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
        throw new Error('digestInto() expects output buffer of length at least ' + min);
    }
}
function u8(arr) {
    return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
}
function u32(arr) {
    return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean() {
    for(var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++){
        arrays[_key] = arguments[_key];
    }
    for(let i = 0; i < arrays.length; i++){
        arrays[i].fill(0);
    }
}
function createView(arr) {
    return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
    return word << 32 - shift | word >>> shift;
}
function rotl(word, shift) {
    return word << shift | word >>> 32 - shift >>> 0;
}
const isLE = /* @__PURE__ */ (()=>new Uint8Array(new Uint32Array([
        0x11223344
    ]).buffer)[0] === 0x44)();
function byteSwap(word) {
    return word << 24 & 0xff000000 | word << 8 & 0xff0000 | word >>> 8 & 0xff00 | word >>> 24 & 0xff;
}
const swap8IfBE = isLE ? (n)=>n : (n)=>byteSwap(n);
const byteSwapIfBE = swap8IfBE;
function byteSwap32(arr) {
    for(let i = 0; i < arr.length; i++){
        arr[i] = byteSwap(arr[i]);
    }
    return arr;
}
const swap32IfBE = isLE ? (u)=>u : byteSwap32;
// Built-in hex conversion https://caniuse.com/mdn-javascript_builtins_uint8array_fromhex
const hasHexBuiltin = /* @__PURE__ */ (()=>// @ts-ignore
    typeof Uint8Array.from([]).toHex === 'function' && typeof Uint8Array.fromHex === 'function')();
// Array where index 0xf0 (240) is mapped to string 'f0'
const hexes = /* @__PURE__ */ Array.from({
    length: 256
}, (_, i)=>i.toString(16).padStart(2, '0'));
function bytesToHex(bytes) {
    abytes(bytes);
    // @ts-ignore
    if (hasHexBuiltin) return bytes.toHex();
    // pre-caching improves the speed 6x
    let hex = '';
    for(let i = 0; i < bytes.length; i++){
        hex += hexes[bytes[i]];
    }
    return hex;
}
// We use optimized technique to convert hex string to byte array
const asciis = {
    _0: 48,
    _9: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102
};
function asciiToBase16(ch) {
    if (ch >= asciis._0 && ch <= asciis._9) return ch - asciis._0; // '2' => 50-48
    if (ch >= asciis.A && ch <= asciis.F) return ch - (asciis.A - 10); // 'B' => 66-(65-10)
    if (ch >= asciis.a && ch <= asciis.f) return ch - (asciis.a - 10); // 'b' => 98-(97-10)
    return;
}
function hexToBytes(hex) {
    if (typeof hex !== 'string') throw new Error('hex string expected, got ' + typeof hex);
    // @ts-ignore
    if (hasHexBuiltin) return Uint8Array.fromHex(hex);
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2) throw new Error('hex string expected, got unpadded hex of length ' + hl);
    const array = new Uint8Array(al);
    for(let ai = 0, hi = 0; ai < al; ai++, hi += 2){
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === undefined || n2 === undefined) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2; // multiply first octet, e.g. 'a3' => 10*16+3 => 160 + 3 => 163
    }
    return array;
}
const nextTick = async ()=>{};
async function asyncLoop(iters, tick, cb) {
    let ts = Date.now();
    for(let i = 0; i < iters; i++){
        cb(i);
        // Date.now() is not monotonic, so in case if clock goes backwards we return return control too
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick) continue;
        await nextTick();
        ts += diff;
    }
}
function utf8ToBytes(str) {
    if (typeof str !== 'string') throw new Error('string expected');
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
function bytesToUtf8(bytes) {
    return new TextDecoder().decode(bytes);
}
function toBytes(data) {
    if (typeof data === 'string') data = utf8ToBytes(data);
    abytes(data);
    return data;
}
function kdfInputToBytes(data) {
    if (typeof data === 'string') data = utf8ToBytes(data);
    abytes(data);
    return data;
}
function concatBytes() {
    for(var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++){
        arrays[_key] = arguments[_key];
    }
    let sum = 0;
    for(let i = 0; i < arrays.length; i++){
        const a = arrays[i];
        abytes(a);
        sum += a.length;
    }
    const res = new Uint8Array(sum);
    for(let i = 0, pad = 0; i < arrays.length; i++){
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
    }
    return res;
}
function checkOpts(defaults, opts) {
    if (opts !== undefined && ({}).toString.call(opts) !== '[object Object]') throw new Error('options should be object or undefined');
    const merged = Object.assign(defaults, opts);
    return merged;
}
class Hash {
}
function createHasher(hashCons) {
    const hashC = (msg)=>hashCons().update(toBytes(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = ()=>hashCons();
    return hashC;
}
function createOptHasher(hashCons) {
    const hashC = (msg, opts)=>hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts)=>hashCons(opts);
    return hashC;
}
function createXOFer(hashCons) {
    const hashC = (msg, opts)=>hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts)=>hashCons(opts);
    return hashC;
}
const wrapConstructor = createHasher;
const wrapConstructorWithOpts = createOptHasher;
const wrapXOFConstructorWithOpts = createXOFer;
function randomBytes() {
    let bytesLength = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 32;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"] && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"].getRandomValues === 'function') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"].getRandomValues(new Uint8Array(bytesLength));
    }
    // Legacy Node.js compatibility
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"] && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"].randomBytes === 'function') {
        return Uint8Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"].randomBytes(bytesLength));
    }
    throw new Error('crypto.getRandomValues must be defined');
} //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@noble/hashes/esm/sha3.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * SHA3 (keccak) hash function, based on a new "Sponge function" design.
 * Different from older hashes, the internal state is bigger than output size.
 *
 * Check out [FIPS-202](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.202.pdf),
 * [Website](https://keccak.team/keccak.html),
 * [the differences between SHA-3 and Keccak](https://crypto.stackexchange.com/questions/15727/what-are-the-key-differences-between-the-draft-sha-3-standard-and-the-keccak-sub).
 *
 * Check out `sha3-addons` module for cSHAKE, k12, and others.
 * @module
 */ __turbopack_context__.s([
    "Keccak",
    ()=>Keccak,
    "keccakP",
    ()=>keccakP,
    "keccak_224",
    ()=>keccak_224,
    "keccak_256",
    ()=>keccak_256,
    "keccak_384",
    ()=>keccak_384,
    "keccak_512",
    ()=>keccak_512,
    "sha3_224",
    ()=>sha3_224,
    "sha3_256",
    ()=>sha3_256,
    "sha3_384",
    ()=>sha3_384,
    "sha3_512",
    ()=>sha3_512,
    "shake128",
    ()=>shake128,
    "shake256",
    ()=>shake256
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@noble/hashes/esm/_u64.js [app-client] (ecmascript)");
// prettier-ignore
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@noble/hashes/esm/utils.js [app-client] (ecmascript)");
;
;
// No __PURE__ annotations in sha3 header:
// EVERYTHING is in fact used on every export.
// Various per round constants calculations
const _0n = BigInt(0);
const _1n = BigInt(1);
const _2n = BigInt(2);
const _7n = BigInt(7);
const _256n = BigInt(256);
const _0x71n = BigInt(0x71);
const SHA3_PI = [];
const SHA3_ROTL = [];
const _SHA3_IOTA = [];
for(let round = 0, R = _1n, x = 1, y = 0; round < 24; round++){
    // Pi
    [x, y] = [
        y,
        (2 * x + 3 * y) % 5
    ];
    SHA3_PI.push(2 * (5 * y + x));
    // Rotational
    SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
    // Iota
    let t = _0n;
    for(let j = 0; j < 7; j++){
        R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
        if (R & _2n) t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
    }
    _SHA3_IOTA.push(t);
}
const IOTAS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["split"])(_SHA3_IOTA, true);
const SHA3_IOTA_H = IOTAS[0];
const SHA3_IOTA_L = IOTAS[1];
// Left rotation (without 0, 32, 64)
const rotlH = (h, l, s)=>s > 32 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotlBH"])(h, l, s) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotlSH"])(h, l, s);
const rotlL = (h, l, s)=>s > 32 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotlBL"])(h, l, s) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotlSL"])(h, l, s);
function keccakP(s) {
    let rounds = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 24;
    const B = new Uint32Array(5 * 2);
    // NOTE: all indices are x2 since we store state as u32 instead of u64 (bigints to slow in js)
    for(let round = 24 - rounds; round < 24; round++){
        // Theta θ
        for(let x = 0; x < 10; x++)B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
        for(let x = 0; x < 10; x += 2){
            const idx1 = (x + 8) % 10;
            const idx0 = (x + 2) % 10;
            const B0 = B[idx0];
            const B1 = B[idx0 + 1];
            const Th = rotlH(B0, B1, 1) ^ B[idx1];
            const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
            for(let y = 0; y < 50; y += 10){
                s[x + y] ^= Th;
                s[x + y + 1] ^= Tl;
            }
        }
        // Rho (ρ) and Pi (π)
        let curH = s[2];
        let curL = s[3];
        for(let t = 0; t < 24; t++){
            const shift = SHA3_ROTL[t];
            const Th = rotlH(curH, curL, shift);
            const Tl = rotlL(curH, curL, shift);
            const PI = SHA3_PI[t];
            curH = s[PI];
            curL = s[PI + 1];
            s[PI] = Th;
            s[PI + 1] = Tl;
        }
        // Chi (χ)
        for(let y = 0; y < 50; y += 10){
            for(let x = 0; x < 10; x++)B[x] = s[y + x];
            for(let x = 0; x < 10; x++)s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
        }
        // Iota (ι)
        s[0] ^= SHA3_IOTA_H[round];
        s[1] ^= SHA3_IOTA_L[round];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(B);
}
class Keccak extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Hash"] {
    clone() {
        return this._cloneInto();
    }
    keccak() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swap32IfBE"])(this.state32);
        keccakP(this.state32, this.rounds);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swap32IfBE"])(this.state32);
        this.posOut = 0;
        this.pos = 0;
    }
    update(data) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aexists"])(this);
        data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBytes"])(data);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["abytes"])(data);
        const { blockLen, state } = this;
        const len = data.length;
        for(let pos = 0; pos < len;){
            const take = Math.min(blockLen - this.pos, len - pos);
            for(let i = 0; i < take; i++)state[this.pos++] ^= data[pos++];
            if (this.pos === blockLen) this.keccak();
        }
        return this;
    }
    finish() {
        if (this.finished) return;
        this.finished = true;
        const { state, suffix, pos, blockLen } = this;
        // Do the padding
        state[pos] ^= suffix;
        if ((suffix & 0x80) !== 0 && pos === blockLen - 1) this.keccak();
        state[blockLen - 1] ^= 0x80;
        this.keccak();
    }
    writeInto(out) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aexists"])(this, false);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["abytes"])(out);
        this.finish();
        const bufferOut = this.state;
        const { blockLen } = this;
        for(let pos = 0, len = out.length; pos < len;){
            if (this.posOut >= blockLen) this.keccak();
            const take = Math.min(blockLen - this.posOut, len - pos);
            out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
            this.posOut += take;
            pos += take;
        }
        return out;
    }
    xofInto(out) {
        // Sha3/Keccak usage with XOF is probably mistake, only SHAKE instances can do XOF
        if (!this.enableXOF) throw new Error('XOF is not possible for this instance');
        return this.writeInto(out);
    }
    xof(bytes) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["anumber"])(bytes);
        return this.xofInto(new Uint8Array(bytes));
    }
    digestInto(out) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aoutput"])(out, this);
        if (this.finished) throw new Error('digest() was already called');
        this.writeInto(out);
        this.destroy();
        return out;
    }
    digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
        this.destroyed = true;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(this.state);
    }
    _cloneInto(to) {
        const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
        to || (to = new Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
        to.state32.set(this.state32);
        to.pos = this.pos;
        to.posOut = this.posOut;
        to.finished = this.finished;
        to.rounds = rounds;
        // Suffix can change in cSHAKE
        to.suffix = suffix;
        to.outputLen = outputLen;
        to.enableXOF = enableXOF;
        to.destroyed = this.destroyed;
        return to;
    }
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24){
        super();
        this.pos = 0;
        this.posOut = 0;
        this.finished = false;
        this.destroyed = false;
        this.enableXOF = false;
        this.blockLen = blockLen;
        this.suffix = suffix;
        this.outputLen = outputLen;
        this.enableXOF = enableXOF;
        this.rounds = rounds;
        // Can be passed from user as dkLen
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["anumber"])(outputLen);
        // 1600 = 5x5 matrix of 64bit.  1600 bits === 200 bytes
        // 0 < blockLen < 200
        if (!(0 < blockLen && blockLen < 200)) throw new Error('only keccak-f1600 function is supported');
        this.state = new Uint8Array(200);
        this.state32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u32"])(this.state);
    }
}
const gen = (suffix, blockLen, outputLen)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHasher"])(()=>new Keccak(blockLen, suffix, outputLen));
const sha3_224 = /* @__PURE__ */ (()=>gen(0x06, 144, 224 / 8))();
const sha3_256 = /* @__PURE__ */ (()=>gen(0x06, 136, 256 / 8))();
const sha3_384 = /* @__PURE__ */ (()=>gen(0x06, 104, 384 / 8))();
const sha3_512 = /* @__PURE__ */ (()=>gen(0x06, 72, 512 / 8))();
const keccak_224 = /* @__PURE__ */ (()=>gen(0x01, 144, 224 / 8))();
const keccak_256 = /* @__PURE__ */ (()=>gen(0x01, 136, 256 / 8))();
const keccak_384 = /* @__PURE__ */ (()=>gen(0x01, 104, 384 / 8))();
const keccak_512 = /* @__PURE__ */ (()=>gen(0x01, 72, 512 / 8))();
const genShake = (suffix, blockLen, outputLen)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createXOFer"])(function() {
        let opts = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        return new Keccak(blockLen, suffix, opts.dkLen === undefined ? outputLen : opts.dkLen, true);
    });
const shake128 = /* @__PURE__ */ (()=>genShake(0x1f, 168, 128 / 8))();
const shake256 = /* @__PURE__ */ (()=>genShake(0x1f, 136, 256 / 8))(); //# sourceMappingURL=sha3.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/eventemitter3/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var has = Object.prototype.hasOwnProperty, prefix = '~';
/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */ function Events() {}
//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
    Events.prototype = Object.create(null);
    //
    // This hack is needed because the `__proto__` property is still inherited in
    // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
    //
    if (!new Events().__proto__) prefix = false;
}
/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */ function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
}
/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */ function addListener(emitter, event, fn, context, once) {
    if (typeof fn !== 'function') {
        throw new TypeError('The listener must be a function');
    }
    var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
    if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
    else emitter._events[evt] = [
        emitter._events[evt],
        listener
    ];
    return emitter;
}
/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */ function clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0) emitter._events = new Events();
    else delete emitter._events[evt];
}
/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */ function EventEmitter() {
    this._events = new Events();
    this._eventsCount = 0;
}
/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */ EventEmitter.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0) return names;
    for(name in events = this._events){
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
    }
    if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
    }
    return names;
};
/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */ EventEmitter.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event, handlers = this._events[evt];
    if (!handlers) return [];
    if (handlers.fn) return [
        handlers.fn
    ];
    for(var i = 0, l = handlers.length, ee = new Array(l); i < l; i++){
        ee[i] = handlers[i].fn;
    }
    return ee;
};
/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */ EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event, listeners = this._events[evt];
    if (!listeners) return 0;
    if (listeners.fn) return 1;
    return listeners.length;
};
/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */ EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt]) return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
        switch(len){
            case 1:
                return listeners.fn.call(listeners.context), true;
            case 2:
                return listeners.fn.call(listeners.context, a1), true;
            case 3:
                return listeners.fn.call(listeners.context, a1, a2), true;
            case 4:
                return listeners.fn.call(listeners.context, a1, a2, a3), true;
            case 5:
                return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
            case 6:
                return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for(i = 1, args = new Array(len - 1); i < len; i++){
            args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
    } else {
        var length = listeners.length, j;
        for(i = 0; i < length; i++){
            if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
            switch(len){
                case 1:
                    listeners[i].fn.call(listeners[i].context);
                    break;
                case 2:
                    listeners[i].fn.call(listeners[i].context, a1);
                    break;
                case 3:
                    listeners[i].fn.call(listeners[i].context, a1, a2);
                    break;
                case 4:
                    listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                    break;
                default:
                    if (!args) for(j = 1, args = new Array(len - 1); j < len; j++){
                        args[j - 1] = arguments[j];
                    }
                    listeners[i].fn.apply(listeners[i].context, args);
            }
        }
    }
    return true;
};
/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false);
};
/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true);
};
/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt]) return this;
    if (!fn) {
        clearEvent(this, evt);
        return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
            clearEvent(this, evt);
        }
    } else {
        for(var i = 0, events = [], length = listeners.length; i < length; i++){
            if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
                events.push(listeners[i]);
            }
        }
        //
        // Reset the array, or remove it completely if we have no more listeners.
        //
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
    }
    return this;
};
/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */ EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
    } else {
        this._events = new Events();
        this._eventsCount = 0;
    }
    return this;
};
//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;
//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;
//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;
//
// Expose the module.
//
if ("TURBOPACK compile-time truthy", 1) {
    module.exports = EventEmitter;
}
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/eventemitter3/index.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$eventemitter3$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/eventemitter3/index.js [app-client] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$eventemitter3$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/eventemitter3/index.js [app-client] (ecmascript) <export default as EventEmitter>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventEmitter",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$eventemitter3$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$eventemitter3$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/eventemitter3/index.js [app-client] (ecmascript)");
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/connectors/dist/esm/metaMask.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "metaMask",
    ()=>metaMask
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/errors/config.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$createConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/connectors/createConnector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$extractRpcUrls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/utils/extractRpcUrls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$connector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/errors/connector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/address/getAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/encoding/fromHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withRetry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/promise/withRetry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/promise/withTimeout.js [app-client] (ecmascript)");
;
;
metaMask.type = 'metaMask';
function metaMask() {
    let parameters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    let sdk;
    let provider;
    let providerPromise;
    let accountsChanged;
    let chainChanged;
    let connect;
    let displayUri;
    let disconnect;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$createConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createConnector"])((config)=>({
            id: 'metaMaskSDK',
            name: 'MetaMask',
            rdns: [
                'io.metamask',
                'io.metamask.mobile'
            ],
            type: metaMask.type,
            async setup () {
                const provider = await this.getProvider();
                if (provider === null || provider === void 0 ? void 0 : provider.on) {
                    if (!connect) {
                        connect = this.onConnect.bind(this);
                        provider.on('connect', connect);
                    }
                    // We shouldn't need to listen for `'accountsChanged'` here since the `'connect'` event should suffice (and wallet shouldn't be connected yet).
                    // Some wallets, like MetaMask, do not implement the `'connect'` event and overload `'accountsChanged'` instead.
                    if (!accountsChanged) {
                        accountsChanged = this.onAccountsChanged.bind(this);
                        provider.on('accountsChanged', accountsChanged);
                    }
                }
            },
            async connect () {
                let { chainId, isReconnecting } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                const provider = await this.getProvider();
                if (!displayUri) {
                    displayUri = this.onDisplayUri;
                    provider.on('display_uri', displayUri);
                }
                let accounts = [];
                if (isReconnecting) accounts = await this.getAccounts().catch(()=>[]);
                try {
                    let signResponse;
                    let connectWithResponse;
                    if (!(accounts === null || accounts === void 0 ? void 0 : accounts.length)) {
                        if (parameters.connectAndSign || parameters.connectWith) {
                            if (parameters.connectAndSign) signResponse = await sdk.connectAndSign({
                                msg: parameters.connectAndSign
                            });
                            else if (parameters.connectWith) connectWithResponse = await sdk.connectWith({
                                method: parameters.connectWith.method,
                                params: parameters.connectWith.params
                            });
                            accounts = await this.getAccounts();
                        } else {
                            const requestedAccounts = await sdk.connect();
                            accounts = requestedAccounts.map((x)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(x));
                        }
                    }
                    // Switch to chain if provided
                    let currentChainId = await this.getChainId();
                    if (chainId && currentChainId !== chainId) {
                        const chain = await this.switchChain({
                            chainId
                        }).catch((error)=>{
                            if (error.code === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"].code) throw error;
                            return {
                                id: currentChainId
                            };
                        });
                        var _chain_id;
                        currentChainId = (_chain_id = chain === null || chain === void 0 ? void 0 : chain.id) !== null && _chain_id !== void 0 ? _chain_id : currentChainId;
                    }
                    if (displayUri) {
                        provider.removeListener('display_uri', displayUri);
                        displayUri = undefined;
                    }
                    if (signResponse) provider.emit('connectAndSign', {
                        accounts,
                        chainId: currentChainId,
                        signResponse
                    });
                    else if (connectWithResponse) provider.emit('connectWith', {
                        accounts,
                        chainId: currentChainId,
                        connectWithResponse
                    });
                    // Manage EIP-1193 event listeners
                    // https://eips.ethereum.org/EIPS/eip-1193#events
                    if (connect) {
                        provider.removeListener('connect', connect);
                        connect = undefined;
                    }
                    if (!accountsChanged) {
                        accountsChanged = this.onAccountsChanged.bind(this);
                        provider.on('accountsChanged', accountsChanged);
                    }
                    if (!chainChanged) {
                        chainChanged = this.onChainChanged.bind(this);
                        provider.on('chainChanged', chainChanged);
                    }
                    if (!disconnect) {
                        disconnect = this.onDisconnect.bind(this);
                        provider.on('disconnect', disconnect);
                    }
                    return {
                        accounts,
                        chainId: currentChainId
                    };
                } catch (err) {
                    const error = err;
                    if (error.code === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"].code) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](error);
                    if (error.code === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResourceUnavailableRpcError"].code) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResourceUnavailableRpcError"](error);
                    throw error;
                }
            },
            async disconnect () {
                const provider = await this.getProvider();
                // Manage EIP-1193 event listeners
                if (chainChanged) {
                    provider.removeListener('chainChanged', chainChanged);
                    chainChanged = undefined;
                }
                if (disconnect) {
                    provider.removeListener('disconnect', disconnect);
                    disconnect = undefined;
                }
                if (!connect) {
                    connect = this.onConnect.bind(this);
                    provider.on('connect', connect);
                }
                await sdk.terminate();
            },
            async getAccounts () {
                const provider = await this.getProvider();
                const accounts = await provider.request({
                    method: 'eth_accounts'
                });
                return accounts.map((x)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(x));
            },
            async getChainId () {
                const provider = await this.getProvider();
                const chainId = provider.getChainId() || await (provider === null || provider === void 0 ? void 0 : provider.request({
                    method: 'eth_chainId'
                }));
                return Number(chainId);
            },
            async getProvider () {
                async function initProvider() {
                    var _extractRpcUrls, _parameters_dappMetadata, _parameters_dappMetadata1, _parameters_dappMetadata2, _parameters_dappMetadata3;
                    // Unwrapping import for Vite compatibility.
                    // See: https://github.com/vitejs/vite/issues/9703
                    const MetaMaskSDK = await (async ()=>{
                        const { default: SDK } = await __turbopack_context__.A("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@metamask/sdk/dist/browser/es/metamask-sdk.js [app-client] (ecmascript, async loader)");
                        if (typeof SDK !== 'function' && typeof SDK.default === 'function') return SDK.default;
                        return SDK;
                    })();
                    const readonlyRPCMap = {};
                    for (const chain of config.chains)readonlyRPCMap[(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberToHex"])(chain.id)] = (_extractRpcUrls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$extractRpcUrls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractRpcUrls"])({
                        chain,
                        transports: config.transports
                    })) === null || _extractRpcUrls === void 0 ? void 0 : _extractRpcUrls[0];
                    var _parameters_useDeeplink;
                    sdk = new MetaMaskSDK({
                        _source: 'wagmi',
                        forceDeleteProvider: false,
                        forceInjectProvider: false,
                        injectProvider: false,
                        // Workaround cast since MetaMask SDK does not support `'exactOptionalPropertyTypes'`
                        ...parameters,
                        readonlyRPCMap,
                        dappMetadata: {
                            ...parameters.dappMetadata,
                            // Test if name and url are set AND not empty
                            name: ((_parameters_dappMetadata = parameters.dappMetadata) === null || _parameters_dappMetadata === void 0 ? void 0 : _parameters_dappMetadata.name) ? (_parameters_dappMetadata1 = parameters.dappMetadata) === null || _parameters_dappMetadata1 === void 0 ? void 0 : _parameters_dappMetadata1.name : 'wagmi',
                            url: ((_parameters_dappMetadata2 = parameters.dappMetadata) === null || _parameters_dappMetadata2 === void 0 ? void 0 : _parameters_dappMetadata2.url) ? (_parameters_dappMetadata3 = parameters.dappMetadata) === null || _parameters_dappMetadata3 === void 0 ? void 0 : _parameters_dappMetadata3.url : typeof window !== 'undefined' ? window.location.origin : 'https://wagmi.sh'
                        },
                        useDeeplink: (_parameters_useDeeplink = parameters.useDeeplink) !== null && _parameters_useDeeplink !== void 0 ? _parameters_useDeeplink : true
                    });
                    const result = await sdk.init();
                    // On initial load, sometimes `sdk.getProvider` does not return provider.
                    // https://github.com/wevm/wagmi/issues/4367
                    // Use result of `init` call if available.
                    const provider = (()=>{
                        if (result === null || result === void 0 ? void 0 : result.activeProvider) return result.activeProvider;
                        return sdk.getProvider();
                    })();
                    if (!provider) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$connector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderNotFoundError"]();
                    return provider;
                }
                if (!provider) {
                    if (!providerPromise) providerPromise = initProvider();
                    provider = await providerPromise;
                }
                return provider;
            },
            async isAuthorized () {
                try {
                    // MetaMask mobile provider sometimes fails to immediately resolve
                    // JSON-RPC requests on page load
                    const timeout = 200;
                    const accounts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withRetry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withRetry"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withTimeout"])(()=>this.getAccounts(), {
                            timeout
                        }), {
                        delay: timeout + 1,
                        retryCount: 3
                    });
                    return !!accounts.length;
                } catch (e) {
                    return false;
                }
            },
            async switchChain (param) {
                let { addEthereumChainParameter, chainId } = param;
                const provider = await this.getProvider();
                const chain = config.chains.find((x)=>x.id === chainId);
                if (!chain) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchChainError"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainNotConfiguredError"]());
                try {
                    await provider.request({
                        method: 'wallet_switchEthereumChain',
                        params: [
                            {
                                chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberToHex"])(chainId)
                            }
                        ]
                    });
                    // During `'wallet_switchEthereumChain'`, MetaMask makes a `'net_version'` RPC call to the target chain.
                    // If this request fails, MetaMask does not emit the `'chainChanged'` event, but will still switch the chain.
                    // To counter this behavior, we request and emit the current chain ID to confirm the chain switch either via
                    // this callback or an externally emitted `'chainChanged'` event.
                    // https://github.com/MetaMask/metamask-extension/issues/24247
                    await waitForChainIdToSync();
                    await sendAndWaitForChangeEvent(chainId);
                    return chain;
                } catch (err) {
                    var // Unwrapping for MetaMask Mobile
                    // https://github.com/MetaMask/metamask-mobile/issues/2944#issuecomment-976988719
                    _error_data_originalError, _error_data;
                    const error = err;
                    if (error.code === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"].code) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](error);
                    // Indicates chain is not added to provider
                    if (error.code === 4902 || (error === null || error === void 0 ? void 0 : (_error_data = error.data) === null || _error_data === void 0 ? void 0 : (_error_data_originalError = _error_data.originalError) === null || _error_data_originalError === void 0 ? void 0 : _error_data_originalError.code) === 4902) {
                        try {
                            var _addEthereumChainParameter_chainName, _addEthereumChainParameter_nativeCurrency;
                            await provider.request({
                                method: 'wallet_addEthereumChain',
                                params: [
                                    {
                                        blockExplorerUrls: (()=>{
                                            var _chain_blockExplorers;
                                            const { default: blockExplorer, ...blockExplorers } = (_chain_blockExplorers = chain.blockExplorers) !== null && _chain_blockExplorers !== void 0 ? _chain_blockExplorers : {};
                                            if (addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.blockExplorerUrls) return addEthereumChainParameter.blockExplorerUrls;
                                            if (blockExplorer) return [
                                                blockExplorer.url,
                                                ...Object.values(blockExplorers).map((x)=>x.url)
                                            ];
                                            return;
                                        })(),
                                        chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberToHex"])(chainId),
                                        chainName: (_addEthereumChainParameter_chainName = addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.chainName) !== null && _addEthereumChainParameter_chainName !== void 0 ? _addEthereumChainParameter_chainName : chain.name,
                                        iconUrls: addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.iconUrls,
                                        nativeCurrency: (_addEthereumChainParameter_nativeCurrency = addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.nativeCurrency) !== null && _addEthereumChainParameter_nativeCurrency !== void 0 ? _addEthereumChainParameter_nativeCurrency : chain.nativeCurrency,
                                        rpcUrls: (()=>{
                                            var _addEthereumChainParameter_rpcUrls, _chain_rpcUrls_default;
                                            if (addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : (_addEthereumChainParameter_rpcUrls = addEthereumChainParameter.rpcUrls) === null || _addEthereumChainParameter_rpcUrls === void 0 ? void 0 : _addEthereumChainParameter_rpcUrls.length) return addEthereumChainParameter.rpcUrls;
                                            var _chain_rpcUrls_default_http_;
                                            return [
                                                (_chain_rpcUrls_default_http_ = (_chain_rpcUrls_default = chain.rpcUrls.default) === null || _chain_rpcUrls_default === void 0 ? void 0 : _chain_rpcUrls_default.http[0]) !== null && _chain_rpcUrls_default_http_ !== void 0 ? _chain_rpcUrls_default_http_ : ''
                                            ];
                                        })()
                                    }
                                ]
                            });
                            await waitForChainIdToSync();
                            await sendAndWaitForChangeEvent(chainId);
                            return chain;
                        } catch (err) {
                            const error = err;
                            if (error.code === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"].code) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](error);
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchChainError"](error);
                        }
                    }
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchChainError"](error);
                }
                async function waitForChainIdToSync() {
                    // On mobile, there is a race condition between the result of `'wallet_addEthereumChain'` and `'eth_chainId'`.
                    // To avoid this, we wait for `'eth_chainId'` to return the expected chain ID with a retry loop.
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withRetry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withRetry"])(async ()=>{
                        const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexToNumber"])(await provider.request({
                            method: 'eth_chainId'
                        }));
                        // `value` doesn't match expected `chainId`, throw to trigger retry
                        if (value !== chainId) throw new Error('User rejected switch after adding network.');
                        return value;
                    }, {
                        delay: 50,
                        retryCount: 20
                    });
                }
                async function sendAndWaitForChangeEvent(chainId) {
                    await new Promise((resolve)=>{
                        const listener = (data)=>{
                            if ('chainId' in data && data.chainId === chainId) {
                                config.emitter.off('change', listener);
                                resolve();
                            }
                        };
                        config.emitter.on('change', listener);
                        config.emitter.emit('change', {
                            chainId
                        });
                    });
                }
            },
            async onAccountsChanged (accounts) {
                // Disconnect if there are no accounts
                if (accounts.length === 0) {
                    // ... and using browser extension
                    if (sdk.isExtensionActive()) this.onDisconnect();
                    else return;
                } else if (config.emitter.listenerCount('connect')) {
                    const chainId = (await this.getChainId()).toString();
                    this.onConnect({
                        chainId
                    });
                } else config.emitter.emit('change', {
                    accounts: accounts.map((x)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(x))
                });
            },
            onChainChanged (chain) {
                const chainId = Number(chain);
                config.emitter.emit('change', {
                    chainId
                });
            },
            async onConnect (connectInfo) {
                const accounts = await this.getAccounts();
                if (accounts.length === 0) return;
                const chainId = Number(connectInfo.chainId);
                config.emitter.emit('connect', {
                    accounts,
                    chainId
                });
                const provider = await this.getProvider();
                if (connect) {
                    provider.removeListener('connect', connect);
                    connect = undefined;
                }
                if (!accountsChanged) {
                    accountsChanged = this.onAccountsChanged.bind(this);
                    provider.on('accountsChanged', accountsChanged);
                }
                if (!chainChanged) {
                    chainChanged = this.onChainChanged.bind(this);
                    provider.on('chainChanged', chainChanged);
                }
                if (!disconnect) {
                    disconnect = this.onDisconnect.bind(this);
                    provider.on('disconnect', disconnect);
                }
            },
            async onDisconnect (error) {
                const provider = await this.getProvider();
                // If MetaMask emits a `code: 1013` error, wait for reconnection before disconnecting
                // https://github.com/MetaMask/providers/pull/120
                if (error && error.code === 1013) {
                    if (provider && !!(await this.getAccounts()).length) return;
                }
                config.emitter.emit('disconnect');
                // Manage EIP-1193 event listeners
                if (chainChanged) {
                    provider.removeListener('chainChanged', chainChanged);
                    chainChanged = undefined;
                }
                if (disconnect) {
                    provider.removeListener('disconnect', disconnect);
                    disconnect = undefined;
                }
                if (!connect) {
                    connect = this.onConnect.bind(this);
                    provider.on('connect', connect);
                }
            },
            onDisplayUri (uri) {
                config.emitter.emit('message', {
                    type: 'display_uri',
                    data: uri
                });
            }
        }));
} //# sourceMappingURL=metaMask.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/connectors/dist/esm/coinbaseWallet.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "coinbaseWallet",
    ()=>coinbaseWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/errors/config.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$createConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/connectors/createConnector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/address/getAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/rpc.js [app-client] (ecmascript)");
;
;
coinbaseWallet.type = 'coinbaseWallet';
function coinbaseWallet() {
    let parameters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (parameters.version === '3' || parameters.headlessMode) return version3(parameters);
    return version4(parameters);
}
function version4(parameters) {
    let walletProvider;
    let accountsChanged;
    let chainChanged;
    let disconnect;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$createConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createConnector"])((config)=>({
            id: 'coinbaseWalletSDK',
            name: 'Coinbase Wallet',
            rdns: 'com.coinbase.wallet',
            type: coinbaseWallet.type,
            async connect () {
                let { chainId, ...rest } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                try {
                    const provider = await this.getProvider();
                    const accounts = (await provider.request({
                        method: 'eth_requestAccounts',
                        params: 'instantOnboarding' in rest && rest.instantOnboarding ? [
                            {
                                onboarding: 'instant'
                            }
                        ] : []
                    })).map((x)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(x));
                    if (!accountsChanged) {
                        accountsChanged = this.onAccountsChanged.bind(this);
                        provider.on('accountsChanged', accountsChanged);
                    }
                    if (!chainChanged) {
                        chainChanged = this.onChainChanged.bind(this);
                        provider.on('chainChanged', chainChanged);
                    }
                    if (!disconnect) {
                        disconnect = this.onDisconnect.bind(this);
                        provider.on('disconnect', disconnect);
                    }
                    // Switch to chain if provided
                    let currentChainId = await this.getChainId();
                    if (chainId && currentChainId !== chainId) {
                        const chain = await this.switchChain({
                            chainId
                        }).catch((error)=>{
                            if (error.code === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"].code) throw error;
                            return {
                                id: currentChainId
                            };
                        });
                        var _chain_id;
                        currentChainId = (_chain_id = chain === null || chain === void 0 ? void 0 : chain.id) !== null && _chain_id !== void 0 ? _chain_id : currentChainId;
                    }
                    return {
                        accounts,
                        chainId: currentChainId
                    };
                } catch (error) {
                    if (/(user closed modal|accounts received is empty|user denied account|request rejected)/i.test(error.message)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](error);
                    throw error;
                }
            },
            async disconnect () {
                var _provider_close;
                const provider = await this.getProvider();
                if (accountsChanged) {
                    provider.removeListener('accountsChanged', accountsChanged);
                    accountsChanged = undefined;
                }
                if (chainChanged) {
                    provider.removeListener('chainChanged', chainChanged);
                    chainChanged = undefined;
                }
                if (disconnect) {
                    provider.removeListener('disconnect', disconnect);
                    disconnect = undefined;
                }
                provider.disconnect();
                (_provider_close = provider.close) === null || _provider_close === void 0 ? void 0 : _provider_close.call(provider);
            },
            async getAccounts () {
                const provider = await this.getProvider();
                return (await provider.request({
                    method: 'eth_accounts'
                })).map((x)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(x));
            },
            async getChainId () {
                const provider = await this.getProvider();
                const chainId = await provider.request({
                    method: 'eth_chainId'
                });
                return Number(chainId);
            },
            async getProvider () {
                if (!walletProvider) {
                    const preference = (()=>{
                        var _parameters_preference;
                        if (typeof parameters.preference === 'string') return {
                            options: parameters.preference
                        };
                        var _parameters_preference_options;
                        return {
                            ...parameters.preference,
                            options: (_parameters_preference_options = (_parameters_preference = parameters.preference) === null || _parameters_preference === void 0 ? void 0 : _parameters_preference.options) !== null && _parameters_preference_options !== void 0 ? _parameters_preference_options : 'all'
                        };
                    })();
                    const { createCoinbaseWalletSDK } = await __turbopack_context__.A("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@coinbase/wallet-sdk/dist/index.js [app-client] (ecmascript, async loader)");
                    const sdk = createCoinbaseWalletSDK({
                        ...parameters,
                        appChainIds: config.chains.map((x)=>x.id),
                        preference
                    });
                    walletProvider = sdk.getProvider();
                }
                return walletProvider;
            },
            async isAuthorized () {
                try {
                    const accounts = await this.getAccounts();
                    return !!accounts.length;
                } catch (e) {
                    return false;
                }
            },
            async switchChain (param) {
                let { addEthereumChainParameter, chainId } = param;
                const chain = config.chains.find((chain)=>chain.id === chainId);
                if (!chain) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchChainError"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainNotConfiguredError"]());
                const provider = await this.getProvider();
                try {
                    await provider.request({
                        method: 'wallet_switchEthereumChain',
                        params: [
                            {
                                chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberToHex"])(chain.id)
                            }
                        ]
                    });
                    return chain;
                } catch (error) {
                    // Indicates chain is not added to provider
                    if (error.code === 4902) {
                        try {
                            var _chain_blockExplorers, _chain_blockExplorers1, _addEthereumChainParameter_rpcUrls, _chain_rpcUrls_default;
                            let blockExplorerUrls;
                            if (addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.blockExplorerUrls) blockExplorerUrls = addEthereumChainParameter.blockExplorerUrls;
                            else blockExplorerUrls = ((_chain_blockExplorers = chain.blockExplorers) === null || _chain_blockExplorers === void 0 ? void 0 : _chain_blockExplorers.default.url) ? [
                                (_chain_blockExplorers1 = chain.blockExplorers) === null || _chain_blockExplorers1 === void 0 ? void 0 : _chain_blockExplorers1.default.url
                            ] : [];
                            let rpcUrls;
                            var _chain_rpcUrls_default_http_;
                            if (addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : (_addEthereumChainParameter_rpcUrls = addEthereumChainParameter.rpcUrls) === null || _addEthereumChainParameter_rpcUrls === void 0 ? void 0 : _addEthereumChainParameter_rpcUrls.length) rpcUrls = addEthereumChainParameter.rpcUrls;
                            else rpcUrls = [
                                (_chain_rpcUrls_default_http_ = (_chain_rpcUrls_default = chain.rpcUrls.default) === null || _chain_rpcUrls_default === void 0 ? void 0 : _chain_rpcUrls_default.http[0]) !== null && _chain_rpcUrls_default_http_ !== void 0 ? _chain_rpcUrls_default_http_ : ''
                            ];
                            var _addEthereumChainParameter_chainName, _addEthereumChainParameter_nativeCurrency;
                            const addEthereumChain = {
                                blockExplorerUrls,
                                chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberToHex"])(chainId),
                                chainName: (_addEthereumChainParameter_chainName = addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.chainName) !== null && _addEthereumChainParameter_chainName !== void 0 ? _addEthereumChainParameter_chainName : chain.name,
                                iconUrls: addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.iconUrls,
                                nativeCurrency: (_addEthereumChainParameter_nativeCurrency = addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.nativeCurrency) !== null && _addEthereumChainParameter_nativeCurrency !== void 0 ? _addEthereumChainParameter_nativeCurrency : chain.nativeCurrency,
                                rpcUrls
                            };
                            await provider.request({
                                method: 'wallet_addEthereumChain',
                                params: [
                                    addEthereumChain
                                ]
                            });
                            return chain;
                        } catch (error) {
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](error);
                        }
                    }
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchChainError"](error);
                }
            },
            onAccountsChanged (accounts) {
                if (accounts.length === 0) this.onDisconnect();
                else config.emitter.emit('change', {
                    accounts: accounts.map((x)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(x))
                });
            },
            onChainChanged (chain) {
                const chainId = Number(chain);
                config.emitter.emit('change', {
                    chainId
                });
            },
            async onDisconnect (_error) {
                config.emitter.emit('disconnect');
                const provider = await this.getProvider();
                if (accountsChanged) {
                    provider.removeListener('accountsChanged', accountsChanged);
                    accountsChanged = undefined;
                }
                if (chainChanged) {
                    provider.removeListener('chainChanged', chainChanged);
                    chainChanged = undefined;
                }
                if (disconnect) {
                    provider.removeListener('disconnect', disconnect);
                    disconnect = undefined;
                }
            }
        }));
}
function version3(parameters) {
    const reloadOnDisconnect = false;
    let sdk;
    let walletProvider;
    let accountsChanged;
    let chainChanged;
    let disconnect;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$createConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createConnector"])((config)=>({
            id: 'coinbaseWalletSDK',
            name: 'Coinbase Wallet',
            rdns: 'com.coinbase.wallet',
            type: coinbaseWallet.type,
            async connect () {
                let { chainId } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                try {
                    const provider = await this.getProvider();
                    const accounts = (await provider.request({
                        method: 'eth_requestAccounts'
                    })).map((x)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(x));
                    if (!accountsChanged) {
                        accountsChanged = this.onAccountsChanged.bind(this);
                        provider.on('accountsChanged', accountsChanged);
                    }
                    if (!chainChanged) {
                        chainChanged = this.onChainChanged.bind(this);
                        provider.on('chainChanged', chainChanged);
                    }
                    if (!disconnect) {
                        disconnect = this.onDisconnect.bind(this);
                        provider.on('disconnect', disconnect);
                    }
                    // Switch to chain if provided
                    let currentChainId = await this.getChainId();
                    if (chainId && currentChainId !== chainId) {
                        const chain = await this.switchChain({
                            chainId
                        }).catch((error)=>{
                            if (error.code === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"].code) throw error;
                            return {
                                id: currentChainId
                            };
                        });
                        var _chain_id;
                        currentChainId = (_chain_id = chain === null || chain === void 0 ? void 0 : chain.id) !== null && _chain_id !== void 0 ? _chain_id : currentChainId;
                    }
                    return {
                        accounts,
                        chainId: currentChainId
                    };
                } catch (error) {
                    if (/(user closed modal|accounts received is empty|user denied account)/i.test(error.message)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](error);
                    throw error;
                }
            },
            async disconnect () {
                const provider = await this.getProvider();
                if (accountsChanged) {
                    provider.removeListener('accountsChanged', accountsChanged);
                    accountsChanged = undefined;
                }
                if (chainChanged) {
                    provider.removeListener('chainChanged', chainChanged);
                    chainChanged = undefined;
                }
                if (disconnect) {
                    provider.removeListener('disconnect', disconnect);
                    disconnect = undefined;
                }
                provider.disconnect();
                provider.close();
            },
            async getAccounts () {
                const provider = await this.getProvider();
                return (await provider.request({
                    method: 'eth_accounts'
                })).map((x)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(x));
            },
            async getChainId () {
                const provider = await this.getProvider();
                const chainId = await provider.request({
                    method: 'eth_chainId'
                });
                return Number(chainId);
            },
            async getProvider () {
                if (!walletProvider) {
                    var _sdk_walletExtension;
                    // Unwrapping import for Vite compatibility.
                    // See: https://github.com/vitejs/vite/issues/9703
                    const CoinbaseWalletSDK = await (async ()=>{
                        const { default: SDK } = await __turbopack_context__.A("[project]/Desktop/VerdeX/VerdeX/src/node_modules/cbw-sdk/dist/index.js [app-client] (ecmascript, async loader)");
                        if (typeof SDK !== 'function' && typeof SDK.default === 'function') return SDK.default;
                        return SDK;
                    })();
                    sdk = new CoinbaseWalletSDK({
                        ...parameters,
                        reloadOnDisconnect
                    });
                    // Force types to retrieve private `walletExtension` method from the Coinbase Wallet SDK.
                    const walletExtensionChainId = (_sdk_walletExtension = sdk.walletExtension) === null || _sdk_walletExtension === void 0 ? void 0 : _sdk_walletExtension.getChainId();
                    const chain = config.chains.find((chain)=>parameters.chainId ? chain.id === parameters.chainId : chain.id === walletExtensionChainId) || config.chains[0];
                    const chainId = parameters.chainId || (chain === null || chain === void 0 ? void 0 : chain.id);
                    const jsonRpcUrl = parameters.jsonRpcUrl || (chain === null || chain === void 0 ? void 0 : chain.rpcUrls.default.http[0]);
                    walletProvider = sdk.makeWeb3Provider(jsonRpcUrl, chainId);
                }
                return walletProvider;
            },
            async isAuthorized () {
                try {
                    const accounts = await this.getAccounts();
                    return !!accounts.length;
                } catch (e) {
                    return false;
                }
            },
            async switchChain (param) {
                let { addEthereumChainParameter, chainId } = param;
                const chain = config.chains.find((chain)=>chain.id === chainId);
                if (!chain) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchChainError"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainNotConfiguredError"]());
                const provider = await this.getProvider();
                try {
                    await provider.request({
                        method: 'wallet_switchEthereumChain',
                        params: [
                            {
                                chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberToHex"])(chain.id)
                            }
                        ]
                    });
                    return chain;
                } catch (error) {
                    // Indicates chain is not added to provider
                    if (error.code === 4902) {
                        try {
                            var _chain_blockExplorers, _chain_blockExplorers1, _addEthereumChainParameter_rpcUrls, _chain_rpcUrls_default;
                            let blockExplorerUrls;
                            if (addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.blockExplorerUrls) blockExplorerUrls = addEthereumChainParameter.blockExplorerUrls;
                            else blockExplorerUrls = ((_chain_blockExplorers = chain.blockExplorers) === null || _chain_blockExplorers === void 0 ? void 0 : _chain_blockExplorers.default.url) ? [
                                (_chain_blockExplorers1 = chain.blockExplorers) === null || _chain_blockExplorers1 === void 0 ? void 0 : _chain_blockExplorers1.default.url
                            ] : [];
                            let rpcUrls;
                            var _chain_rpcUrls_default_http_;
                            if (addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : (_addEthereumChainParameter_rpcUrls = addEthereumChainParameter.rpcUrls) === null || _addEthereumChainParameter_rpcUrls === void 0 ? void 0 : _addEthereumChainParameter_rpcUrls.length) rpcUrls = addEthereumChainParameter.rpcUrls;
                            else rpcUrls = [
                                (_chain_rpcUrls_default_http_ = (_chain_rpcUrls_default = chain.rpcUrls.default) === null || _chain_rpcUrls_default === void 0 ? void 0 : _chain_rpcUrls_default.http[0]) !== null && _chain_rpcUrls_default_http_ !== void 0 ? _chain_rpcUrls_default_http_ : ''
                            ];
                            var _addEthereumChainParameter_chainName, _addEthereumChainParameter_nativeCurrency;
                            const addEthereumChain = {
                                blockExplorerUrls,
                                chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberToHex"])(chainId),
                                chainName: (_addEthereumChainParameter_chainName = addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.chainName) !== null && _addEthereumChainParameter_chainName !== void 0 ? _addEthereumChainParameter_chainName : chain.name,
                                iconUrls: addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.iconUrls,
                                nativeCurrency: (_addEthereumChainParameter_nativeCurrency = addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.nativeCurrency) !== null && _addEthereumChainParameter_nativeCurrency !== void 0 ? _addEthereumChainParameter_nativeCurrency : chain.nativeCurrency,
                                rpcUrls
                            };
                            await provider.request({
                                method: 'wallet_addEthereumChain',
                                params: [
                                    addEthereumChain
                                ]
                            });
                            return chain;
                        } catch (error) {
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](error);
                        }
                    }
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchChainError"](error);
                }
            },
            onAccountsChanged (accounts) {
                if (accounts.length === 0) this.onDisconnect();
                else config.emitter.emit('change', {
                    accounts: accounts.map((x)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(x))
                });
            },
            onChainChanged (chain) {
                const chainId = Number(chain);
                config.emitter.emit('change', {
                    chainId
                });
            },
            async onDisconnect (_error) {
                config.emitter.emit('disconnect');
                const provider = await this.getProvider();
                if (accountsChanged) {
                    provider.removeListener('accountsChanged', accountsChanged);
                    accountsChanged = undefined;
                }
                if (chainChanged) {
                    provider.removeListener('chainChanged', chainChanged);
                    chainChanged = undefined;
                }
                if (disconnect) {
                    provider.removeListener('disconnect', disconnect);
                    disconnect = undefined;
                }
            }
        }));
} //# sourceMappingURL=coinbaseWallet.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/connectors/dist/esm/walletConnect.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "walletConnect",
    ()=>walletConnect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/errors/config.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$createConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/connectors/createConnector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$extractRpcUrls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/utils/extractRpcUrls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$connector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@wagmi/core/dist/esm/errors/connector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/address/getAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/src/node_modules/viem/_esm/errors/rpc.js [app-client] (ecmascript)");
;
;
walletConnect.type = 'walletConnect';
function walletConnect(parameters) {
    var _parameters_isNewChainsStale;
    const isNewChainsStale = (_parameters_isNewChainsStale = parameters.isNewChainsStale) !== null && _parameters_isNewChainsStale !== void 0 ? _parameters_isNewChainsStale : true;
    let provider_;
    let providerPromise;
    const NAMESPACE = 'eip155';
    let accountsChanged;
    let chainChanged;
    let connect;
    let displayUri;
    let sessionDelete;
    let disconnect;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$createConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createConnector"])((config)=>({
            id: 'walletConnect',
            name: 'WalletConnect',
            type: walletConnect.type,
            async setup () {
                const provider = await this.getProvider().catch(()=>null);
                if (!provider) return;
                if (!connect) {
                    connect = this.onConnect.bind(this);
                    provider.on('connect', connect);
                }
                if (!sessionDelete) {
                    sessionDelete = this.onSessionDelete.bind(this);
                    provider.on('session_delete', sessionDelete);
                }
            },
            async connect () {
                let { chainId, ...rest } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                try {
                    const provider = await this.getProvider();
                    if (!provider) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$connector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderNotFoundError"]();
                    if (!displayUri) {
                        displayUri = this.onDisplayUri;
                        provider.on('display_uri', displayUri);
                    }
                    let targetChainId = chainId;
                    if (!targetChainId) {
                        var _config_storage, _config_chains_;
                        var _ref;
                        const state = (_ref = await ((_config_storage = config.storage) === null || _config_storage === void 0 ? void 0 : _config_storage.getItem('state'))) !== null && _ref !== void 0 ? _ref : {};
                        const isChainSupported = config.chains.some((x)=>x.id === state.chainId);
                        if (isChainSupported) targetChainId = state.chainId;
                        else targetChainId = (_config_chains_ = config.chains[0]) === null || _config_chains_ === void 0 ? void 0 : _config_chains_.id;
                    }
                    if (!targetChainId) throw new Error('No chains found on connector.');
                    const isChainsStale = await this.isChainsStale();
                    // If there is an active session with stale chains, disconnect current session.
                    if (provider.session && isChainsStale) await provider.disconnect();
                    // If there isn't an active session or chains are stale, connect.
                    if (!provider.session || isChainsStale) {
                        const optionalChains = config.chains.filter((chain)=>chain.id !== targetChainId).map((optionalChain)=>optionalChain.id);
                        await provider.connect({
                            optionalChains: [
                                targetChainId,
                                ...optionalChains
                            ],
                            ...'pairingTopic' in rest ? {
                                pairingTopic: rest.pairingTopic
                            } : {}
                        });
                        this.setRequestedChainsIds(config.chains.map((x)=>x.id));
                    }
                    // If session exists and chains are authorized, enable provider for required chain
                    const accounts = (await provider.enable()).map((x)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(x));
                    // Switch to chain if provided
                    let currentChainId = await this.getChainId();
                    if (chainId && currentChainId !== chainId) {
                        const chain = await this.switchChain({
                            chainId
                        }).catch((error)=>{
                            var _error_cause;
                            if (error.code === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"].code && ((_error_cause = error.cause) === null || _error_cause === void 0 ? void 0 : _error_cause.message) !== 'Missing or invalid. request() method: wallet_addEthereumChain') throw error;
                            return {
                                id: currentChainId
                            };
                        });
                        var _chain_id;
                        currentChainId = (_chain_id = chain === null || chain === void 0 ? void 0 : chain.id) !== null && _chain_id !== void 0 ? _chain_id : currentChainId;
                    }
                    if (displayUri) {
                        provider.removeListener('display_uri', displayUri);
                        displayUri = undefined;
                    }
                    if (connect) {
                        provider.removeListener('connect', connect);
                        connect = undefined;
                    }
                    if (!accountsChanged) {
                        accountsChanged = this.onAccountsChanged.bind(this);
                        provider.on('accountsChanged', accountsChanged);
                    }
                    if (!chainChanged) {
                        chainChanged = this.onChainChanged.bind(this);
                        provider.on('chainChanged', chainChanged);
                    }
                    if (!disconnect) {
                        disconnect = this.onDisconnect.bind(this);
                        provider.on('disconnect', disconnect);
                    }
                    if (!sessionDelete) {
                        sessionDelete = this.onSessionDelete.bind(this);
                        provider.on('session_delete', sessionDelete);
                    }
                    return {
                        accounts,
                        chainId: currentChainId
                    };
                } catch (error) {
                    if (/(user rejected|connection request reset)/i.test(error === null || error === void 0 ? void 0 : error.message)) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](error);
                    }
                    throw error;
                }
            },
            async disconnect () {
                const provider = await this.getProvider();
                try {
                    await (provider === null || provider === void 0 ? void 0 : provider.disconnect());
                } catch (error) {
                    if (!/No matching key/i.test(error.message)) throw error;
                } finally{
                    if (chainChanged) {
                        provider === null || provider === void 0 ? void 0 : provider.removeListener('chainChanged', chainChanged);
                        chainChanged = undefined;
                    }
                    if (disconnect) {
                        provider === null || provider === void 0 ? void 0 : provider.removeListener('disconnect', disconnect);
                        disconnect = undefined;
                    }
                    if (!connect) {
                        connect = this.onConnect.bind(this);
                        provider === null || provider === void 0 ? void 0 : provider.on('connect', connect);
                    }
                    if (accountsChanged) {
                        provider === null || provider === void 0 ? void 0 : provider.removeListener('accountsChanged', accountsChanged);
                        accountsChanged = undefined;
                    }
                    if (sessionDelete) {
                        provider === null || provider === void 0 ? void 0 : provider.removeListener('session_delete', sessionDelete);
                        sessionDelete = undefined;
                    }
                    this.setRequestedChainsIds([]);
                }
            },
            async getAccounts () {
                const provider = await this.getProvider();
                return provider.accounts.map((x)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(x));
            },
            async getProvider () {
                async function initProvider() {
                    const optionalChains = config.chains.map((x)=>x.id);
                    if (!optionalChains.length) return;
                    const { EthereumProvider } = await __turbopack_context__.A("[project]/Desktop/VerdeX/VerdeX/src/node_modules/@walletconnect/ethereum-provider/dist/index.es.js [app-client] (ecmascript, async loader)");
                    var _parameters_showQrModal;
                    return await EthereumProvider.init({
                        ...parameters,
                        disableProviderPing: true,
                        optionalChains,
                        projectId: parameters.projectId,
                        rpcMap: Object.fromEntries(config.chains.map((chain)=>{
                            const [url] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$extractRpcUrls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractRpcUrls"])({
                                chain,
                                transports: config.transports
                            });
                            return [
                                chain.id,
                                url
                            ];
                        })),
                        showQrModal: (_parameters_showQrModal = parameters.showQrModal) !== null && _parameters_showQrModal !== void 0 ? _parameters_showQrModal : true
                    });
                }
                if (!provider_) {
                    if (!providerPromise) providerPromise = initProvider();
                    provider_ = await providerPromise;
                    provider_ === null || provider_ === void 0 ? void 0 : provider_.events.setMaxListeners(Number.POSITIVE_INFINITY);
                }
                return provider_;
            },
            async getChainId () {
                const provider = await this.getProvider();
                return provider.chainId;
            },
            async isAuthorized () {
                try {
                    const [accounts, provider] = await Promise.all([
                        this.getAccounts(),
                        this.getProvider()
                    ]);
                    // If an account does not exist on the session, then the connector is unauthorized.
                    if (!accounts.length) return false;
                    // If the chains are stale on the session, then the connector is unauthorized.
                    const isChainsStale = await this.isChainsStale();
                    if (isChainsStale && provider.session) {
                        await provider.disconnect().catch(()=>{});
                        return false;
                    }
                    return true;
                } catch (e) {
                    return false;
                }
            },
            async switchChain (param) {
                let { addEthereumChainParameter, chainId } = param;
                const provider = await this.getProvider();
                if (!provider) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$connector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderNotFoundError"]();
                const chain = config.chains.find((x)=>x.id === chainId);
                if (!chain) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchChainError"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$errors$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainNotConfiguredError"]());
                try {
                    await Promise.all([
                        new Promise((resolve)=>{
                            const listener = (param)=>{
                                let { chainId: currentChainId } = param;
                                if (currentChainId === chainId) {
                                    config.emitter.off('change', listener);
                                    resolve();
                                }
                            };
                            config.emitter.on('change', listener);
                        }),
                        provider.request({
                            method: 'wallet_switchEthereumChain',
                            params: [
                                {
                                    chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberToHex"])(chainId)
                                }
                            ]
                        })
                    ]);
                    const requestedChains = await this.getRequestedChainsIds();
                    this.setRequestedChainsIds([
                        ...requestedChains,
                        chainId
                    ]);
                    return chain;
                } catch (err) {
                    const error = err;
                    if (/(user rejected)/i.test(error.message)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](error);
                    // Indicates chain is not added to provider
                    try {
                        var _chain_blockExplorers, _chain_blockExplorers1, _addEthereumChainParameter_rpcUrls;
                        let blockExplorerUrls;
                        if (addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.blockExplorerUrls) blockExplorerUrls = addEthereumChainParameter.blockExplorerUrls;
                        else blockExplorerUrls = ((_chain_blockExplorers = chain.blockExplorers) === null || _chain_blockExplorers === void 0 ? void 0 : _chain_blockExplorers.default.url) ? [
                            (_chain_blockExplorers1 = chain.blockExplorers) === null || _chain_blockExplorers1 === void 0 ? void 0 : _chain_blockExplorers1.default.url
                        ] : [];
                        let rpcUrls;
                        if (addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : (_addEthereumChainParameter_rpcUrls = addEthereumChainParameter.rpcUrls) === null || _addEthereumChainParameter_rpcUrls === void 0 ? void 0 : _addEthereumChainParameter_rpcUrls.length) rpcUrls = addEthereumChainParameter.rpcUrls;
                        else rpcUrls = [
                            ...chain.rpcUrls.default.http
                        ];
                        var _addEthereumChainParameter_chainName, _addEthereumChainParameter_nativeCurrency;
                        const addEthereumChain = {
                            blockExplorerUrls,
                            chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberToHex"])(chainId),
                            chainName: (_addEthereumChainParameter_chainName = addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.chainName) !== null && _addEthereumChainParameter_chainName !== void 0 ? _addEthereumChainParameter_chainName : chain.name,
                            iconUrls: addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.iconUrls,
                            nativeCurrency: (_addEthereumChainParameter_nativeCurrency = addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.nativeCurrency) !== null && _addEthereumChainParameter_nativeCurrency !== void 0 ? _addEthereumChainParameter_nativeCurrency : chain.nativeCurrency,
                            rpcUrls
                        };
                        await provider.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                addEthereumChain
                            ]
                        });
                        const requestedChains = await this.getRequestedChainsIds();
                        this.setRequestedChainsIds([
                            ...requestedChains,
                            chainId
                        ]);
                        return chain;
                    } catch (error) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](error);
                    }
                }
            },
            onAccountsChanged (accounts) {
                if (accounts.length === 0) this.onDisconnect();
                else config.emitter.emit('change', {
                    accounts: accounts.map((x)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$src$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(x))
                });
            },
            onChainChanged (chain) {
                const chainId = Number(chain);
                config.emitter.emit('change', {
                    chainId
                });
            },
            async onConnect (connectInfo) {
                const chainId = Number(connectInfo.chainId);
                const accounts = await this.getAccounts();
                config.emitter.emit('connect', {
                    accounts,
                    chainId
                });
            },
            async onDisconnect (_error) {
                this.setRequestedChainsIds([]);
                config.emitter.emit('disconnect');
                const provider = await this.getProvider();
                if (accountsChanged) {
                    provider.removeListener('accountsChanged', accountsChanged);
                    accountsChanged = undefined;
                }
                if (chainChanged) {
                    provider.removeListener('chainChanged', chainChanged);
                    chainChanged = undefined;
                }
                if (disconnect) {
                    provider.removeListener('disconnect', disconnect);
                    disconnect = undefined;
                }
                if (sessionDelete) {
                    provider.removeListener('session_delete', sessionDelete);
                    sessionDelete = undefined;
                }
                if (!connect) {
                    connect = this.onConnect.bind(this);
                    provider.on('connect', connect);
                }
            },
            onDisplayUri (uri) {
                config.emitter.emit('message', {
                    type: 'display_uri',
                    data: uri
                });
            },
            onSessionDelete () {
                this.onDisconnect();
            },
            getNamespaceChainsIds () {
                var _provider__session_namespaces_NAMESPACE_accounts, _provider__session_namespaces_NAMESPACE, _provider__session;
                if (!provider_) return [];
                const chainIds = (_provider__session = provider_.session) === null || _provider__session === void 0 ? void 0 : (_provider__session_namespaces_NAMESPACE = _provider__session.namespaces[NAMESPACE]) === null || _provider__session_namespaces_NAMESPACE === void 0 ? void 0 : (_provider__session_namespaces_NAMESPACE_accounts = _provider__session_namespaces_NAMESPACE.accounts) === null || _provider__session_namespaces_NAMESPACE_accounts === void 0 ? void 0 : _provider__session_namespaces_NAMESPACE_accounts.map((account)=>Number.parseInt(account.split(':')[1] || ''));
                return chainIds !== null && chainIds !== void 0 ? chainIds : [];
            },
            async getRequestedChainsIds () {
                var _config_storage;
                var _ref;
                return (_ref = await ((_config_storage = config.storage) === null || _config_storage === void 0 ? void 0 : _config_storage.getItem(this.requestedChainsStorageKey))) !== null && _ref !== void 0 ? _ref : [];
            },
            /**
         * Checks if the target chains match the chains that were
         * initially requested by the connector for the WalletConnect session.
         * If there is a mismatch, this means that the chains on the connector
         * are considered stale, and need to be revalidated at a later point (via
         * connection).
         *
         * There may be a scenario where a dapp adds a chain to the
         * connector later on, however, this chain will not have been approved or rejected
         * by the wallet. In this case, the chain is considered stale.
         */ async isChainsStale () {
                if (!isNewChainsStale) return false;
                const connectorChains = config.chains.map((x)=>x.id);
                const namespaceChains = this.getNamespaceChainsIds();
                if (namespaceChains.length && !namespaceChains.some((id)=>connectorChains.includes(id))) return false;
                const requestedChains = await this.getRequestedChainsIds();
                return !connectorChains.every((id)=>requestedChains.includes(id));
            },
            async setRequestedChainsIds (chains) {
                var _config_storage;
                await ((_config_storage = config.storage) === null || _config_storage === void 0 ? void 0 : _config_storage.setItem(this.requestedChainsStorageKey, chains));
            },
            get requestedChainsStorageKey () {
                return "".concat(this.id, ".requestedChains");
            }
        }));
} //# sourceMappingURL=walletConnect.js.map
}),
"[project]/Desktop/VerdeX/VerdeX/src/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>J,
    "useTheme",
    ()=>z
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/VerdeX/VerdeX/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
var M = (e, i, s, u, m, a, l, h)=>{
    let d = document.documentElement, w = [
        "light",
        "dark"
    ];
    function p(n) {
        (Array.isArray(e) ? e : [
            e
        ]).forEach((y)=>{
            let k = y === "class", S = k && a ? m.map((f)=>a[f] || f) : m;
            k ? (d.classList.remove(...S), d.classList.add(a && a[n] ? a[n] : n)) : d.setAttribute(y, n);
        }), R(n);
    }
    function R(n) {
        h && w.includes(n) && (d.style.colorScheme = n);
    }
    function c() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    if (u) p(u);
    else try {
        let n = localStorage.getItem(i) || s, y = l && n === "system" ? c() : n;
        p(y);
    } catch (n) {}
};
var b = [
    "light",
    "dark"
], I = "(prefers-color-scheme: dark)", O = typeof window == "undefined", x = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](void 0), U = {
    setTheme: (e)=>{},
    themes: []
}, z = ()=>{
    var e;
    return (e = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](x)) != null ? e : U;
}, J = (e)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](x) ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], null, e.children) : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](V, {
        ...e
    }), N = [
    "light",
    "dark"
], V = (param)=>{
    let { forcedTheme: e, disableTransitionOnChange: i = !1, enableSystem: s = !0, enableColorScheme: u = !0, storageKey: m = "theme", themes: a = N, defaultTheme: l = s ? "system" : "light", attribute: h = "data-theme", value: d, children: w, nonce: p, scriptProps: R } = param;
    let [c, n] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "V.useState": ()=>H(m, l)
    }["V.useState"]), [T, y] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "V.useState": ()=>c === "system" ? E() : c
    }["V.useState"]), k = d ? Object.values(d) : a, S = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "V.useCallback[S]": (o)=>{
            let r = o;
            if (!r) return;
            o === "system" && s && (r = E());
            let v = d ? d[r] : r, C = i ? W(p) : null, P = document.documentElement, L = {
                "V.useCallback[S].L": (g)=>{
                    g === "class" ? (P.classList.remove(...k), v && P.classList.add(v)) : g.startsWith("data-") && (v ? P.setAttribute(g, v) : P.removeAttribute(g));
                }
            }["V.useCallback[S].L"];
            if (Array.isArray(h) ? h.forEach(L) : L(h), u) {
                let g = b.includes(l) ? l : null, D = b.includes(r) ? r : g;
                P.style.colorScheme = D;
            }
            C == null || C();
        }
    }["V.useCallback[S]"], [
        p
    ]), f = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "V.useCallback[f]": (o)=>{
            let r = typeof o == "function" ? o(c) : o;
            n(r);
            try {
                localStorage.setItem(m, r);
            } catch (v) {}
        }
    }["V.useCallback[f]"], [
        c
    ]), A = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "V.useCallback[A]": (o)=>{
            let r = E(o);
            y(r), c === "system" && s && !e && S("system");
        }
    }["V.useCallback[A]"], [
        c,
        e
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "V.useEffect": ()=>{
            let o = window.matchMedia(I);
            return o.addListener(A), A(o), ({
                "V.useEffect": ()=>o.removeListener(A)
            })["V.useEffect"];
        }
    }["V.useEffect"], [
        A
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "V.useEffect": ()=>{
            let o = {
                "V.useEffect.o": (r)=>{
                    r.key === m && (r.newValue ? n(r.newValue) : f(l));
                }
            }["V.useEffect.o"];
            return window.addEventListener("storage", o), ({
                "V.useEffect": ()=>window.removeEventListener("storage", o)
            })["V.useEffect"];
        }
    }["V.useEffect"], [
        f
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "V.useEffect": ()=>{
            S(e != null ? e : c);
        }
    }["V.useEffect"], [
        e,
        c
    ]);
    let Q = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "V.useMemo[Q]": ()=>({
                theme: c,
                setTheme: f,
                forcedTheme: e,
                resolvedTheme: c === "system" ? T : c,
                themes: s ? [
                    ...a,
                    "system"
                ] : a,
                systemTheme: s ? T : void 0
            })
    }["V.useMemo[Q]"], [
        c,
        f,
        e,
        T,
        s,
        a
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](x.Provider, {
        value: Q
    }, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](_, {
        forcedTheme: e,
        storageKey: m,
        attribute: h,
        enableSystem: s,
        enableColorScheme: u,
        defaultTheme: l,
        value: d,
        themes: a,
        nonce: p,
        scriptProps: R
    }), w);
}, _ = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"]((param)=>{
    let { forcedTheme: e, storageKey: i, attribute: s, enableSystem: u, enableColorScheme: m, defaultTheme: a, value: l, themes: h, nonce: d, scriptProps: w } = param;
    let p = JSON.stringify([
        s,
        i,
        a,
        e,
        h,
        l,
        u,
        m
    ]).slice(1, -1);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$VerdeX$2f$VerdeX$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("script", {
        ...w,
        suppressHydrationWarning: !0,
        nonce: typeof window == "undefined" ? d : "",
        dangerouslySetInnerHTML: {
            __html: "(".concat(M.toString(), ")(").concat(p, ")")
        }
    });
}), H = (e, i)=>{
    if (O) return;
    let s;
    try {
        s = localStorage.getItem(e) || void 0;
    } catch (u) {}
    return s || i;
}, W = (e)=>{
    let i = document.createElement("style");
    return e && i.setAttribute("nonce", e), i.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")), document.head.appendChild(i), ()=>{
        window.getComputedStyle(document.body), setTimeout(()=>{
            document.head.removeChild(i);
        }, 1);
    };
}, E = (e)=>(e || (e = window.matchMedia(I)), e.matches ? "dark" : "light");
;
}),
]);

//# sourceMappingURL=Desktop_VerdeX_VerdeX_c45e94fc._.js.map