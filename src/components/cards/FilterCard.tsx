import { useEffect } from "react";

import styles from "./FilterCard.module.css";
import Chip from "@mui/material/Chip";
import { Typography } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardHeader } from "@mui/material";
import { Stack } from "@mui/material";

import { Dispatch, SetStateAction } from "react";

interface Filters {
  id: string;
  label: string;
}

interface Props {
  mealsLabels: Filters[];
  selectedChip: string;
  setSelectedChip: Dispatch<SetStateAction<string>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  filteringDataHandler: () => void;
}

const FilterCard: React.FC<Props> = ({
  mealsLabels,
  selectedChip,
  setSelectedChip,
  setCurrentPage,
  filteringDataHandler
}) => {



  useEffect(() => {
    filteringDataHandler();
    setCurrentPage(1);
  }, [selectedChip])

  return (
    <div className={styles["card-wrap"]}>
      <Card sx={{ width: 800 }}>
        <Typography variant="h5" component="div">
          <CardHeader title="Select food type" disableTypography={true} />
        </Typography>
        <CardContent className={styles.content}>
          <Typography variant="h5" component="div">
            <Stack direction="row" spacing={2}>
              <Chip
                onClick={() => setSelectedChip("all")}
                label="All"
                clickable={true}
                color={`${selectedChip === "all" ? "primary" : "default"}`}
                variant={`${selectedChip === "all" ? "filled" : "outlined"}`}
              />
              {mealsLabels.map((item) => (
                <Chip
                  onClick={() => setSelectedChip(item.id)}
                  key={item.id}
                  label={item.label}
                  clickable={true}
                  color={`${selectedChip === item.id ? "primary" : "default"}`}
                  variant={`${
                    selectedChip === item.id ? "filled" : "outlined"
                  }`}
                />
              ))}
            </Stack>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterCard;
