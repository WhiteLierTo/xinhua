import service from "./base";

class advertisement {
    constructor(ajax) {
        this.ajax = ajax
    }
    // 广告详情/adv/{id}
    async getAdsDetail(id) {
        try {
            let res = await this.ajax.get(`/adv/${id}`);
            if (res.code !== 200) {
                return {};
            }
            return res.data;
        } catch (e) {
            return {};
        }
    }

    //新增广告
    async createAds(data) {
        return this.ajax.post('/adv/add', data);

    }

    //修改广告
    async updateAds(data) {
        return this.ajax.post('/adv/update', data);
    }
}
export default new advertisement(service)