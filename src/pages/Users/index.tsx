import styles from "./users.module.css";
import { FiEdit2, FiTrash, FiSearch, FiFilter, FiUser } from "react-icons/fi";
import FormUser from "../../components/FormUser";
import { useState } from "react";
import MessageAlert from "../../components/MessageAlert";
export default function Users() {
  const [modalUserState, setModalUserState] = useState(false);
  const [modalUserActionState, setModalUserAtionState] = useState<
    "edit" | "delete"
  >("edit");

  const [modalMessageAlertState, setModalMessageAlertState] = useState(false);

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
            <tr>
              <td>Raquel asjdajsdas</td>
              <td>(77) 9999-9999</td>
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
            <tr>
              <td>Raquel asjdajsdas</td>
              <td>(77) 9999-9999</td>
              <td>
                <FiEdit2 />
              </td>
              <td>
                <FiTrash color="#ff0000" />
              </td>
            </tr>
            <tr>
              <td>Raquel asjdajsdas</td>
              <td>(77) 9999-9999</td>
              <td>
                <FiEdit2 />
              </td>
              <td>
                <FiTrash color="#ff0000" />
              </td>
            </tr>
            <tr>
              <td>Raquel asjdajsdas</td>
              <td>(77) 9999-9999</td>
              <td>
                <FiEdit2 />
              </td>
              <td>
                <FiTrash color="#ff0000" />
              </td>
            </tr>
            <tr>
              <td>Raquel asjdajsdas</td>
              <td>(77) 9999-9999</td>
              <td>
                <FiEdit2 />
              </td>
              <td>
                <FiTrash color="#ff0000" />
              </td>
            </tr>
            <tr>
              <td>Raquel asjdajsdas</td>
              <td>(77) 9999-9999</td>
              <td>
                <FiEdit2 />
              </td>
              <td>
                <FiTrash color="#ff0000" />
              </td>
            </tr>
            <tr>
              <td>Raquel asjdajsdas</td>
              <td>(77) 9999-9999</td>
              <td>
                <FiEdit2 />
              </td>
              <td>
                <FiTrash color="#ff0000" />
              </td>
            </tr>
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
