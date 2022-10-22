import { Person } from "../models/person";
import { Api } from "./api";

type Page<T> = {
  data: T[]
  total?: number
}

export type FindPageResponse = Pick<Person, 'id' | 'name' | 'contact_phone'> 

export class PersonService {
  static async addPerson(person: Omit<Person, "id" | "demission_date">) {
    await new Api().post("/person", person);
  }

  static async findMany(): Promise<Page<FindPageResponse>> {
    return await new Api().get("/person");
  }
}
