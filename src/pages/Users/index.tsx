import styles from "./users.module.css";
import { FiEdit2, FiTrash, FiSearch, FiUser } from "react-icons/fi";
import FormUser from "./FormUser";
import { useCallback, useEffect, useState } from "react";
import MessageAlert from "../../components/MessageAlert";
import { FindPageResponse, PersonService } from "../../services/person";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loader";
export default function Users() {
  const [isFormUserOpen, setIsFormUserOpen] = useState(false);
  const [personIdToUpdate, setPersonIdToUpdate] = useState<number>();
  const [isDeleteUserAlertOpen, setIsDeleteUserAlertOpen] = useState(false);
  const [modalMessageAlertState, setModalMessageAlertState] = useState(false);
  const [initialPersonList, setInitialPersonList] = useState<
    FindPageResponse[]
  >([]);
  const [personList, setPersonList] = useState<FindPageResponse[]>([]);
  const [isLoadingPersons, setIsLoadingPersons] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  let timer: number | undefined;

  const fetchPersons = useCallback(async () => {
    setIsLoadingPersons(true);
    try {
      const response = await PersonService.findMany();
      setPersonList(response.data);
      setInitialPersonList(response.data);
    } catch (error) {
      toast.error("Erro ao carregar os dados dos usuários", {
        theme: "colored",
      });
    } finally {
      setIsLoadingPersons(false);
    }
  }, [PersonService]);

  const searchPerson = useCallback((term: string) => {
    setSearchValue(term);
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (term.length) {
        const personListFiltered = initialPersonList.filter((person) =>
          person.name.toLowerCase().includes(term.toLowerCase())
        );
        setPersonList(personListFiltered);
      } else {
        setSearchValue("");
        setPersonList(initialPersonList);
      }
    }, 500);
  }, []);

  useEffect(() => {
    fetchPersons();
  }, [fetchPersons]);

  return (
    <>
      <main>
        <ToastContainer />
        <header className="header-page">Usuários</header>
        {isLoadingPersons ? (
          <Loading />
        ) : (
          <div className={styles.containerTable}>
            <div className={styles.actions}>
              <form action="" className={styles.search}>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => searchPerson(e.target.value)}
                  placeholder="Pesquisar"
                />
                <FiSearch size={20} />
              </form>

              <button
                className={styles.actionButton}
                onClick={() => setIsFormUserOpen(true)}
              >
                Cadastrar
                <FiUser size={20} />
              </button>
            </div>
            <table className={styles.table}>
              <tbody>
                {personList?.map((person) => (
                  <tr key={person.id}>
                    <td>{person.name}</td>
                    <td>
                      ({person.contactPhone.substring(0, 2)})
                      {" " + person.contactPhone.substring(2, 7)}-
                      {person.contactPhone.substring(7, 11)}
                    </td>
                    <td>
                      <FiEdit2
                        onClick={() => {
                          setIsFormUserOpen(true);
                          setPersonIdToUpdate(person.id);
                        }}
                      />
                    </td>
                    <td>
                      <FiTrash
                        color="#ff0000"
                        onClick={() => {
                          setPersonIdToUpdate(person.id);
                          setIsDeleteUserAlertOpen(true);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <FormUser
          isOpen={isDeleteUserAlertOpen || isFormUserOpen}
          onRequestClose={(requestFetchData) => {
            setIsFormUserOpen(false);
            setIsDeleteUserAlertOpen(false);
            setPersonIdToUpdate(undefined);
            if (requestFetchData) {
              fetchPersons();
              setModalMessageAlertState(true);
            }
          }}
          personId={personIdToUpdate}
          action={
            isDeleteUserAlertOpen
              ? "delete"
              : isFormUserOpen
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
