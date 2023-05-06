import service from "@/service";
import context from "@/main";

const Index = {
  state: {
    shopId: undefined,
    shopInfo: {},
    shopLicense:{}
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
  saveState(data = {}) {
    for (const key in data) {
      this.state[key] = data[key];
    }
  },
};

export default Index;
