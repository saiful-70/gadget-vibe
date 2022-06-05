import Link from "next/link";
import { Stack, Divider, Typography, Grid, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAppContext } from "../../context/state";

const FetchingCategories = () => {
  return (
    <Stack direction="row" spacing={2}>
      {[1, 2, 3, 4, 5, 6, 7].map((item) => (
        <LoadingButton
          loading
          variant="outlined"
          key={item}
          color="secondary"
          // sx={{ color: "secondary.main" }}
        >
          Fetch data
        </LoadingButton>
      ))}
    </Stack>
  );
};

const NavStack = () => {
  const { categories } = useAppContext();

  return (
    <>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        {categories.length > 0 ? (
          categories.map((category) => (
            <Grid key={category.id} item sx={{}}>
              <Link href={`/category/${category.name}`}>
                <Button size="lg" color="secondary" sx={{ fontWeight: 700 }}>
                  {category.name}
                  <Typography variant="subtitle1">&nbsp; &#187;</Typography>
                </Button>
              </Link>
            </Grid>
          ))
        ) : (
          <FetchingCategories />
        )}
      </Stack>
    </>
  );
};

export default NavStack;
