import { setupWorker, rest } from "msw";
import logo192 from "../assets/logo192.png";
const apiUrl = process.env.REACT_APP_API_URL;

const worker = setupWorker(
    rest.get(apiUrl + `/api/project/*/sticky-notes`, (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    height: 150,
                    text: "idk",
                    width: 150,
                    x: 555,
                    y: 370,
                    id: "-Ng8rmhhrQZ-dPi0cQ6p",
                },
                {
                    height: 150,
                    text: "wassup",
                    width: 150,
                    x: 233,
                    y: 145,
                    id: "-Ng8roMSsyLRhHKObVbG",
                },
                {
                    height: 150,
                    text: "hi",
                    width: 150,
                    x: 514,
                    y: 181,
                    id: "-Ng8roSZHTrvD-AqyFLs",
                },
            ])
        );
    }),

    rest.get(apiUrl + `/api/project/*/questions`, (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    status: "active",
                    text: "",
                    type: 1,
                    id: "-Ng9Hpiez9Y_bo0xzy-j",
                },
                {
                    status: "inactive",
                    text: "",
                    type: 2,
                    id: "-Ng9Hpiez9Y_bo0xzy-k",
                },
                {
                    status: "inactive",
                    text: "",
                    type: 3,
                    id: "-Ng9Hpiez9Y_bo0xzy-l",
                },
                {
                    status: "inactive",
                    text: "",
                    type: 4,
                    id: "-Ng9Hpiez9Y_bo0xzy-m",
                },
            ])
        );
    }),

    rest.get(apiUrl + `/api/project/*/logo192.png`, (req, res, ctx) => {
        return res(
            ctx.set("Content-Type", "image/png"),
            // Update with our logo
            ctx.body(logo192)
        );
    })
);

worker.start();
