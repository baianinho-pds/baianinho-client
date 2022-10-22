import styles from "./users.module.css";
import { FiEdit2, FiTrash, FiSearch, FiFilter, FiUser } from "react-icons/fi";
import FormUser from "../../components/FormUser";
import { useCallback, useEffect, useState } from "react";
import MessageAlert from "../../components/MessageAlert";
import { FindPageResponse, PersonService } from "../../services/person";
export default function Users() {
  const [modalUserState, setModalUserState] = useState(false);
  const [modalUserActionState, setModalUserAtionState] = useState<
    "edit" | "delete"
  >("edit");

  const [modalMessageAlertState, setModalMessageAlertState] = useState(false);
  const [personList, setPersonList] = useState<FindPageResponse[]>([]);

  const handlerShowModalUser = () => {
    setModalUserState(true);
  };

  const handleCloseModalUser = () => {
    setModalUserState(false);
    setModalUserAtionState("edit");
    setModalMessageAlertState(true);
  };

  const handlerRequestDeleteUser = () => {
    setModalUserAtionState("delete");
    setModalUserState(true);
  };

  const fetchPersons = useCallback(async () => {
    const response = await PersonService.findMany();
    setPersonList(response.data);
  }, []);

  useEffect(() => {
    fetchPersons();
  }, []);

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
            onClick={() => handlerShowModalUser()}
          >
            Cadastrar
            <FiUser size={20} />
          </button>
        </div>
        <table className={styles.table}>
          <tbody>
            {personList?.map(person => (
              <tr key={person.id}>
                <td>{person.name}</td>
                <td>{person.contact_phone}</td>
                <td>
                  <FiEdit2 onClick={() => handlerShowModalUser()} />
                </td>
                <td>
                  <FiTrash
                    color="#ff0000"
                    onClick={() => handlerRequestDeleteUser()}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FormUser
        isOpen={modalUserState}
        onRequestClose={() => handleCloseModalUser()}
        action={modalUserActionState}
      />
      <MessageAlert
        isOpen={modalMessageAlertState}
        onRequestClose={() => setModalMessageAlertState(false)}
      />
    </main>
  );
}
