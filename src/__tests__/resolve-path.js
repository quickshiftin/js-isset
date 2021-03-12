/* global expect */
import {
    valAt,
    isset,
} from '~/resolve-path';

const nullObject = null;
const realObject = {};

it('can handle a non-object', () => {
    expect(isset(5)).toBe(true);
    expect(isset(undefined)).toBe(false);
    expect(() => { isset(5, '.hi'); }).toThrow(Error);
    expect(() => { valAt(5, '.hi'); }).toThrow(Error);
});

it('can check first arg without a path', () => {
    expect(isset(nullObject)).toBe(false);
});

it('valAt to be supplied a path', () => {
    expect(() => { valAt(nullObject); }).toThrow(Error);
});

it('can handle bogus path', () => {
    expect(() => { isset(nullObject, 5); }).toThrow(Error);
    expect(() => { isset(nullObject, ''); }).toThrow(Error);
    expect(() => { isset(nullObject, 'k'); }).toThrow(Error);
    expect(() => { valAt(nullObject, 5); }).toThrow(Error);
    expect(() => { valAt(nullObject, ''); }).toThrow(Error);
    expect(() => { valAt(nullObject, 'k'); }).toThrow(Error);
});

it("isset should return false when value isn't present", () => {
    expect(isset(realObject, '.some.path')).toBe(false);
});

it("valAt should return null when value isn't present", () => {
    expect(valAt(realObject, '.some.path')).toBe(null);
});

it("isset should return provided false when value isn't present", () => {
   expect(isset(realObject, '.some.path')).toBe(false); 
});

it("valAt should return provided default value when value isn't present and default specified", () => {
   expect(valAt(realObject, '.some.path', false)).toBe(false); 
});

const anotherObject = {
    some: {
        path: 5
    }
};

if('isset should return true when found at desired path', () => {
    expect(isset(anotherObject, '.some.path')).toBe(true);
});

if('valAt should return a primitive when found at desired path', () => {
    expect(valAt(anotherObject, '.some.path')).toBe(5);
});

const sut = {
    testKey: null,
};

it('isset should skip nulls', () => {
    expect(isset(sut, '.testKey', '')).toBe(false);
});

it('valAt should skip nulls', () => {
    expect(valAt(sut, '.testKey')).toBe(null);
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

it('valAt should return an object when found at desired path', () => {
    expect(valAt(yetAnotherObject, '.some.path')).toBe(someHash);
});