import { useState, Fragment, useEffect } from "react";

import styles from "./App.module.css";
import Header from "./components/layout/Header";
import Feed from "./components/layout/Feed";
import FilterCard from "./components/cards/FilterCard";
import MealList from "./components/MealList";
import { CircularProgress } from "@mui/material";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import { Pagination } from "@mui/material";

import { useQuery } from "react-query";
import getMealData from "./helper/getMealData";

export interface Data {
  id: string;
  title: string;
  starter: string;
  desert: string;
  price: number;
  labels: string[];
  img: string;
  drinks: Drink[];
}

export interface Drink {
  id: string;
  title: string;
  price: number;
}

export interface Meal {
  id: string;
  price: number;
  isSelected: boolean;
}

export interface Person {
  [key: string]: { id: string; type: string; meal: Meal | null; price: number };
}

function App() {
  const { isLoading, data } = useQuery("meals", getMealData);
  const [selectedChip, setSelectedChip] = useState<string>("all");
  const [selectedMeal, setSelectedMeal] = useState<null | Meal>(null);
  const [selectedPerson, setSelectedPerson] = useState<null | string>(null);
  const [personData, setPersonData] = useState<Person>({
    "0": {
      id: "0",
      type: "Adult Passenger 1",
      meal: null,
      price: 0,
    },
    "1": {
      id: "1",
      type: "Adult Passenger 2",
      meal: null,
      price: 0,
    },
    "2": {
      id: "2",
      type: "Junior Passenger 1",
      meal: null,
      price: 0,
    },
    "3": {
      id: "3",
      type: "Junior Passenger 2",
      meal: null,
      price: 0,
    },
  });
  const [openSnack, setOpenSnack] = useState(false);

  const MAX_POSTS = 3;
  const [maxPage, setMaxPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const indexOfLastPost = currentPage * MAX_POSTS;
  const indexOfFirstPost = indexOfLastPost - MAX_POSTS;
  const [paginatedData, setPaginatedData] = useState<Data[]>([]);

  function pageHandler(event: React.ChangeEvent<unknown>, value: number): void {
    if (value < currentPage) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setCurrentPage(currentPage - 1);
    } else if (value > currentPage) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setCurrentPage(currentPage + 1);
    }
  }

  function filteringDataHandler(): void {
    if (selectedChip !== "all") {
      let newData: Data[] = data.meals.filter((item: Data) => {
        return item.labels.includes(selectedChip)
      });
      setPaginatedData(newData);
      setMaxPage(Math.ceil(newData.length / MAX_POSTS));
    } else {
      setPaginatedData(data.meals);
      setMaxPage(Math.ceil(data.meals.length / MAX_POSTS));
    }
  }

  function handleClick(): void {
    setOpenSnack(true);
  }

  function handleClose(
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): void {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  }

  function selectPersonMealHandler(): void {
    if (selectedPerson) {
      setPersonData((prevState) => ({
        ...prevState,
        [selectedPerson]: {
          ...prevState[selectedPerson],
          meal: selectedMeal,
          price: selectedMeal ? selectedMeal.price : 0,
        },
      }));
    }
  }

  function clearPersonSelection(id: string): void {
    if (selectedPerson === id) {
      setPersonData((prevState) => ({
        ...prevState,
        [selectedPerson]: {
          ...prevState[selectedPerson],
          meal: null,
          price: 0,
        },
      }));
    }
  }

  useEffect(() => {
    if (selectedMeal) {
      selectPersonMealHandler();
    }
  }, [selectedMeal]);

  return (
    <Fragment>
      <Header
        personData={personData}
        setSelectedMeal={setSelectedMeal}
        setSelectedPerson={setSelectedPerson}
        selectedPerson={selectedPerson}
        clearPersonSelection={clearPersonSelection}
      />
      <Feed>
        {isLoading ? (
          <div className={styles.loading}>
            <CircularProgress />
          </div>
        ) : (
          <Fragment>
            <FilterCard
              mealsLabels={data.labels}
              setSelectedChip={setSelectedChip}
              selectedChip={selectedChip}
              setCurrentPage={setCurrentPage}
              filteringDataHandler={filteringDataHandler}
            />
            <MealList
              mealsData={paginatedData.slice(indexOfFirstPost, indexOfLastPost)}
              filter={selectedChip}
              selectedPerson={selectedPerson}
              selectedMeal={selectedMeal}
              setSelectedMeal={setSelectedMeal}
              handleClick={handleClick}
            />
          </Fragment>
        )}

        <Snackbar
          open={openSnack}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="info"
            sx={{ width: "100%", bgcolor: "primary.light" }}
          >
            Select Cart Passenger!
          </Alert>
        </Snackbar>
        <div className={styles.pagination}>
          <Pagination
            count={maxPage}
            page={currentPage}
            onChange={pageHandler}
            color="primary"
          />
        </div>
      </Feed>
    </Fragment>
  );
}

export default App;
