import React from "react";
import App from "./app";
import axios from "./axios";
import { render, waitForElement } from "@testing-library/react";

jest.mock("./axios");

test("App renders correctly", () => {
    axios.get.mockResolvedValue({
        data: {
            first: "Funky",
            last: "Chicken",
            bio: "Mother, wife, blogger...",
            imageUrl: "/funkychicken.png"
        }
    });
    const { container } = render(<App />);

    console.log("container innerHTML is " + container.innerHTML);

    expect(container.innerHTML).toBe("");


    const elem = await waitForElement(
        () => {
            container.querySelector("div");

    });
    console.log(container.innerHTML);

    expect(container.querySelectorAll('div')).length.toBe(1);
});

//npm test to run the tests in the cli
