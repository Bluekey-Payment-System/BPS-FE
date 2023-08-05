import { render } from "@testing-library/react";

import Home from "@/pages/index.page";

describe("index.page.tsx test", () => {
  it("renders Home Page", () => {
    const { container } = render(<Home />);

    expect(container).toBeInTheDocument();
  });
});
