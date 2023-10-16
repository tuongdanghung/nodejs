export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
}

export interface SignUpInterface {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface MyResponse {
    data: {
      success: boolean;
      message: string;
    };
  }