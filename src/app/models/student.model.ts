export interface Student {
  elevnummer: string;
  navn: string;
  adresse: string;
  postnummerOgBy: string;
  cprNummer: string;
  email: string;
  stamklasse: string;
  blacklistet: boolean;
}

export interface StudentsResponse {
  users: Student[];
}