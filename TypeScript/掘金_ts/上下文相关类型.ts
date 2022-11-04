window.onerror = (event, source, line, col, err) => {};

// 正常
window.onerror = (event) => {};
// 报错
window.onerror = (event, source, line, col, err, extra) => {};

interface Handle {
  onerror: OnErrorEventHandlerNonNull;
}

interface OnErrorEventHandlerNonNull {
  (
    event: Event | string,
    source?: string,
    lineno?: number,
    colno?: number,
    error?: Error
  ): any;
}

type CustomerHandle = (name: string, age: number) => boolean;

const handle12: CustomerHandle = (arg1, arg2) => true;

declare const struct: {
  handle: CustomerHandle;
};

struct.handle = (name, age) => {};

declare let fun: (raw: number) => (input: string) => any;

func = (raw) => {
  return (input) => {};
};

type CustomHandler = (name: string, age: number) => void;

const handler1: CustomHandler = (name, age) => true;
const handler2: CustomHandler = (name, age) => "linbudu";
const handler3: CustomHandler = (name, age) => null;
const handler4: CustomHandler = (name, age) => undefined;

const arr10: number[] = [];
const list: number[] = [1, 2, 3];
list.forEach((item) => arr.push(item));
