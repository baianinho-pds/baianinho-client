import { useCallback, useEffect, useState } from "react";
import styles from "./formUser.module.css";
import { GrClose } from "react-icons/gr";
import { Person } from "../../../interfaces/person";
import { PersonService } from "../../../services/person";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "../../../components/Input";

const PersonRolesTranslated = {
  admin: "Administrador(a)",
  seller: "Vendedor(a)",
};

type PersonFormParams = Omit<Person, "role" | "sector" | "id"> & {
  role?: Person.Role;
  sector?: Person.Sector;
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
    contactPhone: "",
    ctps: "",
    admissionDate: "",
    street: "",
    neighborhood: "",
    city: "",
    number: "",
    postalCode: "",
  });

  const resetForm = () => {
    setPerson({
      name: "",
      cpf: "",
      contactPhone: "",
      ctps: "",
      admissionDate: "",
      street: "",
      neighborhood: "",
      city: "",
      number: "",
      postalCode: "",
    });
  };

  const handlerSubmitFormUser = async () => {
    try {
      if (person.role && person.sector) {
        if (person.id) {
          await PersonService.updatePerson(person.id, {
            ...person,
            cpf: person.cpf.replace(/[. - _ --]/g, ""),
            contactPhone: person.contactPhone.replace(/[() - _ --]/g, ""),
            postalCode: person.postalCode.replace(/[- _ --]/g, ""),
            admissionDate: new Date(person.admissionDate),
            demissionDate: person.demissionDate
              ? new Date(person.demissionDate)
              : null,
          });
        } else {
          await PersonService.addPerson({
            ...person,
            cpf: person.cpf.replace(/[. - _ --]/g, ""),
            contactPhone: person.contactPhone.replace(/[() - _ --]/g, ""),
            postalCode: person.postalCode.replace(/[- _ --]/g, ""),
            admissionDate: new Date(person.admissionDate),
          });
        }
        onRequestClose(true);
        resetForm();
      }
    } catch (error) {
      toast.error("Verifique todos os campos ou tente novamente mais tarde", {
        theme: "colored",
      });
    }
  };

  const handlerDeleteUser = async () => {
    try {
      if (person.id) {
        await PersonService.deletePerson(person.id);
      }
      onRequestClose(true);
      resetForm();
    } catch (error) {
      toast.error("Erro ao excluir usuário, tente novamente", {
        theme: "colored",
      });
    }
  };

  const fetchPerson = useCallback(async () => {
    if (personId) {
      const fetchedPerson = await PersonService.findOne(personId);
      setPerson({
        ...fetchedPerson,
        admissionDate: new Date(fetchedPerson.admissionDate)
          .toISOString()
          .split("T")[0],
        demissionDate: fetchedPerson.demissionDate
          ? new Date(fetchedPerson.demissionDate)?.toISOString().split("T")[0]
          : null,
      });
    }
  }, [personId]);

  useEffect(() => {
    fetchPerson();
  }, [fetchPerson]);
  return (
    <>
      <ToastContainer />
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
                <Input
                  label="Nome Completo*"
                  type="text"
                  name="name"
                  placeholder="Digite o seu nome completo"
                  value={person?.name}
                  onChangeInputValue={(value) =>
                    setPerson((oldPerson) => ({
                      ...oldPerson,
                      name: value,
                    }))
                  }
                />
                <Input
                  label="CPF*"
                  mask="999.999.999-99"
                  type="text"
                  name="cpf"
                  id="cpf"
                  placeholder="Digite o seu CPF"
                  value={person?.cpf}
                  onChangeInputValue={(value) =>
                    setPerson((oldPerson) => ({
                      ...oldPerson,
                      cpf: value,
                    }))
                  }
                />
                <Input
                  label="Telefone do colaborador*"
                  mask="(99) 99999-9999"
                  type="tel"
                  name="contactPhone"
                  id="contactPhone"
                  placeholder="Digite o seu telefone"
                  value={person?.contactPhone}
                  onChangeInputValue={(value) =>
                    setPerson((oldPerson) => ({
                      ...oldPerson,
                      contactPhone: value,
                    }))
                  }
                />

                <Input
                  label="Número da carteira de trabalho*"
                  type="text"
                  name="cpts"
                  id="cpts"
                  placeholder="Digite o número da sua carteira de trabalho"
                  minLength={8}
                  maxLength={8}
                  value={person?.ctps}
                  onChangeInputValue={(value) =>
                    setPerson((oldPerson) => ({
                      ...oldPerson,
                      ctps: value,
                    }))
                  }
                />
                <Input
                  label="Data de admissão*"
                  type="date"
                  name="admissionDate"
                  id="admissionDate"
                  placeholder="Digite a data de admissão"
                  value={
                    person?.admissionDate
                      ? new Date(person?.admissionDate).toISOString()
                      : undefined
                  }
                  onChangeInputValue={(value) =>
                    setPerson((oldPerson) => ({
                      ...oldPerson,
                      admissionDate: value,
                    }))
                  }
                />

                {person.id ? (
                  <Input
                    label="Data de demissão"
                    type="date"
                    name="demissionDate"
                    id="demissionDate"
                    placeholder="Digite a data de demissão"
                    value={
                      person.demissionDate
                        ? new Date(person?.demissionDate).toISOString()
                        : undefined
                    }
                    onChangeInputValue={(value) =>
                      setPerson((oldPerson) => ({
                        ...oldPerson,
                        demissionDate: value,
                      }))
                    }
                  />
                ) : undefined}
                <div className={styles.containerInput}>
                  <label htmlFor="role">Cargo atual*</label>
                  <select
                    name="role"
                    id="role"
                    value={person?.role}
                    onChange={(e) =>
                      setPerson((oldPerson) => ({
                        ...oldPerson,
                        role: e.target.value as Person.Role,
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
                    value={person?.sector}
                    onChange={(e) =>
                      setPerson((oldPerson) => ({
                        ...oldPerson,
                        sector: e.target.value as Person.Sector,
                      }))
                    }
                  >
                    <option value="">Informe o setor</option>
                    <option value="internal">Interno(a)</option>
                    <option value="external">Externo(a)</option>
                  </select>
                </div>
                <Input
                  label="Rua*"
                  type="text"
                  name="street"
                  id="street"
                  placeholder="Digite o nome da rua"
                  value={person?.street}
                  onChangeInputValue={(value) =>
                    setPerson((oldPerson) => ({
                      ...oldPerson,
                      street: value,
                    }))
                  }
                />
                <Input
                  label="Bairro*"
                  type="text"
                  name="neighborhood"
                  id="neighborhood"
                  placeholder="Digite o nome do bairro"
                  value={person?.neighborhood}
                  onChangeInputValue={(value) =>
                    setPerson((oldPerson) => ({
                      ...oldPerson,
                      neighborhood: value,
                    }))
                  }
                />
                <Input
                  label="Cidade*"
                  type="text"
                  name="city"
                  id="city"
                  placeholder="DIgite o nome da cidade"
                  value={person?.city}
                  onChangeInputValue={(value) =>
                    setPerson((oldPerson) => ({
                      ...oldPerson,
                      city: value,
                    }))
                  }
                />
                <Input
                  label="Número*"
                  type="number"
                  name="number"
                  id="number"
                  placeholder="Digite o número"
                  value={person?.number}
                  onChangeInputValue={(value) =>
                    setPerson((oldPerson) => ({
                      ...oldPerson,
                      number: value,
                    }))
                  }
                />
                <Input
                  label="CEP*"
                  mask="99999-999"
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  placeholder="Digite o CEP"
                  value={person?.postalCode}
                  onChangeInputValue={(value) =>
                    setPerson((oldPerson) => ({
                      ...oldPerson,
                      postalCode: value,
                    }))
                  }
                />
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
                    <span>
                      {person.cpf.replace(
                        /(\d{3})(\d{3})(\d{3})(\d{2})/,
                        "$1.$2.$3-$4"
                      )}
                    </span>
                  </div>

                  <div className={styles.UserInfo}>
                    <b>Data de Admissão: </b>
                    <span>
                      {person.admissionDate
                        ? new Intl.DateTimeFormat("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }).format(new Date(person.admissionDate))
                        : person.admissionDate}
                    </span>
                  </div>

                  {person.demissionDate ? (
                    <div className={styles.UserInfo}>
                      <b>Data de Demissão: </b>
                      <span>
                        {person.demissionDate
                          ? new Intl.DateTimeFormat("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }).format(new Date(person?.demissionDate))
                          : person.demissionDate}
                      </span>
                    </div>
                  ) : null}

                  <div className={styles.UserInfo}>
                    <b>Cargo Atual: </b>
                    <span>
                      {person.role
                        ? PersonRolesTranslated[person.role]
                        : "Não preenchido"}
                    </span>
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
