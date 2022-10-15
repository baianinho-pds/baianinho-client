import { BsGraphUp } from "react-icons/bs";
import { TbChartInfographic } from "react-icons/tb";
import Card from "../../components/Card";
import styles from "./home.module.css";
export default function Home() {
  return (
    <main>
      <header className="header-page">Início - Painel Administrativo</header>
      <div className={styles.containerContent}>
        <Card
          title="Venda do dia"
          date="04/07/2022"
          icon={<BsGraphUp size={180} color="#315d9f" />}
          quantity={350}
        />
        <Card
          title="Venda do mês"
          date="Julho"
          icon={<TbChartInfographic size={180} color="#315d9f" />}
          quantity={800}
        />
      </div>
    </main>
  );
}
