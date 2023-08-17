import {
  fireEvent, render, screen,
} from "@testing-library/react";

import Checkbox from "@/components/common/Inputs/Checkbox/Checkbox";
import TextField from "@/components/common/Inputs/TextField/TextField";
import TextFieldWithUnit from "@/components/common/Inputs/TextFieldWithUnit/TextFieldWithUnit";

describe("텍스트필드 컴포넌트 렌더링 테스트", () => {
  it("에러 없이 렌더링 되어야 합니다.", () => {
    render(
      <TextField data-testid="textfield-input" placeholder="텍스트 필드" errors={{ error: "error" }} />,
    );
    expect(screen.getByTestId("textfield-input")).toBeInTheDocument();
  });
});
describe("텍스트필드 컴포넌트 기능 테스트", () => {
  it("수정 모드가 있는 텍스트필드의 경우, focus시 저장 버튼이 나타나고, blur시 사라져야 합니다.", () => {
    const mockOnSave = jest.fn(() => { return Promise.resolve(); });
    render(
      <TextField label="test" name="test" onSave={mockOnSave} errors={{}} />,
    );

    const input = screen.getByTestId("textfield-input");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "New Value" } });
    const editButton = screen.getByTestId("edit-button");
    expect(editButton).toBeInTheDocument();
    fireEvent.blur(input);
    expect(editButton).not.toBeInTheDocument();
  });
  it("텍스트필드에 단위를 넣으면 단위가 나타나야 합니다", () => {
    render(
      <TextFieldWithUnit label="test" name="test" errors={{}} unit="%" />,
    );
    expect(screen.getByText("%")).toBeInTheDocument();
  });
});
describe("체크박스 렌더링 테스트", () => {
  it("에러 없이 렌더링 되어야 합니다.", () => {
    render(
      <Checkbox label="체크박스" data-testid="checkbox-input" />,
    );
    expect(screen.getByTestId("checkbox-input")).toBeInTheDocument();
  });
  it("라벨 텍스트가 정상적으로 렌더링 되어야 합니다.", () => {
    render(
      <Checkbox label="체크박스" data-testid="checkbox-input" />,
    );
    expect(screen.getByText("체크박스")).toBeInTheDocument();
  });
});
