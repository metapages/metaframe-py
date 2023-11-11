import { useCallback } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  VStack,
} from '@chakra-ui/react';

import { RadioButtonMode } from './components/RadioButtonMode';
import {
  OptionDescription,
  Options,
  useOptions,
} from './useOptions';

const validationSchema = yup.object({
  r: yup.boolean().notRequired(),
  // cf: yup.boolean().notRequired(),
});
interface FormType extends yup.InferType<typeof validationSchema> {}

export const PanelOptions: React.FC = () => {
  const [options, setOptions] = useOptions({});

  const onSubmit = useCallback(
    (values: FormType) => {
      const newOptions = (values || {}) as Options;
      if (!newOptions.r) {
        delete newOptions.r;
      }
      // if (!newOptions.cf) {
      //   delete newOptions.cf;
      // }
      
      setOptions(Object.keys(newOptions).length === 0 ? undefined : newOptions);
    },
    [setOptions]
  );

  const formik = useFormik({
    initialValues: options,
    onSubmit,
    validationSchema,
  });

  return (
    <VStack
      maxW="700px"
      gap="1rem"
      m={10}
      justifyContent="flex-start"
      alignItems="stretch"
    >
      
      <RadioButtonMode />

      <form onSubmit={formik.handleSubmit}>
       
        {Object.keys(validationSchema.fields as any)
          .filter(
            (fieldName) =>
              (validationSchema.fields as any)[fieldName].type === "boolean"
          )
          .map((fieldName) => (
            <FormControl pb="1rem" key={fieldName}>
              <FormLabel fontWeight="bold" htmlFor={fieldName}>
                {OptionDescription[fieldName]}
              </FormLabel>
              <Checkbox
                name={fieldName}
                size="lg"
                bg="gray.100"
                spacing="1rem"
                onChange={(e) => {
                  // currently checkbox needs this to work
                  formik.setFieldValue(fieldName, e.target.checked);
                  formik.handleSubmit();
                }}
                isChecked={(formik.values as any)[fieldName]}
              />
            </FormControl>
          ))}

        <Button type="submit" display="none">
          submit
        </Button>
      </form>
    </VStack>
  );
};
