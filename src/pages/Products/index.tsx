import styles from "./produtos.module.css";
import { FiEdit2, FiTrash, FiSearch, FiUser } from "react-icons/fi";
import { useCallback, useEffect, useState } from "react";
import Loading from "../../components/Loader";
import { FindPageResponse, ProductService } from "../../services/product";
import { toast } from "react-toastify";
import MessageAlert from "../../components/MessageAlert";
import FormProdutos from "./FormProdutos";
import { Product } from "../../interfaces/product";

export default function Products() {
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isFormProductOpen, setIsFormProductOpen] = useState(false);
  const [productIdToUpdate, setProductIdToUpdate] = useState<number>();
  const [isDeleteProductAlertOpen, setIsDeleteProductAlertOpen] =
    useState(false);
  const [modalMessageAlertState, setModalMessageAlertState] = useState(false);
  const [initialProductList, setInitialProductList] = useState<
    Product[]
  >([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState("");

  let timer: number | undefined;

  const getFormattedDate = (date: string | Date | undefined) => {
    if (date) {
      return new Date(date)
        .toISOString()
        ?.split("T")[0]
        .split("-")
        .reverse()
        .join("/");
    }
  };

  const fetchProducts = useCallback(async () => {
    setIsLoadingProducts(true);
    try {
      const queryParams = `?itemsPerPage=100&page=1`;
      const response = await ProductService.findMany(queryParams);
      setProductList(response.data);
      setInitialProductList(response.data);
    } catch (error) {
      toast.error("Erro ao carregar os dados dos produtos", {
        theme: "colored",
      });
    } finally {
      setIsLoadingProducts(false);
    }
  }, [ProductService]);

  const searchProduct = useCallback((term: string) => {
    setSearchValue(term);
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (term.length) {
        const productListFiltered = initialProductList.filter((person) =>
          person.name.toLowerCase().includes(term.toLowerCase())
        );
        setProductList(productListFiltered);
      } else {
        setSearchValue("");
        setProductList(initialProductList);
      }
    }, 500);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <>
      <main>
        {!isFormProductOpen && (
          <>
            <header className="header-page">Produtos</header>
            {isLoadingProducts ? (
              <Loading />
            ) : (
              <div className={styles.containerTable}>
                <div className={styles.actions}>
                  <form action="" className={styles.search}>
                    <input type="text" value={""} placeholder="Pesquisar" />
                    <FiSearch size={20} />
                  </form>

                  <button
                    className={styles.actionButton}
                    onClick={() => setIsFormProductOpen(true)}
                  >
                    Cadastrar
                    <FiUser size={20} />
                  </button>
                </div>

                <div>
                  <table className={styles.table}>
                    <tbody>
                      {productList.map(product => (
                        <tr key={product.id}>
                          <td>{product.batchCode}</td>
                          <td>{product.name}</td>
                          <td>{product.grammage}g</td>
                          <td>{product.expirationDate ? getFormattedDate(new Date(product.expirationDate)) : undefined}</td>
                          <td>
                            <FiEdit2
                              onClick={() => {
                                setIsFormProductOpen(true)
                                setProductIdToUpdate(product.id)
                              }}
                            ></FiEdit2>
                          </td>
                          <td>
                            <FiTrash color="#ff0000" 
                              onClick={() => {
                                setProductIdToUpdate(product.id)
                                setIsDeleteProductAlertOpen(true)
                              }}
                            ></FiTrash>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        <FormProdutos
          isOpen={isDeleteProductAlertOpen || isFormProductOpen}
          onRequestClose={(requestFetchData) => {
            setIsFormProductOpen(false);
            setIsDeleteProductAlertOpen(false);
            setProductIdToUpdate(undefined);
            if (requestFetchData) {
              fetchProducts();
              setModalMessageAlertState(true);
            }
          }}
          productId={productIdToUpdate}
          action={
            isDeleteProductAlertOpen
              ? "delete"
              : isFormProductOpen
              ? "form"
              : undefined
          }
        />
        <MessageAlert
          isOpen={modalMessageAlertState}
          onRequestClose={() => setModalMessageAlertState(false)}
        />
      </main>
    </>
  );
}
