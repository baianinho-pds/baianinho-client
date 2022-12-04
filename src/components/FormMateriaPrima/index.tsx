import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { toast, ToastContainer } from "react-toastify";
import { FeedStock, FeedStockService } from "../../services/feedstock";
import styles from "./formMateriaPrima.module.css";

type FormMateriaPrimaProps = {
  isOpen: boolean;
  closeForm: () => void;
  setListaMateriaPrima: React.Dispatch<React.SetStateAction<FeedStock[]>>;
  action?: "form" | "delete";
  feedStockProp: Omit<FeedStock, 'id'>
};

type FeedstockFormParams = Omit<FeedStock, 'id'>

function FormMateriaPrima({
  isOpen,
  closeForm,
  setListaMateriaPrima,
  feedStockProp: materiaPrimaProp,
  action
}: FormMateriaPrimaProps) {
  const [materiaPrima, setMateriaPrima] = useState<FeedstockFormParams>({
    name: "",
    provider: "",
    unit: "",
    supplies_type: "leite",
    validity: "",
    amount: 0
  });

  async function SalvarMateriaPrima() {
    try {
      console.log('materiaPrima: ',materiaPrima)
      await FeedStockService.addFeedstock(materiaPrima)
      setMateriaPrima({
        name: "",
        validity: "",
        provider: "",
        supplies_type: "",
        unit: "",
      })
      
      closeForm()
      console.log("Matéria-Prima: ", materiaPrima);
    } catch(error) {
      console.log('aqui error: ',error);
      
      toast.error("Verifique todos os campos ou tente novamente mais tarde", {
        theme: "colored",
      });
    }
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
        <>
          <ToastContainer />
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
                    value={materiaPrima.name}
                    onChange={(e) =>
                      setMateriaPrima((oldMateriaPrima) => ({
                        ...oldMateriaPrima,
                        name: e.target.value,
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
                    value={materiaPrima.provider}
                    onChange={(e) =>
                      setMateriaPrima((oldMateriaPrima) => ({
                        ...oldMateriaPrima,
                        provider: e.target.value,
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
                    value={materiaPrima.validity}
                    onChange={(e) =>
                      setMateriaPrima((oldMateriaPrima) => ({
                        ...oldMateriaPrima,
                        validity: e.target.value,
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
                    value={materiaPrima.unit}
                    onChange={(e) =>
                      setMateriaPrima((oldMateriaPrima) => ({
                        ...oldMateriaPrima,
                        unit: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="unidade_medida">Tipo do suplemento</label>
                  <input
                    type="text"
                    name="tipo_suplemento"
                    id="tipo_suplemento"
                    placeholder="Digite o tipo do suplemento"
                    value={materiaPrima.supplies_type}
                    onChange={(e) =>
                      setMateriaPrima((oldMateriaPrima) => ({
                        ...oldMateriaPrima,
                        supplies_type: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="unidade_medida">Quantidade</label>
                  <input
                    type="text"
                    name="quantidade"
                    id="quantidade"
                    placeholder="Digite a quantidade"
                    value={materiaPrima.amount}
                    onChange={(e) =>
                      setMateriaPrima((oldMateriaPrima) => ({
                        ...oldMateriaPrima,
                        amount: Number(e.target.value) || 0,
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
                    <span>{materiaPrima.name}</span>
                  </div>

                  <div className={styles.materiaPrimaInfo}>
                    <b>Fornecedor: </b>
                    <span>
                      {materiaPrima.provider}
                    </span>
                  </div>

                  <div className={styles.UserInfo}>
                    <b>Validade: </b>
                    <span>
                      {materiaPrima.validity}
                    </span>
                  </div>

                  <div className={styles.UserInfo}>
                      <b>Unidade de Medida: </b>
                      <span>
                        {materiaPrima.unit}
                      </span>
                    </div>
                  
                </div>
              </div>
              <p className={styles.messageAlert}>
                Você tem certeza que deseja excluir o cadastro de matéria-prima
                {" " + materiaPrima.name + " ?"}
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
              <button onClick={() => SalvarMateriaPrima()}>Salvar</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default FormMateriaPrima;
