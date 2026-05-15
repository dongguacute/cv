const USERNAME = 'dongguacute'

async function getAllOrgs() {
    const response = await fetch(`https://api.github.com/users/${USERNAME}/orgs`)
    const data = await response.json()
    return data
}

async function getOrgLocation(orgName: string) {
    const orgs = await getAllOrgs()
    const org = orgs.find((org: any) => org.login === orgName)
    return org?.location
}

export { getAllOrgs, getOrgLocation }