"use client";

import Cookies from "js-cookie";
import { useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
  publicationId: string;
  postId: string;
};

export default function Analytics({ publicationId, postId }: Props) {
  const sendViewsToHashnodeInternalAnalytics = useCallback(async () => {
    // Send to Hashnode's own internal analytics
    const event: Record<string, string | number | object> = {
      event_type: "pageview",
      time: new Date().getTime(),
      event_properties: {
        hostname: window.location.hostname,
        url: window.location.pathname,
        eventType: "pageview",
        publicationId,
        dateAdded: new Date().getTime(),
        referrer: window.document.referrer,
      },
    };

    let deviceId = Cookies.get("__amplitudeDeviceID");
    if (!deviceId) {
      deviceId = uuidv4();
      Cookies.set("__amplitudeDeviceID", deviceId, {
        expires: 365 * 2,
      }); // expire after two years
    }

    event["device_id"] = deviceId;

    const res = await fetch(`/hashnode/data-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ events: [event] }),
    });
  }, [publicationId]);

  const sendViewsToHashnodeAnalyticsDashboard = useCallback(async () => {
    const LOCATION = window.location;
    const NAVIGATOR = window.navigator;
    const currentFullURL =
      LOCATION.protocol +
      "//" +
      LOCATION.hostname +
      LOCATION.pathname +
      LOCATION.search +
      LOCATION.hash;

    const query = new URL(currentFullURL).searchParams;

    const utm_id = query.get("utm_id");
    const utm_campaign = query.get("utm_campaign");
    const utm_source = query.get("utm_source");
    const utm_medium = query.get("utm_medium");
    const utm_term = query.get("utm_term");
    const utm_content = query.get("utm_content");

    let referrer = document.referrer || "";
    if (referrer.indexOf(window.location.hostname) !== -1) {
      referrer = "";
    }

    const data = {
      publicationId,
      postId,
      timestamp: Date.now(),
      url: currentFullURL,
      referrer: referrer,
      title: document.title,
      charset: document.characterSet || document.charset,
      lang: NAVIGATOR.language,
      userAgent: NAVIGATOR.userAgent,
      historyLength: window.history.length,
      timezoneOffset: new Date().getTimezoneOffset(),
      utm_id,
      utm_campaign,
      utm_source,
      utm_medium,
      utm_term,
      utm_content,
    };

    // For Hashnode Blog Dashboard Analytics
    fetch(`/hashnode/view-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
  }, [publicationId, postId]);

  useEffect(() => {
    sendViewsToHashnodeInternalAnalytics();
    sendViewsToHashnodeAnalyticsDashboard();
  }, [
    sendViewsToHashnodeInternalAnalytics,
    sendViewsToHashnodeAnalyticsDashboard,
  ]);

  return null;
}
