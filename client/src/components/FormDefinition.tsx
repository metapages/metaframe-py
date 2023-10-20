import { useCallback } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  Button,
  FormControl,
  Heading,
  HStack,
  InputGroup,
  Link,
  Spacer,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useHashParamJson } from '@metapages/hash-query';
import { MetaframeDefinitionV6 } from '@metapages/metapage';

const validationSchema = yup.object({
  metaframeDefinition: yup.string(),
});

interface FormType extends yup.InferType<typeof validationSchema> {}

export const FormDefinition: React.FC = () => {

  // definition?: MetaframeDefinitionV6;
  const [config, setConfig] = useHashParamJson<MetaframeDefinitionV6>("mfjson");
  const onSubmit = useCallback(
    (values: FormType) => {
      setConfig(values.metaframeDefinition
        ? JSON.parse(values.metaframeDefinition)
        : undefined);
    },
    [config, setConfig]
  );

  const formik = useFormik({
    initialValues: {
      metaframeDefinition: config
        ? JSON.stringify(config, null, 2)
        : "",
    },
    onSubmit,
    validationSchema,
  });

  return (
    <VStack width="100%" alignItems="flex-start">
      <Heading size="sm">
        <Link
          isExternal
          href="https://github.com/metapages/metapage/blob/f46330ce41dac8b0568212ff1a6d64924f433027/app/libs/src/metapage/v0_4/metaframe.ts#L29"
        >
          metaframe.json (defines inputs,outputs,edit,name, etc)
        </Link>{" "}
      </Heading>
      <VStack
        justifyContent="flex-start"
        borderWidth="1px"
        borderRadius="lg"
        p={2}
        width="100%"
        align="stretch"
      >
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <InputGroup>
              <Textarea
                id="metaframeDefinition"
                name="metaframeDefinition"
                // type="textarea"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.metaframeDefinition}
              />
            </InputGroup>
          </FormControl>
          <br />
          <HStack>
            <Spacer />

            <Button type="submit">Update</Button>
          </HStack>
        </form>
      </VStack>
    </VStack>
  );
};
