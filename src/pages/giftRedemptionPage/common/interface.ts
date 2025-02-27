import { GIFT } from "common/interface";

export interface GiftListData {
    giftList: GIFT,
    giftPerPage: number,
    currentPage: number,
    totalList: number,
    totalPage: number,
}
export interface IInitialState {
    cartMiniData: ICartMiniData
}
export interface ICartMiniData {
    giftListData: GIFT[] | [],
    quantity: number,
}