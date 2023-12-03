/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-06-27 11:26:08
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-06-27 11:30:35
 * @FilePath: /Knowledge-summary/杂记/useSet.ts
 * @Description: useSet
 */

const useSet = <K>(initialValue?: Iterable<K>) => {
  const getInitValue = () => {
    return initialValue === undefined ? new Set<K>() : new Set(initialValue);
  };

  const [set, setSet] = useState<Set<K>>(() => getInitValue());

  // add 方法添加一个元素, 调用 Set 的 add 方法，在 Set 对象尾部添加一个元素
  const add = (key: K) => {
    if (set.has(key)) {
      return;
    }

    setSet((prevState) => {
      const temp = new Set(prevState);
      temp.add(key);
      return temp;
    });
  };

  // remove 方法移除一个元素。调用 Set 的 delete(value) 方法，移除 Set 中与这个值相等的元素
  const remove = (key: K) => {
    if (!set.has(key)) {
      return;
    }
    setSet((prevSet) => {
      const temp = new Set(prevSet);
      temp.delete(key);
      return temp;
    });
  };

  const reset = () => setSet(getInitValue());
};
