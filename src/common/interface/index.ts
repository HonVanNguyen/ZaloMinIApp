import { DATE_TYPE, TYPE_GIFT } from "common/enums";

export interface GIFT {
    name: string,
    category: string,
    status: boolean,
    description: string,
    typeGift: TYPE_GIFT,
    priority: number,
    numberPoint: number,
    price: number,
    startDay: Date,
    endDay: Date,
    expiredDay: Date,
    typeDisplay: DATE_TYPE
}