import styles from "./materiaPrima.module.css";

export default function MateriaPrima() {
  return (
    <>
      <main>
        <header className="header-page">Matéria-Prima</header>
        
        <div className={styles.containerTable}>
          <div className={styles.actions}>
            <form action="" className={styles.search}>
              <input
                type="text"
                value={''}
                placeholder="Pesquisar"
              />
            </form>

            <button className={styles.actionButton}>
              Cadastrar
            </button>
          </div>
        </div>
      </main>
    </>
  )
}