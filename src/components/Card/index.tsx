import { BsGraphUp } from "react-icons/bs";
import styles from "./card.module.css";

interface CardProps {
  title: string;
  date: string;
  icon: React.ReactNode;
  quantity: number;
}

export default function Card(props: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h4>{props.title}</h4>
        <small>{props.date}</small>
      </div>
      <div className={styles.cardContent}>{props.icon}</div>
      <div className={styles.cardFooter}>{props.quantity} unidades</div>
    </div>
  );
}
