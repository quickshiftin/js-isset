![build](https://github.com/quickshiftin/js-isset/actions/workflows/node.js.yml/badge.svg)

# js-isset
`isset` for javascript - inspired by [php](https://www.php.net/manual/en/function.isset.php)

In Javascript, when you want to check for existance, or try to retrieve a deeply nested object property,
tests must be performed all the way down the object structure. For example, if there is an object variable
`dataLayerObject`, and a value is expected at `dataLayerObject.config.checklist`, you might use code like this to retrieve it

```javascript
if(dataLayerObject && dataLayerObject.config && dataLayerObject.config.checklist) {
    return dataLayerObject.config.checklist;
}
```

Sometimes naive programmers resort to exceptions for flow control, an anti-pattern, as in

```javascript
try {
    return dataLayerObject.config.checklist;
} catch (e) {
    console.error('dataLayer missing config or checklist...', e);
}
```

`isset` allows you to provide an object, and a 'path' to search for. Its companion function `valAt` let's you retrieve the value
at that path with the same notation

```javascript
if(isset(dataLayerObject, '.config.checklist')) {
    return valAt(dataLayerObject, '.config.checklist');
}
```

Since the default return value of `valAt` is `null`, you might be able to simply use

```javascript
return valAt(dataLayerObject, '.config.checklist');
```
depending on your use case.

If a node doesn't exist along the desired path, `isset` will return false. By default `valAt` will return `null`, but you can specifiy a `defaultValue` of your choosing.

## Installation
```bash
npm install --save js-isset
```

## API
```javascript
/**
 * Check the provided object for existence of the required path, and that the value at
 * that path is not null. If no path is provided, the object proper is inspected to ensure
 * it is not null.
 * 
 * @param object [object] - desired object to inspect
 * @param path [string] - path to search for
 * @returns [boolean]
 * @throws Error
 */
function isset(object, path=null)
```

```javascript
/**
 * Retrieve the deeply nested value at the desired path within object, and if the path is
 * not present, or the value at said path is null, return the defaultValue.
 *
 * @param object [object] - desired object to inspect
 * @param path [string] - path to search for
 * @param defaultValue [string] - default return value
 * @returns [any]
 * @throws Error
 */
function getPath(object, path, defaultValue=null)
```

## Example usage

```javascript
import { isset, valAt } from 'js-isset';

var dataLayerObject = {
    config: {
        checklist: 'ready, set, go'
    }
};

isset(dataLayerObject, '.config.checklist')            // true
valAt(dataLayerObject, '.config.checklist')            // 'ready, set, go
isset(dataLayerObject, '.config.broken')               // false
valAt(dataLayerObject, '.config.broken')               // null
valAt(dataLayerObject, '.config.broken', 'my default') // 'my default'
```
