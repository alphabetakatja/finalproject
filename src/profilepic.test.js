import React from "react";
import ProfilePic from "./profilepic";
import axios from "./axios";
import { render, waitForElement } from "@testing-library/react";

test("img element sets url prop as src", () => {
    const { container } = render(<ProfilePic url="funkychicken.gif" />);

    expect(container.querySelector("img").src).toContain("/funkychicken.gif");
});

test("img element sets default.png as src if there is no imageUrl prop", () => {
    const { container } = render(<ProfilePic />);

    expect(container.querySelector("img").src).toContain("/default.png");
});
