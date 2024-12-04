export interface Item {
  id: string;
  status: string;
  created_by: number;
  created_on: string;
  name: string;
  url: string;
  type: string;
  spots: number;
  art: string;
}

export interface SpotData {
  id: number;
  name: string;
  issummer: boolean;
  description: string;
  status?: string;
  created_by?: number;
  created_on?: string;
  longitude?: number;
  latitude?: number;
  isFav?: boolean;
  onPress?: () => void;
}
