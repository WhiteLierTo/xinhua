/**
 * Base64 解加密
 *
 * @param  { String } stringToEncode/encodedData
 * @return { String } encodedData/stringDecode
 * **/
export const Base64_encode = stringToEncode => {
    const encodeUTF8string = function (str) {
        return encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            });
    };

    if (typeof window !== 'undefined') {
        if (typeof window.btoa !== 'undefined') {
            window.btoa(encodeUTF8string(stringToEncode));
        }
    } else {
        return new Buffer(stringToEncode).toString('base64');
    }
    const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = '',
        tmpArr = [];
    if (!stringToEncode) {
        return stringToEncode;
    }
    stringToEncode = encodeUTF8string(stringToEncode);
    do {
        o1 = stringToEncode.charCodeAt(i++);
        o2 = stringToEncode.charCodeAt(i++);
        o3 = stringToEncode.charCodeAt(i++);
        bits = o1 << 16 | o2 << 8 | o3;
        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;
        tmpArr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < stringToEncode.length);
    enc = tmpArr.join('');
    const r = stringToEncode.length % 3;
    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
};

export const Base64_decode = encodedData => {
    const decodeUTF8string = function (str) {
        return decodeURIComponent(str.split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    };

    if (typeof window !== 'undefined') {
        if (typeof window.atob !== 'undefined') {
            return decodeUTF8string(window.atob(encodedData));
        }
    } else {
        return new Buffer(encodedData, 'base64').toString('utf-8');
    }
    const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        dec = '',
        tmpArr = [];
    if (!encodedData) {
        return encodedData;
    }
    encodedData += '';
    do {
        // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(encodedData.charAt(i++));
        h2 = b64.indexOf(encodedData.charAt(i++));
        h3 = b64.indexOf(encodedData.charAt(i++));
        h4 = b64.indexOf(encodedData.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
        if (h3 === 64) {
            tmpArr[ac++] = String.fromCharCode(o1);
        } else if (h4 === 64) {
            tmpArr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmpArr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < encodedData.length);
    dec = tmpArr.join('');
    return decodeUTF8string(dec.replace(/\0+$/, ''));
};