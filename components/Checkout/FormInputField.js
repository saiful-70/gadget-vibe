import { TextField, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useFormik } from "formik";

const FormInputField = ({ name, label }) => {
  const { control } = useForm();
  // const formik = useFormik();
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        as={TextField}
        name={name}
        control={control}
        fullWidth
        required
        defaultValue=""
        render={({ field: { ref, ...field }, fieldState }) => (
          <TextField
            {...field}
            inputRef={ref}
            label={label}
            variant="standard"
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : null}
          />
        )}
        rules={{ required: "Field required" }}
      />
    </Grid>
  );
};

export default FormInputField;
