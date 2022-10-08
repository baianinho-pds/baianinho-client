import logoBaianinho from "../../assets/logo-baianinho.png";
import { FiMenu, FiUser, FiSettings } from "react-icons/fi";
import styles from "./header.module.css";
export default function Header() {
  return (
    <header className={styles.header}>
      <img src={logoBaianinho} alt="logo baianinho" />
      <FiMenu size={40} />
      <div className={styles.actions}>
        <FiUser />
        <FiSettings />
      </div>
    </header>
  );
}
