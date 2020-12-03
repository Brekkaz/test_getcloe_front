export class Person {
  constructor(
    public id: number,
    public first_name: string,
    public last_name: string,
    public address: string,
    public email: string,
    public phone: string,
    public birth_date: Date
  ) {}
}