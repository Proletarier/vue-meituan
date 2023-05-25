import service from "@/service";
import context from "@/main";

const Index = {
  state: {
    shopId: Number,
    shopInfo: {},
    shopLicense: {},
    categoryList: [],
    commentScores: {},
    commentList: []
  },
  async getShopQualification() {
    context.$loading.show();
    const { shopId } = this.state
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
  async commentsSummary(shopId) {
    const data = await service.commentsSummary({ shopId });
    if (data) {
      this.saveState({ commentScores: data });
      const label = data.commentLabels.find(item => item.isSelected == 1)
      this.getCommentList({ shopId, commentLabelId: label.id, pageNum: 1, pageSize: 10 })
    }
  },
  async getCommentList(params = {}, ismore = false) {
    context.$loading.show();
    const { shopId, commentLabelId, pageNum, pageSize } = params;
    const data = await service.getCommentList({ shopId, commentLabelId, pageNum, pageSize });
    if (data && data.length > 0) {
      if (ismore) {
        const newList = [...this.state.commentList, ...data];
        this.saveState({ commentList: newList });
      } else {
        this.saveState({ commentList: data });
      }
    }else {
      context.$loading.hide();
      return false
    }
    context.$loading.hide();
    return true
  },
  saveState(data = {}) {
    for (const key in data) {
      this.state[key] = data[key];
    }
  },
};

export default Index;
