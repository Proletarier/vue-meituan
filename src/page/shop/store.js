import service from "@/service";
import context from "@/main";

const Index = {
  state: {
    shopId: Number,
    shopInfo: {},
    shopLicense:{},
    categoryList:[]
  },
  async getShopQualification() {
    context.$loading.show();
    const { shopId } =this.state
    const data = await service.getShopInfo({ shopId });
    if (data) {
      this.saveState({ shopLicense: data });
    }
    context.$loading.hide();
  },
  async getShopInfo(shopId) {
    const data = await service.getShopInfo({ shopId });
    if (data) {
      this.saveState({ shopInfo: data });
    }
  },
  async getFood(shopId) {
    const data = await service.getFood({ shopId });
    if (data) {
      this.saveState({ categoryList: data });
    }
  },
  saveState(data = {}) {
    for (const key in data) {
      this.state[key] = data[key];
    }
  },
};

export default Index;
