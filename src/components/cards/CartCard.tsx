import React, { useState } from "react";

import styles from "./CartCard.module.css";
import { Typography } from "@mui/material";
import { Card } from "@mui/material";
import { Accordion } from "@mui/material";
import { AccordionDetails } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import { Toolbar } from "@mui/material";
import { IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";

import { Dispatch, SetStateAction } from "react";
import { Meal, Person } from "../../App";

interface Props {
  personData: Person;
  setSelectedMeal: Dispatch<SetStateAction<null | Meal>>;
  selectedPerson: null | string;
  setSelectedPerson: Dispatch<SetStateAction<null | string>>;
  clearPersonSelection: (id: string) => void;
}

const CartCard: React.FC<Props> = ({
  personData,
  setSelectedMeal,
  selectedPerson,
  setSelectedPerson,
  clearPersonSelection,
}) => {
  const [expanded, setExpanded] = useState(false);

  function changePersonHandler(id: string): void {
    setSelectedPerson(id);
    setSelectedMeal(null);
  }

  function renderPersonData(): JSX.Element[] {
    return Object.keys(personData).map((i) => (
      <Card
          key={personData[i].id}
          sx={{
            bgcolor: `${personData[i].id === selectedPerson && "primary.main"}`,
          }}
          className={styles.person}
          onClick={() => changePersonHandler(personData[i].id)}
        >
          <p>{personData[i].type}</p>
          <p>{personData[i].meal ? "Selected" : "Not Selected"}</p>
          
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              disabled={!personData[i].meal || selectedPerson !== personData[i].id}
              onClick={() => clearPersonSelection(personData[i].id)}
            >
              <ClearIcon />
            </IconButton>
          </Toolbar>
        </Card>
    ))
  }

  function totalPriceHandler(): number {
    const total = Object.keys(personData).reduce((a,v) => {
      const itemPrice = personData[v].price
      return a + itemPrice
   }, 0)

   return +total.toFixed(2);
  }

  return (
    <div className={styles["card-wrap"]}>
      <Card>
        <Typography variant="h6" component="span">
          <div className={styles.header}>✈️ Select Meal</div>
        </Typography>
        <Accordion expanded={expanded} onClick={() => setExpanded(!expanded)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="addTask"
            sx={{ width: 500 }}
          >
            <div className={styles.summary}>
              <Typography variant="h6" component="span">
                <span>Zagreb - New York</span>
              </Typography>
              <span>Flight duration: 9h 35min</span>
            </div>
          </AccordionSummary>
          <AccordionDetails
            className={styles.details}
            onClick={(e) => e.stopPropagation()}
          >
            {renderPersonData()}
          </AccordionDetails>
        </Accordion>
      </Card>
      <div className={styles.total}>
        <Typography variant="h6" component="span">
          <span>Total price: {totalPriceHandler()} € </span>
        </Typography>
      </div>
    </div>
  );
};

export default CartCard;
