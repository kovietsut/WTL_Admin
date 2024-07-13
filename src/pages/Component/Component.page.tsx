import Iconify from '@/components/atoms/Iconify';
import {
  Badge,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import useStyle from './Component.styles';

const ComponentPage = (): JSX.Element => {
  const styles = useStyle();
  const [age, setAge] = useState('');
  const [toggleValue, setToggleValue] = useState('web');

  const handleChangeToggle = (_: React.MouseEvent<HTMLElement>, newValue: string) => {
    setToggleValue(newValue);
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <Stack sx={styles.wrap}>
      <Card variant="outlined" component={Stack} p={3} spacing={1}>
        <Typography variant="h1">h1. Heading</Typography>
        <Typography variant="h2">h2. Heading</Typography>
        <Typography variant="h3">h3. Heading</Typography>
        <Typography variant="h4">h4. Heading</Typography>
        <Typography variant="h5">h5. Heading</Typography>
        <Typography variant="h6">h6. Heading</Typography>
        <Typography variant="subtitle1">
          subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
          tenetur
        </Typography>
        <Typography variant="subtitle2">
          subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
          tenetur
        </Typography>
        <Typography variant="body1">
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        </Typography>
        <Typography variant="body2">
          body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        </Typography>
        <Typography variant="button">
          button. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        </Typography>
        <Typography variant="caption">
          caption. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        </Typography>
        <Typography variant="overline">
          overline. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
          tenetur
        </Typography>
      </Card>
      <Card variant="outlined" component={Stack} spacing={2} p={3}>
        <ToggleButtonGroup
          color="primary"
          value={toggleValue}
          exclusive
          onChange={handleChangeToggle}
        >
          <ToggleButton value="web">Web</ToggleButton>
          <ToggleButton value="android">Android</ToggleButton>
          <ToggleButton value="ios">iOS</ToggleButton>
        </ToggleButtonGroup>
        <div>
          <Badge badgeContent={4} color="error">
            <Iconify icon="mdi:bell" sx={{ color: 'common.black', width: 20, height: 20 }} />
          </Badge>
        </div>
        <Stack direction="row">
          <FormGroup sx={{ flexGrow: 1 }}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
            <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Label" />
            <FormControlLabel control={<Checkbox />} label="Label" />
            <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
          </FormGroup>
          <FormControl sx={{ flexGrow: 1 }}>
            <FormLabel>Gender</FormLabel>
            <RadioGroup defaultValue="female">
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
        </Stack>
        <TextField placeholder="Placeholder" variant="outlined" />
        <FormControl fullWidth>
          <Typography variant="body2" sx={{ ml: 1 }}>
            Age
          </Typography>
          <Select value={age} onChange={handleChangeSelect}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Card>
      <Card variant="outlined" component={Stack} spacing={2} p={3} direction="row">
        <Button variant="contained">Button</Button>
        <Button variant="outlined">Button</Button>
        <Button variant="text">Button</Button>
      </Card>
    </Stack>
  );
};

export default ComponentPage;
