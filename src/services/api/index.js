import { CLIENT_ID, REDIRECT_URI, SCOPES, STATE } from './_privateNeatoData';

const BEEHIVE_ENDPOINT = "https://beehive.neatocloud.com";

export function authenticate () {
    window.location.href = `https://apps.neatorobotics.com/oauth2/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&state=${STATE}`;
}

export async function getNeatoUser(access_token){
    let headers = new Headers({
        'Authorization':  `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    });
    let response = await fetch(`${BEEHIVE_ENDPOINT}/users/me`, {headers});
    return await response.json();
}

export async function getNeatoRobot(access_token){
    let headers = new Headers({
        'Authorization':  `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    });
    let response = await fetch(`${BEEHIVE_ENDPOINT}/users/me/robots`, {headers});
    return await response.json();
}
export async function getNeatoRobotMap(access_token, robot_serial){
    let headers = new Headers({
        'Authorization':  `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    });
    let response = await fetch(`${BEEHIVE_ENDPOINT}/users/me/robots/${robot_serial}/maps`, {headers});
    return await response.json();
}