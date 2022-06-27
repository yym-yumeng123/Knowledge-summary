/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-06-27 10:59:44
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-06-27 11:21:06
 * @FilePath: /Knowledge-summary/杂记/useMap.js
 * @Description: useMap
 */

/**
 * Map 对象保存键值对, 并且能够记住键的原始插入顺序. 任何值都可以作为一个键或者一个值
 * 键值的类型: 一个Map的键可以是任意值, 包括函数, 对象, 任意类型, 一个 Object 的键必须是一个 String 或是 Symbol
 * 需要保证键值的顺序: Map 键时有序的. Object 并不总是有序的
 * Size: Map 的键值可以轻易的通过 size 属性获取, Object  需要遍历
 * 性能: Map 在频繁增删键值对的场景下表现更好
 */
function useMap<K, T>(
  // 传入默认的 Map 参数
  initialValue?: Iterable<readonly [K, T]>
) {
  const getInitValue = () => {
    return initialValue === undefined ? new Map() : new Map(initialValue);
  };
  const [map, setMap] = useState<Map<K, T>>(() => getInitValue());

  //  Map 对象中设置与指定的键 key 关联的值 value
  const set = (key: K, entry: T) => {
    setMap((prev) => {
      const temp = new Map(prev);
      temp.set(key, entry);
      return temp;
    });
  };
  // remove 方法。通过 Map 的 delete 方法，移除 Map 对象中指定的键值对
  const remove = (key: K) => {
    setMap((prev) => {
      const temp = new Map(prev);
      temp.delete(key);
      return temp;
    });
  };

  // 生成一个新的 map 对象
  const setAll = (newMap: Iterable<readonly [K, T]>) => {
    setMap(new Map(newMap));
  };

  // 重置
  const reset = () => setMap(getInitValue());

  // 获取
  const get = (key: K) => map.get(key);

  return [set, get, remove, setAll];
}
