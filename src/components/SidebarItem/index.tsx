import { ListItemButton, ListItemIcon } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import { Link } from "react-router-dom";
import { ItemWithChildren } from "../../interfaces/sidebar-interface";
import sizeConfigs from "../../configs/sizeConfigs";

type Props = {
  item: ItemWithChildren;
};

const SidebarItem = ({ item }: Props) => {
  return (
    <ListItemButton
      component={Link}
      to={item.linkPage}
      sx={{
        "&: hover": {
          backgroundColor: colorConfigs.sidebar.hoverBg,
        },
        paddingY: sizeConfigs.sizebar.paddingY,
        paddingX: sizeConfigs.sizebar.paddingX,
      }}
    >
      <ListItemIcon sx={{ color: colorConfigs.sidebar.color }}>
        {item.iconPage}
      </ListItemIcon>
      {item.titlePage}
    </ListItemButton>
  );
};

export default SidebarItem;
