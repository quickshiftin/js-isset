const exists = (o) =>
    typeof o !== 'undefined' && o !== null;

/**
 */
const resolvePath = ({
    defaultValue=null,
    mode='return',
    object,
    path=null,
}) => {
    //-------------------------------------
    // Check object proper
    //-------------------------------------
    if(path === null && mode === 'bool') {
        return exists(object);
    }

    //-------------------------------------
    // Validation
    //-------------------------------------
    if(['undefined', 'boolean', 'number', 'string', 'bigint', 'symbol'].includes(typeof object)) {
        throw new Error('object param must be of type object');
    }

    //-------------------------------------
    // Validation
    //-------------------------------------
    if(typeof path !== 'string' || path.length < 1 || path[0] != '.') {
        throw new Error('Invalid path ' + path + ' supplied');
    }

    //-------------------------------------
    // Default value configuration
    //-------------------------------------
    let dv = defaultValue;

    const k = path.slice(1).split('.');
    let o = object;

    if (typeof o === 'undefined' || o === null) {
        return dv;
    }

    /**
     * Return the current value when in 'return' mode,
     * otherwise return a boolean value.
     */
    const result = (success) => {
        if(mode === 'return') {
            return success === true
                ? o
                : dv;
        }
        return success === true;
    };

    //-------------------------------------
    // Go searching for the value at path
    //-------------------------------------
    try {
        let currentKey;

        while (k.length) {
            currentKey = k.shift();

            //if (typeof o[currentKey] !== 'undefined' && o[currentKey] !== null) {
            if (exists(o[currentKey])) {
                o = o[currentKey];
                continue;
            }

            return result(false);
        }
    } catch (e) {
        return result(false);
    }

    return result(true);
};

/**
 * Determine if a path exists in the provided object.
 * Inspection of the object variable itself is supported.
 */
const isset = (object, path=null) =>
    resolvePath({
        mode: 'bool',
        object,
        path,
    });

/**
 * Return the value at a given path, if present,
 * otherwise return a default value. A path is required.
 */
const valAt = (object, path, defaultValue=null) =>
    resolvePath({
        defaultValue,
        object,
        path,
    });

module.exports = {
    exists,
    valAt,
    isset,
};