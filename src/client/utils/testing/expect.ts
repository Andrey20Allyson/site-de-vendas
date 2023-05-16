import { FailFunction } from "./test-error";

var t = typeof 0;
export type Types = typeof t;

export interface ExpectAPI {
  <V = unknown>(value: V): Expecter;
  fail(message: string): never; 
}

export class Expecter<V = unknown> {
  readonly fail: FailFunction;
  readonly value: V;

  constructor(value: V, fail: FailFunction) {
    this.value = value;
    this.fail = fail;
  }

  static createAPI(fail: FailFunction): ExpectAPI {
    const expect = <V = unknown>(value: V) => {
      return new Expecter(value, fail);
    }

    expect.fail = fail;

    return expect;
  }

  beEqualsTo(otherValue: V) {
    if (this.value === otherValue) return;

    this.fail(`Value ${this.value} not is equals ${otherValue}!`);
  }

  beInstanceof(proto: any) {
    if (this.value instanceof proto) return;

    this.fail(`Value ${this.value} don't is instanceof ${proto}`);
  }

  beTypeof(type: Types) {
    if (typeof this.value === type) return;

    this.fail(`Value ${this.value} don't is typeof ${type}`);
  }

  beGreaterThan(otherValue: V) {
    if (this.value > otherValue) return;

    this.fail(`Value ${this.value} not is greater than ${otherValue}`);
  }

  beLessThan(otherValue: V) {
    if (this.value < otherValue) return;

    this.fail(`Value ${this.value} not is less than ${otherValue}`);
  }

  beTruthy(): this['value'] extends true ? void : never {
    if (this.value) return undefined as this['value'] extends true ? void : never;

    this.fail(`Value ${this.value} not is truthy`);
  }

  beFalsy() {
    if (!this.value) return;

    this.fail(`Value ${this.value} not is falsy`);
  }

  toContain(substring: string) {
    if (typeof this.value === 'string' && this.value.includes(substring)) return;
    if (Array.isArray(this.value) && this.value.includes(substring)) return;

    this.fail(`Value ${this.value} don't contain ${substring}`);
  }

  toHaveLength(length: number) {
    if (typeof this.value === 'string' && this.value.length === length) return;
    if (Array.isArray(this.value) && this.value.length === length) return;

    this.fail(`Value ${this.value} don't have length of ${length}`);
  }

  beCloseTo(otherValue: number, precision = 2) {
    if (typeof this.value !== 'number') this.fail(`Value ${this.value} don't is a number and can't execute #beCloseTo()`); 
    const precisionFactor = Math.pow(10, precision);
    const value = Math.round(this.value * precisionFactor);
    const other = Math.round(otherValue * precisionFactor);
  
    if (value === other) return;
  
    this.fail(`Value ${value} not is close to ${otherValue}!`);
  }
  
  toThrow(ErrorConstructor: typeof Error = Error): void {
    let hasThrownError = false;
    let thrownError: Error | undefined;

    if (typeof this.value !== 'function') this.fail(`Value don't is a function`);
  
    try {
      this.value();
    } catch (error) {
      if (!(error instanceof Error)) this.fail(`Value don't throw a instance of Error`);
      
      hasThrownError = true;
      thrownError = error;
    }
  
    if (!hasThrownError) {
      this.fail(`Value ${this.value} did not throw an error`);
    } else if (!(thrownError instanceof ErrorConstructor)) {
      this.fail(`Value ${this.value} did not throw an instance of ${ErrorConstructor.name}`);
    }
  }
  
  not() {
    return new Expecter(!this.value, this.fail);
  }
}