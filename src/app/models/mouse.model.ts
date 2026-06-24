export interface Mouse {
  mus: string;
  model: string;
  registrationsnummer: string;
  udlaant: boolean;
}

export interface MouseResponse {
  mouse: Mouse[];
}