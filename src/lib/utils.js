function expandObj(obj) {
    return Object.keys(obj).reduce((res, k) => {
        k.split(".").reduce(
        (acc, e, i, keys) =>
            acc[e] ||
            (acc[e] = isNaN(Number(keys[i + 1]))
            ? keys.length - 1 === i
                ? obj[k]
                : {}
            : []),
        res
        );
        return res;
    }, {});
}
export default {expandObj}