import { useState, Fragment } from "react";


import CartCard from "../cards/CartCard";

import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { List } from "@mui/material";
import { Drawer } from "@mui/material";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";

import { Dispatch, SetStateAction } from "react";
import { Meal, Person } from "../../App";

interface Props {
  personData: Person;
  selectedPerson: null | string;
  setSelectedPerson: Dispatch<SetStateAction<null | string>>;
  setSelectedMeal: Dispatch<SetStateAction<null | Meal>>;
  clearPersonSelection: (id: string) => void;
}

const Header: React.FC<Props> = ({
  personData,
  setSelectedMeal,
  selectedPerson,
  setSelectedPerson,
  clearPersonSelection,
}) => {
  const [menuState, setMenuState] = useState(false);

  function toggleDrawer (state: boolean) {
    setMenuState(state);
  };

  function badgeNumHandler(): number {
    return Object.keys(personData).reduce((a,v) => {
      if (personData[v].meal) {
       return a + 1;
      }
      return a;
    }, 0)
  }

  return (
    <Fragment>
      <AppBar color="primary" position="static">
        <Toolbar className={styles.toolbar}>
          <div className={styles["image-container"]}>
            <img src={logo} alt="logo" />
          </div>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => toggleDrawer(true)}
          >
            <Badge badgeContent={badgeNumHandler()} color="secondary" >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={"right"}
        open={menuState}
        onClose={() => toggleDrawer(false)}
      >
        <List className={styles.list}>
          <CartCard
          personData={personData}
          setSelectedMeal={setSelectedMeal}
          selectedPerson={selectedPerson}
          setSelectedPerson={setSelectedPerson}
          clearPersonSelection={clearPersonSelection}
          />
        </List>
      </Drawer>
    </Fragment>
  );
};

export default Header;
