import styles from "./materiaPrima.module.css";
import { FiEdit2, FiTrash, FiSearch, FiUser } from "react-icons/fi";
import { useState } from "react";
import FormMateriaPrima from "../../components/FormMateriaPrima";
import { MateriaPrimaModel } from "../../interfaces/materia-prima-interface";

export default function MateriaPrima() {
  const [isFormMateriaPrimaOpen, setIsFormMateriaPrimaOpen] = useState(false);
  const [isDeleteMateriaPrimaAlertOpen, setIsDeleteMateriaPrimaAlertOpen] = useState(false);
  const [listaMateriaPrima, setListaMateriaPrima] = useState<MateriaPrimaModel[]>([]);
  const [materiaPrimaSelecionada, setMateriaPrimaSelecionada] = useState<MateriaPrimaModel>({
    fornecedor: '',
    nome: '',
    unidade_medida: '',
    validade: ''
  })

  function abrirFormulario() {
    console.log(listaMateriaPrima);
    setIsFormMateriaPrimaOpen(true);
  }

  function selecionarMateriaPrima(materiaPrima: MateriaPrimaModel, action: 'deletar' | 'editar') {
    if(action === 'deletar') {
      setIsDeleteMateriaPrimaAlertOpen(true)
      setMateriaPrimaSelecionada(materiaPrima)
    }
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
                    <tr key={materiaPrima.id}>
                      <td>ID {materiaPrima.id}</td>
                      <td>{materiaPrima.nome}</td>
                      <td>{materiaPrima.validade}</td>
                      <td>
                        <FiEdit2></FiEdit2>
                      </td>
                      <td>
                        <FiTrash onClick={() => selecionarMateriaPrima(materiaPrima, 'deletar')} color="#ff0000"></FiTrash>
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
          isOpen={isFormMateriaPrimaOpen || isDeleteMateriaPrimaAlertOpen}
          closeForm={() => setIsFormMateriaPrimaOpen(false)}
          action={
            isDeleteMateriaPrimaAlertOpen 
              ? 'delete' 
              : isFormMateriaPrimaOpen 
              ? 'form' 
              : undefined
          }
          materiaPrimaProp={materiaPrimaSelecionada}
        />
      </main>
    </>
  );
}
