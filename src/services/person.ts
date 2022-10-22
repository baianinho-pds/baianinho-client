import { Person } from "../models/person";
import { Api } from "./api";

export class PersonService {
  static async addPerson(person: Omit<Person, "id" | "demission_date">) {
    await new Api().post("/person", person);
  }
}
