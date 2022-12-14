import { useEffect, useState, useCallback } from "react";
import { GrClose } from "react-icons/gr";
import Select, { MultiValue } from "react-select";
import { toast, ToastContainer } from "react-toastify";
import { Input } from "../../../components/Input";
import { FeedStock } from "../../../interfaces/feedstock";
import { FeedStockService } from "../../../services/feedstock";
import { ProductService } from "../../../services/product";
import styles from "./formFeedstock.module.css";

type FormMateriaPrimaProps = {
  isOpen: boolean;
  onRequestClose: (requestFetchData?: boolean) => void;
  action?: "form" | "delete";
  feedStockId: number | undefined;
};

type FeedstockFormParams = Omit<FeedStock, "id">;

type ProductList = {
  value: string;
  label: string;
};

function FormMateriaPrima({
  isOpen,
  onRequestClose,
  feedStockId,
  action,
}: FormMateriaPrimaProps) {
  const [materiaPrima, setMateriaPrima] = useState<FeedstockFormParams>({
    name: "",
    validity: null,
    provider: "",
    suppliesType: "",
    unit: "",
    amount: 0,
    products: [],
  });

  const [productList, setProductList] = useState<ProductList[]>([]);

  const [selectedOption, setSelectedOption] = useState<
    MultiValue<Record<string, string>>
  >([]);

  const onChange = (data: MultiValue<Record<string, string>>) => {
    setSelectedOption(data);
  };

  const resetForm = () => {
    setMateriaPrima({
      name: "",
      validity: null,
      provider: "",
      suppliesType: "",
      unit: "",
      amount: 0,
      products: [],
    });
    setSelectedOption([]);
  };

  async function SalvarMateriaPrima() {
    try {
      const products = selectedOption.map((product) => ({
        id: Number(product.value),
      }));
      if (feedStockId) {
        await FeedStockService.updateFeedstock(feedStockId, {
          ...materiaPrima,
          products,
        });
      } else {
        await FeedStockService.addFeedstock({
          ...materiaPrima,
          products,
        });
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
      toast.error("Erro ao excluir mat??ria-prima, tente novamente", {
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
          validity: fetchedFeedstock?.validity
            ? new Date(fetchedFeedstock?.validity)
            : null,
        });

        const selectedProducts = fetchedFeedstock.products.map((product) => ({
          value: String(product.id),
          label: product.name,
        }));

        setSelectedOption(selectedProducts);
      }
    }
  }, [feedStockId]);

  const fetchProductsList = useCallback(async () => {
    const fetchedProducts = await ProductService.findMany();
    if (fetchedProducts) {
      const products = fetchedProducts.data.map((product) => ({
        value: String(product.id),
        label: product.name,
      }));
      setProductList(products);
    }
  }, [feedStockId]);

  useEffect(() => {
    fetchFeedstock();
    fetchProductsList();
  }, [fetchFeedstock]);

  return (
    <>
      {isOpen && (
        <>
          <ToastContainer />
          <div className={styles.containerCardMateriaPrima}>
            <div className={styles.cardHeader}>
              <h2>Dados da Mat??ria-Prima</h2>
              <GrClose
                onClick={() => {
                  onRequestClose();
                  resetForm();
                }}
              />
            </div>
            {action === "form" && (
              <>
                <form>
                  <Input
                    label="Nome"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Digite o nome da mat??ria-prima"
                    value={materiaPrima.name}
                    onChangeInputValue={(value) =>
                      setMateriaPrima((oldMateriaPrima) => ({
                        ...oldMateriaPrima,
                        name: value,
                      }))
                    }
                  />
                  <Input
                    label="Fornecedor"
                    type="text"
                    name="fornecedor"
                    id="fornecedor"
                    placeholder="Digite o nome do fornecedor"
                    value={materiaPrima.provider}
                    onChangeInputValue={(value) =>
                      setMateriaPrima((oldMateriaPrima) => ({
                        ...oldMateriaPrima,
                        provider: value,
                      }))
                    }
                  />
                  <Input
                    label="Validade"
                    type="date"
                    name="validade"
                    id="validade"
                    placeholder="Digite a validade da mat??ria-prima"
                    value={
                      materiaPrima.validity?.toISOString().split("T")[0] ||
                      undefined
                    }
                    onChangeInputValue={(value) =>
                      setMateriaPrima((oldMateriaPrima) => ({
                        ...oldMateriaPrima,
                        validity: new Date(value),
                      }))
                    }
                  />
                  <div className={styles.containerInput}>
                    <label htmlFor="unidade_medida">Unidade de Medida</label>
                    <select
                      name="unit"
                      id="unit"
                      placeholder="Selecione a unidade de medida"
                      value={materiaPrima.unit}
                      onChange={(e) =>
                        setMateriaPrima((oldMateriaPrima) => ({
                          ...oldMateriaPrima,
                          unit: e.target.value,
                        }))
                      }
                    >
                      <option value="">Selecionar</option>
                      <option value="g">g</option>
                      <option value="kg">kg</option>
                      <option value="ml">ml</option>
                      <option value="lt">lt</option>
                    </select>
                  </div>
                  <Input
                    label="Tipo do insumo"
                    type="text"
                    name="tipo_suplemento"
                    id="tipo_suplemento"
                    placeholder="Digite o tipo do suplemento"
                    value={materiaPrima.suppliesType}
                    onChangeInputValue={(value) =>
                      setMateriaPrima((oldMateriaPrima) => ({
                        ...oldMateriaPrima,
                        suppliesType: value,
                      }))
                    }
                  />
                  <Input
                    label="Quantidade"
                    type="number"
                    name="quantidade"
                    id="quantidade"
                    placeholder="Digite a quantidade"
                    value={String(materiaPrima.amount)}
                    onChangeInputValue={(value) =>
                      setMateriaPrima((oldMateriaPrima) => ({
                        ...oldMateriaPrima,
                        amount: Number(value) || 0,
                      }))
                    }
                  />
                </form>
                <div className={styles.containerSelect}>
                  <span>Selecione os Produtos</span>
                  {materiaPrima.products ? (
                    <Select
                      maxMenuHeight={100}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: "1px solid rgba(0,0,0,0.6)",
                          boxShadow: "none",
                        }),
                      }}
                      placeholder="Selecionar"
                      isMulti={true}
                      value={selectedOption}
                      options={productList}
                      onChange={onChange}
                    />
                  ) : undefined}
                </div>

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
                      <span>
                        {materiaPrima.validity
                          ? new Intl.DateTimeFormat("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }).format(new Date(materiaPrima.validity))
                          : materiaPrima.validity}
                      </span>
                    </div>

                    <div className={styles.UserInfo}>
                      <b>Unidade de Medida: </b>
                      <span>{materiaPrima.unit}</span>
                    </div>

                    <div className={styles.UserInfo}>
                      <b>Quantidade: </b>
                      <span>{materiaPrima.amount}</span>
                    </div>
                  </div>
                </div>
                <p className={styles.messageAlert}>
                  Voc?? tem certeza que deseja excluir o cadastro de
                  mat??ria-prima
                  {" " + materiaPrima.name + " ?"}
                </p>
                <div className={styles.cardFooterFeedstockDelete}>
                  <button
                    className={styles.btnDelete}
                    onClick={() => handleDeleteFeedstock()}
                  >
                    Sim Excluir
                  </button>
                  <button
                    className={styles.btnCancel}
                    onClick={() => {
                      onRequestClose(false);
                      resetForm();
                    }}
                  >
                    Cancelar
                  </button>
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
