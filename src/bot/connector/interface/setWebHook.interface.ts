export interface ISetWebHook {
  url: string;
  ip_address?: string;
  max_connections?: number;
  // todo :: type allowed_updates
  allowed_updates?: string[];
}
