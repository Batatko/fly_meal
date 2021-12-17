import { useState } from "react";

import beer from "../../assets/drinks/beer.png";
import vine from "../../assets/drinks/vine.png";
import juice from "../../assets/drinks/juice.png";

import styles from "./MealCard.module.css";
import { Typography } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardHeader } from "@mui/material";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";

import { Dispatch, SetStateAction } from "react";
import { Meal } from "../../App";

interface Props {
  id: string;
  title: string;
  starter: string;
  desert: string;
  price: number;
  img: string;
  drinks: Drink[];
  selectedMeal: Meal | null;
  setSelectedMeal: Dispatch<SetStateAction<Meal | null>>;
  selectedPerson: string | null;
  handleClick: () => void;
}

interface Drink {
  id: string;
  title: string;
  price: number;
}

const MealCard: React.FC<Props> = ({
  id,
  title,
  starter,
  desert,
  price,
  img,
  drinks,
  selectedMeal,
  setSelectedMeal,
  selectedPerson,
  handleClick
}) => {
  const [selectedDrink, setSelectedDrink] = useState<null | Drink>(null);

  function mealPriceHandler(): number {
    if (selectedDrink) {
      return +(price + selectedDrink.price).toFixed(2);
    }
    return +price.toFixed(2);
  }

  function selectMealHandler(): void {
    if (!selectedPerson) {
      handleClick();
      return;
    }

    if (selectedMeal?.id !== id) {
      setSelectedMeal({
        id: id,
        price: mealPriceHandler(),
        isSelected: true,
      });
    } else {
      setSelectedMeal(null);
    }
  }

  function drinkClickHandler(i: number): void {
    setSelectedMeal(null);
    if (selectedDrink?.id !== drinks[i].id) {
      setSelectedDrink({
        id: drinks[i].id,
        title: drinks[i].title,
        price: drinks[i].price,
      });
    } else {
      setSelectedDrink(null);
    }
  }

  return (
    <Card sx={{ width: 800 }} className={styles.card}>
      <section className={styles.image}>
        <div className={styles["image-container"]}>
          <div style={{background: `url(${img})`}}/>
        </div>
      </section>
      <section className={styles.info}>
        <Typography variant="h5" component="div">
          <CardHeader title={`${title}`} />
        </Typography>
        <CardContent className={styles.content}>
          <div>
            <Typography variant="h6" component="div">
              <div>Starter:</div>
            </Typography>
            <div>{starter}</div>
          </div>
          <div>
            <Typography variant="h6" component="div">
              <div>Desert:</div>
            </Typography>
            <div>{desert}</div>
          </div>
          <div>
            <Typography variant="h6" component="div">
              <div>Drink:</div>
            </Typography>
            <div>{selectedDrink?.title}</div>
          </div>
        </CardContent>
        <CardActions className={styles.actions}>
          <Stack
            className={styles["drinks-container"]}
            direction="row"
            spacing={1}
          >
            <Card
              sx={{
                bgcolor: `${selectedDrink?.id === "drink-1" && "primary.main"}`,
              }}
              className={styles.drink}
              onClick={() => drinkClickHandler(0)}
            >
              <img src={vine} alt="vine" />
            </Card>
            <Card
              sx={{
                bgcolor: `${selectedDrink?.id === "drink-2" && "primary.main"}`,
              }}
              className={styles.drink}
              onClick={() => drinkClickHandler(1)}
            >
              <img src={juice} alt="juice" />
            </Card>
            <Card
              sx={{
                bgcolor: `${selectedDrink?.id === "drink-3" && "primary.main"}`,
              }}
              className={styles.drink}
              onClick={() => drinkClickHandler(2)}
            >
              <img src={beer} alt="beer" />
            </Card>
          </Stack>

          <div className={styles["button-wrap"]}>
            <div className={styles["price-container"]}>
              <Typography variant="h6" component="p">
                <p>
                  {selectedDrink?.price
                    ? (selectedDrink.price + price).toFixed(2)
                    : price.toFixed(2)}
                  {" €"}
                </p>
              </Typography>
            </div>
            <Button
              onClick={selectMealHandler}
              sx={{
                width: 100,
                height: 50,
                bgcolor: `${
                  selectedMeal?.id === id ? "primary.main" : "secondary.main"
                }`,
              }}
              variant="contained"
            >
              Select
            </Button>
          </div>
        </CardActions>
      </section>
    </Card>
  );
};

export default MealCard;
