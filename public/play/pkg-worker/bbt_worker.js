/**
 * A decoded recording: interleaved left/right samples at `sample_rate`.
 */
export class Decoded {
    static __wrap(ptr) {
        const obj = Object.create(Decoded.prototype);
        obj.__wbg_ptr = ptr;
        DecodedFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DecodedFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_decoded_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get sample_rate() {
        const ret = wasm.decoded_sample_rate(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * The samples, moved out; a second call returns nothing.
     * @returns {Float32Array}
     */
    take_pcm() {
        const ret = wasm.decoded_take_pcm(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
}
if (Symbol.dispose) Decoded.prototype[Symbol.dispose] = Decoded.prototype.free;

/**
 * Format that each sample has. Usually, this corresponds to the sampling
 * depth of the audio source. For example, 16 bit quantized samples can be
 * encoded in `i16` or `u16`. Note that the quantized sampling depth is not
 * directly visible for formats where [`is_float`] is true.
 *
 * Also note that the backend must support the encoding of the quantized
 * samples in the given format, as there is no generic transformation from one
 * format into the other done inside the frontend-library code. You can query
 * the supported formats by using [`supported_input_configs`].
 *
 * A good rule of thumb is to use [`SampleFormat::I16`] as this covers typical
 * music (WAV, MP3) as well as typical audio input devices on most platforms,
 *
 * [`is_float`]: SampleFormat::is_float
 * [`supported_input_configs`]: crate::traits::DeviceTrait::supported_input_configs
 * @enum {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14}
 */
export const SampleFormat = Object.freeze({
    /**
     * `i8` with a valid range of `i8::MIN..=i8::MAX` with `0` being the origin.
     */
    I8: 0, "0": "I8",
    /**
     * `i16` with a valid range of `i16::MIN..=i16::MAX` with `0` being the origin.
     */
    I16: 1, "1": "I16",
    /**
     * `I24` with a valid range of `-(1 << 23)..=((1 << 23) - 1)` with `0` being the origin.
     *
     * This format uses 4 bytes of storage but only 24 bits are significant.
     */
    I24: 2, "2": "I24",
    /**
     * `i32` with a valid range of `i32::MIN..=i32::MAX` with `0` being the origin.
     */
    I32: 3, "3": "I32",
    /**
     * `i64` with a valid range of `i64::MIN..=i64::MAX` with `0` being the origin.
     */
    I64: 4, "4": "I64",
    /**
     * `u8` with a valid range of `u8::MIN..=u8::MAX` with `1 << 7 == 128` being the origin.
     */
    U8: 5, "5": "U8",
    /**
     * `u16` with a valid range of `u16::MIN..=u16::MAX` with `1 << 15 == 32768` being the origin.
     */
    U16: 6, "6": "U16",
    /**
     * `U24` with a valid range of `0..=((1 << 24) - 1)` with `1 << 23 == 8388608` being the origin.
     *
     * This format uses 4 bytes of storage but only 24 bits are significant.
     */
    U24: 7, "7": "U24",
    /**
     * `u32` with a valid range of `u32::MIN..=u32::MAX` with `1 << 31` being the origin.
     */
    U32: 8, "8": "U32",
    /**
     * `U48` with a valid range of '0..(1 << 48)' with `1 << 47` being the origin
     * `u64` with a valid range of `u64::MIN..=u64::MAX` with `1 << 63` being the origin.
     */
    U64: 9, "9": "U64",
    /**
     * `f32` with a valid range of `-1.0..=1.0` with `0.0` being the origin.
     */
    F32: 10, "10": "F32",
    /**
     * `f64` with a valid range of `-1.0..=1.0` with `0.0` being the origin.
     */
    F64: 11, "11": "F64",
    /**
     * DSD 1-bit stream in u8 container (8 bits = 8 DSD samples) with 0x69 being the silence byte pattern.
     */
    DsdU8: 12, "12": "DsdU8",
    /**
     * DSD 1-bit stream in u16 container (16 bits = 16 DSD samples) with 0x69 being the silence byte pattern.
     */
    DsdU16: 13, "13": "DsdU16",
    /**
     * DSD 1-bit stream in u32 container (32 bits = 32 DSD samples) with 0x69 being the silence byte pattern.
     */
    DsdU32: 14, "14": "DsdU32",
});

/**
 * The set of parameters used to describe how to open a stream.
 *
 * The sample format is omitted in favour of using a sample type.
 *
 * See also [`BufferSize`] for details on buffer size behavior and latency considerations.
 */
export class StreamConfig {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        StreamConfigFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_streamconfig_free(ptr, 0);
    }
    /**
     * @returns {number | undefined}
     */
    get buffer_size() {
        const ret = wasm.__wbg_get_streamconfig_buffer_size(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number}
     */
    get channels() {
        const ret = wasm.__wbg_get_streamconfig_channels(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get sample_rate() {
        const ret = wasm.__wbg_get_streamconfig_sample_rate(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number | null} [arg0]
     */
    set buffer_size(arg0) {
        wasm.__wbg_set_streamconfig_buffer_size(this.__wbg_ptr, isLikeNone(arg0) ? Number.MAX_SAFE_INTEGER : (arg0) >>> 0);
    }
    /**
     * @param {number} arg0
     */
    set channels(arg0) {
        wasm.__wbg_set_streamconfig_channels(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set sample_rate(arg0) {
        wasm.__wbg_set_streamconfig_sample_rate(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) StreamConfig.prototype[Symbol.dispose] = StreamConfig.prototype.free;

/**
 * Decode a recording and keep only `length_ms` from `start_ms` (the whole file when
 * `length_ms` is zero), exactly as the desktop game would decode it.
 *
 * # Errors
 * A message when the bytes are not decodable audio.
 * @param {Uint8Array} bytes
 * @param {number} start_ms
 * @param {number} length_ms
 * @returns {Decoded}
 */
export function decode_audio(bytes, start_ms, length_ms) {
    const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.decode_audio(ptr0, len0, start_ms, length_ms);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return Decoded.__wrap(ret[0]);
}
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg_Error_30c8987f7c2ed4e2: function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg___wbindgen_throw_41e9ee4f547fc59a: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./bbt_worker_bg.js": import0,
    };
}

const DecodedFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_decoded_free(ptr, 1));
const StreamConfigFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_streamconfig_free(ptr, 1));

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedFloat32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (!module.ok) {
            throw new Error(`failed to fetch Wasm: ${module.status} ${module.statusText} fetching '${module.url}'`);
        }

        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('bbt_worker_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
