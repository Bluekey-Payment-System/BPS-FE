import Home from "@/pages/index.page";
import { renderWithProviders } from "@/utils/test.utils";

describe("index.page.tsx test", () => {
  it("renders Home Page", () => {
    const { container } = renderWithProviders(<Home />);

    expect(container).toBeInTheDocument();
  });
});
