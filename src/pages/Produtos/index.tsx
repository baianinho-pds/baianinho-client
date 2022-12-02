import styles from "./produtos.module.css";
import { FiEdit2, FiTrash, FiSearch, FiUser } from "react-icons/fi";

export default function Produtos() {
  return (
    <>
      <main>
        <header className="header-page">Produtos</header>

        <div className={styles.containerTable}>
          <div className={styles.actions}>
            <form action="" className={styles.search}>
              <input type="text" value={""} placeholder="Pesquisar" />
              <FiSearch size={20} />
            </form>

            <button className={styles.actionButton}>
              Cadastrar
              <FiUser size={20} />
            </button>
          </div>

          <div>
            <table className={styles.table}>
              <tr>
                <td>Número do Lote</td>
                <td>Nome do produto</td>
                <td>Gramatura</td>
                <td>Data de produção</td>
                <td>Validade</td>
                <td>
                  <FiEdit2></FiEdit2>
                </td>
                <td>
                  <FiTrash color="#ff0000"></FiTrash>
                </td>
              </tr>
              <tr>
                <td>Número do Lote</td>
                <td>Nome do produto</td>
                <td>Gramatura</td>
                <td>Data de produção</td>
                <td>Validade</td>
                <td>
                  <FiEdit2></FiEdit2>
                </td>
                <td>
                  <FiTrash color="#ff0000"></FiTrash>
                </td>
              </tr>
              <tr>
                <td>Número do Lote</td>
                <td>Nome do produto</td>
                <td>Gramatura</td>
                <td>Data de produção</td>
                <td>Validade</td>
                <td>
                  <FiEdit2></FiEdit2>
                </td>
                <td>
                  <FiTrash color="#ff0000"></FiTrash>
                </td>
              </tr>
              <tr>
                <td>Número do Lote</td>
                <td>Nome do produto</td>
                <td>Gramatura</td>
                <td>Data de produção</td>
                <td>Validade</td>
                <td>
                  <FiEdit2></FiEdit2>
                </td>
                <td>
                  <FiTrash color="#ff0000"></FiTrash>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
