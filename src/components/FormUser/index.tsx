import { useCallback, useEffect, useState } from "react";
import styles from "./formUser.module.css";
import { GrClose } from "react-icons/gr";
import { Person } from "../../models/person";
import { PersonService } from "../../services/person";

type PersonFormParams = Omit<Person, "role_name" | "sector_name" | "id"> & {
  role_name?: Person.Role;
  sector_name?: Person.Sector;
  id?: number;
};

interface FormUserProps {
  isOpen: boolean;
  onRequestClose: (requestFetchData?: boolean) => void;
  action?: "form" | "delete";
  personId?: number;
}
export default function FormUser({
  isOpen,
  onRequestClose,
  action,
  personId,
}: FormUserProps) {
  const [person, setPerson] = useState<PersonFormParams>({
    name: "",
    cpf: "",
    contact_phone: "",
    ctps: "",
    admission_date: "",
    street: "",
    neighborhood: "",
    city: "",
    number: "",
    postal_code: "",
  });

  const resetForm = () => {
    setPerson({
      name: "",
      cpf: "",
      contact_phone: "",
      ctps: "",
      admission_date: "",
      street: "",
      neighborhood: "",
      city: "",
      number: "",
      postal_code: "",
    });
  };

  const handlerSubmitFormUser = async () => {
    if (person.role_name && person.sector_name) {
      if (person.id) {
        await PersonService.updatePerson(person.id, person);
      } else {
        await PersonService.addPerson(person);
      }
      onRequestClose(true);
      resetForm();
    }
  };

  const handlerDeleteUser = async () => {
    if (person.id) {
      await PersonService.deletePerson(person.id);
    }
    onRequestClose(true);
    resetForm();
  };

  const fetchPerson = useCallback(async () => {
    if (personId) {
      const fetchedPerson = await PersonService.findOne(personId);
      setPerson({
        ...fetchedPerson,
        admission_date: fetchedPerson.admission_date.split("T")[0],
        demission_date: fetchedPerson.demission_date?.split("T")[0],
      });
    }
  }, [personId]);

  useEffect(() => {
    fetchPerson();
  }, [fetchPerson]);
  return (
    <>
      {isOpen && (
        <div className={styles.containerCardUser}>
          <div className={styles.cardHeader}>
            <h2>Dados do Usuário</h2>
            <GrClose
              onClick={() => {
                onRequestClose(false);
                resetForm();
              }}
            />
          </div>
          {action === "form" ? (
            <>
              <form>
                <div className={styles.containerInput}>
                  <label htmlFor="name">Nome completo*</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Digite o seu nome completo"
                    value={person?.name}
                    onChange={(e) =>
                      setPerson((oldPerson) => ({
                        ...oldPerson,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="name">CPF*</label>
                  <input
                    type="text"
                    name="cpf"
                    id="cpf"
                    placeholder="Digite o seu CPF"
                    value={person?.cpf}
                    onChange={(e) =>
                      setPerson((oldPerson) => ({
                        ...oldPerson,
                        cpf: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="contactPhone">Telefone do colaborador*</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    id="contactPhone"
                    placeholder="Digite o seu telefone"
                    value={person?.contact_phone}
                    onChange={(e) =>
                      setPerson((oldPerson) => ({
                        ...oldPerson,
                        contact_phone: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="cpts">Número da carteira de trabalho*</label>
                  <input
                    type="text"
                    name="cpts"
                    id="cpts"
                    placeholder="Digite o número da sua carteira de trabalho"
                    value={person?.ctps}
                    onChange={(e) =>
                      setPerson((oldPerson) => ({
                        ...oldPerson,
                        ctps: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="admissionDate">Data de admissão*</label>
                  <input
                    type="date"
                    name="admissionDate"
                    id="admissionDate"
                    placeholder="Digite a data de admissão"
                    value={person?.admission_date}
                    onChange={(e) =>
                      setPerson((oldPerson) => ({
                        ...oldPerson,
                        admission_date: e.target.value,
                      }))
                    }
                  />
                </div>
                {person.id ? (
                  <div className={styles.containerInput}>
                    <label htmlFor="demissionDate">Data de demissão</label>
                    <input
                      type="date"
                      name="demissionDate"
                      id="demissionDate"
                      placeholder="Digite a data de demissão"
                      value={person?.demission_date ?? undefined}
                      onChange={(e) =>
                        setPerson((oldPerson) => ({
                          ...oldPerson,
                          demission_date: e.target.value,
                        }))
                      }
                    />
                  </div>
                ) : undefined}
                <div className={styles.containerInput}>
                  <label htmlFor="role">Cargo atual*</label>
                  <select
                    name="role"
                    id="role"
                    value={person?.role_name}
                    onChange={(e) =>
                      setPerson((oldPerson) => ({
                        ...oldPerson,
                        role_name: e.target.value as Person.Role,
                      }))
                    }
                  >
                    <option value="">Digite a data de desligamento</option>
                    <option value="admin">Administrador(a)</option>
                    <option value="seller">Vendedor(a)</option>
                  </select>
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="role">Setor*</label>
                  <select
                    name="sector"
                    id="sector"
                    value={person?.sector_name}
                    onChange={(e) =>
                      setPerson((oldPerson) => ({
                        ...oldPerson,
                        sector_name: e.target.value as Person.Sector,
                      }))
                    }
                  >
                    <option value="">Informe o setor</option>
                    <option value="internal">Interno(a)</option>
                    <option value="external">Externo(a)</option>
                  </select>
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="street">Rua*</label>
                  <input
                    type="text"
                    name="street"
                    id="street"
                    placeholder="Digite o nome da rua"
                    value={person?.street}
                    onChange={(e) =>
                      setPerson((oldPerson) => ({
                        ...oldPerson,
                        street: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="neighborhood">Bairro*</label>
                  <input
                    type="text"
                    name="neighborhood"
                    id="neighborhood"
                    placeholder="Digite o nome do bairro"
                    value={person?.neighborhood}
                    onChange={(e) =>
                      setPerson((oldPerson) => ({
                        ...oldPerson,
                        neighborhood: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="city">Cidade*</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="DIgite o nome da cidade"
                    value={person?.city}
                    onChange={(e) =>
                      setPerson((oldPerson) => ({
                        ...oldPerson,
                        city: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="number">Número*</label>
                  <input
                    type="number"
                    name="number"
                    id="number"
                    placeholder="Digite o número"
                    value={person?.number}
                    onChange={(e) =>
                      setPerson((oldPerson) => ({
                        ...oldPerson,
                        number: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="postalCode">CEP*</label>
                  <input
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    placeholder="Digite o CEP"
                    value={person?.postal_code}
                    onChange={(e) =>
                      setPerson((oldPerson) => ({
                        ...oldPerson,
                        postal_code: e.target.value,
                      }))
                    }
                  />
                </div>
              </form>
              <div className={styles.cardFooter}>
                <button onClick={() => handlerSubmitFormUser()}>Salvar</button>
              </div>
            </>
          ) : action === "delete" ? (
            <>
              <div className={styles.containerUserInfo}>
                <div className={styles.userInfoCard}>
                  <div className={styles.UserInfo}>
                    <b>Nome Completo: </b>
                    <span>{person.name}</span>
                  </div>

                  <div className={styles.UserInfo}>
                    <b>CPF: </b>
                    <span>{person.cpf}</span>
                  </div>

                  <div className={styles.UserInfo}>
                    <b>Data de Admissão: </b>
                    <span>
                      {/* {new Intl.DateTimeFormat("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }).format(new Date(person.admission_date))} */}
                      {person.admission_date}
                    </span>
                  </div>

                  {person.demission_date ? (
                    <div className={styles.UserInfo}>
                      <b>Data de Demissão: </b>
                      <span>
                        {/* {new Intl.DateTimeFormat("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }).format(new Date(person?.demission_date))} */}
                        {person.demission_date}
                      </span>
                    </div>
                  ) : null}

                  <div className={styles.UserInfo}>
                    <b>Cargo Atual: </b>
                    <span>{person.role_name}</span>
                  </div>

                  <div className={styles.UserInfo}>
                    <b>CTPS: </b>
                    <span>{person.ctps}</span>
                  </div>
                </div>
              </div>
              <p className={styles.messageAlert}>
                Você tem certeza que deseja excluir o cadastro do usuário
                {" " + person.name + " ?"}
              </p>
              <div className={styles.cardFooterUserDelete}>
                <button
                  onClick={() => handlerDeleteUser()}
                  className={styles.btnDelete}
                >
                  Sim Excluir
                </button>
                <button
                  onClick={() => {
                    onRequestClose(false);
                    resetForm();
                  }}
                  className={styles.btnCancel}
                >
                  Cancelar
                </button>
              </div>
            </>
          ) : undefined}
        </div>
      )}
    </>
  );
}
