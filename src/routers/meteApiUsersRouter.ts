import { Request, Response, Router } from "express";
import asyncRequestHandler from "../utils/asyncHandler";
import fetch from "node-fetch";
import { createRestAPIClient } from "masto";

if (!process.env.METE_BASEURL) {
  throw new Error("METE_BASEURL not set");
}

let meteBaseUrl = process.env.METE_BASEURL;
if (meteBaseUrl.endsWith("/")) {
  meteBaseUrl = meteBaseUrl.slice(-1);
}

let masto;
if (process.env.MASTODON_SERVER_URL && process.env.MASTODON_ACCESS_TOKEN) {
  masto = createRestAPIClient({
    url: process.env.MASTODON_SERVER_URL,
    accessToken: process.env.MASTODON_ACCESS_TOKEN,
  });
}

const postDrinkToMastodon = async (drinkId: number) => {
  if (!masto) {
    console.warn(
      "Not posting to mastodon because MASTODON_SERVER_URL or MASTODON_ACCESS_TOKEN not set"
    );
    return;
  }

  const drinkResponse = await fetch(
    `${meteBaseUrl}/api/v1/drinks/${drinkId}.json`
  );
  if (drinkResponse.status !== 200) {
    throw new Error(
      `Fetching drink has unexpected status code ${drinkResponse.status}`
    );
  }
  const drink = await drinkResponse.json();
  await masto.v1.statuses.create({
    status: `${drink.name} wurde gekauft!`,
    visibility: "unlisted",
  });
};

const router = Router();
router.get(
  "/:id/buy.json",
  asyncRequestHandler(async (req: Request, res: Response) => {
    const { drink: drinkId } = req.query;
    // originalUrl contains query as well
    const buyUrl = meteBaseUrl + req.originalUrl;
    const meteResponse = await fetch(buyUrl);
    if (meteResponse.status !== 204) {
      throw new Error(
        `mete response status is ${meteResponse.status} which is unexpected. something is wrong`
      );
    }
    res.status(204);
    // finish request for user but continue posting mastodon stuff in the background
    res.end();

    await postDrinkToMastodon(parseInt(drinkId as string, 10));
  })
);

export default router;
