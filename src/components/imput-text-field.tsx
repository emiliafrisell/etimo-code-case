import { TextField, useTheme } from "@mui/material";

interface IInputTextField {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputTextField = (props: IInputTextField) => {
  const { label, value, onChange } = props;

  const theme = useTheme();
  return (
    <TextField
      size="small"
      label={label}
      type="input"
      value={value}
      onChange={onChange}
      sx={{ m: 0.5, backgroundColor: theme.palette.background.paper }}
    />
  );
};

export default InputTextField;
