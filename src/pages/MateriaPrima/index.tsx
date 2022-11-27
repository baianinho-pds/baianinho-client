import styles from "./materiaPrima.module.css";
import { FiEdit2, FiTrash, FiSearch, FiUser } from "react-icons/fi";
import { useState } from "react";
import FormMateriaPrima from "../../components/FormMateriaPrima";

export default function MateriaPrima() {
  const [isFormMateriaPrimaOpen, setIsFormMateriaPrimaOpen] = useState(false);
  return (
    <>
      <main>
        {!isFormMateriaPrimaOpen && (
          <>
            <header className="header-page">Matéria-Prima</header>

            <div className={styles.containerTable}>
              <div className={styles.actions}>
                <form action="" className={styles.search}>
                  <input type="text" value={""} placeholder="Pesquisar" />
                  <FiSearch size={20} />
                </form>

                <button
                  className={styles.actionButton}
                  onClick={() => setIsFormMateriaPrimaOpen(true)}
                >
                  Cadastrar
                  <FiUser size={20} />
                </button>
              </div>

              <div>
                <table className={styles.table}>
                  <tr>
                    <td>ID 145128</td>
                    <td>Manteiga</td>
                    <td>Validade</td>
                    <td>
                      <FiEdit2></FiEdit2>
                    </td>
                    <td>
                      <FiTrash color="#ff0000"></FiTrash>
                    </td>
                  </tr>
                  <tr>
                    <td>ID 235121</td>
                    <td>Farinha de Trigo</td>
                    <td>Validade</td>
                    <td>
                      <FiEdit2></FiEdit2>
                    </td>
                    <td>
                      <FiTrash color="#ff0000"></FiTrash>
                    </td>
                  </tr>
                  <tr>
                    <td>ID 874569</td>
                    <td>Leite</td>
                    <td>Validade</td>
                    <td>
                      <FiEdit2></FiEdit2>
                    </td>
                    <td>
                      <FiTrash color="#ff0000"></FiTrash>
                    </td>
                  </tr>
                  <tr>
                    <td>ID 101012</td>
                    <td>Embalagem Biscoito Pallito</td>
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
          </>
        )}

        <FormMateriaPrima
          isOpen={isFormMateriaPrimaOpen}
          closeForm={() => setIsFormMateriaPrimaOpen(false)}
        />
      </main>
    </>
  );
}
