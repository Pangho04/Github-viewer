import React from "react";
import { render, screen } from "@testing-library/react";
import Loading from "../components/Loading";

test("Loading component should show text prop", () => {
  const TEXT = "hello world";

  render(<Loading text={TEXT} />);
  expect(screen.getByText(TEXT)).toBeInTheDocument();
});

test("TEXT Prop 미 전달시, default value 출력되어야 한다.", () => {
  const TEXT = "Loading";

  render(<Loading />);
  expect(screen.getByText(TEXT)).toBeInTheDocument();
});

test("useEffect 작동 확인 테스트", () => {
  const {rerender} = render(<Loading text="Loading" speed={300}/>);

  rerender(<Loading text="Loading." speed={300}/>);
  rerender(<Loading text="Loading.." speed={300}/>);
  rerender(<Loading text="Loading..." speed={300}/>);
  rerender(<Loading text="Loading" speed={300}/>);
});
