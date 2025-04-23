
export interface Course {
  id: string;
  adsm: string;
  name: string;
  role: string;
  originalid: number;
  levelName: string;
  completed: boolean;
  course: string;
  cid: string;
  coriginalid: number;
  accessUrl: string;
  CourseImageURL: string;
  StartDate: string;
}

export interface ISpFxWebpartSalesToolsProps {
  trainingData: any;
  description: string;
  uniqueAdsm: string[];
  uniqueRoles: string[];
  checkboxAdsm: string[];
  checkboxRoles: string[];
  backend_app_id: string;
  backend_url: string;
}
