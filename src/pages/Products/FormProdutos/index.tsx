import { useCallback, useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { toast, ToastContainer } from "react-toastify";
import { Input } from "../../../components/Input";
import { Product } from "../../../interfaces/product";
import { ProductService } from "../../../services/product";
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
    expirationDate: null,
    quantity: 0,
    batchCode: 0,
    grammage: 0,
    productionDate: null
  });

  const resetForm = () => {
    setProduct({
      name: "",
      price: 0,
      expirationDate: null,
      quantity: 0,
      batchCode: 0,
      grammage: 0,
      productionDate: null
    });
  };

  async function handlerSubmitFormProduct() {
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
    fetchProduct()
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
                <Input
                  label="Nome do produto*"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Digite o Nome do Produto"
                  value={product?.name}
                  onChangeInputValue={(value) =>
                    setProduct((oldProduct) => ({
                      ...oldProduct,
                      name: value,
                    }))
                  }
                />

                <Input
                  label="Número do Lote*"
                  type="number"
                  name="name"
                  id="name"
                  placeholder="Digite o Número do Lote"
                  value={String(product?.batchCode)}
                  onChangeInputValue={(value) =>
                    setProduct((oldProduct) => ({
                      ...oldProduct,
                      batchCode: Number(value),
                    }))
                  }
                />

                <Input
                  label="Gramatura do Produto*"
                  type="number"
                  name="name"
                  id="name"
                  placeholder="Digite a Gramatura do Produto"
                  value={String(product?.grammage)}
                  onChangeInputValue={(value) =>
                    setProduct((oldProduct) => ({
                      ...oldProduct,
                      grammage: parseInt(value),
                    }))
                  }
                />

                <Input
                  label="Data de Produção*"
                  type="date"
                  name="name"
                  id="name"
                  placeholder="Digite a Data de Produção"
                  value={product?.productionDate ? new Date(product?.productionDate)?.toISOString().split('T')[0] : undefined}
                  onChangeInputValue={(value) =>
                    setProduct((oldProduct) => ({
                      ...oldProduct,
                      productionDate: new Date(value),
                    }))
                  }
                />

                <Input
                  label="Data de Validade do Produto*"
                  type="date"
                  name="name"
                  id="name"
                  placeholder="Digite a Data de Validade do Produto"
                  value={product?.expirationDate ? new Date(product?.expirationDate)?.toISOString().split('T')[0] : undefined}
                  onChangeInputValue={(value) =>
                    setProduct((oldProduct) => ({
                      ...oldProduct,
                      expirationDate: new Date(value),
                    }))
                  }
                />
              </form>
              <div className={styles.cardFooter}>
                <button onClick={() => handlerSubmitFormProduct()}>Salvar</button>
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
                    <span>{product.batchCode}</span>
                  </div>

                  {/* <div>
                    <b>Data de Fabricação: </b>
                    <span>
                      {product.productionDate
                        ? new Intl.DateTimeFormat("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }).format(new Date(product.productionDate).toISOString())
                        : product.productionDate}
                    </span>
                  </div> */}

                  {product.expirationDate ? (
                    <div>
                      <b>Data de Validade do Produto: </b>
                      <span>
                        {product.expirationDate
                          ? new Intl.DateTimeFormat("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }).format(new Date(product.expirationDate))
                          : product.expirationDate}
                      </span>
                    </div>
                  ) : null}

                  {/* <div>
                    <b>Quantidade: </b>
                    <span>{product.quantity}</span>
                  </div> */}
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
