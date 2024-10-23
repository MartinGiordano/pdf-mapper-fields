export interface FormField {
  name: string;
  type: 'text' | 'checkbox';
  coordinates?: {
    x: number;
    y: number;
    width: number;
    height: number;
    page: number;
  };
}