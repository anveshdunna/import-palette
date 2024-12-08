// ui.ts
import {
  render,
  Container,
  Text,
  VerticalSpace,
  Bold,
  Textbox,
  Button,
  IconCheckCircle32,
  Columns,
} from "@create-figma-plugin/ui";
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { emit } from "@create-figma-plugin/utilities";

function Plugin() {
  const [palette, setPalette] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [url, setUrl] = useState<string>("");
  const [isPaletteVisible, setIsPaletteVisible] = useState(false);

  const handleSendToMain = (palette: { name: any; colors: any }) => {
    emit("create-color-styles", {
      name: palette.name,
      colors: palette.colors,
    });
  };

  const handleFetchPalette = () => {
    if (!url) {
      console.error("Enter a valid URL");
      setErrorMessage("Enter a valid Lospec palette URL.");
      return;
    }
    if (!url.startsWith("https://lospec.com/palette-list/")) {
      console.error("Invalid URL");
      setErrorMessage("Please enter a valid Lospec palette URL.");
      return;
    }
    const slug = url.split("/").pop()?.replace(".json", "");
    if (!slug) {
      console.error("Invalid URL");
      setErrorMessage("Please enter a valid Lospec palette URL.");
      return;
    }
    fetch(`https://lospec.com/palette-list/${slug}.json`)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            setErrorMessage(
              "Palette not found. Please check the URL and try again."
            );
          } else {
            setErrorMessage(
              `Error ${response.status}: ${response.statusText}.`
            );
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched colors:", data.colors);
        setPalette(data);
        setIsPaletteVisible(true);

        handleSendToMain(data);
        setUrl("");

        const startSlideOutAnimation = () => setIsPaletteVisible(false);

        requestAnimationFrame(() => {
          setTimeout(startSlideOutAnimation, 2000);
        });

        setErrorMessage(null);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(
          "Failed to fetch the palette. Please check the URL or try again later."
        );
      });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Container space="medium" style={{ flexGrow: 1 }}>
        <VerticalSpace space="large" />
        <Textbox
          placeholder="Enter the palette URL"
          value={url}
          onValueInput={(value) => {
            setUrl(value);
            if (errorMessage) {
              const errorElement = document.getElementById("error-message");
              if (errorElement) {
                errorElement.style.animation =
                  "slide-out 0.15s ease-in forwards";
                setTimeout(() => setErrorMessage(null), 150);
              } else {
                setErrorMessage(null);
              }
            }
          }}
          variant="border"
        />
        <VerticalSpace space="extraSmall" />

        <Button fullWidth onClick={handleFetchPalette}>
          Import palette
        </Button>

        {palette && (
          <div
            id="palette-message"
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              animation: isPaletteVisible
                ? "slide-in 0.25s ease-out"
                : "slide-out 0.15s ease-in",
            }}
            onAnimationEnd={() => {
              if (!isPaletteVisible) {
                setPalette(null); // Clean up when slide-out finishes
              }
            }}
          >
            <Container
              space="medium"
              style={{
                backgroundColor: "var(--figma-color-bg-secondary)",
              }}
            >
              <VerticalSpace space="small" />
              <Text align="left">{palette.colors.length} colors added</Text>
              <VerticalSpace space="extraSmall" />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "16px",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                {palette.colors.map((color: string) => (
                  <div
                    key={color}
                    style={{
                      backgroundColor: `#${color}`,
                      height: "16px",
                      flexGrow: 1,
                    }}
                  />
                ))}
              </div>
              <VerticalSpace space="medium" />
            </Container>
          </div>
        )}
      </Container>

      {errorMessage && (
        <div
          id="error-message"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            animation: "slide-in 0.15s ease-out",
          }}
        >
          <Container
            space="medium"
            style={{
              backgroundColor: "var(--figma-color-bg-warning-tertiary)",
            }}
          >
            <VerticalSpace space="small" />
            <Text align="left">{errorMessage}</Text>
            <VerticalSpace space="medium" />
          </Container>
        </div>
      )}

      <style>
        {`
    @keyframes slide-in {
      0% {
        transform: translateY(100%);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes slide-out {
      0% {
        transform: translateY(0);
        opacity: 1;
      }
      100% {
        transform: translateY(100%);
        opacity: 0;
      }
    }
  `}
      </style>
    </div>
  );
}

export default render(Plugin);
