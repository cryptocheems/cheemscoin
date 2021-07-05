import { Button, useRadio, UseRadioProps } from "@chakra-ui/react";
// Taken from https://chakra-ui.com/docs/form/radio#custom-radio-buttons
export const RadioCard: React.FC<UseRadioProps> = props => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Button
      mt="2"
      ml="2"
      as="label"
      cursor="pointer"
      variant={props.isChecked ? "solid" : "outline"}
      colorScheme="blue"
      {...checkbox}
    >
      <input {...input} />
      {props.children}
    </Button>
  );
};
