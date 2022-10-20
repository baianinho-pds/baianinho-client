import { useState } from "react";
import styles from "./formUser.module.css";
import { GrClose } from "react-icons/gr";

interface FormUserProps {
  isOpen: boolean;
  onRequestClose: () => void;
  action: "edit" | "delete";
}
export default function FormUser({
  isOpen,
  onRequestClose,
  action,
}: FormUserProps) {
  // Usar state ou alguma lib...
  const [name, setName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [ctps, setCpts] = useState("");
  const [password, setPassword] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [demissionDate, setDemissionDate] = useState("");
  const [role, setRole] = useState("seller");
  const [localWork, setLocalWork] = useState("");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [number, setNumber] = useState(0);

  const handlerSubmitFormUser = () => {
    const payload = {
      name,
      contactPhone,
      ctps,
      password,
      admissionDate,
      demissionDate,
      role,
      localWork,
      street,
      neighborhood,
      city,
      postalCode,
      number,
    };

    console.log(payload);

    onRequestClose();
  };
  return (
    <>
      {isOpen && (
        <div className={styles.containerCardUser}>
          <div className={styles.cardHeader}>
            <h2>Dados do Usuário</h2>
            <GrClose onClick={() => onRequestClose()} />
          </div>
          {action === "edit" ? (
            <>
              <form>
                <div className={styles.containerInput}>
                  <label htmlFor="name">Nome completo*</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Digite o seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="contactPhone">Telefone do colaborador*</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    id="contactPhone"
                    placeholder="Digite o seu telefone"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                  />
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="cpts">Número da carteira de trabalho*</label>
                  <input
                    type="text"
                    name="cpts"
                    id="cpts"
                    placeholder="Digite o número da sua carteira de trabalho"
                    value={ctps}
                    onChange={(e) => setCpts(e.target.value)}
                  />
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="password">Senha de acesso ao painel*</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Digite a sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="admissionDate">Data de admissão*</label>
                  <input
                    type="date"
                    name="admissionDate"
                    id="admissionDate"
                    placeholder="Digite a data de admissão"
                    value={admissionDate}
                    onChange={(e) => setAdmissionDate(e.target.value)}
                  />
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="demissionDate">Data de desligamento</label>
                  <input
                    type="date"
                    name="demissionDate"
                    id="demissionDate"
                    placeholder="Digite a data de desligamento"
                    value={demissionDate}
                    onChange={(e) => setDemissionDate(e.target.value)}
                  />
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="role">Cargo atual*</label>
                  <select
                    name="role"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Digite a data de desligamento</option>
                    <option value="admin">Administrador(a)</option>
                    <option value="seller">Vendedor(a)</option>
                  </select>
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="localwork">Local/Região de trabalho*</label>
                  <input
                    type="text"
                    name="localwork"
                    id="localwork"
                    placeholder="Local/Região de trabalho"
                    value={localWork}
                    onChange={(e) => setLocalWork(e.target.value)}
                  />
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="street">Rua*</label>
                  <input
                    type="number"
                    name="street"
                    id="street"
                    placeholder="Rua"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="neighborhood">Vizinhança*</label>
                  <input
                    type="text"
                    name="neighborhood"
                    id="neighborhood"
                    placeholder="Vizinhança"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                  />
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="city">Cidade*</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Cidade"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="number">Número*</label>
                  <input
                    type="number"
                    name="number"
                    id="number"
                    placeholder="Número"
                    value={number}
                    onChange={(e) => setNumber(Number(e.target.value))}
                  />
                </div>
                <div className={styles.containerInput}>
                  <label htmlFor="postalCode">CEP*</label>
                  <input
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    placeholder="Digite o CEP"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              </form>
              <div className={styles.cardFooter}>
                <button onClick={() => handlerSubmitFormUser()}>Salvar</button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.containerUserInfo}>
                <div className={styles.userInfoCard}>
                  <div className={styles.UserInfo}>
                    <b>Nome Completo: </b>
                    <span>Robin Scherbatsky</span>
                  </div>

                  <div className={styles.UserInfo}>
                    <b>Data de Admissão: </b>
                    <span>20/10/2022</span>
                  </div>

                  <div className={styles.UserInfo}>
                    <b>Cargo Atual: </b>
                    <span>Vendedora</span>
                  </div>

                  <div className={styles.UserInfo}>
                    <b>Contato: </b>
                    <span>(77) 9999-9999</span>
                  </div>
                </div>
              </div>
              <p className={styles.messageAlert}>
                Você tem certeza que deseja excluir o cadastro do cliente acima?
              </p>
              <div className={styles.cardFooterUserDelete}>
                <button
                  onClick={() => handlerSubmitFormUser()}
                  className={styles.btnDelete}
                >
                  Sim Excluir
                </button>
                <button
                  onClick={() => handlerSubmitFormUser()}
                  className={styles.btnCancel}
                >
                  Cancelar
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
