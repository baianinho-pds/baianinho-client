import { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Collapse,
} from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import SidebarItem from "../SidebarItem";
import { ItemWithChildren } from "../../interfaces/sidebar-interface";

type Props = {
  item: ItemWithChildren;
};

const SidebarItemCollapse = ({ item }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    item && (
      <>
        <ListItemButton
          onClick={() => setOpen(!open)}
          sx={{
            "&: hover": {
              backgroundColor: colorConfigs.sidebar.hoverBg,
            },
            paddingY: "12px",
            paddingX: "24px",
          }}
        >
          <ListItemIcon sx={{ color: colorConfigs.sidebar.color }}>
            {item.iconPage}
          </ListItemIcon>
          {item.titlePage}

          <ListItemText
            disableTypography
            primaryTypographyProps={<Typography>{item.titlePage}</Typography>}
          />
          {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
        </ListItemButton>
        <Collapse in={open} timeout="auto">
          <List>
            {item?.children?.map((pagina, index) => (
              <SidebarItem key={index} item={pagina} />
            ))}
          </List>
        </Collapse>
      </>
    )
  );
};

export default SidebarItemCollapse;
