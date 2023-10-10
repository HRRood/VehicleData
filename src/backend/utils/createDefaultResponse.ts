// apiUtils.ts
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

export const createDefaultResponse = <T>(data: T, success = true, message = ""): ApiResponse<T> => {
  return {
    data,
    message,
    success,
  };
};
