import Providers from "../src/components/providers";

import type { Preview } from "@storybook/nextjs";

import "../src/app/[lang]/globals.css";

import en from "../dicts/en.json";
import cn from "../dicts/cn.json";

const locales = { en, cn };

const preview: Preview = {
  globalTypes: {
    locale: {
      description: "Internationalization locale",
      toolbar: {
        icon: "globe",
        items: [
          { value: "en", right: "🇺🇸", title: "English" },
          { value: "cn", right: "🇨🇳", title: "中文" },
        ],
      },
    },
  },
  initialGlobals: {
    locale: "en",
  },
  decorators: [
    (Story, context) => (
      <Providers
        intl={{
          locale: context.globals.locale,
          messages: locales[context.globals.locale],
        }}
      >
        <Story />
      </Providers>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
