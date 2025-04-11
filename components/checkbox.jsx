import { Checkbox } from './Checkbox'; // Adjust the import path as needed

function Checkbox1() {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  );
}

export default Checkbox1;