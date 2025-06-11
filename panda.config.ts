import { defineConfig } from "@pandacss/dev";
import { createPreset } from '@park-ui/panda-preset'
// import { recipes, slotRecipes } from '~/theme/recipes'
import amber from '@park-ui/panda-preset/colors/amber'
import sand from '@park-ui/panda-preset/colors/sand'

export default defineConfig({
  preflight: true,
  presets: [createPreset({ accentColor: amber, grayColor: sand, radius: 'sm' })],
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  jsxFramework: 'solid',
  theme: {
    extend: {
      // recipes,
      // slotRecipes,
    },
  },
  outdir: "styled-system",
});
