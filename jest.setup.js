import "@testing-library/jest-dom/extend-expect";
import { server } from "@/mock/server";

beforeAll(()=>server.listen());
afterEach(()=>server.resetHandlers());
afterAll(()=>server.close());