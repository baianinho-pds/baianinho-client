import styles from "./sidebar.module.css";
import { FiHome, FiUser, FiUsers } from "react-icons/fi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdAttachMoney } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <nav className={styles.containerNav}>
      <ul>
        <li>
          <Link to="/">
            <FiHome /> Início
          </Link>
        </li>
        <li>
          <Link to="/users">
            <FiUser /> Usuário
          </Link>
        </li>
        <li>
          <Link to="/">
            <FiUsers /> Clientes
          </Link>
        </li>
        <li>
          <Link to="/">
            <RiMoneyDollarCircleLine /> Financeiro
          </Link>
        </li>
        <li>
          <Link to="/">
            <MdAttachMoney /> Vendas
          </Link>
        </li>
        <li>
          <Link to="/">
            <AiOutlineShoppingCart /> Estoque
          </Link>
        </li>
        <li>
          <Link to="/materia-prima">
            <AiOutlineShoppingCart /> Materia Prima
          </Link>
        </li>
        <li>
          <Link to="/produtos">
            <AiOutlineShoppingCart /> Produtos
          </Link>
        </li>
      </ul>
    </nav>
  );
}
