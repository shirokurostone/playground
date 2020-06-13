
type UserID = string
class RuntimeError extends Error { }

class API {
    getLoggedInUserID(): UserID | RuntimeError {
        return ""
    }
    getFriendIDs(userID: UserID): UserID[] | RuntimeError {
        return [""]
    }
    getUserName(userID: UserID): string | RuntimeError {
        return ""
    }
}

function getFriendsName(): string[] | RuntimeError {
    const api = new API()

    const userID = api.getLoggedInUserID()
    if (userID instanceof RuntimeError) {
        return userID;
    }
    const friends = api.getFriendIDs(userID)
    if (friends instanceof RuntimeError) {
        return friends;
    }

    const result = []
    for (let id of friends) {
        let name = api.getFriendIDs(id)
        if (name instanceof RuntimeError) {
            return name
        }
        result.push(name)
    }
    return result
}