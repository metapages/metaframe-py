import {
  IconButton,
  VStack,
  HStack,
  Input,
  InputGroup,
  Spacer,
  Button,
  Heading,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { FieldArray, Form, ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import { Config } from "../shared/config";

const validationSchema = yup.object({
  modules: yup.array().of(yup.string()),
});

export const ModuleChooser: React.FC<{
  config: Config;
  setConfig: (config: Config) => void;
}> = ({ config, setConfig }) => {
  return (
    <VStack width="100%" alignItems="flex-start">
      <Heading size="sm">
        Javascript module URLs (embedded in index.html){" "}
      </Heading>
      <VStack
        justifyContent="flex-start"
        borderWidth="1px"
        borderRadius="lg"
        p={2}
        width="100%"
        align="stretch"
      >
        <Formik
          initialValues={config}
          onSubmit={(values) => {
            setConfig({ ...config, modules: values.modules });
          }}
          validationSchema={validationSchema}
        >
          {({ values, handleSubmit }) => (
            <Form>
              <FieldArray name="modules">
                {({ remove, push, replace }) => (
                  <>
                    {values.modules.length > 0 &&
                      values.modules.map((modulestring, index) => (
                        <HStack key={index} width="100%" padding={1}>
                          <InputGroup>
                            <Input
                              name={`modules.${index}`}
                              type="text"
                              value={modulestring ?? ""}
                              onChange={(e) => {
                                replace(index, e.target.value);
                              }}
                            />
                            <ErrorMessage
                              name={`modules.${index}`}
                              component="div"
                              className="field-error"
                            />
                          </InputGroup>
                          <Spacer />

                          <IconButton
                            aria-label="delete module"
                            icon={<DeleteIcon />}
                            onClick={() => {
                              remove(index);
                              handleSubmit();
                            }}
                          />
                        </HStack>
                      ))}
                    <br />

                    <HStack>
                      <Spacer />
                      <IconButton
                        verticalAlign="top"
                        aria-label="add module"
                        icon={<AddIcon />}
                        size="md"
                        onClick={() => push("")}
                        mr="4"
                      />

                      <Button type="submit">Submit</Button>
                    </HStack>
                  </>
                )}
              </FieldArray>
            </Form>
          )}
        </Formik>
      </VStack>
    </VStack>
  );
};
