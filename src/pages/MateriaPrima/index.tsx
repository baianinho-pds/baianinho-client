import styles from "./materiaPrima.module.css";
import { FiEdit2, FiTrash, FiSearch, FiUser } from "react-icons/fi";
import { useState, useCallback, useEffect } from "react";
import FormMateriaPrima from "../../components/FormMateriaPrima";
import { FeedStock, FeedStockService } from "../../services/feedstock";
import { toast } from "react-toastify";
import Loading from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";

export default function MateriaPrima() {
  const [isLoadingFeedstock, setIsLoadingFeedstock] = useState(false);
  const [searchFeedstockValue, setSearchFeedstockValue] = useState("");
  const [modalMessageAlertState, setModalMessageAlertState] = useState(false);
  const [isFormMateriaPrimaOpen, setIsFormMateriaPrimaOpen] = useState(false);
  const [isDeleteMateriaPrimaAlertOpen, setIsDeleteMateriaPrimaAlertOpen] =
    useState(false);
  const [listaMateriaPrima, setListaMateriaPrima] = useState<FeedStock[]>([]);
  const [materiaPrimaSelecionada, setMateriaPrimaSelecionada] = useState<
    Omit<FeedStock, "id">
  >({
    provider: "",
    name: "",
    unit: "",
    validity: "",
    supplies_type: "",
  });
  let timer: number | undefined;
  const [initialFeedstockList, setInitialFeedstockList] = useState<FeedStock[]>(
    []
  );

  function selecionarMateriaPrima(
    materiaPrima: FeedStock,
    action: "deletar" | "editar"
  ) {
    if (action === "deletar") {
      setIsDeleteMateriaPrimaAlertOpen(true);
      setMateriaPrimaSelecionada(materiaPrima);
    }
  }

  const fetchFeedstock = useCallback(async () => {
    setIsLoadingFeedstock(true);
    try {
      const queryParams = `?itemsPerPage=10&page=1`;

      const response = await FeedStockService.findMany(queryParams);
      setListaMateriaPrima(response.data);
      setInitialFeedstockList(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar os dados dos usuários", {
        theme: "colored",
      });
    } finally {
      setIsLoadingFeedstock(false);
    }
  }, [FeedStockService]);

  const searchFeedstock = (term: string) => {
    setSearchFeedstockValue(term);
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (term.length) {
        const feedstockListFiltered = initialFeedstockList.filter((feedstock) =>
          feedstock.name.toLowerCase().includes(term.toLowerCase())
        );

        setListaMateriaPrima(feedstockListFiltered);
      } else {
        setSearchFeedstockValue("");
        setListaMateriaPrima(initialFeedstockList);
      }
    }, 500);
  };

  useEffect(() => {
    fetchFeedstock();
  }, [fetchFeedstock]);

  return (
    <>
      <main>
        {!isFormMateriaPrimaOpen && (
          <>
            <header className="header-page">Matéria-Prima</header>
            {isLoadingFeedstock ? (
              <Loading />
            ) : (
              <div className={styles.containerTable}>
                <div className={styles.actions}>
                  <form action="" className={styles.search}>
                    <input
                      type="text"
                      value={searchFeedstockValue}
                      placeholder="Pesquisar"
                      onChange={(e) => searchFeedstock(e.target.value)}
                    />
                    <FiSearch size={20} />
                  </form>

                  <button
                    className={styles.actionButton}
                    onClick={() => setIsFormMateriaPrimaOpen(true)}
                  >
                    Cadastrar
                    <FiUser size={20} />
                  </button>
                </div>

                <div>
                  <table className={styles.table}>
                    <tbody>
                      {listaMateriaPrima.map((materiaPrima) => (
                        <tr key={materiaPrima.id}>
                          <td>ID {materiaPrima.id}</td>
                          <td>{materiaPrima.name}</td>
                          <td>{materiaPrima.validity}</td>
                          <td>
                            <FiEdit2></FiEdit2>
                          </td>
                          <td>
                            <FiTrash
                              onClick={() =>
                                selecionarMateriaPrima(materiaPrima, "deletar")
                              }
                              color="#ff0000"
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

        <FormMateriaPrima
          onRequestClose={(requestFetchData) => {
            setIsFormMateriaPrimaOpen(false);
            if (requestFetchData) {
              fetchFeedstock();
              setModalMessageAlertState(true)
            }
          }}
          isOpen={isFormMateriaPrimaOpen || isDeleteMateriaPrimaAlertOpen}
          action={
            isDeleteMateriaPrimaAlertOpen
              ? "delete"
              : isFormMateriaPrimaOpen
              ? "form"
              : undefined
          }
          feedStockProp={materiaPrimaSelecionada}
        />

        <MessageAlert
          isOpen={modalMessageAlertState}
          onRequestClose={() => setModalMessageAlertState(false)}
        />
      </main>
    </>
  );
}
