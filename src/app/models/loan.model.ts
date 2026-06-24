export interface Loan {
  elevnummer: string;
  computernummer: string;
  registrationsnummer: string;
  udlaansdato: string;
  udloebsdato: string;
  afleveret: boolean;
}

export interface LoanRow extends Loan {
  overdue: boolean;
}

export interface LoanResponse {
  loans: Loan[];
}