import styles from "./users.module.css";
import { FiEdit2, FiTrash, FiSearch, FiFilter, FiUser } from "react-icons/fi";
import FormUser from "../../components/FormUser";
import { useCallback, useEffect, useState } from "react";
import MessageAlert from "../../components/MessageAlert";
import { FindPageResponse, PersonService } from "../../services/person";
export default function Users() {
  const [isFormUserOpen, setIsFormUserOpen] = useState(false);
  const [personIdToUpdate, setPersonIdToUpdate] = useState<number>();
  const [isDeleteUserAlertOpen, setIsDeleteUserAlertOpen] = useState(false);
  const [modalMessageAlertState, setModalMessageAlertState] = useState(false);
  const [personList, setPersonList] = useState<FindPageResponse[]>([]);

  const fetchPersons = useCallback(async () => {
    const response = await PersonService.findMany();
    setPersonList(response.data);
  }, [PersonService]);

  useEffect(() => {
    fetchPersons();
  }, [fetchPersons]);

  return (
    <main>
      <header className="header-page">Usuários</header>

      <div className={styles.containerTable}>
        <div className={styles.actions}>
          <form action="" className={styles.search}>
            <input type="text" placeholder="Pesquisar" />
            <FiSearch size={20} />
          </form>
          <button className={styles.actionButton}>
            Filtrar/Ordenar
            <FiFilter size={20} />
          </button>
          <button
            className={styles.actionButton}
            onClick={() => setIsFormUserOpen(true)}
          >
            Cadastrar
            <FiUser size={20} />
          </button>
        </div>
        <table className={styles.table}>
          <tbody>
            {personList?.map((person) => (
              <tr key={person.id}>
                <td>{person.name}</td>
                <td>{person.contact_phone}</td>
                <td>
                  <FiEdit2
                    onClick={() => {
                      setIsFormUserOpen(true);
                      setPersonIdToUpdate(person.id);
                    }}
                  />
                </td>
                <td>
                  <FiTrash
                    color="#ff0000"
                    onClick={() => setIsDeleteUserAlertOpen(true)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FormUser
        isOpen={isDeleteUserAlertOpen || isFormUserOpen}
        onRequestClose={() => {
          setIsFormUserOpen(false);
          setIsDeleteUserAlertOpen(false);
          setPersonIdToUpdate(undefined);
        }}
        personId={personIdToUpdate}
        action={
          isDeleteUserAlertOpen ? "delete" : isFormUserOpen ? "form" : undefined
        }
      />
      <MessageAlert
        isOpen={modalMessageAlertState}
        onRequestClose={() => setModalMessageAlertState(false)}
      />
    </main>
  );
}
