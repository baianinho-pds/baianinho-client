import { Person } from "../interfaces/person";
import { Api } from "./api";

type Page<T> = {
  data: T[];
  total?: number;
};

export type FindPageResponse = Pick<Person, "id" | "name" | "contactPhone">;

export class PersonService {
  static async addPerson(person: Omit<Person, "id" | "demissionDate" | "role" | "sector"> & {
    role?: Person.Role;
    sector?: Person.Sector;
    id?: number;
  }) {
    await new Api().post("/person", person);
  }

  static async findMany(): Promise<Page<FindPageResponse>> {
    return await new Api().get("/person");
  }

  static async findOne(id: number): Promise<Person> {
    return await new Api().get(`/person/${id}`);
  }

  static async updatePerson(id: number, person: Omit<Person, "role" | "sector" | "id"> & {
    role?: Person.Role;
    sector?: Person.Sector;
    id?: number;
  }) {
    await new Api().put(`/person/${id}`, person);
  }

  static async deletePerson(id: number) {
    await new Api().delete(`/person/${id}`);
  }
}
