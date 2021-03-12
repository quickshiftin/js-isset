/* global expect */
import {isObject, resolvePath} from '~/resolve-path';

const nullObject = null;
const realObject = {};

it('isObject should return false for non-objects', () => {
    expect(isObject(nullObject)).toBe(false);
    expect(isObject(false)).toBe(false);
});

it('isObject should return true for real objects', () => {
    expect(isObject(realObject)).toBe(true);
});

it("resolvePath should return null when value isn't present", () => {
    expect(resolvePath(realObject, '.some.path')).toBe(null);
});

it("resolvePath should return provided default value when value isn't present and default specified", () => {
   expect(resolvePath(realObject, '.some.path', false)).toBe(false); 
});

const anotherObject = {
    some: {
        path: 5
    }
};

if('should return a primitive when found at desired path', () => {
    expect(resolvePath(anotherObject, '.some.path')).toBe(5);
});

const sut = {
    testKey: null,
};

it('should skip nulls', () => {
    expect(resolvePath(sut, '.testKey', '')).toBe('');
});

const someHash = { key: 'value' };
const yetAnotherObject = {
    some: {
        path: someHash
    }
};

it('pathResolver should return an object when found at desired path', () => {
    expect(resolvePath(yetAnotherObject, '.some.path')).toBe(someHash);
});

// Test setter behavior
const newObject = {};
it('pathResolver should create non-existent paths', () => {
    resolvePath(newObject, '.some.path', true, someHash);
    expect(isObject(newObject.some)).toBe(true);
    expect(isObject(newObject.some.path)).toBe(true);
    expect(resolvePath(newObject, '.some.path.key')).toBe('value');
});

const setterObject = {
    path: {
        key: 'value',
    }
};
const replacementObject = { my: 'world' };
it('pathResolver should perform wrote object replacement by default when setting', () => {
    expect(resolvePath(setterObject, '.path.key')).toBe('value');
    resolvePath(setterObject, '.path', true, replacementObject);
    expect(resolvePath(setterObject, '.path.my')).toBe('world');
    expect(resolvePath(setterObject, '.path.key')).toBe(null);
    expect(resolvePath(setterObject, '.path')).toBe(replacementObject);
});

const testObj = {
    obj: { key: 'value' }
};
const recursiveObj = { my: 'world' };

it('pathResolver should work recursively', () => {
    expect(resolvePath(testObj, '.obj.key')).toBe('value');
    resolvePath(testObj, '.obj', true, recursiveObj, true);
    expect(resolvePath(testObj, '.obj.key')).toBe('value');
    expect(resolvePath(testObj, '.obj.my')).toBe('world');
});