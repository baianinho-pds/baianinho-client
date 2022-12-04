import { useEffect, useState, useCallback } from "react";
import { GrClose } from "react-icons/gr";
import { toast, ToastContainer } from "react-toastify";
import { FeedStock, FeedStockService } from "../../services/feedstock";
import styles from "./formMateriaPrima.module.css";

type FormMateriaPrimaProps = {
  isOpen: boolean;
  onRequestClose: (requestFetchData?: boolean) => void;
  action?: "form" | "delete";
  feedStockId: number | undefined;
};

type FeedstockFormParams = Omit<FeedStock, "id">;

function FormMateriaPrima({
  isOpen,
  onRequestClose,
  feedStockId,
  action,
}: FormMateriaPrimaProps) {
  const [materiaPrima, setMateriaPrima] = useState<FeedstockFormParams>({
    name: "",
    provider: "",
    unit: "",
    supplies_type: "leite",
    validity: "",
    amount: 0,
  });

  const resetForm = () => {
    setMateriaPrima({
      name: "",
      validity: "",
      provider: "",
      supplies_type: "",
      unit: "",
    });
  };

  async function SalvarMateriaPrima() {
    try {
      if (feedStockId) {
        await FeedStockService.updateFeedstock(feedStockId, materiaPrima);
      } else {
        await FeedStockService.addFeedstock(materiaPrima);
      }

      onRequestClose(true);
      resetForm();
    } catch (error) {
      console.error(error);

      toast.error("Verifique todos os campos ou tente novamente mais tarde", {
        theme: "colored",
      });
    }
  }

  async function handleDeleteFeedstock() {
    try {
      if (feedStockId) {
        await FeedStockService.deleteFeedstock(feedStockId);
      }
      onRequestClose(true);
      resetForm();
    } catch (error) {
      toast.error("Erro ao excluir matéria-prima, tente novamente", {
        theme: "colored",
      });
    }
  }

  const fetchFeedstock = useCallback(async () => {
    if (feedStockId) {
      const fetchedFeedstock = await FeedStockService.findOne(feedStockId);
      if (fetchedFeedstock) {
        setMateriaPrima({
          ...fetchedFeedstock,
          validity: fetchedFeedstock.validity?.split("T")[0],
        });
      }
    }
  }, [feedStockId]);

  useEffect(() => {
    fetchFeedstock();
  }, [fetchFeedstock]);

  return (
    <>
      {isOpen && (
        <>
          <ToastContainer />
          <div className={styles.containerCardMateriaPrima}>
            <div className={styles.cardHeader}>
              <h2>Dados da Matéria-Prima</h2>
              <GrClose onClick={() => onRequestClose()} />
            </div>

            {action === "form" && (
              <>
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
                <div className={styles.cardFooter}>
                  <button onClick={() => SalvarMateriaPrima()}>Salvar</button>
                </div>
              </>
            )}

            {action === "delete" && (
              <>
                <div className={styles.containerMateriaPrimaInfo}>
                  <div className={styles.materiaPrimaInfoCard}>
                    <div className={styles.materiaPrimaInfo}>
                      <b>Nome: </b>
                      <span>{materiaPrima.name}</span>
                    </div>

                    <div className={styles.materiaPrimaInfo}>
                      <b>Fornecedor: </b>
                      <span>{materiaPrima.provider}</span>
                    </div>

                    <div className={styles.UserInfo}>
                      <b>Validade: </b>
                      <span>{materiaPrima.validity}</span>
                    </div>

                    <div className={styles.UserInfo}>
                      <b>Unidade de Medida: </b>
                      <span>{materiaPrima.unit}</span>
                    </div>
                  </div>
                </div>
                <p className={styles.messageAlert}>
                  Você tem certeza que deseja excluir o cadastro de
                  matéria-prima
                  {" " + materiaPrima.name + " ?"}
                </p>
                <div className={styles.cardFooterFeedstockDelete}>
                  <button
                    className={styles.btnDelete}
                    onClick={() => handleDeleteFeedstock()}
                  >
                    Sim Excluir
                  </button>
                  <button className={styles.btnCancel}>Cancelar</button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default FormMateriaPrima;
