import Home from "@/pages/index.page";
import { render } from "@/utils/test.utils";

describe("index.page.tsx test", () => {
  it("renders Home Page", () => {
    const { container } = render(<Home />);

    expect(container).toBeInTheDocument();
  });
});
