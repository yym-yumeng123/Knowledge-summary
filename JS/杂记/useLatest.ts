/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-06-27 11:46:18
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-06-27 12:00:00
 * @FilePath: /Knowledge-summary/杂记/useLatest.ts
 * @Description: use
 */
function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

function useMempizedFn<T extends noop>(fn: T) {
  // 通过useRef 保持其引用地址不变, 并且值能够保持值更新
  const fnRef = useRef<T>(fn);
  fnRef.current = useMemo(() => fn, [fn]);

  const memoizedFn = useRef<PickFunction<T>>();

  if (!memoizedFn.current) {
    // 返回的持久化函数，调用该函数的时候，调用原始的函数
    memoizedFn.current = function (this, ...args) {
      return fnRef.current.apply(this, args);
    };
  }

  return memoizedFn.current as T;
}

export default useLatest;
