import { CLIENT_ID, REDIRECT_URI, SCOPES, STATE } from './_privateNeatoData';

// const BEEHIVE_ENDPOINT = "https://beehive.neatocloud.com";

export function authenticate () {
    window.location.href = `https://apps.neatorobotics.com/oauth2/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&state=${STATE}`;
}