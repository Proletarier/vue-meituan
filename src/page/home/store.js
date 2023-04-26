import service from "@/service";
import context from "@/main";

const Index = {
  state: {
    categoryId: undefined,
    datalist: [],
    hasNext: true,
    point: {},
    ruleSort: undefined,
    exclusiveDelivery: undefined,
    feature: undefined,
    averagePrice: undefined,
    activity: undefined,
    nextStartIndex: 1,
    kingkongList: {
      type:Array,
      default:[]
    },
  },
  async getNearShop(ismore = false) {
    context.$loading.show();
    const {
      nextStartIndex,
      ruleSort,
      point,
      categoryId,
      datalist,
    } = this.state;
    const data = await service.nearShop({
      categoryId,
      location: point,
      ruleSort,
      nextStartIndex: ismore ? nextStartIndex : 1,
    });
    if (data) {
      const { count, shopVoList } = data;
      if (ismore) {
        const newList = [...datalist, ...shopVoList];
        this.saveState({ datalist: newList, nextStartIndex: nextStartIndex + 1 });
      } else {
        this.saveState({ datalist: shopVoList, nextStartIndex: 1 });
      }
      this.state.hasNext = count > this.state.datalist?.length;
    }
    context.$loading.hide();
  },
  async listGoodsCate() {
    const data = await service.listGoodsCate()
    if (data) {
      this.saveState({ kingkongList: data });
    }
  },
  saveState(data = {}) {
    for (const key in data) {
      this.state[key] = data[key];
    }
  },
};

export default Index;
