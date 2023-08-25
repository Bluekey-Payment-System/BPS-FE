import {setUpServer} from "msw/node";
import { handlers } from "./handlers";

export const server = setUpServer(...handlers);