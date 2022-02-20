import { observable } from "mobx";

const HomeStore = observable({
  msg: "我是王向芬",

  changeMsg(val: string): void {
    this.msg = val;
  },
});

export default HomeStore;
