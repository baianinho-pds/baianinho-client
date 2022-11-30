import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { MateriaPrimaModel } from "../../interfaces/materia-prima-interface";
import styles from "./formMateriaPrima.module.css";

type FormMateriaPrimaProps = {
  isOpen: boolean;
  closeForm: () => void;
  setListaMateriaPrima: React.Dispatch<React.SetStateAction<MateriaPrimaModel[]>>;
  action?: "form" | "delete";
  materiaPrimaProp: MateriaPrimaModel
};

function FormMateriaPrima({
  isOpen,
  closeForm,
  setListaMateriaPrima,
  materiaPrimaProp,
  action
}: FormMateriaPrimaProps) {
  const [materiaPrima, setMateriaPrima] = useState<MateriaPrimaModel>({
    nome: "",
    validade: "",
    fornecedor: "",
    unidade_medida: "",
  });

  function SalvarMateriaPrima() {
    setListaMateriaPrima((oldListaMateriaPrima: MateriaPrimaModel[]) => [
      ...oldListaMateriaPrima,
      materiaPrima,
    ]);

    setMateriaPrima({
      nome: "",
      validade: "",
      fornecedor: "",
      unidade_medida: "",
    })

    closeForm()
    console.log("Matéria-Prima: ", materiaPrima);
  }

  useEffect(() => {
    console.log('aqui aqui');
    
    if(action === 'delete' && materiaPrimaProp) {
      console.log('aqui também');
      setMateriaPrima(materiaPrimaProp)
    }
  }, [])

  return (
    <>
      {isOpen && (
        <div className={styles.containerCardMateriaPrima}>
          <div className={styles.cardHeader}>
            <h2>Dados da Matéria-Prima</h2>
            <GrClose onClick={closeForm} />
          </div>

          {action === 'form' && (
            <form>
              <div className={styles.containerInput}>
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Digite o nome da matéria-prima"
                  value={materiaPrima.nome}
                  onChange={(e) =>
                    setMateriaPrima((oldMateriaPrima) => ({
                      ...oldMateriaPrima,
                      nome: e.target.value,
                    }))
                  }
                />
              </div>
              <div className={styles.containerInput}>
                <label htmlFor="fornecedor">Fornecedor</label>
                <input
                  type="text"
                  name="fornecedor"
                  id="fornecedor"
                  placeholder="Digite o nome do fornecedor"
                  value={materiaPrima.fornecedor}
                  onChange={(e) =>
                    setMateriaPrima((oldMateriaPrima) => ({
                      ...oldMateriaPrima,
                      fornecedor: e.target.value,
                    }))
                  }
                />
              </div>
              <div className={styles.containerInput}>
                <label htmlFor="validade">Validade</label>
                <input
                  type="date"
                  name="validade"
                  id="validade"
                  placeholder="Digite a validade da matéria-prima"
                  value={materiaPrima.validade}
                  onChange={(e) =>
                    setMateriaPrima((oldMateriaPrima) => ({
                      ...oldMateriaPrima,
                      validade: e.target.value,
                    }))
                  }
                />
              </div>
              <div className={styles.containerInput}>
                <label htmlFor="unidade_medida">Unidade de Medida</label>
                <input
                  type="text"
                  name="unidade_medida"
                  id="unidade_medida"
                  placeholder="Digite a unidade de medida"
                  value={materiaPrima.unidade_medida}
                  onChange={(e) =>
                    setMateriaPrima((oldMateriaPrima) => ({
                      ...oldMateriaPrima,
                      unidade_medida: e.target.value,
                    }))
                  }
                />
              </div>
            </form>
          )}

          {action === 'delete' && (
             <>
              <div className={styles.containerMateriaPrimaInfo}>
               <div className={styles.materiaPrimaInfoCard}>
                 <div className={styles.materiaPrimaInfo}>
                   <b>Nome: </b>
                   <span>{materiaPrima.nome}</span>
                 </div>

                 <div className={styles.materiaPrimaInfo}>
                   <b>Fornecedor: </b>
                   <span>
                     {materiaPrima.fornecedor}
                   </span>
                 </div>

                 <div className={styles.UserInfo}>
                   <b>Validade: </b>
                   <span>
                     {materiaPrima.validade}
                   </span>
                 </div>

                 <div className={styles.UserInfo}>
                    <b>Unidade de Medida: </b>
                    <span>
                      {materiaPrima.unidade_medida}
                    </span>
                  </div>
                
               </div>
             </div>
             <p className={styles.messageAlert}>
               Você tem certeza que deseja excluir o cadastro de matéria-prima
               {" " + materiaPrima.nome + " ?"}
             </p>
             <div className={styles.cardFooterUserDelete}>
               <button
                 className={styles.btnDelete}
               >
                 Sim Excluir
               </button>
               <button className={styles.btnCancel}>
                 Cancelar
               </button>
             </div>
           </>
          )}
         
          <div className={styles.cardFooter}>
            <button onClick={SalvarMateriaPrima}>Salvar</button>
          </div>
        </div>
      )}
    </>
  );
}

export default FormMateriaPrima;
