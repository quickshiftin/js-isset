/* global expect */
import {
    getPath,
    isset,
} from '~/resolve-path';

const nullObject = null;
const realObject = {};

it('can check first arg without a path', () => {
    expect(isset(nullObject)).toBe(false);
});

it('getPath to be supplied a path', () => {
    expect(() => { getPath(nullObject); }).toThrow(Error);
});

it('can handle bogus path', () => {
    expect(() => { isset(nullObject, 5); }).toThrow(Error);
    expect(() => { isset(nullObject, ''); }).toThrow(Error);
    expect(() => { isset(nullObject, 'k'); }).toThrow(Error);
    expect(() => { getPath(nullObject, 5); }).toThrow(Error);
    expect(() => { getPath(nullObject, ''); }).toThrow(Error);
    expect(() => { getPath(nullObject, 'k'); }).toThrow(Error);
});

it("isset should return false when value isn't present", () => {
    expect(isset(realObject, '.some.path')).toBe(false);
});

it("getPath should return null when value isn't present", () => {
    expect(getPath(realObject, '.some.path')).toBe(null);
});

it("isset should return provided false when value isn't present", () => {
   expect(isset(realObject, '.some.path')).toBe(false); 
});

it("getPath should return provided default value when value isn't present and default specified", () => {
   expect(getPath(realObject, '.some.path', false)).toBe(false); 
});

const anotherObject = {
    some: {
        path: 5
    }
};

if('isset should return true when found at desired path', () => {
    expect(isset(anotherObject, '.some.path')).toBe(true);
});

if('getPath should return a primitive when found at desired path', () => {
    expect(getPath(anotherObject, '.some.path')).toBe(5);
});

const sut = {
    testKey: null,
};

it('isset should skip nulls', () => {
    expect(isset(sut, '.testKey', '')).toBe(false);
});

it('getPath should skip nulls', () => {
    expect(getPath(sut, '.testKey')).toBe(null);
});

const someHash = { key: 'value' };
const yetAnotherObject = {
    some: {
        path: someHash
    }
};

it('isset should return true when found at desired path', () => {
    expect(isset(yetAnotherObject, '.some.path')).toBe(true);
});

it('getPath should return an object when found at desired path', () => {
    expect(getPath(yetAnotherObject, '.some.path')).toBe(someHash);
});