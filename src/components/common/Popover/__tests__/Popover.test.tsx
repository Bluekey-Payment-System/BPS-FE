import { fireEvent, render, screen } from "@testing-library/react";

import Popover from "@/components/common/Popover/Popover";

describe("팝오버 컴포넌트 렌더링 테스트", () => {
  it("should render properly", () => {
    const onClick = jest.fn();
    render(
      <Popover onClose={onClick}>
        <div>팝오버 컨텐츠</div>
      </Popover>,
    );
    expect(screen.getByText(/팝오버 컨텐츠/i)).toBeInTheDocument();
  });
  it("should close when clicked outside", () => {
    const handleClose = jest.fn();
    const handleClickOutside = jest.fn();
    render(
      <>
        <Popover onClose={handleClose}>
          <div>팝오버 컨텐츠</div>
        </Popover>
        <button onClick={handleClickOutside}>외부 영역</button>
      </>,
    );
    fireEvent.click(screen.getByText(/외부 영역/i));
    expect(handleClose).toBeCalledTimes(1);
  });
});
