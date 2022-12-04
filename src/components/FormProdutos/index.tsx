import { useCallback, useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { toast, ToastContainer } from "react-toastify";
import { Product } from "../../models/product";
import { ProductService } from "../../services/product";
import styles from "./formProdutos.module.css";

interface FormProductsProps {
  isOpen: boolean;
  onRequestClose: (requestFetchData?: boolean) => void;
  action?: "form" | "delete";
  productId?: number;
}

type ProductFormParams = Omit<Product, "id"> & {
  id?: number;
};

export default function FormProdutos({
  isOpen,
  onRequestClose,
  action,
  productId,
}: FormProductsProps) {
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

  const resetForm = () => {
    setProduct({
      name: "",
      price: 0,
      created_at: "",
      updated_at: "",
      expiration_date: "",
      quantity: 0,
      loteNumber: "",
      productWeight: 0,
    });

    const handlerSubmitFormProduct = async () => {
      try {
        if (product.id) {
          await ProductService.updateProduct(product.id, {
            ...product,
          });
        } else {
          await ProductService.addProduct({
            ...product,
          });
        }
        onRequestClose(true);
        resetForm();
      } catch (error) {
        toast.error("Verifique todos os campos ou tente novamente mais tarde", {
          theme: "colored",
        });
      }
    };
  };

  const handlerDeleteProduct = async () => {
    try {
      if (product.id) {
        await ProductService.deleteProduct(product.id);
      }
      onRequestClose(true);
      resetForm();
    } catch (error) {
      toast.error("Erro ao excluir produto, tente novamente", {
        theme: "colored",
      });
    }
  };

  const fetchProduct = useCallback(async () => {
    if (productId) {
      const fetchedProduct = await ProductService.findOne(productId);
      setProduct({
        ...fetchedProduct,
      });
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <>
      <ToastContainer />
      {isOpen && (
        <div className={styles.containerCardProducts}>
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
              </form>
              <div className={styles.cardFooter}>
                <button>Salvar</button>
              </div>
            </>
          ) : action === "delete" ? (
            <>
              <div className={styles.containerProductsInfo}>
                <div className={styles.productInfoCard}>
                  <div className={styles.UserInfo}>
                    <b>Nome do Produto: </b>
                    <span>{product.name}</span>
                  </div>

                  <div>
                    <b>Lote do Produto: </b>
                    <span>{product.loteNumber}</span>
                  </div>

                  <div>
                    <b>Data de Fabricação: </b>
                    <span>
                      {product.created_at
                        ? new Intl.DateTimeFormat("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }).format(new Date(product.created_at))
                        : product.created_at}
                    </span>
                  </div>

                  {product.expiration_date ? (
                    <div>
                      <b>Data de Validade do Produto: </b>
                      <span>
                        {product.expiration_date
                          ? new Intl.DateTimeFormat("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }).format(new Date(product.expiration_date))
                          : product.expiration_date}
                      </span>
                    </div>
                  ) : null}

                  <div>
                    <b>Quantidade: </b>
                    <span>{product.quantity}</span>
                  </div>
                </div>
              </div>
              <p className={styles.messageAlert}>
                Você tem certeza que deseja excluir o cadastro do produto
                {" " + product.name + " ?"}
              </p>
              <div className={styles.cardFooterProductDelete}>
                <button
                  onClick={() => handlerDeleteProduct()}
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
