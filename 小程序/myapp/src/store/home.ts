import { observable } from "mobx";

const HomeStore = observable({
  msg: "Home!!!",

  changeMsg(val: string): void {
    this.msg = val;
  },
});

export default HomeStore;
