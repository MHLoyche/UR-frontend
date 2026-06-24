export interface Case {
  casenummer: string;
  elevnummer: string;
  casekategori: string;
  oprettelsesdato: string;
  beskrivelse: string;
  medarbejderid: string;
  computernummer: string;
  registrationsnummer: string;
  afklaret: boolean;
}

export interface CaseResponse {
  cases: Case[];
}