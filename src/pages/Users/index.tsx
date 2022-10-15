import styles from "./users.module.css";
import { FiEdit2, FiTrash, FiSearch, FiFilter, FiUser } from "react-icons/fi";
export default function Users() {
  return (
    <main>
      <header className="header-page">Usuários</header>

      <div className={styles.containerContent}>
        <div className={styles.actions}>
          <form action="" className={styles.search}>
            <input type="text" placeholder="Pesquisar" />
            <FiSearch size={20} />
          </form>
          <button className={styles.actionButton}>
            Filtrar/Ordenar
            <FiFilter size={20} />
          </button>
          <button className={styles.actionButton}>
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
    </main>
  );
}
