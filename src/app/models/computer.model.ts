export interface Computer {
  fabrikant: string;
  model: string;
  computernummer: string;
  udlaant: boolean;
}

export interface ComputerResponse {
  computers: Computer[];
}