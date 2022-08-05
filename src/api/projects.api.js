import http from "./axios"


const updateProject = (
    projectID,
    name,
    description,
    icon,
    accentColor,
    isFavorite,
    isPinned,
    isEditable

) => http.patch("/projects/" + projectID, {
    name,
    description,
    icon,
    accent_color: accentColor,
    is_favorite: isFavorite,
    is_pinned: isPinned,
    is_editable: isEditable
})

const deleteProject = (ID) => http.delete("/projects/" + ID)

const fetchActivity = () => http.get("/users/me/activities")

const createProject = (
    {
        name,
        description,
        color,
        icon,
        isFavorite,
        isPinned
    }
) => http.post("/projects", {
    name,
    description,
    accent_color: color,
    icon,
    is_favorite: isFavorite,
    is_pinned: isPinned
})

export {
    updateProject,
    deleteProject,
    fetchActivity,
    createProject
}
