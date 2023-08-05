import { render } from "@testing-library/react";

import Home from "@/pages";

describe("index.tsx test", () => {
  it("renders Home Page", () => {
    const { container } = render(<Home />);

    expect(container).toBeInTheDocument();
  });
});
