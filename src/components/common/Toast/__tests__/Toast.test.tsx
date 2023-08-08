import { render } from "@testing-library/react";

import Toast from "@/components/common/Toast/Toast";

describe("토스트 컴포넌트 렌더링 테스트", () => {
  it("should render properly", () => {
    const { container } = render(<Toast message="토스트 입니다." />);

    expect(container.textContent).toBe("토스트 입니다.");
  });
});
