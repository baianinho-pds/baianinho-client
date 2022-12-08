import { Drawer, List } from "@mui/material";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiHome, FiUser, FiUsers } from "react-icons/fi";
import { GiWheat, GiFlour } from "react-icons/gi";
import { MdAttachMoney } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import { ItemWithChildren } from "../../interfaces/sidebar-interface";
import SidebarItem from "../SidebarItem";
import SidebarItemCollapse from "../SidebarItemCollapse";

const SidebarMaterialUi = () => {
  const paginas: ItemWithChildren[] = [
    {
      iconPage: <FiHome />,
      titlePage: "Início",
      linkPage: "/",
    },
    {
      iconPage: <FiUser />,
      titlePage: "Usuários",
      linkPage: "users",
    },
    // {
    //   iconPage: <FiUsers />,
    //   titlePage: "Clientes",
    //   linkPage: "",
    // },
    // {
    //   iconPage: <RiMoneyDollarCircleLine />,
    //   titlePage: "Financeiro",
    //   linkPage: "",
    // },
    // {
    //   iconPage: <MdAttachMoney />,
    //   titlePage: "Vendas",
    //   linkPage: "",
    // },
    {
      iconPage: <AiOutlineShoppingCart />,
      titlePage: "Estoque",
      linkPage: "",
      children: [
        {
          iconPage: <GiWheat />,
          titlePage: "Matéria-Prima",
          linkPage: "materia-prima",
        },
        {
          iconPage: <GiFlour />,
          titlePage: "Produtos",
          linkPage: "produtos",
        },
      ],
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sizeConfigs.sizebar.width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sizeConfigs.sizebar.width,
          boxSizing: "border-box",
          backgroundColor: colorConfigs.sidebar.bg,
          color: colorConfigs.sidebar.color,
          fontSize: sizeConfigs.sizebar.fontSize,
          marginTop: sizeConfigs.sizebar.marginTop,
        },
      }}
    >
      <List disablePadding>
        {paginas.map((pagina, index) =>
          pagina?.children ? (
            <SidebarItemCollapse key={index} item={pagina} />
          ) : (
            <SidebarItem key={index} item={pagina} />
          )
        )}
      </List>
    </Drawer>
  );
};

export default SidebarMaterialUi;
