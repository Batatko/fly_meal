import { Fragment } from "react";

import MealCard from "./cards/MealCard";
import { Stack } from "@mui/material";

import { Dispatch, SetStateAction } from "react";
import { Data, Meal } from "../App";

interface Props {
  mealsData: Data[];
  filter: string | null;
  selectedPerson: null | string;
  selectedMeal: Meal | null;
  setSelectedMeal: Dispatch<SetStateAction<Meal | null>>;
  handleClick: () => void;
}

const MealList: React.FC<Props> = ({
  mealsData,
  filter,
  selectedMeal,
  setSelectedMeal,
  selectedPerson,
  handleClick,
}) => {

  return (
    <Fragment>
      <Stack direction="column" spacing={3}>
        {filter === "all" &&
          mealsData.map((item) => (
            <MealCard
              key={item.id}
              id={item.id}
              title={item.title}
              starter={item.starter}
              desert={item.desert}
              price={item.price}
              img={item.img}
              drinks={item.drinks}
              selectedMeal={selectedMeal}
              setSelectedMeal={setSelectedMeal}
              selectedPerson={selectedPerson}
              handleClick={handleClick}
            />
          ))}
        {filter &&
          mealsData
            .filter((item) => item.labels.includes(filter))
            .map((item) => (
              <MealCard
                key={item.id}
                id={item.id}
                title={item.title}
                starter={item.starter}
                desert={item.desert}
                price={item.price}
                img={item.img}
                drinks={item.drinks}
                selectedMeal={selectedMeal}
                setSelectedMeal={setSelectedMeal}
                selectedPerson={selectedPerson}
                handleClick={handleClick}
              />
            ))}
      </Stack>
    </Fragment>
  );
};

export default MealList;
