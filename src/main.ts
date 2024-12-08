import {
  showUI,
  on,
  convertHexColorToRgbColor,
} from "@create-figma-plugin/utilities";

export default function () {
  showUI({ width: 280, height: 160 });

  on("create-color-styles", (palette) => {
    const { name, colors } = palette;

    try {
      colors.forEach((color: string, index: number) => {
        const paintStyle = figma.createPaintStyle();
        paintStyle.name = `${name}/${index + 1}`;

        const rgbColor = convertHexColorToRgbColor(color);
        if (!rgbColor) {
          throw new Error(`Invalid color: ${color}`);
        }

        paintStyle.paints = [
          {
            type: "SOLID",
            color: rgbColor,
          },
        ];
      });

      // figma.notify("Color styles created successfully!");
    } catch (error) {
      console.error("Error creating color styles:", error);
      figma.notify("Failed to create color styles.");
    }

    // figma.closePlugin();
  });
}
