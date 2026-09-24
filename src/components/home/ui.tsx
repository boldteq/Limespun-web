/**
 * The homepage primitives now live in the design system (src/components/system).
 * Kept as a re-export so every existing `./ui` and `@/components/home/ui` import still works.
 */
export {
  AppWindow,
  CheckRow,
  Chip,
  Display,
  PrimaryButton,
  SampleTag,
  SecondaryButton,
  StripedFrame,
  Toast,
  Underlined,
} from "@/components/system";
