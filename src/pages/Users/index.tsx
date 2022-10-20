import styles from "./users.module.css";
import { FiEdit2, FiTrash, FiSearch, FiFilter, FiUser } from "react-icons/fi";
export default function Users() {
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
      <div className={styles.containerCardUser}>
        <div className={styles.cardHeader}>
          <h2>Dados do Usuário</h2>
        </div>

        <form>
          <div className={styles.containerInput}>
            <label htmlFor="name">Nome completo*</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Digite o seu nome completo"
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="contactPhone">Telefone do colaborador*</label>
            <input
              type="tel"
              name="contactPhone"
              id="contactPhone"
              placeholder="Digite o seu telefone"
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="cpts">Número da carteira de trabalho*</label>
            <input
              type="text"
              name="cpts"
              id="cpts"
              placeholder="Digite o número da sua carteira de trabalho"
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="password">Senha de acesso ao painel*</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Digite a sua senha"
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="admissionDate">Data de admissão*</label>
            <input
              type="date"
              name="admissionDate"
              id="admissionDate"
              placeholder="Digite a data de admissão"
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="demissionDate">Data de desligamento</label>
            <input
              type="date"
              name="demissionDate"
              id="demissionDate"
              placeholder="Digite a data de desligamento"
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="role">Cargo atual*</label>
            <select name="role" id="role">
              <option value="">Digite a data de desligamento</option>
              <option value="admin">Administrador(a)</option>
              <option value="seller">Vendedor(a)</option>
            </select>
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="localwork">Local/Região de trabalho*</label>
            <input
              type="text"
              name="localwork"
              id="localwork"
              placeholder="Local/Região de trabalho"
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="street">Rua*</label>
            <input type="number" name="street" id="street" placeholder="Rua" />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="neighborhood">Vizinhança*</label>
            <input
              type="text"
              name="neighborhood"
              id="neighborhood"
              placeholder="Vizinhança"
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="city">Cidade*</label>
            <input type="text" name="city" id="city" placeholder="Cidade" />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="city">Número*</label>
            <input
              type="number"
              name="number"
              id="number"
              placeholder="Número"
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="postalCode">CEP*</label>
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              placeholder="Digite o CEP"
            />
          </div>
        </form>

        <div className={styles.cardFooter}>
          <button>Salvar</button>
        </div>
      </div>
    </main>
  );
}
