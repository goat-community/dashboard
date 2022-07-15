/** Network function calls response types */

export interface ErrorResponse {
  detail: [
    {
      loc: [string];
      msg: string;
      type: string;
    }
  ];
}

export interface UserToken {
  access_token: string;
  token_type?: string;
}
