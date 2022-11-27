import { useState } from "react";
import { GrClose } from "react-icons/gr";
import styles from "./formMateriaPrima.module.css";

type FormMateriaPrimaProps = {
  isOpen: boolean;
  closeForm: () => void;
};

type MateriaPrima = {
  nome: any;
  validade: any;
  fornecedor: any;
  unidade_medida: any;
};

function FormMateriaPrima({ isOpen, closeForm }: FormMateriaPrimaProps) {
  const [materiaPrima, setMateriaPrima] = useState<MateriaPrima>({
    nome: "",
    validade: "",
    fornecedor: "",
    unidade_medida: "",
  });

  function SalvarMateriaPrima() {
    console.log("Matéria-Prima: ", materiaPrima);
  }

  return (
    <>
      {isOpen && (
        <div className={styles.containerCardMateriaPrima}>
          <div className={styles.cardHeader}>
            <h2>Dados da Matéria-Prima</h2>
            <GrClose onClick={closeForm} />
          </div>
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
          <div className={styles.cardFooter}>
            <button onClick={SalvarMateriaPrima}>Salvar</button>
          </div>
        </div>
      )}
    </>
  );
}

export default FormMateriaPrima;
