import { route_colors } from "@/styles/theme/global";
import { sample, shuffle } from "lodash";

export const getRandomColor = () => sample(shuffle(route_colors)) as string
