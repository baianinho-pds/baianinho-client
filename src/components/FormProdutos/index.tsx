import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { ToastContainer } from "react-toastify";
import { Product } from "../../models/product";
import styles from "./formProdutos.module.css";

interface FormProdutosProps {
  isOpen: boolean;
  onRequestClose: (requestFetchData?: boolean) => void;
  action?: "form" | "delete";
  // personId?: number;
}

type ProductFormParams = Omit<Product, "id"> & {
  id?: number;
};

function FormProdutos({ isOpen, onRequestClose, action }: FormProdutosProps) {
  const resetForm = () => {
    console.log("To Do");
  };

  const [product, setProduct] = useState<ProductFormParams>({
    name: "",
    price: 0,
    created_at: "",
    updated_at: "",
    expiration_date: "",
    quantity: 0,
    loteNumber: "",
    productWeight: 0,
  });

  return (
    <>
      <ToastContainer />
      {isOpen && (
        <div className={styles.containerCardUser}>
          <div className={styles.cardHeader}>
            <h2>Dados do Produto</h2>
            <GrClose
              onClick={() => {
                onRequestClose(false);
                resetForm();
              }}
            />
          </div>
          {action === "form" ? (
            <>
              <form>
                <div className={styles.containerInput}>
                  <label htmlFor="name">Nome do produto*</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Digite o Nome do Produto"
                    value={product?.name}
                    onChange={(e) =>
                      setProduct((oldProduct) => ({
                        ...oldProduct,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className={styles.containerInput}>
                  <label htmlFor="name">Número do Lote*</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Digite o Número do Lote"
                    value={product?.loteNumber}
                    onChange={(e) =>
                      setProduct((oldProduct) => ({
                        ...oldProduct,
                        loteNumber: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className={styles.containerInput}>
                  <label htmlFor="name">Gramatura do Produto*</label>
                  <input
                    type="number"
                    name="name"
                    id="name"
                    placeholder="Digite a Gramatura do Produto"
                    value={product?.productWeight}
                    onChange={(e) =>
                      setProduct((oldProduct) => ({
                        ...oldProduct,
                        productWeight: parseInt(e.target.value),
                      }))
                    }
                  />
                </div>

                <div className={styles.containerInput}>
                  <label htmlFor="name">Data de Produção*</label>
                  <input
                    type="date"
                    name="name"
                    id="name"
                    placeholder="Digite a Data de Produção"
                    value={product?.created_at}
                    onChange={(e) =>
                      setProduct((oldProduct) => ({
                        ...oldProduct,
                        created_at: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className={styles.containerInput}>
                  <label htmlFor="name">Data de Validade do Produto*</label>
                  <input
                    type="date"
                    name="name"
                    id="name"
                    placeholder="Digite a Data de Validade do Produto"
                    value={product?.expiration_date}
                    onChange={(e) =>
                      setProduct((oldProduct) => ({
                        ...oldProduct,
                        expiration_date: e.target.value,
                      }))
                    }
                  />
                </div>

                {product.id ? (
                  <div className={styles.containerInput}>
                    <label htmlFor="demissionDate">Data de demissão</label>
                    <input
                      type="date"
                      name="demissionDate"
                      id="demissionDate"
                      placeholder="Digite a data de demissão"
                      value={person?.demission_date ?? undefined}
                      onChange={(e) =>
                        setPerson((oldPerson) => ({
                          ...oldPerson,
                          demission_date: e.target.value,
                        }))
                      }
                    />
                  </div>
                ) : undefined}
              </form>
              {/* <div className={styles.cardFooter}>
                <button onClick={() => handlerSubmitFormUser()}>Salvar</button>
              </div> */}
            </>
          ) : action === "delete" ? (
            <>
              <div className={styles.containerUserInfo}>
                <div className={styles.userInfoCard}>
                  <div className={styles.UserInfo}>
                    <b>Nome Completo: </b>
                    <span>{person.name}</span>
                  </div>

                  <div className={styles.UserInfo}>
                    <b>CPF: </b>
                    <span>
                      {person.cpf.replace(
                        /(\d{3})(\d{3})(\d{3})(\d{2})/,
                        "$1.$2.$3-$4"
                      )}
                    </span>
                  </div>

                  <div className={styles.UserInfo}>
                    <b>Data de Admissão: </b>
                    <span>
                      {person.admission_date
                        ? new Intl.DateTimeFormat("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }).format(new Date(person.admission_date))
                        : person.admission_date}
                    </span>
                  </div>

                  {person.demission_date ? (
                    <div className={styles.UserInfo}>
                      <b>Data de Demissão: </b>
                      <span>
                        {person.demission_date
                          ? new Intl.DateTimeFormat("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }).format(new Date(person?.demission_date))
                          : person.demission_date}
                      </span>
                    </div>
                  ) : null}

                  <div className={styles.UserInfo}>
                    <b>Cargo Atual: </b>
                    <span>
                      {person.role_name
                        ? PersonRolesTranslated[person.role_name]
                        : "Não preenchido"}
                    </span>
                  </div>

                  <div className={styles.UserInfo}>
                    <b>CTPS: </b>
                    <span>{person.ctps}</span>
                  </div>
                </div>
              </div>
              <p className={styles.messageAlert}>
                Você tem certeza que deseja excluir o cadastro do usuário
                {" " + person.name + " ?"}
              </p>
              <div className={styles.cardFooterUserDelete}>
                <button
                  onClick={() => handlerDeleteUser()}
                  className={styles.btnDelete}
                >
                  Sim Excluir
                </button>
                <button
                  onClick={() => {
                    onRequestClose(false);
                    resetForm();
                  }}
                  className={styles.btnCancel}
                >
                  Cancelar
                </button>
              </div>
            </>
          ) : undefined}
        </div>
      )}
    </>
  );
}
