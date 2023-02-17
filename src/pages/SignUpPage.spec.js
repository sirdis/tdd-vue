import SignUpPage from "./SignUpPage.vue";
import {render, screen} from "@testing-library/vue";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import axios from "axios";

describe("Sign Up Page", () => {
    describe("Layout", () => {
        it('has a Sign Up Header', () => {
            render(SignUpPage);
            const header = screen.queryByRole("heading", {name: "Sign Up"})
            console.log(header)
            expect(header).toBeInTheDocument();
        });

        it("has username input", () => {
            render(SignUpPage);
            const input = screen.queryByLabelText('Username');
            expect(input).toBeInTheDocument();
        });

        it("has email input", () => {
            render(SignUpPage);
            const input = screen.queryByLabelText('E-Mail');
            expect(input).toBeInTheDocument();
        });

        it("has password input", () => {
            render(SignUpPage)
            const input = screen.queryByLabelText('Password');
            expect(input).toBeInTheDocument();
        });

        it("has password type for password input", () => {
            render(SignUpPage)
            const input = screen.queryByLabelText('Password');
            expect(input.type).toBe("password");
        });

        it("has password repeat input", () => {
            render(SignUpPage)
            const input = screen.queryByLabelText('Password Repeat');
            expect(input).toBeInTheDocument();
        });

        it("has password type for password repeat input", () => {
            render(SignUpPage)
            const input = screen.queryByLabelText('Password Repeat');
            expect(input.type).toBe("password");
        });

        it('has a Sign Up Button', () => {
            render(SignUpPage);
            const button = screen.queryByRole("button", {name: "Sign Up"})
            console.log(button)
            expect(button).toBeInTheDocument();
        });

        it('disables the Sign Up Button initially', () => {
            render(SignUpPage);
            const button = screen.queryByRole("button", {name: "Sign Up"})
            console.log(button)
            expect(button).toBeDisabled();
        });
    });

    describe("Interactions", () => {
        it('enables the button when the password and password repeat fields have the same value', async () => {
            render(SignUpPage);
            const passwordInput = screen.queryByLabelText("Password");
            const passwordRepeatInput = screen.queryByLabelText("Password Repeat");
            const button = screen.queryByRole("button", {name: "Sign Up"})

            await userEvent.type(passwordInput, "secret");
            await userEvent.type(passwordRepeatInput, "secret");

            expect(button).toBeEnabled();
        });

        it('sends username, email and password to the backend after clicking the button', async () => {
            render(SignUpPage);
            const usernameInput = screen.queryByLabelText("Username");
            const emailInput = screen.queryByLabelText("E-Mail");
            const passwordInput = screen.queryByLabelText("Password");
            const passwordRepeatInput = screen.queryByLabelText("Password Repeat");
            const button = screen.queryByRole("button", {name: "Sign Up"})

            await userEvent.type(usernameInput, "user1");
            await userEvent.type(emailInput, "user1@mail.com");
            await userEvent.type(passwordInput, "secret");
            await userEvent.type(passwordRepeatInput, "secret");

            const mockFn = jest.fn();
            axios.post = mockFn;

            await userEvent.click(button);

            const firstCall = mockFn.mock.calls[0];
            const body = firstCall[1];

            expect(button).toBeEnabled();
            expect(mockFn).toBeCalled();
            expect(body).toEqual({

            })
        });
    });
})
