import styles from "./materiaPrima.module.css";
import { FiEdit2, FiTrash, FiSearch, FiUser } from "react-icons/fi";
import { useState } from "react";
import FormMateriaPrima from "../../components/FormMateriaPrima";
import { MateriaPrimaModel } from "../../interfaces/materia-prima-interface";

export default function MateriaPrima() {
  const [isFormMateriaPrimaOpen, setIsFormMateriaPrimaOpen] = useState(false);
  const [listaMateriaPrima, setListaMateriaPrima] = useState<MateriaPrimaModel[]>([]);

  function abrirFormulario() {
    console.log(listaMateriaPrima);
    setIsFormMateriaPrimaOpen(true);
  }

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
                  onClick={() => abrirFormulario()}
                >
                  Cadastrar
                  <FiUser size={20} />
                </button>
              </div>

              <div>
                <table className={styles.table}>
                  {listaMateriaPrima.map((materiaPrima) => (
                    <tr>
                      <td>ID {materiaPrima.id}</td>
                      <td>{materiaPrima.nome}</td>
                      <td>{materiaPrima.validade}</td>
                      <td>
                        <FiEdit2></FiEdit2>
                      </td>
                      <td>
                        <FiTrash color="#ff0000"></FiTrash>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          </>
        )}

        <FormMateriaPrima
          setListaMateriaPrima={setListaMateriaPrima}
          isOpen={isFormMateriaPrimaOpen}
          closeForm={() => setIsFormMateriaPrimaOpen(false)}
        />
      </main>
    </>
  );
}
