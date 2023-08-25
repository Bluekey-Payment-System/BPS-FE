import { screen } from "@testing-library/dom";
import { useRouter } from "next/router";

import { render } from "@/utils/test.utils";

import AdminSigninPage from "../index.page";

jest.mock("next/router", () => {
  return {
    useRouter: jest.fn(),
  };
});

describe("어드민 로그인 페이지 렌더링 테스트", () => {
  it("에러 없이 렌더링 되어야 합니다.", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => {
      return {
        push,
        pathname: "/",
        route: "/",
        asPath: "/",
        query: "",
      };
    });
    render(<AdminSigninPage />);

    expect(screen.getByText("로그인")).toBeInTheDocument();
  });
});
