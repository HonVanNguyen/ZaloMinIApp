import { GIFT } from "common/interface";

export interface SectionData {
  link: string;
  image: string;
  imageId: number;
  typeRoute?: string;
  name?: string;
  params?: Record<string, any>;
}

export interface SectionDataHome {
  id: string;
  data: SectionData[];
  type: "BANNER" | "NORMAL_SERVICE";
  title: string;
}

export interface IHomeConfig {
  data: any;
  sections: SectionDataHome[];
}

export interface SectionRouter {
  name: string;
  route: string;
  isNeedParams: boolean;
}
export interface IRouteConfig {
  data: any;
  sections: SectionRouter[];
}
// subject
export interface Thumbnail {
  id: number;
  key: string;
  type: string;
  url: string;
}
// Interface cho chi tiết của Subject
export interface SubjectDetail {
  id: number;
  lang: string;
  name: string;
}

// Interface cho Subject
export interface Subject {
  id: number;
  subjectDetails: SubjectDetail[];
}

// Interface cho chi tiết News
export interface NewsDetail {
  id: number;
  lang: string;
  content: string;
  description: string;
  author: string;
}

// Interface cho từng Item
export interface ItemSubject {
  id: number;
  title: string;
  status: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  thumbnail: Thumbnail;
  subject: Subject[];
  newsDetails: NewsDetail[];
}

// Interface cho thông tin Meta
export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

// Interface gốc của Response
export interface I_SubjectsData {
  items: ItemSubject[];
  meta: Meta;
  data?: any;
}

// Blog
interface ItemBlogs {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  thumbnail: {
    id: number;
    key: string;
    type: string;
    url: string;
  };
  subject: Subject[];
}

export interface IBlogDataL {
  title: string;
  items: ItemSubject;
}

export interface IUserInfoZalo {
  avatar?: string;
  followedOA?: boolean;
  id?: string;
  idByOA?: string;
  isSensitive?: boolean;
  name?: string;
}

export interface IUserPhone {
  phoneNumber?: string;
  name?: string;
  email?: string | null;
  avatarUrl?: string;
}

export interface IUserApp {
  id?: string;
  name?: string;
  phone?: string;
  email?: string;
  position?: string;
  major?: string;
  address?: string;
  address_2?: string;
  avatar?: string;
}

export interface IInitialState {
  listGiftData: GIFT[];
  confirmLogoutVisible: boolean;
  accessToken?: string;
  isOpenDataForm: boolean;
  // permissionPhoneNumber: boolean;
}