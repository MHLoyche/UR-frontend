export interface Computer {
  fabrikant: string;
  model: string;
  computernummer: string;
}

export interface ComputerResponse {
  computers: Computer[];
}