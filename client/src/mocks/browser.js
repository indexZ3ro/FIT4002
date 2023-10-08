import { setupWorker, rest } from "msw";

const worker = setupWorker(
    rest.get("/sticky-notes", (req, res, ctx) => {
        return res(
            ctx.json({
                sticky_notes: [
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
                ],
            })
        );
    })
);

worker.start();
