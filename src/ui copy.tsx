import {
  Button,
  Columns,
  Container,
  FileUploadDropzone,
  Bold,
  FileUploadButton,
  Muted,
  render,
  Text,
  TextboxNumeric,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";

import { CloseHandler, CreateRectanglesHandler } from "./types";

function Plugin() {
  const [count, setCount] = useState<number | null>(5);
  const [countString, setCountString] = useState("5");
  const handleCreateRectanglesButtonClick = useCallback(
    function () {
      if (count !== null) {
        emit<CreateRectanglesHandler>("CREATE_RECTANGLES", count);
      }
    },
    [count]
  );
  const handleCloseButtonClick = useCallback(function () {
    emit<CloseHandler>("CLOSE");
  }, []);
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      {/* <Text>
        <Muted>Count</Muted>
      </Text> */}
      <FileUploadDropzone
        acceptedFileTypes={["image/jpeg", "image/png"]}
        multiple
      >
        <Text align="center">
          <Bold>Drop palette file here</Bold>
        </Text>
        <VerticalSpace space="small" />
        <Text align="center">
          <Muted>or</Muted>
        </Text>
        <VerticalSpace space="small" />
        <FileUploadButton acceptedFileTypes={["image/jpeg", "image/png"]}>
          Choose file
        </FileUploadButton>
      </FileUploadDropzone>
      <VerticalSpace space="small" />
      <TextboxNumeric
        onNumericValueInput={setCount}
        onValueInput={setCountString}
        value={countString}
        variant="border"
      />
      <VerticalSpace space="extraLarge" />
      <Columns space="extraSmall">
        <Button fullWidth onClick={handleCreateRectanglesButtonClick}>
          Create
        </Button>
        <Button fullWidth onClick={handleCloseButtonClick} secondary>
          Close
        </Button>
      </Columns>
      <VerticalSpace space="small" />
    </Container>
  );
}

export default render(Plugin);
