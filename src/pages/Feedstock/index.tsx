import styles from "./feedstock.module.css";
import { FiEdit2, FiTrash, FiSearch, FiUser } from "react-icons/fi";
import { useState, useCallback, useEffect } from "react";
import FormFeedstock from "./FormFeedstock";
import { FeedStockService } from "../../services/feedstock";
import { toast } from "react-toastify";
import Loading from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";
import { FeedStock } from "../../interfaces/feedstock";

export default function Feedstock() {
  const [isLoadingFeedstock, setIsLoadingFeedstock] = useState(false);
  const [searchFeedstockValue, setSearchFeedstockValue] = useState("");
  const [modalMessageAlertState, setModalMessageAlertState] = useState(false);
  const [isFormMateriaPrimaOpen, setIsFormMateriaPrimaOpen] = useState(false);
  const [isDeleteFeedstockAlertOpen, setIsDeleteFeedstockAlertOpen] =
    useState(false);
  const [feedstockIdToUpdate, setFeedstockIdToUpdate] = useState<number>();
  const [listaMateriaPrima, setListaMateriaPrima] = useState<FeedStock[]>([]);

  let timer: number | undefined;
  const [initialFeedstockList, setInitialFeedstockList] = useState<FeedStock[]>(
    []
  );

  const fetchFeedstock = useCallback(async () => {
    setIsLoadingFeedstock(true);
    try {
      const queryParams = `?itemsPerPage=100&page=1`;

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
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Quantidade</th>
                        <th>Validade</th>
                        <th colSpan={2}>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaMateriaPrima.map((materiaPrima) => (
                        <tr key={materiaPrima.id}>
                          <td>{materiaPrima.name}</td>
                          <td>{materiaPrima.amount || 0}</td>
                          <td style={{ width: "20%" }}>
                            {materiaPrima.validity
                              ? getFormattedDate(
                                  new Date(materiaPrima.validity)
                                )
                              : undefined}
                          </td>
                          <td>
                            <FiEdit2
                              onClick={() => {
                                setIsFormMateriaPrimaOpen(true);
                                setFeedstockIdToUpdate(materiaPrima.id);
                              }}
                            />
                          </td>
                          <td className={styles.btnDelete}>
                            <FiTrash
                              onClick={() => {
                                setFeedstockIdToUpdate(materiaPrima.id);
                                setIsDeleteFeedstockAlertOpen(true);
                              }}
                              color="#ff0000"
                            />
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

        <FormFeedstock
          isOpen={isFormMateriaPrimaOpen || isDeleteFeedstockAlertOpen}
          onRequestClose={(requestFetchData) => {
            setIsFormMateriaPrimaOpen(false);
            setIsDeleteFeedstockAlertOpen(false);
            setFeedstockIdToUpdate(undefined);

            if (requestFetchData) {
              fetchFeedstock();
              setModalMessageAlertState(true);
            }
          }}
          feedStockId={feedstockIdToUpdate}
          action={
            isDeleteFeedstockAlertOpen
              ? "delete"
              : isFormMateriaPrimaOpen
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
