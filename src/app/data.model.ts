export interface Item {
  activityCode: number;
	activityDate: string;
	activityTime: string;
	estado: string;
	imprimeReporte: boolean;
}

export interface ServiceCallActivities {
  serviceCallID: number;
	itemCode: string;
	itemDescription: string;
  internalSerialNum: string;
  manufacturerSerialNum: string;
  actividades: Item[];
}

export interface ResponseData {
  status: string;
  data: ServiceCallActivities;
}