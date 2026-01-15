import { cssInterop } from "nativewind";
import { DrawerContentScrollView } from "@react-navigation/drawer";

// Gir DrawerContentScrollView støtte for `className` (mapper til `style`)
cssInterop(DrawerContentScrollView, {
  className: "style",
});
